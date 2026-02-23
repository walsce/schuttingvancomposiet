const outlets = [
  "De Telegraaf", "NRC Handelsblad", "Volkskrant", "AD", "Trouw",
  "RTL Nieuws", "NOS", "BNR Nieuwsradio", "Het Financieele Dagblad",
  "Elsevier Weekblad", "Metro", "Reformatorisch Dagblad", "Dagblad van het Noorden",
];

const items = [...outlets, ...outlets];

const PressBar = () => (
  <div className="bg-secondary border-b border-border overflow-hidden py-2 select-none sticky top-14 sm:top-16 z-40" aria-label="Bekend van">
    <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-1.5 font-medium">
      Bekend van
    </p>
    <div className="relative">
      <div className="flex items-center gap-14 animate-marquee whitespace-nowrap">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-sm font-serif font-semibold text-foreground/50 tracking-wide uppercase shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default PressBar;
