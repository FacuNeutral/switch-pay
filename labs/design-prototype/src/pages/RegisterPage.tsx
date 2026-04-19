//* @type Page
//* @context Auth
//* @utility Página standalone de registro de usuario.

import RegisterForm from "@/application/auth/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral dark:bg-neutral-dark px-4">
      <RegisterForm />
    </div>
  );
}
