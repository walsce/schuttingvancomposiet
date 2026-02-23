import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background/80 safe-bottom">
    <div className="container py-10 sm:py-16 px-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        <div className="col-span-2 sm:col-span-2 md:col-span-1">
          <span className="font-serif text-lg sm:text-xl font-bold text-background tracking-tight">
            Schuttingvan<span className="text-accent">Composiet</span>.nl
          </span>
          <p className="mt-3 sm:mt-4 text-sm leading-relaxed text-background/60">
            Dé specialist in composiet schuttingen, gevelbekleding en tuinafscheidingen. Premium kwaliteit tegen eerlijke prijzen.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-background mb-3 sm:mb-4 text-sm sm:text-base">Assortiment</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-sm">
            <li><Link to="/categorie/gevelbekleding" className="hover:text-background transition-colors">Gevelbekleding</Link></li>
            <li><Link to="/categorie/schuttingen" className="hover:text-background transition-colors">Schuttingen</Link></li>
            <li><Link to="/categorie/vlonderplanken" className="hover:text-background transition-colors">Vlonderplanken</Link></li>
            <li><Link to="/assortiment" className="hover:text-background transition-colors">Alle producten</Link></li>
            <li><Link to="/vergelijken" className="hover:text-background transition-colors">Vergelijken</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-background mb-3 sm:mb-4 text-sm sm:text-base">Informatie</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-sm">
            <li><Link to="/blog" className="hover:text-background transition-colors">Artikelen</Link></li>
            <li><Link to="/downloads" className="hover:text-background transition-colors">Gratis gidsen</Link></li>
            <li><Link to="/contact" className="hover:text-background transition-colors">Contact & Offerte</Link></li>
            <li><span className="cursor-default">Verzending & Levering</span></li>
            <li><span className="cursor-default">Retourbeleid</span></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <h4 className="font-serif font-semibold text-background mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-sm">
            <li>info@schuttingvancomposiet.nl</li>
            <li>Ma - Vr: 08:00 - 17:00</li>
            <li>Nederland & België</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-background/40">
        © {new Date().getFullYear()} Schuttingvancomposiet.nl — Alle rechten voorbehouden
      </div>
    </div>
  </footer>
);

export default Footer;
