import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQSection from "@/components/FAQSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { useState, useMemo } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

/* ── Quiz data ─────────────────────────────────── */

interface QuizOption {
  label: string;
  value: string;
  icon: string;
}

interface QuizStep {
  id: string;
  question: string;
  options: QuizOption[];
}

const steps: QuizStep[] = [
  {
    id: "project",
    question: "Wat wil je aanleggen?",
    options: [
      { label: "Een terras of vlonder", value: "vlonder", icon: "🪵" },
      { label: "Een schutting of tuinscherm", value: "schutting", icon: "🏡" },
      { label: "Ik weet het nog niet", value: "onzeker", icon: "🤔" },
    ],
  },
  {
    id: "budget",
    question: "Wat is je budget-voorkeur?",
    options: [
      { label: "Zo voordelig mogelijk", value: "budget", icon: "💰" },
      { label: "Goede prijs-kwaliteit", value: "mid", icon: "⚖️" },
      { label: "Het allerbeste, prijs speelt geen rol", value: "premium", icon: "✨" },
    ],
  },
  {
    id: "look",
    question: "Welke uitstraling spreekt je aan?",
    options: [
      { label: "Modern & strak", value: "modern", icon: "🔲" },
      { label: "Warm & natuurlijk hout", value: "warm", icon: "🌳" },
      { label: "Geen voorkeur", value: "any", icon: "🎨" },
    ],
  },
  {
    id: "use",
    question: "Hoe wordt het gebruikt?",
    options: [
      { label: "Normaal gebruik (gezin)", value: "normaal", icon: "👨‍👩‍👧‍👦" },
      { label: "Intensief (horeca / zwembad)", value: "intensief", icon: "🏊" },
      { label: "Puur decoratief", value: "decoratief", icon: "🌺" },
    ],
  },
];

/* ── Recommendation engine ─────────────────────── */

interface Recommendation {
  lines: string[];
  category: string;
  reason: string;
}

function getRecommendation(answers: Record<string, string>): Recommendation {
  const { project, budget, look, use } = answers;

  // Schutting path
  if (project === "schutting") {
    if (budget === "premium") {
      return { lines: ["Premium"], category: "schuttingen", reason: "De Premium schuttingplank heeft een realistisch 3D houtnerf patroon en is dubbelzijdig afgewerkt." };
    }
    return { lines: ["Classic"], category: "schuttingen", reason: "De Classic schuttingplank biedt een geborsteld oppervlak tegen een scherpe prijs. Dubbelzijdig afgewerkt." };
  }

  // Vlonder path
  if (budget === "budget") {
    return { lines: ["Slim", "Eco"], category: "vlonderplanken", reason: "Slim is het meest betaalbare instapmodel. Eco biedt iets meer kleurkeuze en is maximaal duurzaam geproduceerd." };
  }

  if (budget === "premium") {
    if (use === "intensief") {
      return { lines: ["Elegance"], category: "vlonderplanken", reason: "Elegance is het topmodel met RENOLIT folie en korund antislip — ideaal voor zwembaden en horeca." };
    }
    if (look === "warm") {
      return { lines: ["Premium", "Elegance"], category: "vlonderplanken", reason: "Premium biedt een realistisch houtnerf patroon. Elegance met RENOLIT folie geeft de meest natuurlijke eiken-look." };
    }
    return { lines: ["Premium", "Classic"], category: "vlonderplanken", reason: "Beide zijn massief en extreem duurzaam. Premium heeft houtnerf, Classic een strak geborsteld oppervlak." };
  }

  // Mid budget
  if (look === "modern") {
    return { lines: ["Komorowa", "MAX"], category: "vlonderplanken", reason: "Komorowa biedt co-extrusie bescherming. MAX is extra breed (185mm) voor een strak, modern terras." };
  }
  if (look === "warm") {
    return { lines: ["Komorowa", "Classic"], category: "vlonderplanken", reason: "Komorowa is licht en voordelig met dubbelzijdig profiel. Classic is massief met een warme geborstelde afwerking." };
  }
  return { lines: ["Komorowa", "MAX"], category: "vlonderplanken", reason: "Komorowa is de populairste keuze: co-extrusie beschermd, dubbelzijdig en verkrijgbaar in 5 kleuren." };
}

/* ── FAQ ──────────────────────────────────────── */

const faqs = [
  { q: "Hoe weet ik welke composiet lijn bij mij past?", a: "Gebruik onze keuzehulp hierboven. Op basis van uw project, budget en stijlvoorkeur adviseren wij de beste productlijn." },
  { q: "Kan ik composiet zelf monteren?", a: "Ja! Alle producten worden geleverd met montage-instructies. Met standaard gereedschap kunt u alles zelf installeren." },
  { q: "Wat is het verschil tussen hol en massief?", a: "Holle planken (Komorowa, Eco, Slim) zijn lichter en voordeliger. Massieve planken (Classic, Premium, MAX) zijn sterker en zwaarder, ideaal voor intensief gebruik." },
  { q: "Kan ik een gratis offerte aanvragen?", a: "Absoluut! Neem contact met ons op via de contactpagina of gebruik de TerrasDesigner of SchuttingPlanner om een materiaallijst te genereren." },
];

/* ── Component ───────────────────────────────── */

const ProductAdvisorPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (stepId: string, value: string) => {
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);

    // Skip irrelevant steps
    if (stepId === "project" && value === "schutting") {
      // Skip "use" for schutting (not relevant)
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } else if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResult(false);
  };

  const canShowResult = Object.keys(answers).length >= 2;

  const recommendation = useMemo(() => {
    if (!canShowResult) return null;
    return getRecommendation(answers);
  }, [answers, canShowResult]);

  const recommendedProducts = useMemo(() => {
    if (!recommendation) return [];
    return products.filter(
      (p) =>
        p.category === recommendation.category &&
        recommendation.lines.some((line) =>
          p.name.toLowerCase().includes(line.toLowerCase())
        )
    );
  }, [recommendation]);

  const step = steps[currentStep];
  const progress = showResult ? 100 : ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Productadvies | Welk composiet past bij jou? | Schuttingvancomposiet.nl"
        description="Beantwoord 4 simpele vragen en ontvang persoonlijk productadvies voor jouw composiet terras of schutting. Gratis keuzehulp."
        canonical="/productadvies"
      />
      <Header />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Productadvies" },
        ]}
      />

      <main>
        <section className="container py-8 sm:py-12 md:py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <span className="text-accent text-sm font-medium uppercase tracking-wider">
                Keuzehulp
              </span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mt-2">
                Welk composiet past bij jou?
              </h1>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                Beantwoord een paar vragen en ontvang direct een persoonlijk productadvies.
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-muted rounded-full h-2 mb-8">
              <div
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            {!showResult ? (
              /* ── Quiz step ── */
              <div className="space-y-6">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground text-center">
                  {step.question}
                </h2>
                <div className="grid gap-3 sm:gap-4">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(step.id, opt.value)}
                      className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-xl border-2 text-left transition-all ${
                        answers[step.id] === opt.value
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                      }`}
                    >
                      <span className="text-2xl">{opt.icon}</span>
                      <span className="font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="text-muted-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Vorige
                  </Button>
                  {canShowResult && !showResult && (
                    <Button
                      onClick={() => setShowResult(true)}
                      className="bg-accent text-accent-foreground hover:bg-accent/90"
                    >
                      Bekijk advies <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              /* ── Result ── */
              <div className="space-y-8">
                <div className="rounded-2xl border-2 border-accent/30 bg-accent/5 p-6 sm:p-8 text-center">
                  <CheckCircle2 className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                    Ons advies: {recommendation?.lines.join(" & ")}
                  </h2>
                  <p className="text-muted-foreground mt-3 leading-relaxed max-w-lg mx-auto">
                    {recommendation?.reason}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to={`/categorie/${recommendation?.category}`}>
                        Bekijk producten <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/contact">Gratis offerte aanvragen</Link>
                    </Button>
                  </div>
                </div>

                {/* Recommended products */}
                {recommendedProducts.length > 0 && (
                  <div>
                    <h3 className="font-serif text-lg font-bold text-foreground mb-4">
                      Aanbevolen producten
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {recommendedProducts.slice(0, 6).map((p) => (
                        <ProductCard key={p.id} product={p} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Restart */}
                <div className="text-center">
                  <Button variant="ghost" onClick={reset} className="text-muted-foreground">
                    <RotateCcw className="w-4 h-4 mr-1" /> Opnieuw beginnen
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Category cards */}
        <section className="bg-secondary/50">
          <div className="container py-12 sm:py-16 px-4 sm:px-6">
            <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-8">
              Of bekijk direct per categorie
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categorie/${cat.slug}`}
                  className="group rounded-xl overflow-hidden border border-border bg-card hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif font-bold text-background">{cat.name}</h3>
                      <p className="text-xs text-background/70 mt-0.5">{cat.productCount} producten</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FAQSection faqs={faqs} />
      </main>

      <Footer />
    </div>
  );
};

export default ProductAdvisorPage;
