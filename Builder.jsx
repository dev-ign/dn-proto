// ─────────────────────────────────────────────────────────────
// Order summary + desktop & mobile builder layouts
// ─────────────────────────────────────────────────────────────

function MacroChips({ m, dark, showTotal = true }) {
  const chip = (big, small) => (
    <div style={{
      flex: 1, textAlign: "center", padding: "10px 6px",
      border: `1px solid ${dark ? "rgba(255,255,255,.16)" : "var(--line)"}`,
      borderRadius: 12, background: dark ? "rgba(255,255,255,.04)" : "var(--surface)",
    }}>
      <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 26, lineHeight: .9, color: dark ? "#fff" : "var(--ink)" }}>{big}</div>
      <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,.55)" : "var(--gray)", marginTop: 4 }}>{small}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {chip(`${m.grams}g`, "Protein")}
      {chip(m.cal, "Calories")}
      {showTotal && chip(`$${m.price.toFixed(2)}`, "Total")}
    </div>
  );
}

// the white "your build" receipt card
function BuildReceipt({ state, m, onAdd, added, compact }) {
  const fruitList = state.fruits.map(id => FRUITS.find(f => f.id === id)).filter(Boolean);
  const boostList = state.boosts.map(id => BOOSTS.find(b => b.id === id)).filter(Boolean);
  const Row = ({ label, right }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13 }}>
      <span style={{ width: 16, height: 16, borderRadius: 5, background: "var(--red)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      <span style={{ flex: 1, color: "var(--ink-2)", fontWeight: 500 }}>{label}</span>
      {right && <span style={{ color: "var(--gray)", fontWeight: 600 }}>{right}</span>}
    </div>
  );
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: fruitList.length && boostList.length ? "1fr 1fr" : "1fr", gap: 16 }}>
        {(fruitList.length > 0) && (
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>Fruits</div>
            {fruitList.map(f => <Row key={f.id} label={f.label} />)}
          </div>
        )}
        {(boostList.length > 0) && (
          <div>
            <div className="kicker" style={{ marginBottom: 4 }}>Boosts</div>
            {boostList.map(b => <Row key={b.id} label={b.label} right={`+$${b.price.toFixed(b.price % 1 ? 2 : 0)}`} />)}
          </div>
        )}
        {(!fruitList.length && !boostList.length) && (
          <div style={{ fontSize: 12.5, color: "var(--gray)", fontWeight: 500, padding: "2px 0 4px" }}>
            Just protein &amp; base — add fruits or boosts to customize.
          </div>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "16px 0 14px", paddingTop: 14, borderTop: "1px solid var(--line-soft)" }}>
        <span style={{ fontWeight: 700, fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--gray)" }}>Total</span>
        <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 36, lineHeight: .8, color: "var(--ink)" }}>${m.price.toFixed(2)}</span>
      </div>

      <button className="cta" onClick={onAdd} style={added ? { background: "#1c8a3c", boxShadow: "0 8px 22px rgba(28,138,60,.3)" } : null}>
        {added
          ? (<><svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M5 12.5l4.2 4.2L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg> Added To Order</>)
          : (<>{Ic.cart} Add To Order</>)}
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DESKTOP — 2 column
// ─────────────────────────────────────────────────────────────
function DesktopBuilder({ state, set, applyPreset, cart, onAdd, added }) {
  const m = compute(state);
  const name = smoothieName(state);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff" }}>
      {/* header */}
      <div style={{ height: 64, flexShrink: 0, borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 26px" }}>
        <img src="assets/logo.png" alt="Discount Nutrition" style={{ height: 30 }} />
        <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 22, letterSpacing: ".04em", transform: "skewX(-5deg)" }}>BUILD YOUR SMOOTHIE</div>
        <div style={{ display: "flex", alignItems: "center", gap: 7, color: "var(--ink)" }}>
          <div style={{ position: "relative", width: 38, height: 38, borderRadius: "50%", border: "1px solid var(--line)", display: "grid", placeItems: "center" }}>
            {Ic.cart}
            {cart > 0 && <span style={{ position: "absolute", top: -4, right: -4, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 999, background: "var(--red)", color: "#fff", fontSize: 11, fontWeight: 800, display: "grid", placeItems: "center" }}>{cart}</span>}
          </div>
        </div>
      </div>

      {/* body */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.18fr 1fr", minHeight: 0 }}>
        {/* left config */}
        <div className="dn-scroll" style={{ overflowY: "auto", padding: "24px 30px 40px" }}>
          <div className="kicker">Fresh made · ready in minutes</div>
          <h2 className="h-display" style={{ fontSize: 46, margin: "4px 0 18px" }}>CUSTOMIZE YOUR<br />PERFECT BLEND</h2>
          <div style={{ marginBottom: 6 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
              <span className="kicker" style={{ color: "var(--ink)", whiteSpace: "nowrap" }}>Popular blends</span>
              <span style={{ fontSize: 11.5, color: "var(--gray)", fontWeight: 600, whiteSpace: "nowrap" }}>— or build your own below</span>
            </div>
            <PresetRow apply={applyPreset} />
          </div>
          <SizeStep state={state} set={set} />
          <ProteinStep state={state} set={set} />
          <FruitsStep state={state} set={set} />
          <BoostsStep state={state} set={set} />
        </div>

        {/* right preview */}
        <div style={{ background: "radial-gradient(120% 80% at 50% 0%, #1c1c1c 0%, #0a0a0a 70%)", display: "flex", flexDirection: "column", padding: "22px 26px", position: "relative" }}>
          <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
            {/* glow */}
            <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: `radial-gradient(closest-side, ${lighten(blendLiquid(state),0.1)}33, transparent)`, filter: "blur(10px)", top: "8%" }} />
            <SmoothieGlass state={state} variant="lg" />
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <div className="kicker" style={{ color: "var(--red)" }}>{m.size.label} · {m.protein.label} Protein</div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#fff", fontSize: 34, lineHeight: .92, letterSpacing: ".02em", marginTop: 4, whiteSpace: "nowrap" }}>{name}</div>
            </div>
          </div>
          {/* summary card */}
          <div style={{ background: "#fff", borderRadius: 18, padding: "16px 18px 18px", boxShadow: "0 -2px 30px rgba(0,0,0,.4)" }}>
            <div style={{ marginBottom: 12 }}><MacroChips m={m} showTotal={false} /></div>
            <BuildReceipt state={state} m={m} onAdd={onAdd} added={added} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE — single scroll + sticky order bar
// ─────────────────────────────────────────────────────────────
function MobileBuilder({ state, set, applyPreset, cart, onAdd, added }) {
  const m = compute(state);
  const name = smoothieName(state);
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#fff", position: "relative" }}>
      {/* header */}
      <div style={{ flexShrink: 0, background: "#0c0c0c", paddingTop: 50, paddingBottom: 12, display: "flex", alignItems: "center", gap: 8, padding: "50px 16px 12px" }}>
        <div style={{ color: "#fff", display: "grid", placeItems: "center", width: 30, height: 30 }}>{Ic.back}</div>
        <div style={{ flex: 1, textAlign: "center", color: "#fff", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: 20, letterSpacing: ".05em", transform: "skewX(-5deg)" }}>BUILD YOUR SMOOTHIE</div>
        <div style={{ position: "relative", color: "#fff", width: 30, height: 30, display: "grid", placeItems: "center" }}>
          {Ic.cart}
          {cart > 0 && <span style={{ position: "absolute", top: -3, right: -3, minWidth: 16, height: 16, padding: "0 3px", borderRadius: 999, background: "var(--red)", color: "#fff", fontSize: 10, fontWeight: 800, display: "grid", placeItems: "center" }}>{cart}</span>}
        </div>
      </div>

      {/* scroll */}
      <div className="dn-scroll" style={{ flex: 1, overflowY: "auto" }}>
        {/* hero preview */}
        <div style={{ background: "radial-gradient(120% 90% at 50% 0%, #1f1f1f, #090909 75%)", padding: "18px 16px 18px" }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <SmoothieGlass state={state} variant="md" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="kicker" style={{ color: "var(--red)" }}>{m.size.label} · {m.protein.label} Protein</div>
              <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", color: "#fff", fontSize: 32, lineHeight: .92, marginTop: 4 }}>{name}</div>
            </div>
          </div>
          <div style={{ marginTop: 16 }}><MacroChips m={m} dark /></div>
        </div>

        <div style={{ padding: "16px 16px 6px" }}>
          <div className="kicker" style={{ marginBottom: 8 }}>Popular blends</div>
          <PresetRow apply={applyPreset} compact />
        </div>

        <div style={{ padding: "0 16px 24px" }}>
          <SizeStep state={state} set={set} />
          <ProteinStep state={state} set={set} />
          <FruitsStep state={state} set={set} />
          <BoostsStep state={state} set={set} />
        </div>
        <div style={{ height: 92 }} />
      </div>

      {/* sticky order bar */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, background: "#fff", borderTop: "1px solid var(--line)", boxShadow: "0 -8px 24px rgba(0,0,0,.08)", padding: "12px 16px 26px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ flexShrink: 0 }}><SmoothieGlass state={state} variant="sm" /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
          <div style={{ fontSize: 11.5, color: "var(--gray)", fontWeight: 600 }}>{m.grams}g protein · {m.cal} cal</div>
        </div>
        <button className="cta" onClick={onAdd} style={{ width: "auto", fontSize: 20, padding: "13px 20px", ...(added ? { background: "#1c8a3c", boxShadow: "0 8px 22px rgba(28,138,60,.3)" } : null) }}>
          {added ? "Added ✓" : `Add · $${m.price.toFixed(2)}`}
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { DesktopBuilder, MobileBuilder, MacroChips, BuildReceipt });
