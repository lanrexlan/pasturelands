"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { ChoiceGroup, ErrorText, Honeypot, SelectField, TextField } from "@/components/form/fields";
import { Arrow, WhatsAppIcon, buttonStyles } from "@/components/ui";
import { emptyLead, groupDigits, labelFor, options, validateStep, type FieldErrors, type LeadInput } from "@/lib/lead";
import { uploadSellerPhoto } from "@/lib/photos";
import { site, whatsappLink } from "@/lib/site";
import { supabaseConfigured } from "@/lib/supabase";
import { submitLead } from "./actions";

const STORAGE_KEY = "pasturelands:sell-draft:v1";
const MAX_PHOTOS = 10;

const steps = [
  { title: "Your property", short: "Property" },
  { title: "Its condition", short: "Condition" },
  { title: "Title documents", short: "Title" },
  { title: "Price and timing", short: "Price" },
  { title: "Photos", short: "Photos" },
  { title: "How to reach you", short: "Contact" },
];

type Draft = { values: LeadInput; step: number; draftId: string; startedAt: number };

type Photo = { path: string; preview?: string };

const countries = [
  "Nigeria",
  "United Kingdom",
  "United States",
  "Canada",
  "Ireland",
  "Germany",
  "United Arab Emirates",
  "South Africa",
  "Ghana",
  "Netherlands",
  "Australia",
];

function loadDraft(): Draft | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    return { ...d, values: { ...emptyLead, ...d.values } };
  } catch {
    return null;
  }
}

function saveDraft(d: Draft) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    /* private mode or storage full: the form still works, it just won't survive a reload */
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

export function SellForm() {
  const [values, setValues] = useState<LeadInput>(emptyLead);
  const [step, setStep] = useState(0);
  const [draftId, setDraftId] = useState("");
  const [startedAt, setStartedAt] = useState(0);
  const [restored, setRestored] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(0);
  const [photoError, setPhotoError] = useState("");
  const [done, setDone] = useState<{ ref: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const [hydrated, setHydrated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  // Restore a saved draft once, after hydration.
  useEffect(() => {
    const d = loadDraft();
    /* eslint-disable react-hooks/set-state-in-effect -- one-off read of browser storage */
    if (d) {
      setValues(d.values);
      setStep(Math.min(d.step, steps.length - 1));
      setDraftId(d.draftId);
      setStartedAt(d.startedAt);
      setPhotos(d.values.photoPaths.map((path) => ({ path })));
      setRestored(d.step > 0 || d.values.area !== "");
    } else {
      setDraftId(crypto.randomUUID());
      setStartedAt(Date.now());
    }
    setHydrated(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Autosave on every change.
  useEffect(() => {
    if (hydrated && !done) saveDraft({ values, step, draftId, startedAt });
  }, [values, step, draftId, startedAt, hydrated, done]);

  // Move focus to the step heading when the step changes.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step, done]);

  function set<K extends keyof LeadInput>(key: K, value: LeadInput[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function toggleDoc(value: string, checked: boolean) {
    setValues((v) => {
      let docs = v.titleDocuments.filter((d) => d !== value);
      if (checked) docs = [...docs, value];
      return { ...v, titleDocuments: docs };
    });
    if (errors.titleDocuments) setErrors((e) => ({ ...e, titleDocuments: undefined }));
  }

  function next() {
    const errs = validateStep(step, values);
    if (Object.keys(errs).length) {
      setErrors(errs);
      setFormMessage("");
      // Focus the first field with a problem.
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"], [data-invalid] input')?.focus();
      });
      return;
    }
    setErrors({});
    if (step < steps.length - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      submit();
    }
  }

  function back() {
    setErrors({});
    setFormMessage("");
    setStep((s) => Math.max(0, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    setFormMessage("");
    startTransition(async () => {
      try {
        const res = await submitLead({ ...values, website: honeypot, startedAt });
        if (res.ok) {
          clearDraft();
          setDone({ ref: res.ref });
          window.scrollTo({ top: 0 });
          return;
        }
        if (res.errors && Object.keys(res.errors).length) {
          setErrors(res.errors);
          // Go back to the first step that has a problem.
          const firstBad = steps.findIndex((_, i) => Object.keys(validateStep(i, values)).length > 0);
          if (firstBad >= 0 && firstBad !== step) setStep(firstBad);
        }
        setFormMessage(res.message ?? "Something went wrong. Please try again.");
      } catch {
        setFormMessage(
          "Your connection seems to have dropped. Your answers are saved on this device. Check your signal and tap Send again.",
        );
      }
    });
  }

  async function addPhotos(files: FileList | null) {
    if (!files?.length) return;
    setPhotoError("");
    if (!supabaseConfigured) {
      setPhotoError("Photo upload isn't available right now. You can skip this step and send photos on WhatsApp later.");
      return;
    }
    const room = MAX_PHOTOS - photos.length;
    const chosen = Array.from(files).slice(0, room);
    if (files.length > room) setPhotoError(`You can send up to ${MAX_PHOTOS} photos, so we added the first ${room}.`);
    setUploading((n) => n + chosen.length);
    for (const file of chosen) {
      try {
        const photo = await uploadSellerPhoto(file, draftId);
        setPhotos((p) => [...p, photo]);
        setValues((v) => ({ ...v, photoPaths: [...v.photoPaths, photo.path] }));
      } catch {
        setPhotoError(`We couldn't upload "${file.name}". Check your connection and try that one again.`);
      } finally {
        setUploading((n) => n - 1);
      }
    }
  }

  function removePhoto(path: string) {
    setPhotos((p) => p.filter((x) => x.path !== path));
    setValues((v) => ({ ...v, photoPaths: v.photoPaths.filter((x) => x !== path) }));
  }

  function startOver() {
    clearDraft();
    setValues(emptyLead);
    setPhotos([]);
    setStep(0);
    setErrors({});
    setRestored(false);
    setDraftId(crypto.randomUUID());
    setStartedAt(Date.now());
  }

  if (done) return <Confirmation refCode={done.ref} values={values} headingRef={headingRef} />;

  const current = steps[step];
  const isLast = step === steps.length - 1;

  return (
    <div className="relative">
      {/* Progress */}
      <div className="mb-8">
        <p className="flex items-baseline justify-between text-[0.9375rem]">
          <span className="font-bold text-green-900">
            Step {step + 1} of {steps.length}
          </span>
          <span>{step < steps.length - 1 ? `Next: ${steps[step + 1].short}` : "Last step"}</span>
        </p>
        <ol className="mt-3 grid grid-cols-6 gap-1.5" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s.title} className="relative h-1.5 overflow-hidden bg-line">
              <span
                className="absolute inset-0 origin-left bg-terracotta transition-transform duration-300 ease-out"
                style={{ transform: `scaleX(${i <= step ? 1 : 0})` }}
              />
              <span className="sr-only">
                {s.title}: {i < step ? "done" : i === step ? "current" : "to do"}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {restored && step === 0 && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-l-4 border-gold bg-paper px-4 py-3 text-[0.9375rem]">
          <span>We kept what you entered last time.</span>
          <button type="button" onClick={startOver} className="font-bold text-green-900 underline underline-offset-4">
            Start again
          </button>
        </div>
      )}

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <Honeypot value={honeypot} onChange={setHoneypot} />

        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-[2rem] focus:outline-none sm:text-[2.5rem]"
          key={step}
        >
          <span className="block animate-rise">{current.title}</span>
        </h2>

        <div key={`s${step}`} className="mt-8 animate-rise space-y-7">
          {step === 0 && (
            <>
              <ChoiceGroup
                legend="Where is the home?"
                type="radio"
                name="state"
                options={options.state}
                value={values.state}
                onChange={(v) => set("state", v)}
                error={errors.state}
                columns={3}
              />
              <TextField
                label="Area or neighbourhood"
                hint="For example Gwarinpa, Maitama, Lekki Phase 1 or Yaba."
                value={values.area}
                onChange={(e) => set("area", e.target.value)}
                error={errors.area}
                autoComplete="address-level3"
                maxLength={120}
              />
              <SelectField
                label="What kind of property is it?"
                options={options.propertyType}
                value={values.propertyType}
                onChange={(e) => set("propertyType", e.target.value)}
                error={errors.propertyType}
              />
              <div className="grid gap-7 sm:grid-cols-2">
                <TextField
                  label="Bedrooms"
                  optional
                  inputMode="numeric"
                  value={values.bedrooms}
                  onChange={(e) => set("bedrooms", e.target.value.replace(/\D/g, "").slice(0, 2))}
                  error={errors.bedrooms}
                />
                <TextField
                  label="Roughly when was it built?"
                  optional
                  inputMode="numeric"
                  placeholder="e.g. 2012"
                  value={values.yearBuilt}
                  onChange={(e) => set("yearBuilt", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  error={errors.yearBuilt}
                />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <ChoiceGroup
                legend="What condition is it in?"
                hint="We buy homes in any condition. This just helps us plan the visit."
                type="radio"
                name="condition"
                options={options.condition}
                value={values.condition}
                onChange={(v) => set("condition", v)}
                error={errors.condition}
              />
              <ChoiceGroup
                legend="Who lives there now?"
                type="radio"
                name="occupancy"
                options={options.occupancy}
                value={values.occupancy}
                onChange={(v) => set("occupancy", v)}
                error={errors.occupancy}
              />
            </>
          )}

          {step === 2 && (
            <ChoiceGroup
              legend="Which documents do you have for the property?"
              hint="Tick all that apply. It's fine if you're not sure: we'll help you work it out."
              type="checkbox"
              name="titleDocuments"
              options={options.titleDocuments}
              value={values.titleDocuments}
              onChange={toggleDoc}
              error={errors.titleDocuments}
            />
          )}

          {step === 3 && (
            <>
              <TextField
                label="What price do you have in mind?"
                optional
                hint="Your best estimate in naira. It doesn't commit you to anything."
                prefix="₦"
                inputMode="numeric"
                placeholder="85,000,000"
                value={groupDigits(values.askingPrice)}
                onChange={(e) => set("askingPrice", e.target.value.replace(/\D/g, "").replace(/^0+/, "").slice(0, 13))}
                error={errors.askingPrice}
              />
              <ChoiceGroup
                legend="How soon do you need to sell?"
                type="radio"
                name="timeline"
                options={options.timeline}
                value={values.timeline}
                onChange={(v) => set("timeline", v)}
                error={errors.timeline}
                columns={3}
              />
              <SelectField
                label="Why are you selling?"
                optional
                options={options.reason}
                value={values.reason}
                onChange={(e) => set("reason", e.target.value)}
                placeholder="Prefer not to say"
              />
            </>
          )}

          {step === 4 && (
            <div>
              <p className="font-bold text-green-900">
                Add photos of the home <span className="font-normal text-ink">(optional)</span>
              </p>
              <p className="mt-1 text-[0.9375rem]">
                Up to {MAX_PHOTOS}. The outside, the main rooms, the kitchen and any damage are most useful. We shrink
                them on your phone first, so they upload quickly. You can also skip this and send photos later.
              </p>

              <ul className="mt-5 grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                {photos.map((p, i) => (
                  <li key={p.path} className="relative aspect-square overflow-hidden bg-paper">
                    {p.preview ? (
                      // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                      <img src={p.preview} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center p-2 text-center text-[0.8125rem] font-bold text-green-900">
                        Photo {i + 1} uploaded
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => removePhoto(p.path)}
                      className="absolute right-1 top-1 flex h-9 w-9 items-center justify-center bg-green-900 text-sand"
                    >
                      <span className="sr-only">Remove photo {i + 1}</span>
                      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                        <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="2.2" />
                      </svg>
                    </button>
                  </li>
                ))}
                {Array.from({ length: uploading }, (_, i) => (
                  <li key={`u${i}`} className="relative flex aspect-square items-center justify-center overflow-hidden bg-paper">
                    <span className="absolute inset-x-0 bottom-0 h-1 animate-pulse bg-terracotta" />
                    <span className="text-[0.8125rem] font-bold text-green-900">Uploading…</span>
                  </li>
                ))}
              </ul>

              {photos.length + uploading < MAX_PHOTOS && (
                <label className={`${buttonStyles.dark} mt-5 cursor-pointer has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-terracotta`}>
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path d="M4 7h3l2-2.5h6L17 7h3v12H4z" fill="currentColor" />
                    <circle cx="12" cy="12.5" r="3.5" fill="#16302A" />
                  </svg>
                  {photos.length ? "Add more photos" : "Choose photos"}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    onChange={(e) => {
                      addPhotos(e.target.files);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
              <p aria-live="polite" className="sr-only">
                {uploading ? `Uploading ${uploading} photo${uploading > 1 ? "s" : ""}` : `${photos.length} photos added`}
              </p>
              <ErrorText id="photo-err">{photoError || errors.photoPaths}</ErrorText>
            </div>
          )}

          {step === 5 && (
            <>
              <TextField
                label="Your full name"
                autoComplete="name"
                value={values.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                error={errors.fullName}
              />
              <TextField
                label="Phone number"
                hint="Nigerian numbers like 0803 123 4567 are fine. If you're abroad, start with your country code, e.g. +44."
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                error={errors.phone}
              />
              <div>
                <label className="flex min-h-11 cursor-pointer items-center gap-3 font-bold text-green-900">
                  <input
                    type="checkbox"
                    checked={values.whatsappSame}
                    onChange={(e) => set("whatsappSame", e.target.checked)}
                    className="h-5 w-5 accent-green-900"
                  />
                  My WhatsApp number is the same
                </label>
                {!values.whatsappSame && (
                  <TextField
                    className="mt-3"
                    label="WhatsApp number"
                    type="tel"
                    inputMode="tel"
                    value={values.whatsapp}
                    onChange={(e) => set("whatsapp", e.target.value)}
                    error={errors.whatsapp}
                  />
                )}
              </div>
              <TextField
                label="Email"
                optional
                type="email"
                autoComplete="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                error={errors.email}
              />
              <TextField
                label="Which country do you live in?"
                list="countries"
                autoComplete="country-name"
                value={values.country}
                onChange={(e) => set("country", e.target.value)}
                error={errors.country}
              />
              <datalist id="countries">
                {countries.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <ChoiceGroup
                legend="How should we contact you?"
                type="radio"
                name="contactPref"
                options={options.contactPref}
                value={values.contactPref}
                onChange={(v) => set("contactPref", v)}
                error={errors.contactPref}
                columns={3}
              />
              <div>
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={values.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    aria-invalid={errors.consent ? true : undefined}
                    aria-describedby={errors.consent ? "consent-err" : undefined}
                    className="mt-1 h-5 w-5 shrink-0 accent-green-900"
                  />
                  <span>
                    I agree that Pasturelands can use these details to assess my home and contact me, as described in
                    the{" "}
                    <Link href="/privacy" target="_blank" className="font-bold text-terracotta underline underline-offset-4">
                      privacy notice
                    </Link>
                    .
                  </span>
                </label>
                <ErrorText id="consent-err">{errors.consent}</ErrorText>
              </div>
            </>
          )}
        </div>

        {formMessage && (
          <div role="alert" className="mt-8 border-l-4 border-terracotta bg-paper px-4 py-3 font-bold text-green-900">
            {formMessage}
          </div>
        )}

        <div className="mt-10 flex flex-col-reverse gap-3 border-t-2 border-green-900 pt-6 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button type="button" onClick={back} className="min-h-12 px-2 font-bold text-green-900 underline underline-offset-4">
              Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={pending || uploading > 0}
            className={`${buttonStyles.primary} w-full px-8 disabled:cursor-wait disabled:opacity-70 sm:w-auto`}
          >
            {pending
              ? "Sending…"
              : uploading > 0
                ? "Waiting for photos…"
                : isLast
                  ? "Send my details"
                  : step === 4 && photos.length === 0
                    ? "Skip photos"
                    : "Continue"}
            {!pending && !uploading && <Arrow />}
          </button>
        </div>
        <p className="mt-4 text-[0.9375rem]">Your answers are saved on this device as you go.</p>
      </form>
    </div>
  );
}

function Confirmation({
  refCode,
  values,
  headingRef,
}: {
  refCode: string;
  values: LeadInput;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  const first = values.fullName.trim().split(/\s+/)[0] || "";
  const channel = labelFor(options.contactPref, values.contactPref).toLowerCase();
  const via = values.contactPref === "phone" ? "by phone" : `on ${channel === "email" ? "email" : "WhatsApp"}`;
  const hasRef = refCode !== "received";
  const message = hasRef
    ? `Hello Pasturelands, I've just sent my property details. My reference is ${refCode}.`
    : "Hello Pasturelands, I've just sent my property details.";

  const next = [
    {
      when: "Within 2 working days",
      what: `We contact you ${via} to talk through your home and your documents. (Working days, West Africa Time.)`,
    },
    { when: "Next", what: "We visit the home and our lawyer starts the title checks." },
    { when: "Then", what: "You get a written cash offer. You decide whether to accept. There's no obligation." },
  ];

  return (
    <div className="animate-rise">
      <p className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-terracotta">Received</p>
      <h2 ref={headingRef} tabIndex={-1} className="mt-3 text-[2.25rem] focus:outline-none sm:text-[3rem]">
        Thank you{first ? `, ${first}` : ""}. We have your details.
      </h2>
      {hasRef && (
        <div className="mt-8 inline-flex flex-col border-2 border-green-900 bg-paper px-6 py-4">
          <span className="text-[0.9375rem]">Your reference</span>
          <span className="font-serif text-[2.25rem] leading-tight text-green-900">{refCode}</span>
        </div>
      )}

      <h3 className="mt-10 font-sans text-[1.125rem] font-bold text-green-900">What happens next</h3>
      <ol className="mt-4 border-t-2 border-green-900">
        {next.map((n, i) => (
          <li key={n.when} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-line py-5">
            <span className="font-serif text-[1.75rem] leading-none text-terracotta" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <p className="font-bold text-green-900">{n.when}</p>
              <p className="mt-1">{n.what}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={whatsappLink(message)} className={buttonStyles.dark} target="_blank" rel="noopener">
          <WhatsAppIcon /> Message us on WhatsApp
        </a>
        <Link href="/" className={`${buttonStyles.light} border-2 border-green-900`}>
          Back to the home page
        </Link>
      </div>
      <p className="mt-4 text-[0.9375rem]">
        {site.replyPromise} If you have documents or more photos, you can send them on WhatsApp{hasRef ? " with your reference" : ""}.
      </p>
    </div>
  );
}
