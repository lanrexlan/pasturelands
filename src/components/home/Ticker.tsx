const items = [
  "No agency fee",
  "Title checked before we pay",
  "Paid within weeks",
  "Abuja",
  "Lagos",
  "Sell from abroad",
  "No obligation offer",
];

/** Slow scrolling band of plain facts. Decorative: the same facts appear in the page text. */
export function Ticker() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="px-6 font-serif text-[1.375rem] text-sand sm:text-[1.625rem]">{t}</span>
          <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0" aria-hidden="true">
            <rect x="2" y="2" width="8" height="8" transform="rotate(45 6 6)" fill="#E3B04B" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden border-y-4 border-green-900 bg-green-900 py-4" aria-hidden="true">
      <div className="ticker flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
