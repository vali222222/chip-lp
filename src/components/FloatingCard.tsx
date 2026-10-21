import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Users } from "lucide-react";
import VerificationModal from "./VerificationModal";

const FloatingCard = () => {
  const [activeViewers, setActiveViewers] = useState(65);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newValue = prev + change;
        return Math.max(35, Math.min(65, newValue));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { number: 1, text: "Click The Button Below", highlight: null },
    { number: 2, text: "Enter your basic informations", highlight: null },
    { number: 3, text: "Complete", highlight: "1 Deal", textAfter: "3-4 deals(takes 15 mins)" },
    { number: 4, text: "Receive Your Reward", highlight: null },
  ];

  return (
    <div className="animate-float">
      <div className="bg-gradient-card rounded-3xl shadow-giftcard p-5 sm:p-8 mx-2 sm:mx-4 relative overflow-hidden border border-secondary">
        
        {/* Chipotle Logo */}
        <div className="text-center mb-4 animate-fade-in-up relative z-10">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="text-2xl animate-spark-pulse">🌶️</span>
            <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Chipotle
            </h1>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in-up-delay-1">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
        </div>

        {/* Promo message */}
        <div className="text-center mb-4 animate-fade-in-up-delay-1">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Exclusive Chipotle Discount — Limited Time Only
          </p>
        </div>

        {/* Discount Preview */}
        <div className="relative mb-5 animate-fade-in-up-delay-1">
          <div className="bg-gradient-walmart rounded-xl p-4 sm:p-5 relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-white/80 text-[10px] sm:text-xs font-medium uppercase tracking-wide mb-1">
                  Exclusive Reward
                </p>
                <p className="font-display text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg">
                  $250
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm text-3xl">
                🌯
              </div>
            </div>
            
            {/* Card footer */}
            <div className="mt-3 pt-3 border-t border-white/20 relative z-10">
              <p className="text-white/70 text-[10px] sm:text-xs">
                Valid on all Chipotle orders — Burritos, Bowls & more
              </p>
            </div>
          </div>
        </div>

        {/* Elegant divider */}
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in-up-delay-2">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1" />
        </div>

        {/* Steps card */}
        <div className="bg-secondary/60 rounded-xl p-3 sm:p-4 mb-5 animate-fade-in-up-delay-2 relative z-10 border border-secondary">
          <div className="space-y-2.5">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="flex items-center gap-2.5"
                style={{ animationDelay: `${0.3 + index * 0.1}s` }}
              >
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary flex items-center justify-center shadow-badge flex-shrink-0">
                  <span className="text-primary-foreground font-semibold text-[10px] sm:text-xs">
                    {step.number}
                  </span>
                </div>
                <p className="text-foreground font-semibold text-xs sm:text-[13px] leading-tight">
                  {step.text}
                  {step.highlight && (
                    <>
                      {" "}<span className="text-primary font-bold">{step.highlight}</span>{" "}
                      {step.textAfter}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-3 mb-5 animate-fade-in-up-delay-3">
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Verified</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Secure</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-border" />
          <div className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] sm:text-xs font-medium text-muted-foreground">Official</span>
          </div>
        </div>

        {/* FOMO indicator */}
        <div className="flex items-center justify-center gap-1.5 mb-3 animate-fade-in-up-delay-4">
          <div className="flex items-center gap-1 bg-primary/10 px-2.5 py-1 rounded-full">
            <Users className="w-3 h-3 text-primary" />
            <span className="text-[10px] sm:text-xs font-semibold text-primary">
              {activeViewers} people
            </span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">
              viewing now
            </span>
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={() => setModalOpen(true)}
          className="w-full bg-accent text-accent-foreground py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-button hover:opacity-90 transition-all duration-300 animate-pulse-glow animate-fade-in-up-delay-4 relative z-10 group whitespace-nowrap"
        >
          <span className="uppercase tracking-wide font-bold">🌶️ Start Now!</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </button>

        <VerificationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

        {/* Footer text */}
        <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-4 animate-fade-in-up-delay-4">
          Limited time promotion • Terms apply
        </p>
        
        {/* Disclaimer */}
        <p className="text-center text-[8px] sm:text-[10px] text-muted-foreground/60 mt-3">
          This promotion is not sponsored, endorsed, or affiliated with Chipotle Mexican Grill, Inc.
        </p>
      </div>
    </div>
  );
};

export default FloatingCard;
