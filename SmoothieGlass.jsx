// ─────────────────────────────────────────────────────────────
// SmoothieGlass — dynamic rendered preview. Recolors live.
// ─────────────────────────────────────────────────────────────
function SmoothieGlass({ state, variant = "lg" }) {
  const color = blendLiquid(state);
  const top = lighten(color, 0.20);
  const mid = color;
  const bot = darken(color, 0.18);
  const foam = lighten(color, 0.40);
  const empty = (state.fruits.length === 0 && state.boosts.filter(b => ["pb","espresso","oats"].includes(b)).length === 0);

  const fill = 0.90; // liquid fill fraction of glass interior

  // garnish bits from selected fruits (+ pb/espresso)
  const garnish = [];
  state.fruits.forEach(fid => { const f = FRUITS.find(x => x.id === fid); if (f) garnish.push(f.disc); });
  if (state.boosts.includes("pb")) garnish.push("#C99A5B");
  if (state.boosts.includes("espresso")) garnish.push("#4A2E1E");
  const bits = garnish.slice(0, 7);

  const dims = {
    lg: { w: 180, h: 288, r: 540 },
    md: { w: 122, h: 202, r: 380 },
    sm: { w: 46, h: 62, r: 120 },
  }[variant];

  return (
    <div className="glass-wrap" style={{ width: dims.w, height: dims.h, position: "relative" }}>
      {/* straw */}
      {variant !== "sm" && (
        <div style={{
          position: "absolute", top: -dims.h * 0.16, left: "63%",
          width: dims.w * 0.05, height: dims.h * 0.62,
          background: "linear-gradient(90deg,#c9161d,#E1241B 38%,#ff7a72 50%,#E1241B 64%,#a5110f)",
          borderRadius: 20, transform: "rotate(11deg)", transformOrigin: "bottom center",
          zIndex: 5, boxShadow: "0 2px 6px rgba(0,0,0,.25)",
        }} />
      )}

      {/* glass body */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: `${dims.w * 0.05}px ${dims.w * 0.05}px ${dims.r}px ${dims.r}px / ${dims.w * 0.05}px ${dims.w * 0.05}px ${dims.h * 0.16}px ${dims.h * 0.16}px`,
        overflow: "hidden",
        background: "linear-gradient(100deg, rgba(255,255,255,.10), rgba(255,255,255,0) 30%)",
        boxShadow: "inset 0 0 0 1.5px rgba(255,255,255,.22), inset 14px 0 26px rgba(255,255,255,.10), inset -16px 0 30px rgba(0,0,0,.20)",
      }}>
        {/* liquid */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          height: `${fill * 100}%`,
          transition: "height .5s cubic-bezier(.2,.8,.2,1), background .6s ease",
          background: `
            radial-gradient(120% 60% at 30% 8%, ${lighten(top,0.12)} 0%, transparent 45%),
            linear-gradient(180deg, ${top} 0%, ${mid} 42%, ${bot} 100%)`,
        }}>
          {/* speckle texture */}
          <div style={{
            position: "absolute", inset: 0, opacity: empty ? 0.10 : 0.22, mixBlendMode: "multiply",
            background: `
              radial-gradient(1.6px 1.6px at 20% 30%, ${darken(mid,0.3)} 99%, transparent),
              radial-gradient(1.4px 1.4px at 60% 50%, ${darken(mid,0.35)} 99%, transparent),
              radial-gradient(1.5px 1.5px at 80% 25%, ${darken(mid,0.3)} 99%, transparent),
              radial-gradient(1.3px 1.3px at 40% 70%, ${darken(mid,0.35)} 99%, transparent),
              radial-gradient(1.6px 1.6px at 75% 80%, ${darken(mid,0.3)} 99%, transparent),
              radial-gradient(1.2px 1.2px at 30% 88%, ${darken(mid,0.35)} 99%, transparent)`,
            backgroundSize: "70px 70px",
          }} />
          {/* left sheen on liquid */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "26%", height: "100%",
            background: "linear-gradient(90deg, rgba(255,255,255,.22), transparent)" }} />
        </div>

        {/* foam / blended top */}
        {variant !== "sm" && (
          <div style={{
            position: "absolute", left: "-2%", right: "-2%",
            top: `${(1 - fill) * 100}%`, height: dims.h * 0.085,
            transform: "translateY(-55%)",
            borderRadius: "50%",
            background: `radial-gradient(60% 90% at 50% 30%, ${lighten(foam,0.18)}, ${foam} 70%, ${darken(foam,0.08)})`,
            transition: "top .5s cubic-bezier(.2,.8,.2,1), background .6s ease",
            boxShadow: "0 3px 8px rgba(0,0,0,.12)",
            zIndex: 3,
          }} />
        )}

        {/* garnish bits sitting on the foam */}
        {variant !== "sm" && bits.map((c, i) => {
          const cols = bits.length;
          const x = 22 + (i / Math.max(1, cols - 1)) * 56 + (i % 2 ? 3 : -3);
          const y = (1 - fill) * 100 + 1.5 + (i % 2 ? -2.5 : 0.5);
          const sz = dims.w * (variant === "lg" ? 0.13 : 0.14);
          return (
            <div key={i} style={{
              position: "absolute", left: `${x}%`, top: `${y}%`,
              width: sz, height: sz, borderRadius: i % 3 === 0 ? "40% 60% 55% 45%" : "50%",
              transform: "translate(-50%,-50%)",
              background: `radial-gradient(60% 60% at 35% 30%, ${lighten(c,0.35)}, ${c} 70%, ${darken(c,0.2)})`,
              boxShadow: "0 1px 3px rgba(0,0,0,.3)",
              zIndex: 4, animation: "float-up .4s ease both",
            }} />
          );
        })}

        {/* vertical glass highlight */}
        <div style={{ position: "absolute", top: "4%", left: "10%", width: "8%", height: "78%",
          borderRadius: 20, background: "linear-gradient(180deg, rgba(255,255,255,.5), rgba(255,255,255,0))", opacity: 0.5, zIndex: 6 }} />
        {/* right rim shadow */}
        <div style={{ position: "absolute", top: 0, right: 0, width: "18%", height: "100%",
          background: "linear-gradient(270deg, rgba(0,0,0,.18), transparent)", zIndex: 6 }} />
      </div>

      {/* base ellipse shadow */}
      {variant !== "sm" && (
        <div style={{ position: "absolute", left: "50%", bottom: -dims.h * 0.03, transform: "translateX(-50%)",
          width: dims.w * 0.92, height: dims.h * 0.05, borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(0,0,0,.5), transparent)", filter: "blur(3px)", zIndex: 0 }} />
      )}
    </div>
  );
}

window.SmoothieGlass = SmoothieGlass;
