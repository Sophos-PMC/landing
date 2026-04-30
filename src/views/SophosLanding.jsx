import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0C1726",
  bgCard: "#111e30",
  bgCard2: "#0f1a28",
  purple: "#B532D9",
  purpleLight: "#cc55f0",
  purpleDark: "#8a1fb0",
  orange: "#F18A6A",
  orangeLight: "#F29966",
  lime: "#CBE558",
  teal: "#6CFFFD",
  text: "#FEFEFF",
  textMuted: "#8ea3bc",
  border: "rgba(181,50,217,0.2)",
};

const style = {
  root: {
    fontFamily: "'Sora', 'DM Sans', sans-serif",
    background: COLORS.bg,
    color: COLORS.text,
    minHeight: "100vh",
    overflowX: "hidden",
  },
};

// ── Inline keyframes & Responsive CSS ──────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${COLORS.bg}; overflow-x: hidden; }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(-2deg); }
      50% { transform: translateY(-18px) rotate(2deg); }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.95); opacity: 0.6; }
      70% { transform: scale(1.15); opacity: 0; }
      100% { transform: scale(1.15); opacity: 0; }
    }
    @keyframes fadein {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes timerTick {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.4); }
    }

    .fadein { animation: fadein 0.8s ease forwards; }
    .fadein-d1 { animation: fadein 0.8s 0.15s ease both; }
    .fadein-d2 { animation: fadein 0.8s 0.3s ease both; }
    .fadein-d3 { animation: fadein 0.8s 0.45s ease both; }
    .fadein-d4 { animation: fadein 0.8s 0.6s ease both; }

    .btn-primary {
      background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.purpleLight});
      color: white;
      border: none;
      border-radius: 12px;
      padding: 14px 32px;
      font-size: 16px;
      font-weight: 600;
      font-family: 'Sora', sans-serif;
      cursor: pointer;
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, ${COLORS.purpleLight}, ${COLORS.purple});
      opacity: 0;
      transition: opacity 0.25s;
    }
    .btn-primary:hover::before { opacity: 1; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(181,50,217,0.45); }
    .btn-primary span { position: relative; z-index: 1; }

    .btn-secondary {
      background: transparent;
      color: ${COLORS.text};
      border: 1.5px solid rgba(255,255,255,0.2);
      border-radius: 12px;
      padding: 13px 32px;
      font-size: 16px;
      font-weight: 500;
      font-family: 'Sora', sans-serif;
      cursor: pointer;
      transition: all 0.25s ease;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }
    .btn-secondary:hover {
      border-color: ${COLORS.purple};
      color: ${COLORS.purpleLight};
      transform: translateY(-2px);
    }

    .card-hover {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .card-hover:hover {
      transform: translateY(-6px);
      box-shadow: 0 24px 48px rgba(0,0,0,0.4);
    }

    .nav-link {
      color: ${COLORS.textMuted};
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-link:hover { color: ${COLORS.text}; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.purpleDark}; border-radius: 3px; }

    .section-reveal {
      opacity: 0;
      transform: translateY(32px);
      transition: opacity 0.7s ease, transform 0.7s ease;
    }
    .section-reveal.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .feature-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      flex-shrink: 0;
    }

    .stat-number {
      font-size: 48px;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.teal});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .testimonial-card {
      background: ${COLORS.bgCard};
      border: 1px solid rgba(181,50,217,0.15);
      border-radius: 20px;
      padding: 28px;
      position: relative;
      overflow: hidden;
    }
    .testimonial-card::before {
      content: '"';
      position: absolute;
      top: -10px;
      left: 20px;
      font-size: 120px;
      font-weight: 800;
      color: rgba(181,50,217,0.08);
      line-height: 1;
      font-family: Georgia, serif;
    }

    .gradient-text {
      background: linear-gradient(135deg, ${COLORS.purple}, ${COLORS.teal});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(181,50,217,0.12);
      border: 1px solid rgba(181,50,217,0.3);
      border-radius: 100px;
      padding: 6px 16px;
      font-size: 13px;
      font-weight: 600;
      color: ${COLORS.purpleLight};
    }

    .noise-overlay {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 0;
      opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    }

    .glow-blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }

    /* 📱 RESPONSIVE QUERIES 📱 */
    
    @media (max-width: 992px) {
      .hero-layout { 
        flex-direction: column !important; 
        text-align: center; 
        padding-top: 80px; 
        gap: 40px !important;
      }
      .hero-left {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .hero-buttons { justify-content: center; }
      .hero-proof { justify-content: center; }
      .hero-mockups { transform: scale(0.85); margin-top: 0px; min-height: 450px !important; }
      
      .feature-row { flex-direction: column !important; text-align: center; }
      .feature-row > div { width: 100%; min-width: unset !important; }
      .feature-icon { margin: 0 auto 20px; }
      .feature-row ul { align-items: center; }
    }

    @media (max-width: 768px) {
      .nav-desktop-links { display: none !important; }
      .nav-secondary-btn { display: none !important; }
      
      h1.hero-title { font-size: 42px !important; line-height: 1.1 !important; }
      .hero-mockups { transform: scale(0.65); min-height: 350px !important; }
      
      section { padding: 60px 5vw !important; }
    }

    @media (max-width: 480px) {
      .hero-buttons { flex-direction: column; width: 100%; }
      .btn-primary, .btn-secondary { width: 100%; padding: 14px 20px !important; }
      .hero-mockups { transform: scale(0.55); min-height: 300px !important; margin-left: -20px; }
      h1.hero-title { font-size: 34px !important; }
    }

  `}</style>
);

// ── Octopus mascot (SVG inline) ───────────────────────────────────────────────
const OctopusMascot = ({ size = 200, animated = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={animated ? { animation: "float 4s ease-in-out infinite" } : {}}
  >
    <ellipse cx="100" cy="95" rx="52" ry="55" fill="#B532D9" />
    <ellipse cx="82" cy="72" rx="16" ry="10" fill="rgba(255,255,255,0.12)" transform="rotate(-20 82 72)" />
    <circle cx="84" cy="88" r="12" fill="white" />
    <circle cx="116" cy="88" r="12" fill="white" />
    <circle cx="87" cy="91" r="7" fill="#0C1726" />
    <circle cx="119" cy="91" r="7" fill="#0C1726" />
    <circle cx="89" cy="89" r="2.5" fill="white" />
    <circle cx="121" cy="89" r="2.5" fill="white" />
    <ellipse cx="76" cy="100" rx="8" ry="5" fill="rgba(241,138,106,0.5)" />
    <ellipse cx="124" cy="100" rx="8" ry="5" fill="rgba(241,138,106,0.5)" />
    <path d="M90 107 Q100 116 110 107" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <path d="M58 128 Q42 148 50 168 Q58 185 48 195" stroke="#B532D9" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M72 138 Q60 158 65 178 Q70 192 60 200" stroke="#9B28BB" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M100 142 Q100 165 100 185 Q100 195 95 200" stroke="#B532D9" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M128 138 Q140 158 135 178 Q130 192 140 200" stroke="#9B28BB" strokeWidth="10" strokeLinecap="round" fill="none" />
    <path d="M142 128 Q158 148 150 168 Q142 185 152 195" stroke="#B532D9" strokeWidth="10" strokeLinecap="round" fill="none" />
    <circle cx="49" cy="160" r="4" fill="#8a1fb0" />
    <circle cx="63" cy="170" r="4" fill="#8a1fb0" />
    <circle cx="100" cy="172" r="4" fill="#8a1fb0" />
    <circle cx="137" cy="170" r="4" fill="#8a1fb0" />
    <circle cx="151" cy="160" r="4" fill="#8a1fb0" />
    <rect x="72" y="46" width="56" height="8" rx="2" fill="#F18A6A" />
    <polygon points="100,28 72,46 128,46" fill="#F18A6A" />
    <rect x="124" y="44" width="3" height="14" fill="#F18A6A" />
    <circle cx="127" cy="59" r="4" fill="#CBE558" />
  </svg>
);

// ── Pomodoro Timer mockup ─────────────────────────────────────────────────────
const PomodoroMockup = () => {
  const [time, setTime] = useState(1610); // 26:50
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime(p => p > 0 ? p - 1 : 1500), 1000);
    return () => clearInterval(t);
  }, [running]);

  const mins = String(Math.floor(time / 60)).padStart(2, "0");
  const secs = String(time % 60).padStart(2, "0");
  const progress = time / 1500;

  const r = 90, cx = 110, cy = 120;
  const circ = 2 * Math.PI * r;
  const dash = circ * (1 - progress);

  return (
    <div style={{
      background: COLORS.bgCard,
      borderRadius: 28,
      padding: "0 0 24px",
      width: 260,
      border: `1px solid ${COLORS.border}`,
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    }}>
      <div style={{ background: COLORS.purple, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>Taller Matemáticas</span>
        <span style={{ fontSize: 20, opacity: 0.8 }}>☰</span>
      </div>
      <div style={{ padding: "12px 18px 0", fontSize: 11, color: COLORS.textMuted, fontStyle: "italic", lineHeight: 1.5 }}>
        "Cada tarea completada es una victoria."<br />
        <span style={{ fontSize: 10, marginTop: 4, display: "block" }}>— Sophos</span>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
        <svg width={220} height={240} viewBox="0 0 220 240">
          <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={10} fill="none" />
          <circle
            cx={cx} cy={cy} r={r}
            stroke="url(#timerGrad)"
            strokeWidth={10}
            fill="none"
            strokeDasharray={circ}
            strokeDashoffset={dash}
            strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ transition: "stroke-dashoffset 0.9s linear" }}
          />
          <defs>
            <linearGradient id="timerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.purple} />
              <stop offset="100%" stopColor={COLORS.teal} />
            </linearGradient>
          </defs>
          <ellipse cx={cx} cy={cy + 5} rx="38" ry="42" fill={COLORS.purple} />
          <circle cx={cx - 14} cy={cy} r="9" fill="white" />
          <circle cx={cx + 14} cy={cy} r="9" fill="white" />
          <circle cx={cx - 12} cy={cy + 2} r="5" fill="#0C1726" />
          <circle cx={cx + 16} cy={cy + 2} r="5" fill="#0C1726" />
          <circle cx={cx - 10} cy={cy} r="2" fill="white" />
          <circle cx={cx + 18} cy={cy} r="2" fill="white" />
          <path d={`M${cx - 8} ${cy + 12} Q${cx} ${cy + 20} ${cx + 8} ${cy + 12}`} stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          {[-30,-15,0,15,30].map((x, i) => (
            <path key={i} d={`M${cx + x} ${cy + 40} Q${cx + x - 5} ${cy + 58} ${cx + x + 3} ${cy + 68}`}
              stroke="#8a1fb0" strokeWidth="7" strokeLinecap="round" fill="none" />
          ))}
        </svg>
      </div>
      <div style={{ margin: "-8px 18px 10px", display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.06)", borderRadius: 20, padding: "6px 12px" }}>
        <span style={{ fontSize: 14 }}>🎵</span>
        <span style={{ fontSize: 11, color: COLORS.textMuted, flex: 1, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>Lo-fi study beats</span>
        <span style={{ fontSize: 14 }}>🔊</span>
      </div>
      <div style={{ textAlign: "center", fontSize: 52, fontWeight: 800, letterSpacing: "-2px", fontFamily: "Sora", animation: running ? "timerTick 2s ease-in-out infinite" : "none" }}>
        {mins}:{secs}
      </div>
      <div style={{ display: "flex", gap: 10, margin: "14px 18px 0" }}>
        <button onClick={() => setRunning(false)} style={{ flex: 1, background: "rgba(255,255,255,0.08)", border: "none", borderRadius: 10, color: "white", padding: "10px 0", fontFamily: "Sora", fontWeight: 600, fontSize: 13, cursor: "pointer" }}>
          DETENER
        </button>
        <button onClick={() => setRunning(r => !r)} style={{ flex: 1, background: COLORS.purple, border: "none", borderRadius: 10, color: "white", padding: "10px 0", fontFamily: "Sora", fontWeight: 600, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
          ⏱ {running ? "PAUSAR" : "REANUDAR"}
        </button>
      </div>
    </div>
  );
};

// ── Calendar mockup ────────────────────────────────────────────────────────────
const CalendarMockup = () => {
  const tasks = [
    { time: "9:30", dur: "1h 30m", name: "Tiempo libre :)", done: false, color: COLORS.orange },
    { time: "11:00", dur: "1h 20m", name: "Clase Integral", done: true, color: COLORS.teal },
    { time: "12:30", dur: "1h 20m", name: "Taller de Matemáticas", done: false, color: COLORS.purple },
    { time: "14:00", dur: "1h 00m", name: "Estudio en grupo", done: false, color: COLORS.lime },
  ];
  return (
    <div style={{ background: COLORS.bgCard, borderRadius: 24, padding: 20, width: 280, border: `1px solid ${COLORS.border}`, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>Lunes 16</div>
          <div style={{ fontSize: 12, color: COLORS.textMuted }}>📅 Marzo de 2026</div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 13, color: COLORS.textMuted }}>
          <span>🏆 124</span>
          <span>✅ 14</span>
        </div>
      </div>
      {tasks.map((t, i) => (
        <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
          <div style={{ paddingTop: 4, fontSize: 11, color: COLORS.textMuted, width: 36, flexShrink: 0 }}>{t.time}</div>
          <div style={{ borderLeft: `3px solid ${t.color}`, paddingLeft: 10, flex: 1 }}>
            <div style={{ fontSize: 10, color: COLORS.textMuted }}>{t.dur}</div>
            <div style={{ fontSize: 13, fontWeight: t.done ? 400 : 600, textDecoration: t.done ? "line-through" : "none", opacity: t.done ? 0.5 : 1 }}>{t.name}</div>
          </div>
          {t.done && <span style={{ color: COLORS.teal, fontSize: 14 }}>✓</span>}
        </div>
      ))}
    </div>
  );
};

// ── Ranking mockup ─────────────────────────────────────────────────────────────
const RankingMockup = () => {
  const users = [
    { name: "Simón Pineda", pts: 124, rank: 1, avatar: "🧑‍💻" },
    { name: "Alejandro Flech", pts: 118, rank: 2, avatar: "👩‍🎓" },
    { name: "Sebastián Robles", pts: 105, rank: 3, avatar: "🧑‍🎓" },
    { name: "Daniel Colmenares", pts: 98, rank: 4, avatar: "👨‍💻" },
    { name: "Isabella Naranjo", pts: 91, rank: 5, avatar: "👩‍💻" },
  ];
  const medals = ["🥇", "🥈", "🥉", "4", "5"];
  return (
    <div style={{ background: COLORS.bgCard, borderRadius: 24, padding: 20, width: 270, border: `1px solid ${COLORS.border}`, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>Copa Oro 🏆</div>
        <div style={{ fontSize: 12, color: COLORS.textMuted }}>⏱ 3 días restantes</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16, alignItems: "flex-end" }}>
        {[users[1], users[0], users[2]].map((u, i) => {
          const heights = [60, 80, 50];
          const colors = [COLORS.textMuted, "#FFD700", COLORS.orange];
          return (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22 }}>{u.avatar}</div>
              <div style={{ width: 60, height: heights[i], background: colors[i], borderRadius: "8px 8px 0 0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                {["🥈","🥇","🥉"][i]}
              </div>
            </div>
          );
        })}
      </div>
      {users.map((u, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: i < users.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
          <span style={{ fontSize: 15, width: 24 }}>{medals[i]}</span>
          <span style={{ fontSize: 18 }}>{u.avatar}</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{u.name}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>✓ {u.pts} octopoints</div>
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, color: i === 0 ? "#FFD700" : COLORS.textMuted }}>{u.rank}</span>
        </div>
      ))}
    </div>
  );
};

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      transition: "all 0.3s ease",
      background: scrolled ? "rgba(12,23,38,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(181,50,217,0.15)" : "none",
      padding: "0 5vw",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.teal})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🐙</div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>Sophos</span>
        </div>
        <div className="nav-desktop-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Producto", "Características", "Testimonios", "Precios"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-secondary nav-secondary-btn" style={{ padding: "9px 22px", fontSize: 14 }}>Iniciar sesión</button>
          <button className="btn-primary" style={{ padding: "9px 22px", fontSize: 14 }}><span>Comenzar gratis →</span></button>
        </div>
      </div>
    </nav>
  );
};

// ── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section id="producto" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 68 }}>
    <div className="glow-blob" style={{ width: 600, height: 600, background: "radial-gradient(circle, rgba(181,50,217,0.25) 0%, transparent 70%)", top: -100, right: -100 }} />
    <div className="glow-blob" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(108,255,253,0.1) 0%, transparent 70%)", bottom: 0, left: -50 }} />

    {[...Array(12)].map((_, i) => (
      <div key={i} style={{
        position: "absolute",
        width: 3 + (i % 3),
        height: 3 + (i % 3),
        borderRadius: "50%",
        background: [COLORS.purple, COLORS.teal, COLORS.lime, COLORS.orange][i % 4],
        top: `${10 + (i * 7) % 80}%`,
        left: `${5 + (i * 9) % 85}%`,
        animation: `twinkle ${2 + (i * 0.4)}s ${i * 0.3}s ease-in-out infinite`,
      }} />
    ))}

    <div className="hero-layout" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 5vw", display: "flex", alignItems: "center", gap: 60, width: "100%", zIndex: 1 }}>
      <div className="hero-left" style={{ flex: 1 }}>
        <div className="pill fadein" style={{ marginBottom: 24 }}>
          <span>🐙</span> Tu asistente académico con IA
        </div>

        <h1 className="fadein-d1 hero-title" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 24 }}>
          Organiza tu estudio.<br />
          <span className="gradient-text">Sophos lo hace</span><br />
          por ti.
        </h1>

        <p className="fadein-d2" style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
          La plataforma de productividad que prioriza tus tareas automáticamente, te mantiene en foco con Pomodoro gamificado y compite con tus amigos.
        </p>

        <div className="fadein-d3 hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <button className="btn-primary" style={{ fontSize: 17, padding: "15px 36px" }}>
            <span>🚀 Empieza gratis hoy</span>
          </button>
          <button className="btn-secondary" style={{ fontSize: 17 }}>
            Ver demo →
          </button>
        </div>

        <div className="fadein-d4 hero-proof" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { icon: "🎓", label: "Probado con +50 estudiantes" },
            { icon: "⭐", label: "9/10 reducen su ansiedad" },
            { icon: "🏆", label: "Top 3 apps de bienestar" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.textMuted }}>
              <span>{c.icon}</span> {c.label}
            </div>
          ))}
        </div>
      </div>

      <div className="fadein-d2 hero-mockups" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 520 }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
          <OctopusMascot size={180} />
        </div>
        <div style={{ position: "absolute", top: 20, right: -20, animation: "slideLeft 1s 0.5s ease both" }}>
          <PomodoroMockup />
        </div>
      </div>
    </div>

    <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: COLORS.textMuted, fontSize: 12 }}>
      <span>Desliza para explorar</span>
      <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, ${COLORS.purple}, transparent)` }} />
    </div>
  </section>
);

// ── Problem section ───────────────────────────────────────────────────────────
const Problem = () => (
  <section style={{ padding: "100px 5vw", position: "relative" }}>
    <div className="glow-blob" style={{ width: 500, height: 300, background: "radial-gradient(circle, rgba(241,138,106,0.12) 0%, transparent 70%)", top: 0, left: "30%" }} />
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }} className="section-reveal">
        <div className="pill" style={{ marginBottom: 16 }}>😤 El problema real</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px", lineHeight: 1.15 }}>
          ¿Te suena familiar<br />alguna de estas situaciones?
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }} className="section-reveal">
        {[
          { emoji: "😵", title: "Parálisis por análisis", desc: "Tantas tareas que no sabes por cuál empezar, y terminas sin hacer ninguna.", color: COLORS.orange },
          { emoji: "📱", title: "Dopamina de TikTok", desc: "Abres Instagram 'solo 5 minutos' y terminas 2 horas después sintiéndote culpable.", color: COLORS.purple },
          { emoji: "🌙", title: "Trasnocho de último minuto", desc: "El pánico del deadline activa el modo crisis: todo en una noche, sin dormir.", color: COLORS.teal },
          { emoji: "🧠", title: "TDAH sin herramientas", desc: "Las apps existentes no están diseñadas para ti. Notion es complejo, Forest te castiga.", color: COLORS.lime },
        ].map((p, i) => (
          <div key={i} className="card-hover" style={{
            background: COLORS.bgCard,
            borderRadius: 20,
            padding: 28,
            border: `1px solid rgba(255,255,255,0.06)`,
            borderTop: `2px solid ${p.color}`,
          }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>{p.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: p.color }}>{p.title}</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: 48, fontSize: 14, color: COLORS.textMuted }} className="section-reveal">
        <div style={{ marginBottom: 12 }}>Sin una solución, el costo es real:</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {["❌ Materias pérdidas", "❌ Semestres adicionales", "❌ Burnout y ansiedad", "❌ Baja autoestima"].map(t => (
            <span key={t} style={{ color: COLORS.orange, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 32, fontSize: 36 }}>↓</div>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.purpleLight, marginTop: 8 }}>
          Sophos lo resuelve todo en una sola app.
        </div>
      </div>
    </div>
  </section>
);

// ── Features ──────────────────────────────────────────────────────────────────
const Features = () => {
  const features = [
    {
      icon: "🤖", color: COLORS.purple, title: "Organización Automática con IA",
      desc: "Sophos sincroniza con Brightspace/Bloque Neon y crea tu horario diario automáticamente. Sin configuración manual, sin listas eternas.",
      bullets: ["Priorización inteligente por deadline y urgencia", "Sincronización automática de tareas del LMS", "Subtareas generadas desde el enunciado"],
    },
    {
      icon: "⏱️", color: COLORS.teal, title: "Pomodoro Personalizado",
      desc: "Intervalos adaptables según tu neurodivergencia. Con estímulos auditivos, visuales y tu música favorita para mantenerte en flow.",
      bullets: ["Estímulos personalizables", "Música de fondo integrada", "Contador de interrupciones"],
    },
    {
      icon: "🏆", color: COLORS.orange, title: "Gamificación y Comunidad",
      desc: "Gana Octopoints completando tareas. Compite en ligas semanales con tus amigos. Convierte estudiar en algo que quieres hacer.",
      bullets: ["Ligas semanales Bronce → Oro", "Rankings y logros sociales", "Grupos de estudio sincronizados"],
    },
    {
      icon: "📊", color: COLORS.lime, title: "Estadísticas de Progreso",
      desc: "Visualiza cuánto tiempo estudias, cuántas tareas completas y cómo mejoras semana a semana. También para asesores académicos.",
      bullets: ["Dashboard personal", "Panel institucional", "Alertas tempranas de riesgo"],
    },
  ];

  return (
    <section id="características" style={{ padding: "100px 5vw", background: `linear-gradient(180deg, ${COLORS.bg} 0%, rgba(181,50,217,0.04) 50%, ${COLORS.bg} 100%)` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }} className="section-reveal">
          <div className="pill" style={{ marginBottom: 16 }}>✨ Características</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px" }}>
            Todo lo que necesitas<br />
            <span className="gradient-text">en un solo lugar</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
          {features.map((f, i) => (
            <div key={i} className="section-reveal feature-row" style={{ display: "flex", gap: 60, alignItems: "center", flexDirection: i % 2 === 1 ? "row-reverse" : "row", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 280 }}>
                <div className="feature-icon" style={{ background: `${f.color}22`, marginBottom: 20 }}>
                  <span style={{ fontSize: 26 }}>{f.icon}</span>
                </div>
                <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 12, letterSpacing: "-0.5px" }}>{f.title}</h3>
                <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 20 }}>{f.desc}</p>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {f.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                      <span style={{ width: 20, height: 20, borderRadius: 6, background: `${f.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: f.color, flexShrink: 0 }}>✓</span>
                      <span style={{ color: COLORS.textMuted }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ flex: 1, minWidth: 280, display: "flex", justifyContent: "center" }}>
                {i === 0 && <CalendarMockup />}
                {i === 1 && <PomodoroMockup />}
                {i === 2 && <RankingMockup />}
                {i === 3 && (
                  <div style={{ background: COLORS.bgCard, borderRadius: 24, padding: 28, width: 280, border: `1px solid ${COLORS.border}` }}>
                    <div style={{ fontWeight: 700, marginBottom: 20 }}>📊 Tu semana en Sophos</div>
                    {[
                      { label: "Tiempo de enfoque", value: "14h 20m", max: 20, color: COLORS.purple },
                      { label: "Tareas completadas", value: "23/27", max: 27, color: COLORS.teal },
                      { label: "Racha actual", value: "7 días 🔥", max: 7, color: COLORS.orange },
                      { label: "Octopoints", value: "342 pts", max: 400, color: COLORS.lime },
                    ].map((s, j) => (
                      <div key={j} style={{ marginBottom: 16 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                          <span style={{ color: COLORS.textMuted }}>{s.label}</span>
                          <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
                        </div>
                        <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${(parseInt(s.value) / s.max) * 100 || 70}%`, background: s.color, borderRadius: 3, transition: "width 1s ease" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Stats ─────────────────────────────────────────────────────────────────────
const Stats = () => (
  <section style={{ padding: "80px 5vw", background: `linear-gradient(135deg, rgba(181,50,217,0.08), rgba(108,255,253,0.05))`, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, textAlign: "center" }} className="section-reveal">
        {[
          { num: "+50", label: "Estudiantes probaron el MVP", sub: "de múltiples carreras" },
          { num: "9/10", label: "Reducirían su ansiedad académica", sub: "según pruebas de usuario" },
          { num: "80%", label: "Lo usaría en la universidad", sub: "validado con estudiantes" },
          { num: "30%", label: "Rentabilidad proyectada", sub: "con modelo B2B institucional" },
        ].map((s, i) => (
          <div key={i}>
            <div className="stat-number">{s.num}</div>
            <div style={{ fontWeight: 700, fontSize: 15, margin: "8px 0 6px" }}>{s.label}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.5 }}>{s.sub}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── How it works ──────────────────────────────────────────────────────────────
const HowItWorks = () => (
  <section style={{ padding: "100px 5vw" }}>
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 72 }} className="section-reveal">
        <div className="pill" style={{ marginBottom: 16 }}>🗺️ Cómo funciona</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px" }}>
          3 pasos para transformar<br />
          <span className="gradient-text">tu productividad</span>
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }} className="section-reveal">
        {[
          { num: "01", icon: "🔗", color: COLORS.purple, title: "Conecta tu universidad", desc: "Sophos se sincroniza con Brightspace o Bloque Neon en segundos. Todas tus tareas aparecen organizadas automáticamente." },
          { num: "02", icon: "🧠", color: COLORS.teal, title: "Sophos organiza por ti", desc: "Nuestro algoritmo greedy analiza tus tareas y crea un horario diario óptimo. Solo abre la app y sigue el plan." },
          { num: "03", icon: "🚀", color: COLORS.orange, title: "Fócate, completa y sube de liga", desc: "Usa el Pomodoro personalizado, gana Octopoints con cada tarea completa y compite con tus amigos.", cta: "Comenzar ahora →" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start", position: "relative", paddingBottom: 48 }}>
            {i < 2 && <div style={{ position: "absolute", left: 32, top: 72, width: 2, height: "calc(100% - 24px)", background: `linear-gradient(to bottom, ${s.color}44, transparent)` }} />}
            <div style={{ width: 64, height: 64, borderRadius: 18, background: `${s.color}22`, border: `2px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>
              {s.icon}
            </div>
            <div style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 12, color: s.color, fontWeight: 700, letterSpacing: "2px", marginBottom: 6 }}>PASO {s.num}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 520 }}>{s.desc}</p>
              {s.cta && <button className="btn-primary" style={{ marginTop: 20 }}><span>{s.cta}</span></button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Testimonials ──────────────────────────────────────────────────────────────
const Testimonials = () => (
  <section id="testimonios" style={{ padding: "100px 5vw", background: `linear-gradient(180deg, ${COLORS.bg}, rgba(181,50,217,0.04))` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }} className="section-reveal">
        <div className="pill" style={{ marginBottom: 16 }}>💬 Testimonios</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px" }}>
          Lo que dicen quienes<br />
          <span className="gradient-text">ya lo probaron</span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }} className="section-reveal">
        {[
          { name: "Martín R.", role: "Ing. Sistemas, TDAH", text: "Antes usaba Notion y lo abandonaba a los 3 días. Con Sophos solo abro la app y me dice qué hacer. La sincronización con Bloque Neon es magia pura.", stars: 5, avatar: "🧑‍💻" },
          { name: "Celia V.", role: "Diseño, ansiedad", text: "El Pomodoro con música de fondo cambió todo. Y lo de las ligas con mis amigos… por primera vez estudiar me da motivación y no culpa.", stars: 5, avatar: "👩‍🎓" },
          { name: "Camilo G.", role: "Ing. Industrial", text: "Tengo tiempo literalmente contado. Sophos organiza mis bloques de estudio sola. Recuperé 2 horas diarias que antes perdía decidiendo qué hacer.", stars: 5, avatar: "👨‍💼" },
        ].map((t, i) => (
          <div key={i} className="testimonial-card card-hover">
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
              {[...Array(t.stars)].map((_, j) => <span key={j} style={{ color: "#FFD700", fontSize: 14 }}>★</span>)}
            </div>
            <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 20, position: "relative", zIndex: 1 }}>
              {t.text}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `rgba(181,50,217,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Pricing ───────────────────────────────────────────────────────────────────
const Pricing = () => (
  <section id="precios" style={{ padding: "100px 5vw" }}>
    <div style={{ maxWidth: 900, margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }} className="section-reveal">
        <div className="pill" style={{ marginBottom: 16 }}>💰 Modelo B2B</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-1px" }}>
          Para universidades que invierten<br />
          <span className="gradient-text">en sus estudiantes</span>
        </h2>
        <p style={{ marginTop: 16, color: COLORS.textMuted, fontSize: 16 }}>
          La universidad paga — los estudiantes acceden gratis.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }} className="section-reveal">
        {[
          {
            name: "Básico", price: "$16,000 USD", period: "/año", students: "Hasta 1,500 estudiantes", color: COLORS.teal,
            features: ["5 cuentas de asesor", "Sincronización institucional", "Soporte estándar"], cta: "Solicitar demo", highlight: false,
          },
          {
            name: "Universitario", price: "$38,000 USD", period: "/año", students: "Hasta 5,000 estudiantes", color: COLORS.purple,
            features: ["20 cuentas de asesor", "Dashboard analítico avanzado", "Soporte dedicado 24/7"], cta: "Hablar con ventas", highlight: true,
          },
        ].map((p, i) => (
          <div key={i} className="card-hover" style={{
            background: p.highlight ? `linear-gradient(135deg, rgba(181,50,217,0.15), rgba(108,255,253,0.06))` : COLORS.bgCard,
            borderRadius: 24, padding: 32,
            border: p.highlight ? `2px solid ${COLORS.purple}` : `1px solid rgba(255,255,255,0.07)`,
            position: "relative",
          }}>
            {p.highlight && (
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: COLORS.purple, borderRadius: 100, padding: "4px 16px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                ⭐ Más popular
              </div>
            )}
            <div style={{ marginBottom: 8 }}><span style={{ fontSize: 12, fontWeight: 700, color: p.color, letterSpacing: "2px" }}>{p.name.toUpperCase()}</span></div>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 4 }}>{p.price}<span style={{ fontSize: 16, fontWeight: 400, color: COLORS.textMuted }}>{p.period}</span></div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{p.students}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {p.features.map((f, j) => (
                <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13 }}>
                  <span style={{ color: p.color, flexShrink: 0 }}>✓</span><span style={{ color: COLORS.textMuted }}>{f}</span>
                </li>
              ))}
            </ul>
            <button className={p.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%" }}><span>{p.cta}</span></button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Risk + Urgency ────────────────────────────────────────────────────────────
const RiskSection = () => (
  <section style={{ padding: "80px 5vw", background: `linear-gradient(135deg, rgba(241,138,106,0.06), rgba(181,50,217,0.06))`, borderTop: `1px solid rgba(241,138,106,0.15)` }}>
    <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }} className="section-reveal">
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
      <h2 style={{ fontSize: "clamp(24px, 3.5vw, 42px)", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 16 }}>
        Sin Sophos, el costo<br />
        <span style={{ color: COLORS.orange }}>se sigue acumulando</span>
      </h2>
      <p style={{ fontSize: 16, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 36, maxWidth: 600, margin: "0 auto 36px" }}>
        Estudiantes con TDAH tienen tasas de deserción 2-3 veces mayores. En universidades privadas, perder una materia cuesta semestres adicionales y cierra puertas.
      </p>
      <button className="btn-primary" style={{ fontSize: 17, padding: "15px 40px" }}>
        <span>🚀 Quiero Sophos para mi universidad</span>
      </button>
    </div>
  </section>
);

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{ padding: "120px 5vw", position: "relative", overflow: "hidden" }}>
    <div className="glow-blob" style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(181,50,217,0.2) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }} className="section-reveal">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
        <OctopusMascot size={140} />
      </div>
      <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20 }}>
        Deja de luchar contra<br />tu propia mente.<br />
        <span className="gradient-text">Sophos te acompaña.</span>
      </h2>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
        <button className="btn-primary" style={{ fontSize: 18, padding: "16px 44px" }}><span>🐙 Empieza gratis hoy</span></button>
      </div>
    </div>
  </section>
);

// ── Footer ────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{ padding: "48px 5vw", borderTop: `1px solid rgba(255,255,255,0.07)` }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.teal})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🐙</div>
        <span style={{ fontWeight: 700 }}>Sophos</span>
      </div>
      <div style={{ fontSize: 13, color: COLORS.textMuted }}>
        Grupo 1: Sebastián Robles, Simón Pineda, Alejandro Flechas, Daniel Colmenares, Isabella Naranjo
      </div>
    </div>
  </footer>
);

// ── Scroll reveal hook ────────────────────────────────────────────────────────
const useScrollReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".section-reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
};

// ── App ───────────────────────────────────────────────────────────────────────
export default function SophosLanding() {
  useScrollReveal();

  return (
    <div style={style.root}>
      <GlobalStyles />
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Problem />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <RiskSection />
      <FinalCTA />
      <Footer />
    </div>
  );
}