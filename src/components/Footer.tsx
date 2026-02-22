import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-foreground text-background/80">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <span className="font-serif text-xl font-bold text-background tracking-tight">
            Composiet<span className="text-accent">winkel</span>.nl
          </span>
          <p className="mt-4 text-sm leading-relaxed text-background/60">
            Dé specialist in composiet producten voor tuin en gevel. Premium kwaliteit tegen eerlijke prijzen.
          </p>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-background mb-4">Assortiment</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/categorie/gevelbekleding" className="hover:text-background transition-colors">Gevelbekleding</Link></li>
            <li><Link to="/categorie/schuttingen" className="hover:text-background transition-colors">Schuttingen</Link></li>
            <li><Link to="/categorie/vlonderplanken" className="hover:text-background transition-colors">Vlonderplanken</Link></li>
            <li><Link to="/assortiment" className="hover:text-background transition-colors">Alle producten</Link></li>
            <li><Link to="/vergelijken" className="hover:text-background transition-colors">Vergelijken</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-background mb-4">Informatie</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/blog" className="hover:text-background transition-colors">Blog & Advies</Link></li>
            <li><Link to="/contact" className="hover:text-background transition-colors">Contact & Offerte</Link></li>
            <li><span className="cursor-default">Verzending & Levering</span></li>
            <li><span className="cursor-default">Retourbeleid</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-semibold text-background mb-4">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>info@composietwinkel.nl</li>
            <li>Ma - Vr: 08:00 - 17:00</li>
            <li>Nederland & België</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/40">
        © {new Date().getFullYear()} Composietwinkel.nl — Alle rechten voorbehouden
      </div>
    </div>
  </footer>
);

export default Footer;
