//* @type Organism
//* @context Auth
//* @utility Formulario de inicio de sesión con email y contraseña.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react"
import { useAuthStore } from "@/zustand/auth/auth.slice";
import { Loader2 } from "lucide-react";
import { spin, scaleIn, spring } from "@/styles/animations"
import FormField from "@/components/fragments/FormField";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuthStore();
  const navigate = useNavigate();

  //* Envía credenciales y redirige al home si el login es exitoso.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate("/");
  };

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
        <h1 className="text-xl font-semibold text-neutral-dark dark:text-neutral">Iniciar sesión</h1>
        <p className="text-sm text-neutral-off-dark dark:text-neutral-off">Accede a tu cuenta de VidTube</p>
      </div>

      {/* <Tag> Main — formulario de credenciales */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="Correo electrónico" type="email" required value={email} onChange={setEmail} placeholder="tu@email.com" />
        <FormField label="Contraseña" type="password" required value={password} onChange={setPassword} placeholder="••••••••" />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <motion.span variants={spin} initial="initial" animate="animate">
                <Loader2 className="w-4 h-4" />
              </motion.span>
              Iniciando sesión...
            </>
          ) : (
            "Iniciar sesión"
          )}
        </button>
      </form>

      {/* <Tag> Footer — enlace a registro */}
      <p className="text-center text-sm text-neutral-off-dark dark:text-neutral-off">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-info hover:underline">
          Regístrate
        </Link>
      </p>
    </motion.div>
  );
}
