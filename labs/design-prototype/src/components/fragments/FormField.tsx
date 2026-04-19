//* @type Fragment
//* @context Global
//* @utility Campo de formulario irreducible: label + input con estilos base.

interface FormFieldProps {
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function FormField({
  label,
  type,
  required,
  value,
  onChange,
  placeholder,
}: FormFieldProps) {
  return (
    <div>
      <label className="text-sm text-neutral-off-dark dark:text-neutral-off">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 py-2 bg-neutral dark:bg-neutral-dark border border-neutral dark:border-neutral-surface-dark rounded-lg text-neutral-dark dark:text-neutral text-sm outline-none focus:ring-2 focus:ring-primary"
        placeholder={placeholder}
      />
    </div>
  );
}
