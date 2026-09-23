import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./ui";

/** Fixed, quiet WhatsApp shortcut. No bounce, no badge. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Hello Pasturelands, I'd like to talk about selling my home.")}
      className="on-dark fixed bottom-4 right-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full bg-green-900 py-3 pl-4 pr-5 text-[0.9375rem] font-bold text-sand shadow-[0_6px_20px_-6px_rgba(22,48,42,0.55)] transition-colors hover:bg-green-700 sm:bottom-6 sm:right-6"
      target="_blank"
      rel="noopener"
    >
      <WhatsAppIcon />
      <span>WhatsApp<span className="sr-only"> Pasturelands (opens in a new tab)</span></span>
    </a>
  );
}
