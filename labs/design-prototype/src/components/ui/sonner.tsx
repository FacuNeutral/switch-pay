import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-neutral dark:group-[.toaster]:bg-neutral-dark group-[.toaster]:text-neutral-dark dark:group-[.toaster]:text-neutral group-[.toaster]:border-neutral dark:group-[.toaster]:border-neutral-off-dark group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-neutral-off-dark dark:group-[.toast]:text-neutral-off",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-neutral dark:group-[.toast]:bg-neutral-off-dark group-[.toast]:text-neutral-off-dark dark:group-[.toast]:text-neutral-off",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
