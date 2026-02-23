const outlets = [
  "De Telegraaf", "NRC Handelsblad", "Volkskrant", "AD", "Trouw",
  "RTL Nieuws", "NOS", "BNR Nieuwsradio", "Het Financieele Dagblad",
  "Elsevier Weekblad", "Metro", "Reformatorisch Dagblad", "Dagblad van het Noorden",
];

// Duplicate for seamless loop
const items = [...outlets, ...outlets];

const PressBar = () => (
  <section className="bg-foreground overflow-hidden py-3 select-none" aria-label="Bekend van">
    <p className="text-center text-[10px] uppercase tracking-[0.25em] text-muted-foreground/60 mb-2.5 font-medium">
      Bekend van
    </p>
    <div className="relative">
      <div className="flex items-center gap-14 animate-marquee whitespace-nowrap">
        {items.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="text-sm font-serif font-semibold text-muted-foreground/40 tracking-wide uppercase shrink-0"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default PressBar;
