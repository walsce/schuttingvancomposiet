export const IdealLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="8" fill="#CC0066" />
    <path d="M12 14h8c6.627 0 12 5.373 12 12s-5.373 12-12 12h-8V14z" fill="#fff" />
    <circle cx="20" cy="26" r="6" fill="#CC0066" />
    <rect x="14" y="20" width="4" height="12" rx="1" fill="#CC0066" />
    <path d="M28 18h6v4h-6zM28 24h6v4h-6zM28 30h6v4h-6z" fill="#fff" />
  </svg>
);

export const VisaLogo = ({ className = "w-8 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg">
    <rect width="780" height="500" rx="40" fill="#1A1F71" />
    <path d="M293.2 348.7l33.4-195.8h53.4l-33.4 195.8h-53.4zm224.8-191c-10.6-4-27.2-8.3-47.9-8.3-52.8 0-90 26.5-90.2 64.5-.3 28.1 26.5 43.7 46.8 53.1 20.8 9.6 27.8 15.7 27.7 24.3-.1 13.1-16.6 19.1-32 19.1-21.4 0-32.7-3-50.3-10.2l-6.9-3.1-7.5 43.8c12.5 5.5 35.6 10.2 59.6 10.5 56.2 0 92.7-26.2 93.1-66.8.2-22.3-14.1-39.2-45-53.1-18.7-9-30.2-15.1-30.1-24.3 0-8.1 9.7-16.8 30.7-16.8 17.5-.3 30.2 3.5 40.1 7.5l4.8 2.3 7.3-42.5h-.2zm138.1-4.8h-41.3c-12.8 0-22.4 3.5-28 16.2l-79.4 179.6h56.2l11.2-29.3h68.6l6.5 29.3h49.6l-43.3-195.8h-.1zm-65.8 126.2c4.4-11.3 21.5-54.7 21.5-54.7-.3.5 4.4-11.4 7.1-18.8l3.6 17s10.3 47.2 12.5 57.1h-44.7v-.6zM248.7 152.9l-52.3 133.5-5.6-27.1c-9.7-31.2-39.9-65-73.7-81.9l47.9 171.2h56.6l84.2-195.8h-57.1v.1z" fill="#fff" />
    <path d="M131.9 152.9H46.6l-.7 3.8c67.2 16.2 111.7 55.4 130.1 102.5l-18.8-90.1c-3.2-12.3-12.6-15.7-25.3-16.2z" fill="#F9A533" />
  </svg>
);

export const MastercardLogo = ({ className = "w-8 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 780 500" xmlns="http://www.w3.org/2000/svg">
    <rect width="780" height="500" rx="40" fill="#fff" />
    <circle cx="312" cy="250" r="170" fill="#EB001B" />
    <circle cx="468" cy="250" r="170" fill="#F79E1B" />
    <path d="M390 113.4c-46.2 36.4-75.8 93.1-75.8 156.6s29.6 120.2 75.8 156.6c46.2-36.4 75.8-93.1 75.8-156.6s-29.6-120.2-75.8-156.6z" fill="#FF5F00" />
  </svg>
);

export const CreditCardIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <VisaLogo className="h-5 w-auto" />
    <MastercardLogo className="h-5 w-auto" />
  </div>
);

// Bank logos as simplified SVGs
const BankLogo = ({ name, bgColor, textColor = "#fff", short }: { name: string; bgColor: string; textColor?: string; short: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ backgroundColor: bgColor }}>
      <span className="text-[8px] font-bold leading-none" style={{ color: textColor }}>{short}</span>
    </div>
    <span className="text-sm">{name}</span>
  </div>
);

export const ABNAmroLogo = () => <BankLogo name="ABN AMRO" bgColor="#004D40" short="ABN" />;
export const ASNBankLogo = () => <BankLogo name="ASN Bank" bgColor="#00A651" short="ASN" />;
export const BunqLogo = () => <BankLogo name="Bunq" bgColor="#30C381" textColor="#fff" short="bunq" />;
export const INGLogo = () => <BankLogo name="ING" bgColor="#FF6200" short="ING" />;
export const KnabLogo = () => <BankLogo name="Knab" bgColor="#6C2D82" short="Knab" />;
export const RabobankLogo = () => <BankLogo name="Rabobank" bgColor="#003082" short="Rabo" />;
export const RegioBankLogo = () => <BankLogo name="RegioBank" bgColor="#FFD200" textColor="#333" short="RB" />;
export const SNSLogo = () => <BankLogo name="SNS" bgColor="#003E7E" short="SNS" />;
export const TriodosLogo = () => <BankLogo name="Triodos Bank" bgColor="#5E9643" short="Tri" />;
export const VanLanschotLogo = () => <BankLogo name="Van Lanschot" bgColor="#1D2C5E" short="VL" />;

export const bankLogos: Record<string, React.FC> = {
  "ABN AMRO": ABNAmroLogo,
  "ASN Bank": ASNBankLogo,
  "Bunq": BunqLogo,
  "ING": INGLogo,
  "Knab": KnabLogo,
  "Rabobank": RabobankLogo,
  "RegioBank": RegioBankLogo,
  "SNS": SNSLogo,
  "Triodos Bank": TriodosLogo,
  "Van Lanschot": VanLanschotLogo,
};
