import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  if (project === "schutting") {
    if (budget === "premium") {
      return { lines: ["Premium"], category: "schuttingen", reason: "De Premium schuttingplank heeft een realistisch 3D houtnerf patroon en is dubbelzijdig afgewerkt." };
    }
    return { lines: ["Classic"], category: "schuttingen", reason: "De Classic schuttingplank biedt een geborsteld oppervlak tegen een scherpe prijs. Dubbelzijdig afgewerkt." };
  }

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

  if (look === "modern") {
    return { lines: ["Komorowa", "MAX"], category: "vlonderplanken", reason: "Komorowa biedt co-extrusie bescherming. MAX is extra breed (185mm) voor een strak, modern terras." };
  }
  if (look === "warm") {
    return { lines: ["Komorowa", "Classic"], category: "vlonderplanken", reason: "Komorowa is licht en voordelig met dubbelzijdig profiel. Classic is massief met een warme geborstelde afwerking." };
  }
  return { lines: ["Komorowa", "MAX"], category: "vlonderplanken", reason: "Komorowa is de populairste keuze: co-extrusie beschermd, dubbelzijdig en verkrijgbaar in 5 kleuren." };
}

/* ── Component ───────────────────────────────── */

const AdvisorQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (stepId: string, value: string) => {
    const newAnswers = { ...answers, [stepId]: value };
    setAnswers(newAnswers);

    if (stepId === "project" && value === "schutting") {
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
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div
          className="bg-accent h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!showResult ? (
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

          <div className="text-center">
            <Button variant="ghost" onClick={reset} className="text-muted-foreground">
              <RotateCcw className="w-4 h-4 mr-1" /> Opnieuw beginnen
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorQuiz;
