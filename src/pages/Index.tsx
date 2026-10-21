import FloatingCard from "@/components/FloatingCard";
import FAQSection from "@/components/FAQSection";
import TrustpilotBadge from "@/components/TrustpilotBadge";
import WinnerNotification from "@/components/WinnerNotification";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-main flex flex-col items-center py-4 sm:py-12 px-2 sm:px-4 relative overflow-hidden">
      <WinnerNotification />

      {/* Gradient orbs background - desktop only */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-2xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/30 rounded-full blur-2xl" />
      </div>

      {/* Main content */}
      <div className="w-full max-w-md relative z-10 mt-0 sm:mt-4">
        <FloatingCard />
      </div>

      <TrustpilotBadge />
      <FAQSection />

      {/* Bottom branding */}
      <div className="text-center mt-8 mb-4">
        <p className="text-sm font-medium text-muted-foreground mb-2">
          Order More. Save More.
        </p>
        <p className="text-xs text-muted-foreground/60">
          © 2025 Chipotle Discount Promo • All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Index;