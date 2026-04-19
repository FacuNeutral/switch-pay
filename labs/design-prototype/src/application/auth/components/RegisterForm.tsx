//* @type Organism
//* @context Auth
//* @utility Formulario de registro con flujo multi-paso (form → loading → success).

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react"
import { useAuthStore } from "@/zustand/auth/auth.slice";
import { Loader2, CheckCircle } from "lucide-react";
import { spin, scaleIn, popIn, spring } from "@/styles/animations"
import FormField from "@/components/fragments/FormField";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"form" | "loading" | "success">("form");
  const { register } = useAuthStore();
  const navigate = useNavigate();

  //* Registra al usuario, muestra feedback de éxito y redirige al home.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("loading");
    await register(name, email, password);
    setStep("success");
    setTimeout(() => navigate("/"), 1500);
  };

  if (step === "success") {
    return (
      <motion.div
        className="w-full max-w-sm bg-neutral dark:bg-neutral-dark border border-neutral dark:border-neutral-surface-dark rounded-xl p-8 space-y-6"
        variants={popIn}
        initial="hidden"
        animate="visible"
        transition={spring}
      >
        <div className="text-center space-y-4 py-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring}>
            <CheckCircle className="w-16 h-16 text-success mx-auto" />
          </motion.div>
          <h2 className="text-xl font-semibold text-neutral-dark dark:text-neutral">¡Cuenta creada!</h2>
          <p className="text-sm text-neutral-off-dark dark:text-neutral-off">Redirigiendo al inicio...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full max-w-sm bg-neutral dark:bg-neutral-dark border border-neutral dark:border-neutral-surface-dark rounded-xl p-8 space-y-6"
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      transition={spring}
    >
      {/* <Tag> Header — branding y título */}
      <div className="text-center space-y-2">
        <div className="mx-auto w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary-foreground fill-current">
            <path d="M10 8l6 4-6 4V8z" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold text-neutral-dark dark:text-neutral">Crear cuenta</h1>
        <p className="text-sm text-neutral-off-dark dark:text-neutral-off">Únete a VidTube gratis</p>
      </div>

      {/* <Tag> Main — formulario de registro */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField 
        label="Nombre" 
        type="text" 
        required value={name} 
        onChange={setName} 
        placeholder="Tu nombre" 
        />
        <FormField label="Correo electrónico" type="email" required value={email} onChange={setEmail} placeholder="tu@email.com" />
        <FormField label="Contraseña" type="password" required value={password} onChange={setPassword} placeholder="••••••••" />
        <button
          type="submit"
          disabled={step === "loading"}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {step === "loading" ? (
            <>
              <motion.span variants={spin} initial="initial" animate="animate">
                <Loader2 className="w-4 h-4" />
              </motion.span>
              Creando cuenta...
            </>
          ) : (
            "Registrarse"
          )}
        </button>
      </form>

      {/* <Tag> Footer — enlace a login */}
      <p className="text-center text-sm text-neutral-off-dark dark:text-neutral-off">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-info hover:underline">
          Inicia sesión
        </Link>
      </p>
    </motion.div>
  );
}
