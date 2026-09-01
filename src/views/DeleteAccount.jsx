import { useState } from "react";
import {
  GoogleAuthProvider,
  OAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import mascot from "../assets/mascot.svg";

const COLORS = {
  bg: "#0C1726",
  bgCard: "#111e30",
  bgCard2: "#0f1a28",
  purple: "#B532D9",
  purpleLight: "#cc55f0",
  red: "#e2554c",
  redLight: "#f2776e",
  text: "#FEFEFF",
  textMuted: "#8ea3bc",
  border: "rgba(181,50,217,0.2)",
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { background: ${COLORS.bg}; }

    .da-root {
      font-family: 'Sora', 'DM Sans', sans-serif;
      background: ${COLORS.bg};
      color: ${COLORS.text};
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 5vw;
    }
    .da-card {
      width: 100%;
      max-width: 460px;
      background: ${COLORS.bgCard2};
      border: 1px solid ${COLORS.border};
      border-radius: 24px;
      padding: 40px;
      box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    }
    .da-input {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: white;
      padding: 14px 18px;
      border-radius: 12px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      width: 100%;
      transition: all 0.2s ease;
    }
    .da-input:focus {
      outline: none;
      border-color: ${COLORS.purple};
      background: rgba(255,255,255,0.08);
      box-shadow: 0 0 0 3px rgba(181,50,217,0.2);
    }
    .da-label {
      display: block;
      margin-bottom: 8px;
      font-size: 14px;
      font-weight: 600;
      color: ${COLORS.textMuted};
    }
    .da-btn-danger, .da-btn-secondary, .da-btn-provider {
      border: none;
      border-radius: 12px;
      padding: 14px 24px;
      font-size: 15px;
      font-weight: 600;
      font-family: 'Sora', sans-serif;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .da-btn-danger {
      background: linear-gradient(135deg, ${COLORS.red}, ${COLORS.redLight});
      color: white;
    }
    .da-btn-danger:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(226,85,76,0.4); }
    .da-btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
    .da-btn-secondary {
      background: transparent;
      color: ${COLORS.text};
      border: 1.5px solid rgba(255,255,255,0.15);
    }
    .da-btn-secondary:hover:not(:disabled) { border-color: ${COLORS.purple}; color: ${COLORS.purpleLight}; }
    .da-btn-provider {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      color: ${COLORS.text};
    }
    .da-btn-provider:hover:not(:disabled) { background: rgba(255,255,255,0.09); }
    .da-btn-provider:disabled, .da-btn-secondary:disabled { opacity: 0.6; cursor: not-allowed; }
  `}</style>
);

const ProviderIcon = ({ children }) => (
  <span style={{ fontSize: 18, lineHeight: 1 }}>{children}</span>
);

function LoginStep({ onAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const withLoading = async (fn) => {
    setError("");
    setLoading(true);
    try {
      await fn();
    } catch (err) {
      setError(mapAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    withLoading(async () => {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      onAuthenticated(cred.user);
    });
  };

  const handleProviderLogin = (providerId) => {
    withLoading(async () => {
      const provider =
        providerId === "google.com"
          ? new GoogleAuthProvider()
          : new OAuthProvider("microsoft.com");
      const cred = await signInWithPopup(auth, provider);
      onAuthenticated(cred.user);
    });
  };

  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
        Eliminar mi cuenta de Sophos
      </h1>
      <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 28, lineHeight: 1.5 }}>
        Inicia sesión para confirmar tu identidad antes de eliminar tu cuenta.
      </p>

      <form onSubmit={handleEmailLogin} style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
        <div>
          <label className="da-label" htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            className="da-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="da-label" htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            className="da-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" className="da-btn-danger" disabled={loading} style={{ marginTop: 4 }}>
          {loading ? "Verificando..." : "Continuar"}
        </button>
      </form>

      <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0", color: COLORS.textMuted, fontSize: 13 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
        o continúa con
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button type="button" className="da-btn-provider" onClick={() => handleProviderLogin("google.com")} disabled={loading}>
          <ProviderIcon>🔵</ProviderIcon> Google
        </button>
        <button type="button" className="da-btn-provider" onClick={() => handleProviderLogin("microsoft.com")} disabled={loading}>
          <ProviderIcon>🟦</ProviderIcon> Microsoft
        </button>
      </div>

      {error && (
        <p style={{ color: COLORS.redLight, fontSize: 13, marginTop: 20, textAlign: "center" }}>{error}</p>
      )}
    </>
  );
}

function ConfirmStep({ user, onBack, onDeleted }) {
  const [confirmText, setConfirmText] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canDelete = acknowledged && confirmText.trim().toUpperCase() === "ELIMINAR" && !loading;

  const handleDelete = async () => {
    setError("");
    setLoading(true);
    try {
      const idToken = await user.getIdToken();
      const res = await fetch("/api/users/profile/remove-account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${idToken}` },
      });
      if (!res.ok) {
        throw new Error(`request_failed_${res.status}`);
      }
      await signOut(auth);
      onDeleted();
    } catch (err) {
      console.error("Error eliminando la cuenta:", err);
      setError("No pudimos eliminar tu cuenta. Intenta de nuevo en unos minutos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
        Confirmar eliminación
      </h1>
      <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 4 }}>
        Sesión iniciada como <strong style={{ color: COLORS.text }}>{user.email}</strong>
      </p>
      <div style={{
        background: "rgba(226,85,76,0.08)",
        border: "1px solid rgba(226,85,76,0.3)",
        borderRadius: 12,
        padding: "16px 18px",
        margin: "20px 0",
        fontSize: 13.5,
        lineHeight: 1.6,
        color: COLORS.textMuted,
      }}>
        Esta acción es <strong style={{ color: COLORS.text }}>permanente e irreversible</strong>. Se
        eliminarán tu perfil, tareas, rachas, ligas y todo tu progreso en Sophos. No podrás recuperar
        esta información después.
      </div>

      <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13.5, color: COLORS.textMuted, marginBottom: 20, cursor: "pointer" }}>
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          disabled={loading}
          style={{ marginTop: 2 }}
        />
        Entiendo que esta acción no se puede deshacer.
      </label>

      <div style={{ marginBottom: 20 }}>
        <label className="da-label" htmlFor="confirmText">
          Escribe <strong style={{ color: COLORS.text }}>ELIMINAR</strong> para continuar
        </label>
        <input
          id="confirmText"
          type="text"
          className="da-input"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          disabled={loading}
          autoComplete="off"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <button type="button" className="da-btn-danger" onClick={handleDelete} disabled={!canDelete}>
          {loading ? "Eliminando cuenta..." : "Eliminar mi cuenta definitivamente"}
        </button>
        <button type="button" className="da-btn-secondary" onClick={onBack} disabled={loading}>
          Cancelar
        </button>
      </div>

      {error && (
        <p style={{ color: COLORS.redLight, fontSize: 13, marginTop: 20, textAlign: "center" }}>{error}</p>
      )}
    </>
  );
}

function DoneStep() {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={mascot} alt="" width={72} style={{ marginBottom: 20 }} />
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Cuenta eliminada</h1>
      <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, marginBottom: 28 }}>
        Tu cuenta y tus datos en Sophos se eliminaron correctamente. Gracias por haber sido parte de la comunidad.
      </p>
      <a href="/" className="da-btn-secondary" style={{ textDecoration: "none" }}>
        Volver al inicio
      </a>
    </div>
  );
}

function mapAuthError(err) {
  const code = err?.code || "";
  if (code.includes("invalid-credential") || code.includes("wrong-password") || code.includes("user-not-found")) {
    return "Correo o contraseña incorrectos.";
  }
  if (code.includes("popup-closed-by-user")) {
    return "Cerraste la ventana antes de terminar el inicio de sesión.";
  }
  if (code.includes("too-many-requests")) {
    return "Demasiados intentos. Intenta de nuevo más tarde.";
  }
  return "No pudimos verificar tu identidad. Intenta de nuevo.";
}

export default function DeleteAccount() {
  const [step, setStep] = useState("login");
  const [user, setUser] = useState(null);

  if (!auth) {
    return (
      <div className="da-root">
        <GlobalStyles />
        <div className="da-card">
          <p style={{ color: COLORS.redLight, textAlign: "center" }}>
            El servicio de autenticación no está disponible en este momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="da-root">
      <GlobalStyles />
      <div className="da-card">
        {step === "login" && (
          <LoginStep
            onAuthenticated={(loggedInUser) => {
              setUser(loggedInUser);
              setStep("confirm");
            }}
          />
        )}
        {step === "confirm" && user && (
          <ConfirmStep
            user={user}
            onBack={() => {
              signOut(auth).catch(() => {});
              setUser(null);
              setStep("login");
            }}
            onDeleted={() => setStep("done")}
          />
        )}
        {step === "done" && <DoneStep />}
      </div>
    </div>
  );
}
