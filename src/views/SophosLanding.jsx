import { useState, useEffect } from "react";
import { logEvent } from "firebase/analytics";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { analytics, db } from "../firebase";

// Importación de imágenes
import miniLogo from "../assets/miniLogo.png";
import mascot from "../assets/mascot.svg";

// 🎬 IMPORTACIÓN DE VIDEOS (Asegúrate de que los nombres coincidan con tus archivos en /assets)
import videoStats from "../assets/stats.mp4";
import videoLeagues from "../assets/leagues.mp4";
import videoPomodoro from "../assets/pomodoro.mp4";
import videoTasks from "../assets/tasks.mp4";

// Función para registrar clics genéricos en botones
const trackCTAClick = (buttonName) => {
  if (analytics) {
    logEvent(analytics, 'click_cta', { button_name: buttonName });
  }
};

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
    @keyframes slideLeft {
      from { opacity: 0; transform: translateX(40px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadein {
      from { opacity: 0; transform: translateY(28px); }
      to { opacity: 1; transform: translateY(0); }
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
      text-decoration: none;
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
    .btn-primary:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

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
      text-decoration: none;
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

    /* Estilos para inputs del formulario */
    .form-input {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: white;
      padding: 14px 18px;
      border-radius: 12px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      width: 100%;
      transition: all 0.2s ease;
    }
    .form-input:focus {
      outline: none;
      border-color: ${COLORS.purple};
      background: rgba(255, 255, 255, 0.08);
      box-shadow: 0 0 0 3px rgba(181, 50, 217, 0.2);
    }
    .form-label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      color: ${COLORS.textMuted};
    }

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
      .hero-layout { flex-direction: column !important; text-align: center; padding-top: 80px; gap: 40px !important; }
      .hero-left { display: flex; flex-direction: column; align-items: center; }
      .hero-buttons { justify-content: center; }
      .hero-proof { justify-content: center; }
      .hero-mockups { transform: scale(0.95); margin-top: 0px; min-height: unset !important; }
      .feature-row { flex-direction: column !important; text-align: center; }
      .feature-row > div { width: 100%; min-width: unset !important; }
      .feature-icon { margin: 0 auto 20px; }
      .feature-row ul { align-items: center; }
    }

    @media (max-width: 768px) {
      .nav-desktop-links { display: none !important; }
      .nav-secondary-btn { display: none !important; }
      h1.hero-title { font-size: 42px !important; line-height: 1.1 !important; }
      .hero-mockups { transform: scale(0.85); }
      section { padding: 60px 5vw !important; }
    }

    @media (max-width: 480px) {
      .hero-buttons { flex-direction: column; width: 100%; }
      .btn-primary, .btn-secondary { width: 100%; padding: 14px 20px !important; }
      .hero-mockups { transform: scale(0.75); margin-left: 0; }
      h1.hero-title { font-size: 34px !important; }
      .contact-radio-group { flex-direction: column; gap: 10px; }
    }
  `}</style>
);

// ── Octopus mascot ───────────────────────────────────────────────────────────
const OctopusMascot = ({ size = 200, animated = true }) => (
  <img 
    src={mascot}
    alt="Sophos Mascot" 
    width={size} 
    height={size} 
    style={{
      objectFit: 'contain',
      ...(animated ? { animation: "float 4s ease-in-out infinite" } : {})
    }}
  />
);

// ── Reproductor de Video Reutilizable ─────────────────────────────────────────
const AppVideo = ({ src }) => (
  <div style={{ 
    background: COLORS.bgCard, borderRadius: 28, padding: "8px", width: 280, 
    border: `1px solid ${COLORS.border}`, boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    display: "flex", justifyContent: "center", alignItems: "center", position: "relative"
  }}>
    <video
      src={src} autoPlay loop muted playsInline
      style={{ width: "100%", borderRadius: 20, objectFit: "cover", backgroundColor: COLORS.bgCard2 }}
    />
  </div>
);

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
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all 0.3s ease",
      background: scrolled ? "rgba(12,23,38,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(181,50,217,0.15)" : "none", padding: "0 5vw",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 38, height: 38, background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.teal})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
            <img style={{ width: 38, height: 38, borderRadius: 10}} alt="Mini sophos" src={miniLogo}  />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>Sophos</span>
        </div>
        <div className="nav-desktop-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Producto", "Características", "Testimonios", "Precios", "Contacto"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="#contacto" className="btn-primary" onClick={() => trackCTAClick('nav_contact_sales')} style={{ padding: "9px 22px", fontSize: 14 }}>
            <span>Contactar con ventas →</span>
          </a>
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
        position: "absolute", width: 3 + (i % 3), height: 3 + (i % 3), borderRadius: "50%",
        background: [COLORS.purple, COLORS.teal, COLORS.lime, COLORS.orange][i % 4],
        top: `${10 + (i * 7) % 80}%`, left: `${5 + (i * 9) % 85}%`,
        animation: `twinkle ${2 + (i * 0.4)}s ${i * 0.3}s ease-in-out infinite`,
      }} />
    ))}

    <div className="hero-layout" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 5vw", display: "flex", alignItems: "center", gap: 60, width: "100%", zIndex: 1 }}>
      <div className="hero-left" style={{ flex: 1 }}>
        <h1 className="fadein-d1 hero-title" style={{ fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 24 }}>
          Organiza tu estudio.<br /><span className="gradient-text">Sophos lo hace</span><br />por ti.
        </h1>
        <p className="fadein-d2" style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 480, marginBottom: 36 }}>
          Extraemos tus tareas, las desglosamos con IA, calculamos tus tiempos con Machine Learning y organizamos tu horario. Tú solo concéntrate en ejecutarlas.
        </p>
        <div className="fadein-d3 hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
          <a href="#contacto" className="btn-primary" onClick={() => trackCTAClick('hero_contact_sales')} style={{ fontSize: 17, padding: "15px 36px" }}>
            <span>🚀 Contactar con ventas</span>
          </a>
          <a href="#características" className="btn-secondary" onClick={() => trackCTAClick('hero_features')} style={{ fontSize: 17 }}>
            Ver plataforma →
          </a>
        </div>
        <div className="fadein-d4 hero-proof" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[
            { icon: "🎓", label: "Probado con +150 estudiantes" },
            { icon: "⚡", label: "Cero configuración manual" },
            { icon: "🧠", label: "Diseñado para neurodivergencias" },
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: COLORS.textMuted }}>
              <span>{c.icon}</span> {c.label}
            </div>
          ))}
        </div>
      </div>
      <div className="fadein-d2 hero-mockups" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", minHeight: 520 }}>
        <div style={{ position: "absolute", top: 20, right: -20, animation: "slideLeft 1s 0.5s ease both" }}>
          <AppVideo src={videoTasks} />
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
          <div key={i} className="card-hover" style={{ background: COLORS.bgCard, borderRadius: 20, padding: 28, border: `1px solid rgba(255,255,255,0.06)`, borderTop: `2px solid ${p.color}` }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>{p.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: p.color }}>{p.title}</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.6 }}>{p.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 48, fontSize: 14, color: COLORS.textMuted }} className="section-reveal">
        <div style={{ marginBottom: 12 }}>Sin una solución, el costo institucional es real:</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
          {["❌ Deserción temprana", "❌ Pérdida de materias", "❌ Burnout y ansiedad", "❌ Baja autoestima"].map(t => (
            <span key={t} style={{ color: COLORS.orange, fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div style={{ marginTop: 32, fontSize: 36 }}>↓</div>
        <div style={{ fontWeight: 700, fontSize: 18, color: COLORS.purpleLight, marginTop: 8 }}>
          Sophos lo resuelve todo en una sola plataforma.
        </div>
      </div>
    </div>
  </section>
);

// ── Features ──────────────────────────────────────────────────────────────────
const Features = () => {
  const features = [
    {
      icon: "🤖", color: COLORS.purple, title: "Organización Inteligente en 4 Pasos",
      desc: "Extraemos tus tareas de Bloque Neón. Luego, la IA las desglosa en subtareas, aplicamos Machine Learning para predecir cuánto tiempo te tomará cada una, y finalmente organizamos tu horario de forma óptima.",
      bullets: ["Extracción automática (Web Scraping)", "Desglose de tareas pesadas usando IA", "Estimación de tiempos con Machine Learning"],
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
      icon: "📊", color: COLORS.lime, title: "Seguimiento y Bienestar Estudiantil",
      desc: "Plataforma enfocada 100% en el bienestar estudiantil. Además, con Sophos logramos un acercamiento más real sobre la carga académica real de las diferentes materias para que la universidad tome decisiones basadas en datos concretos.",
      bullets: ["Seguimiento estudiantil preventivo", "Panel de métricas institucional", "Análisis de carga académica real"],
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
                <div className="feature-icon" style={{ background: `${f.color}22`, marginBottom: 20 }}><span style={{ fontSize: 26 }}>{f.icon}</span></div>
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
                {i === 0 && <AppVideo src={videoTasks} />}
                {i === 1 && <AppVideo src={videoPomodoro} />} 
                {i === 2 && <AppVideo src={videoLeagues} />}
                {i === 3 && <AppVideo src={videoStats} />}
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
          { num: "100%", label: "Automatizado", sub: "desde la extracción hasta el horario" },
          { num: "80%", label: "Lo usaría en la universidad", sub: "validado con estudiantes de Uniandes" },
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
          { num: "01", icon: "🔗", color: COLORS.purple, title: "Extracción de Tareas", desc: "Sophos realiza Web Scraping en Bloque Neón para obtener todas tus tareas y fechas de entrega en segundos." },
          { num: "02", icon: "🧠", color: COLORS.teal, title: "Análisis y Desglose Inteligente", desc: "La IA divide los trabajos complejos en subtareas manejables. Luego, mediante Machine Learning, calculamos el tiempo que te tomará y creamos tu horario óptimo." },
          { num: "03", icon: "🚀", color: COLORS.orange, title: "Fócate, completa y sube de liga", desc: "Usa el Pomodoro personalizado, gana Octopoints con cada tarea completa y compite con tus amigos.", cta: "Contactar con ventas →" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 32, alignItems: "flex-start", position: "relative", paddingBottom: 48 }}>
            {i < 2 && <div style={{ position: "absolute", left: 32, top: 72, width: 2, height: "calc(100% - 24px)", background: `linear-gradient(to bottom, ${s.color}44, transparent)` }} />}
            <div style={{ width: 64, height: 64, borderRadius: 18, background: `${s.color}22`, border: `2px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{s.icon}</div>
            <div style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 12, color: s.color, fontWeight: 700, letterSpacing: "2px", marginBottom: 6 }}>PASO {s.num}</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 520 }}>{s.desc}</p>
              {s.cta && <a href="#contacto" className="btn-primary" onClick={() => trackCTAClick('how_it_works_sales')} style={{ marginTop: 20 }}><span>{s.cta}</span></a>}
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
          Lo que dicen quienes<br /><span className="gradient-text">ya lo probaron</span>
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }} className="section-reveal">
        {[
          { name: "Martín R.", role: "Ing. Sistemas, TDAH", text: "Antes usaba Notion y lo abandonaba a los 3 días. La sincronización con Bloque Neon es magia pura.", stars: 5, avatar: "🧑‍💻" },
          { name: "Celia V.", role: "Diseño, ansiedad", text: "El Pomodoro con música de fondo cambió todo. Y lo de las ligas con mis amigos… por primera vez estudiar me da motivación y no culpa.", stars: 5, avatar: "👩‍🎓" },
          { name: "Camilo G.", role: "Ing. Industrial", text: "Tengo tiempo literalmente contado. Sophos automatiza mis bloques de estudio. Recuperé 2 horas diarias que antes perdía organizándome.", stars: 5, avatar: "👨‍💼" },
        ].map((t, i) => (
          <div key={i} className="testimonial-card">
            <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>{[...Array(t.stars)].map((_, j) => <span key={j} style={{ color: "#FFD700", fontSize: 14 }}>★</span>)}</div>
            <p style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.7, marginBottom: 20, position: "relative", zIndex: 1 }}>{t.text}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: `rgba(181,50,217,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{t.avatar}</div>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div><div style={{ fontSize: 12, color: COLORS.textMuted }}>{t.role}</div></div>
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
          Para universidades que invierten<br /><span className="gradient-text">en el bienestar de sus estudiantes</span>
        </h2>
        <p style={{ marginTop: 16, color: COLORS.textMuted, fontSize: 16 }}>La universidad paga — los estudiantes acceden gratis.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }} className="section-reveal">
        {[
          { name: "Básico", price: "$16,000 USD", period: "/año", students: "Hasta 1,500 estudiantes", color: COLORS.teal, features: ["5 cuentas de asesor", "Sincronización institucional", "Soporte estándar"], cta: "Solicitar demo", highlight: false },
          { name: "Universitario", price: "$38,000 USD", period: "/año", students: "Hasta 15,000 estudiantes", color: COLORS.purple, features: ["20 cuentas de asesor", "Dashboard de carga real", "Soporte dedicado 24/7"], cta: "Hablar con ventas", highlight: true },
        ].map((p, i) => (
          <div key={i} className="card-hover" style={{ background: p.highlight ? `linear-gradient(135deg, rgba(181,50,217,0.15), rgba(108,255,253,0.06))` : COLORS.bgCard, borderRadius: 24, padding: 32, border: p.highlight ? `2px solid ${COLORS.purple}` : `1px solid rgba(255,255,255,0.07)`, position: "relative" }}>
            {p.highlight && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: COLORS.purple, borderRadius: 100, padding: "4px 16px", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>⭐ Más popular</div>}
            <div style={{ marginBottom: 8 }}><span style={{ fontSize: 12, fontWeight: 700, color: p.color, letterSpacing: "2px" }}>{p.name.toUpperCase()}</span></div>
            <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 4 }}>{p.price}<span style={{ fontSize: 16, fontWeight: 400, color: COLORS.textMuted }}>{p.period}</span></div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 24, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>{p.students}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
              {p.features.map((f, j) => <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13 }}><span style={{ color: p.color, flexShrink: 0 }}>✓</span><span style={{ color: COLORS.textMuted }}>{f}</span></li>)}
            </ul>
            <a href="#contacto" className={p.highlight ? "btn-primary" : "btn-secondary"} onClick={() => trackCTAClick(`pricing_${p.name.toLowerCase()}`)} style={{ width: "100%" }}><span>{p.cta}</span></a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ── Contact Form Section ──────────────────────────────────────────────────────
const ContactForm = () => {
  const [role, setRole] = useState("universidad");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Rastrear el clic de envío básico
    trackCTAClick('form_submit');

    // 1. Recolectar datos de los inputs usando sus IDs
    const name = e.target.querySelector('#name').value;
    const email = e.target.querySelector('#email').value;
    const institution = role === "universidad" ? e.target.querySelector('#institution').value : "N/A";
    const message = e.target.querySelector('#message').value;

    try {
      // 2. Guardar en Firestore si está disponible
      if (db) {
        await addDoc(collection(db, "contact_leads"), {
          role: role,
          name: name,
          email: email,
          institution: institution,
          message: message,
          createdAt: serverTimestamp() // Marca de tiempo oficial del servidor de Firebase
        });
      } else {
         console.warn("Base de datos no inicializada. Revisa tu config de Firebase.");
      }

      // 3. Registrar un Lead exitoso en Google Analytics
      if (analytics) {
        logEvent(analytics, 'generate_lead', {
          currency: "USD",
          value: role === "universidad" ? 100 : 0, // Damos más peso analítico si es universidad
          role_type: role
        });
      }

    //   alert("¡Gracias por tu interés! Nos pondremos en contacto pronto.");
      e.target.reset(); // Limpiar el formulario
      
    } catch (error) {
      console.error("Error al guardar el contacto: ", error);
    //   alert("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.");
    } finally {
      setIsSubmitting(false); // Restaurar el estado del botón
    }
  };

  return (
    <section id="contacto" style={{ padding: "100px 5vw", position: "relative", zIndex: 2 }}>
      <div className="glow-blob" style={{ width: 400, height: 400, background: "radial-gradient(circle, rgba(181,50,217,0.15) 0%, transparent 70%)", top: "20%", right: "10%" }} />
      <div style={{ maxWidth: 700, margin: "0 auto", background: COLORS.bgCard2, borderRadius: 24, padding: "48px 5vw", border: `1px solid ${COLORS.border}`, boxShadow: "0 32px 80px rgba(0,0,0,0.5)", position: "relative" }} className="section-reveal">
        
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
            Hablemos sobre <span className="gradient-text">Sophos</span>
          </h2>
          <p style={{ color: COLORS.textMuted, fontSize: 16 }}>
            Completa este formulario y transformemos el bienestar estudiantil en tu institución.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Selector de Rol */}
          <div>
            <span className="form-label">¿Desde dónde nos escribes?</span>
            <div className="contact-radio-group" style={{ display: "flex", gap: 16 }}>
              {[
                { id: "universidad", label: "🏫 Rep. de Universidad" },
                { id: "estudiante", label: "🎓 Soy Estudiante" }
              ].map(opt => (
                <label key={opt.id} style={{
                  flex: 1, padding: "14px", borderRadius: 12, cursor: "pointer", textAlign: "center", fontSize: 14, fontWeight: 600, transition: "all 0.2s",
                  background: role === opt.id ? "rgba(181,50,217,0.15)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${role === opt.id ? COLORS.purple : "rgba(255,255,255,0.1)"}`,
                  color: role === opt.id ? COLORS.text : COLORS.textMuted
                }}>
                  <input type="radio" name="role" value={opt.id} checked={role === opt.id} onChange={() => setRole(opt.id)} style={{ display: "none" }} />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 24 }}>
            <div>
              <label className="form-label" htmlFor="name">Nombre completo</label>
              <input type="text" id="name" className="form-input" placeholder="Ej. Ana García" required />
            </div>
            <div>
              <label className="form-label" htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" className="form-input" placeholder="ana@universidad.edu.co" required />
            </div>
          </div>

          {role === "universidad" && (
            <div className="fadein">
              <label className="form-label" htmlFor="institution">Institución educativa</label>
              <input type="text" id="institution" className="form-input" placeholder="Nombre de la universidad" required />
            </div>
          )}

          <div>
            <label className="form-label" htmlFor="message">¿Cómo podemos ayudarte?</label>
            <textarea id="message" rows="4" className="form-input" placeholder={role === "universidad" ? "Me interesa conocer más sobre las métricas de carga académica real..." : "Me gustaría que mi universidad implementara Sophos..."} required style={{ resize: "vertical" }}></textarea>
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ padding: "16px", fontSize: 16, marginTop: 8 }}>
            <span>{isSubmitting ? "Enviando..." : "Enviar mensaje →"}</span>
          </button>
        </form>

      </div>
    </section>
  );
};

// ── Final CTA ─────────────────────────────────────────────────────────────────
const FinalCTA = () => (
  <section style={{ padding: "120px 5vw", position: "relative", overflow: "hidden" }}>
    <div className="glow-blob" style={{ width: 700, height: 700, background: "radial-gradient(circle, rgba(181,50,217,0.2) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
    <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }} className="section-reveal">
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}><OctopusMascot size={300} /></div>
      <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.1, marginBottom: 20 }}>
        Deja de luchar contra<br />tu propia mente.<br />
        <span className="gradient-text">Sophos te acompaña.</span>
      </h2>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
        <a href="#contacto" className="btn-primary" onClick={() => trackCTAClick('final_cta_sales')} style={{ fontSize: 18, padding: "16px 44px" }}><span>🐙 Contactar con ventas</span></a>
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

// ── Scroll reveal & Page View Hook ────────────────────────────────────────────
const useScrollAndAnalytics = () => {
  useEffect(() => {
    // Log inicial de Analytics de vista de página
    if (analytics) {
      logEvent(analytics, 'page_view', { page_title: 'Sophos Landing Page' });
    }

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
  useScrollAndAnalytics();

  return (
    <div style={style.root}>
      <GlobalStyles />
      <div className="noise-overlay" />
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <HowItWorks />
      <Stats />
      <Testimonials />
      <Pricing />
      <ContactForm />
      <FinalCTA />
      <Footer />
    </div>
  );
}