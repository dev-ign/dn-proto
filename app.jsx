// ─────────────────────────────────────────────────────────────
// App shell — shared state, device toggle, frame mounting
// ─────────────────────────────────────────────────────────────
const { useState, useEffect } = React;

const DEFAULT_STATE = { size: "20", protein: "whey", fruits: ["strawberry", "banana"], boosts: ["creatine"] };

function App() {
  const [device, setDevice] = useState("desktop");
  const [state, setState] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem("dn-smoothie")); if (s && s.size) return s; } catch (e) {}
    return DEFAULT_STATE;
  });
  const [cart, setCart] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => { localStorage.setItem("dn-smoothie", JSON.stringify(state)); }, [state]);

  const set = (partial) => setState(s => ({ ...s, ...partial }));
  const applyPreset = (p) => setState({ size: p.size, protein: p.protein, fruits: [...p.fruits], boosts: [...p.boosts] });
  const onAdd = () => {
    if (added) return;
    setCart(c => c + 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1700);
  };

  const builderProps = { state, set, applyPreset, cart, onAdd, added };

  return (
    <div className="stage">
      <div className="stage-head">
        <div className="stage-title">
          <img src="assets/logo.png" alt="Discount Nutrition" />
          <span className="divider" />
          <span className="label">SMOOTHIE <em>BUILDER</em></span>
        </div>
        <div className="seg">
          <button className={device === "desktop" ? "on" : ""} onClick={() => setDevice("desktop")}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><rect x="3" y="4" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="2"/><path d="M9 21h6M12 17v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Desktop
          </button>
          <button className={device === "mobile" ? "on" : ""} onClick={() => setDevice("mobile")}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><rect x="7" y="2" width="10" height="20" rx="2.5" stroke="currentColor" strokeWidth="2"/><path d="M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Mobile
          </button>
        </div>
      </div>

      <div className="stage-body">
        {device === "desktop" ? (
          <ChromeWindow width={1200} height={880} url="discountnutrition.com/build" tabs={[{ title: "Build Your Smoothie · Discount Nutrition" }]}>
            <DesktopBuilder {...builderProps} />
          </ChromeWindow>
        ) : (
          <IOSDevice width={402} height={880} dark>
            <MobileBuilder {...builderProps} />
          </IOSDevice>
        )}
      </div>

      <div className="hint">Live preview · the glass and order summary update as you build · switch Desktop / Mobile above</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
