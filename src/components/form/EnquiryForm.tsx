"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { submitEnquiry } from "@/app/_actions/enquiry";
import { amountRanges, cities, interests, type EnquiryErrors, type EnquiryInput, type EnquiryKind } from "@/lib/enquiry";
import { Arrow, buttonStyles } from "../ui";
import { ChoiceGroup, ErrorText, Honeypot, SelectField, TextArea, TextField } from "./fields";

type Props = {
  kind: EnquiryKind;
  listingId?: string;
  listingTitle?: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
};

const empty = (kind: EnquiryKind): EnquiryInput => ({
  kind,
  fullName: "",
  phone: "",
  email: "",
  country: kind === "investor" ? "" : "Nigeria",
  amountRange: "",
  interest: kind === "waitlist" ? "buy" : "",
  city: kind === "waitlist" ? "either" : "",
  message: "",
  consent: false,
});

/**
 * One form for buyer, investor and waitlist enquiries. Which fields show
 * depends on `kind`; the Server Action validates with the same schema.
 */
export function EnquiryForm({ kind, listingId, listingTitle, submitLabel, successTitle, successBody }: Props) {
  const [v, setV] = useState<EnquiryInput>(() => ({ ...empty(kind), listingId, listingTitle }));
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [done, setDone] = useState(false);
  const [pending, start] = useTransition();
  const startedAt = useRef(0);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  function set<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setV((s) => ({ ...s, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    start(async () => {
      try {
        const res = await submitEnquiry({ ...v, website: honeypot, startedAt: startedAt.current });
        if (res.ok) {
          setDone(true);
          return;
        }
        setErrors(res.errors ?? {});
        setMessage(res.message ?? "Something went wrong. Please try again.");
        requestAnimationFrame(() => {
          document.querySelector<HTMLElement>('form [aria-invalid="true"], form [data-invalid] input')?.focus();
        });
      } catch {
        setMessage("Your connection seems to have dropped. Check your signal and try again.");
      }
    });
  }

  if (done) {
    return (
      <div className="animate-rise" role="status">
        <p className="text-[0.8125rem] font-bold uppercase tracking-[0.16em] text-terracotta">Sent</p>
        <h3 ref={doneRef} tabIndex={-1} className="mt-2 font-serif text-[2rem] leading-tight focus:outline-none">
          {successTitle}
        </h3>
        <p className="mt-3">{successBody}</p>
      </div>
    );
  }

  const isWaitlist = kind === "waitlist";
  const isInvestor = kind === "investor";

  return (
    <form noValidate onSubmit={submit} className="@container relative space-y-6">
      <Honeypot value={honeypot} onChange={setHoneypot} />

      {isWaitlist && (
        <div className="space-y-6">
          <ChoiceGroup
            legend="Looking to"
            type="radio"
            name="interest"
            options={interests}
            value={v.interest ?? ""}
            onChange={(x) => set("interest", x)}
            columns={3}
          />
          <ChoiceGroup
            legend="In"
            type="radio"
            name="city"
            options={cities}
            value={v.city ?? ""}
            onChange={(x) => set("city", x)}
            columns={3}
          />
        </div>
      )}

      <TextField
        label="Your name"
        optional={isWaitlist}
        autoComplete="name"
        value={v.fullName}
        onChange={(e) => set("fullName", e.target.value)}
        error={errors.fullName}
      />
      <div className="grid gap-6 @lg:grid-cols-2">
        <TextField
          label={isWaitlist ? "WhatsApp number" : "Phone or WhatsApp"}
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={v.phone}
          onChange={(e) => set("phone", e.target.value)}
          error={errors.phone}
        />
        <TextField
          label="Email"
          type="email"
          autoComplete="email"
          value={v.email}
          onChange={(e) => set("email", e.target.value)}
          error={errors.email}
        />
      </div>
      {!isWaitlist && (
        <p className="-mt-3 text-[0.9375rem]">Give us at least one of these. Include your country code if you&apos;re outside Nigeria.</p>
      )}
      {!isWaitlist && (
        <TextField
          label="Country you live in"
          optional={!isInvestor}
          autoComplete="country-name"
          value={v.country}
          onChange={(e) => set("country", e.target.value)}
          error={errors.country}
        />
      )}
      {isInvestor && (
        <SelectField
          label="Roughly how much are you considering?"
          optional
          options={amountRanges}
          placeholder="Prefer not to say"
          value={v.amountRange}
          onChange={(e) => set("amountRange", e.target.value)}
        />
      )}
      {!isWaitlist && (
        <TextArea
          label={isInvestor ? "Anything you'd like us to know" : "Your question"}
          optional={isInvestor}
          value={v.message}
          onChange={(e) => set("message", e.target.value)}
          error={errors.message}
          placeholder={kind === "buyer" ? "For example: can I view it next week? Is the price negotiable?" : undefined}
          maxLength={2000}
        />
      )}

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={v.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? `consent-err-${kind}` : undefined}
            className="mt-1 h-5 w-5 shrink-0 accent-green-900"
          />
          <span className="text-[0.9375rem]">
            I agree that Pasturelands can use these details to reply to me, as described in the{" "}
            <Link href="/privacy" className="font-bold text-terracotta underline underline-offset-4">
              privacy notice
            </Link>
            .
          </span>
        </label>
        <ErrorText id={`consent-err-${kind}`}>{errors.consent}</ErrorText>
      </div>

      {message && (
        <div role="alert" className="border-l-4 border-terracotta bg-white px-4 py-3 font-bold text-green-900">
          {message}
        </div>
      )}

      <button type="submit" disabled={pending} className={`${buttonStyles.primary} w-full disabled:opacity-70 sm:w-auto`}>
        {pending ? "Sending…" : submitLabel}
        {!pending && <Arrow />}
      </button>
    </form>
  );
}
