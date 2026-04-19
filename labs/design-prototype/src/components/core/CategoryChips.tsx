//* @type Molecule
//* @context Global
//* @utility Barra horizontal de chips para filtrar por categoría.

interface CategoryChipsProps {
  categories: string[];
  active: string;
  onSelect: (cat: string) => void;
}

export default function CategoryChips({ categories, active, onSelect }: CategoryChipsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-hide py-3 px-1">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
            active === cat
              ? "bg-neutral-dark dark:bg-neutral text-neutral dark:text-neutral-dark"
              : "bg-neutral dark:bg-neutral-surface-dark text-neutral-dark dark:text-neutral hover:bg-neutral dark:hover:bg-neutral-off-dark"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
