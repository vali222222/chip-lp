import { Star } from "lucide-react";

const TrustpilotBadge = () => {
  return (
    <div className="w-full max-w-md mx-auto px-4 mt-6 animate-fade-in-up-delay-3">
      <div className="bg-card/80 backdrop-blur-sm rounded-2xl shadow-float p-4 flex items-center justify-center gap-3 overflow-hidden relative border border-secondary">
        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer opacity-30" />
        
        <div className="relative z-10 flex items-center gap-3">
          {/* Trustpilot logo text */}
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 text-[#00b67a] fill-[#00b67a]" />
            <span className="font-semibold text-foreground text-sm">Trustpilot</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-6 bg-border" />
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4].map((i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-[#00b67a] fill-[#00b67a] animate-star-pop" 
                  style={{ 
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
              {/* Half star */}
              <div 
                className="relative w-4 h-4 animate-star-pop"
                style={{ animationDelay: '0.75s' }}
              >
                <Star className="w-4 h-4 text-muted-foreground/30 absolute inset-0" />
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star className="w-4 h-4 text-[#00b67a] fill-[#00b67a]" />
                </div>
              </div>
            </div>
            <span className="font-bold text-foreground animate-fade-in-up" style={{ animationDelay: '1s' }}>4.5</span>
            <span className="text-muted-foreground text-xs hidden sm:inline animate-fade-in-up" style={{ animationDelay: '1.1s' }}>• Excellent</span>
          </div>
          
          {/* Divider */}
          <div className="w-px h-6 bg-border hidden sm:block" />
          
          {/* Food emoji touch */}
          <div className="hidden sm:flex items-center gap-1">
            <span className="text-base animate-sparkle">🌯</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustpilotBadge;