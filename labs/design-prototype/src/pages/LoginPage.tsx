//* @type Page
//* @context Auth
//* @utility Página standalone de inicio de sesión.

import LoginForm from "@/application/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral dark:bg-neutral-dark px-4">
      <LoginForm />
    </div>
  );
}
