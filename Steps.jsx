// ─────────────────────────────────────────────────────────────
// Builder step components (shared by desktop + mobile layouts)
// ─────────────────────────────────────────────────────────────

function StepHead({ n, title, hint }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "0 0 14px" }}>
      <span className="step-num" style={{ fontSize: 26, lineHeight: 1 }}>{n}</span>
      <h3 style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 15, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--ink)" }}>{title}</h3>
      {hint && <span style={{ marginLeft: "auto", fontSize: 11.5, color: "var(--gray)", fontWeight: 600 }}>{hint}</span>}
    </div>
  );
}

function Section({ children, style }) {
  return <section style={{ padding: "22px 0", borderTop: "1px solid var(--line-soft)", ...style }}>{children}</section>;
}

// ---- Step 1: Size ----
function SizeStep({ state, set }) {
  return (
    <Section style={{ borderTop: "none" }}>
      <StepHead n="1" title="Choose Size" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {SIZES.map(s => {
          const on = state.size === s.id;
          return (
            <div key={s.id} className={"opt" + (on ? " sel" : "")} onClick={() => set({ size: s.id })}
              style={{ padding: "18px 8px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div className="tick">{Ic.check}</div>
              <div style={{ width: 40, height: 52, color: on ? "var(--red)" : "var(--ink)", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
                {Ic.cup(s.scale)}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 24, lineHeight: 1, marginTop: 6, color: "var(--ink)" }}>{s.label}</div>
              <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--gray)" }}>{s.sub}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: on ? "var(--red)" : "var(--ink-2)", marginTop: 4 }}>${s.price.toFixed(2)}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ---- Step 2: Protein ----
function ProteinStep({ state, set }) {
  return (
    <Section>
      <StepHead n="2" title="Choose Protein" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {PROTEINS.map(p => {
          const on = state.protein === p.id;
          return (
            <div key={p.id} className={"opt" + (on ? " sel" : "")} onClick={() => set({ protein: p.id })}
              style={{ padding: "16px 10px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
              <div className="tick">{Ic.check}</div>
              <div style={{ width: 34, height: 40, color: on ? "var(--red)" : "var(--ink)" }}>{Ic[p.icon]}</div>
              <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>{p.label}</div>
              <div style={{ fontSize: 11, lineHeight: 1.35, color: "var(--gray)", fontWeight: 500 }}>{p.desc}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ---- Step 3: Fruits ----
function FruitsStep({ state, set }) {
  const toggle = (id) => {
    const has = state.fruits.includes(id);
    set({ fruits: has ? state.fruits.filter(f => f !== id) : [...state.fruits, id] });
  };
  return (
    <Section>
      <StepHead n="3" title="Add Fruits" hint="Pick as many as you like" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(96px,1fr))", gap: 10 }}>
        {FRUITS.map(f => {
          const on = state.fruits.includes(f.id);
          return (
            <div key={f.id} className={"opt" + (on ? " sel" : "")} onClick={() => toggle(f.id)}
              style={{ padding: "14px 6px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div className="tick">{Ic.check}</div>
              <div style={{ width: 46, height: 46, borderRadius: "50%", display: "grid", placeItems: "center",
                background: `radial-gradient(65% 65% at 35% 28%, ${lighten(f.disc, 0.3)}, ${f.disc} 72%, ${darken(f.disc, 0.18)})`,
                boxShadow: "0 3px 8px rgba(0,0,0,.16)" }}>
                <FruitGlyph id={f.id} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 12, color: "var(--ink)" }}>{f.label}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ---- Step 4: Boosts ----
function BoostsStep({ state, set }) {
  const toggle = (id) => {
    const has = state.boosts.includes(id);
    set({ boosts: has ? state.boosts.filter(b => b !== id) : [...state.boosts, id] });
  };
  return (
    <Section>
      <StepHead n="4" title="Add Boosts" hint="Premium add-ons" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(158px,1fr))", gap: 10 }}>
        {BOOSTS.map(b => {
          const on = state.boosts.includes(b.id);
          return (
            <div key={b.id} className={"opt" + (on ? " sel" : "")} onClick={() => toggle(b.id)}
              style={{ padding: "13px 14px", display: "flex", alignItems: "center", gap: 11 }}>
              <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 9, display: "grid", placeItems: "center",
                background: on ? "var(--red)" : "var(--surface-2)", color: on ? "#fff" : "var(--ink)", transition: "background .16s,color .16s" }}>
                <div style={{ width: 19, height: 19 }}>{Ic[b.icon]}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color: "var(--ink)", lineHeight: 1.1 }}>{b.label}</div>
                <div style={{ fontSize: 11, color: "var(--gray)", fontWeight: 500, marginTop: 2 }}>{b.benefit}</div>
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 800, color: on ? "var(--red)" : "var(--ink-2)", flexShrink: 0 }}>+${b.price.toFixed(b.price % 1 ? 2 : 0)}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ---- Popular presets quick-pick ----
function PresetRow({ apply, compact }) {
  return (
    <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }} className="dn-scroll">
      {PRESETS.map(p => (
        <button key={p.name} onClick={() => apply(p)}
          style={{ flex: compact ? "0 0 132px" : "1 1 0", minWidth: 122, border: "1px solid var(--line)", background: "#0c0c0c",
            borderRadius: 14, overflow: "hidden", cursor: "pointer", padding: 0, textAlign: "left",
            position: "relative", height: compact ? 92 : 104 }}>
          <img src={p.img} alt={p.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .9 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 30%,rgba(0,0,0,.8))" }} />
          <div style={{ position: "absolute", left: 11, bottom: 9, right: 8 }}>
            <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#fff", fontSize: 17, lineHeight: .95, letterSpacing: ".02em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
            <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--red)", marginTop: 3 }}>Tap to build</div>
          </div>
        </button>
      ))}
    </div>
  );
}

Object.assign(window, { StepHead, Section, SizeStep, ProteinStep, FruitsStep, BoostsStep, PresetRow });
