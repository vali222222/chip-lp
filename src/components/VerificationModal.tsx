
import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Star, X } from "lucide-react";
import playfulLogo from "@/assets/playful-rewards-logo.png";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCRATCH_CODE = "CH9X2K";

// ==========================================
// MODAL CONTROL
// true  = Modal COMPLET dezactivat
// false = Modal activ
// ==========================================
const MODAL_PAUSED = true;

const VerificationModal = ({
  isOpen,
  onClose,
}: VerificationModalProps) => {
  const [showError, setShowError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [hasScratched, setHasScratched] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const scratchLocked = useRef(false);

  // Modal lifecycle
  useEffect(() => {
    if (MODAL_PAUSED) {
      return;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      setScratchProgress(0);
      setIsShaking(false);
      setHasScratched(false);
      setShowError(false);
      scratchLocked.current = false;
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Initialize scratch canvas
  useEffect(() => {
    if (!isOpen || MODAL_PAUSED) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    // Draw scratch overlay
    ctx.fillStyle = "#8B1A1A";
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Add subtle pattern
    ctx.globalAlpha = 0.15;

    for (let i = 0; i < rect.width; i += 4) {
      for (let j = 0; j < rect.height; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }

    ctx.globalAlpha = 1;

    // Scratch here text
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    ctx.font = "bold 14px 'DM Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      "✦  SCRATCH HERE  ✦",
      rect.width / 2,
      rect.height / 2
    );
  }, [isOpen]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    const canvas = canvasRef.current;

    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const scratch = useCallback(
    (x: number, y: number) => {
      if (MODAL_PAUSED) return;

      const canvas = canvasRef.current;

      if (!canvas || scratchLocked.current) return;

      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // Calculate scratch progress
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      let transparent = 0;

      for (
        let i = 3;
        i < imageData.data.length;
        i += 4
      ) {
        if (imageData.data[i] === 0) {
          transparent++;
        }
      }

      const progress =
        transparent / (imageData.data.length / 4);

      setScratchProgress(progress);

      // Lock scratch at 25%
      if (
        progress > 0.25 &&
        !scratchLocked.current
      ) {
        scratchLocked.current = true;
        setHasScratched(true);
        setIsShaking(true);
        setShowError(true);

        setTimeout(() => {
          setIsShaking(false);
        }, 800);
      }
    },
    []
  );

  const handleStart = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    if (MODAL_PAUSED) return;

    if (scratchLocked.current) {
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
      }, 500);

      return;
    }

    isDrawing.current = true;

    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleMove = (
    e: React.MouseEvent | React.TouchEvent
  ) => {
    if (
      MODAL_PAUSED ||
      !isDrawing.current ||
      scratchLocked.current
    ) {
      return;
    }

    e.preventDefault();

    const { x, y } = getPos(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
  };

  const handleVerify = () => {
    if (MODAL_PAUSED || isVerifying) return;

    setShowError(false);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setShowError(true);
      setIsShaking(true);

      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }, 2000);
  };

  // ==========================================
  // PAUSE SYSTEM
  // Modal will NEVER render when paused
  // ==========================================
  if (!isOpen || MODAL_PAUSED) {
    return null;
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

      {/* Dark overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal container */}
      <div className="relative z-10 bg-card rounded-2xl shadow-giftcard w-full max-w-sm p-6 border border-border animate-fade-in-up">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Scratch Card */}
        <div className="flex justify-center mb-4">
          <div
            className={`relative w-[220px] h-[56px] rounded-xl overflow-hidden border border-primary/20 select-none ${
              isShaking
                ? "animate-scratch-shake"
                : ""
            }`}
          >

            {/* Hidden code */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/5">
              <span className="text-2xl font-bold tracking-[0.35em] text-primary">
                {SCRATCH_CODE.split("").map(
                  (char, i) => (
                    <span
                      key={i}
                      className={`inline-block transition-all duration-300 ${
                        hasScratched && i < 2
                          ? "opacity-100"
                          : hasScratched
                          ? "blur-[5px] opacity-60"
                          : "blur-[6px] opacity-40"
                      }`}
                    >
                      {char}
                    </span>
                  )
                )}
              </span>
            </div>

            {/* Scratch canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer"
              style={{ touchAction: "none" }}
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />

          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-foreground text-center mb-1">
          Reveal Your -95% Code
        </h2>

        <p className="text-xs text-muted-foreground text-center mb-5">
          {hasScratched
            ? "Complete 1 deal to fully reveal your code!"
            : "Scratch above or complete a deal to unlock your code."}
        </p>

        {/* Offer Card */}
        <a
          href="https://trkio.org/aff_c?offer_id=2691&aff_id=14999&source=chip"
          target="_blank"
          rel="noopener noreferrer"
          className="block mb-5"
        >
          <div className="bg-gradient-walmart rounded-xl p-4 flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer">

            <img
              src={playfulLogo}
              alt="Playful Rewards"
              className="w-12 h-12 rounded-xl flex-shrink-0 object-cover"
            />

            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">
                Playful Rewards
              </p>

              <p className="text-white/75 text-xs leading-snug mt-0.5">
                Complete 1 deal in-app (takes ~15 mins)
                to reveal your discount code.
              </p>

              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-2 w-full bg-accent text-accent-foreground py-2.5 rounded-lg font-semibold text-sm text-center shadow-button">
            Continue
          </div>
        </a>

        {/* Error message */}
        {showError && !isVerifying && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 mb-3 text-center animate-fade-in-up">

            <p className="text-destructive text-xs font-semibold">
              🔒 Deal not completed yet
            </p>

            <p className="text-destructive/70 text-[10px] mt-0.5">
              Complete 1 deal to fully scratch & reveal
              your code
            </p>

          </div>
        )}

        {/* Verification button */}
        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-3 rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {isVerifying ? (
            <>
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify & Reveal Code"
          )}
        </button>

        {/* Footer */}
        <p className="text-[10px] text-muted-foreground/60 text-center mt-4">
          Code will be revealed instantly after verification
        </p>

      </div>
    </div>
  );

  // Render modal through portal
  return createPortal(
    modalContent,
    document.body
  );
};

export default VerificationModal;
