//* @type Integration Component
//* @context Design Tokens
//* @utility Vista de tokens agrupada por categoría/subcategoría con editores inline según tipo.

import { ChevronDown, ChevronRight, RotateCcw } from "lucide-react";
import { useDesignTokensStore } from "../store/design-tokens.slice";
import { TOKEN_CATEGORIES, groupTokens, type DesignToken } from "../store/design-tokens.mock";
import DTTokenRow from "./DTTokenRow";

export default function DTTokensView() {
  const tokens = useDesignTokensStore((s) => s.tokens);
  const loading = useDesignTokensStore((s) => s.loading);
  const expandedCategories = useDesignTokensStore((s) => s.expandedCategories);
  const toggleCategory = useDesignTokensStore((s) => s.toggleCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-sm text-debug-text-muted dark:text-debug-text-muted-dark animate-pulse">
          Loading tokens...
        </span>
      </div>
    );
  }

  const grouped = groupTokens(tokens);

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      {TOKEN_CATEGORIES.map((cat) => {
        const subMap = grouped.get(cat.id);
        if (!subMap) return null;
        const isExpanded = expandedCategories.has(cat.id);

        return (
          <div key={cat.id} className="mb-4">
            {/* <Tag> Category Header */}
            <button
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center gap-2 w-full py-2.5 px-3 rounded-(--radius-debug-tab) text-left hover:bg-debug-surface-overlay dark:hover:bg-debug-surface-overlay-dark transition-colors duration-150"
            >
              {isExpanded ? (
                <ChevronDown size={14} className="text-debug-primary" />
              ) : (
                <ChevronRight size={14} className="text-debug-text-muted dark:text-debug-text-muted-dark" />
              )}
              <span className="text-sm font-semibold text-debug-text dark:text-debug-text-dark">
                {cat.label}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-debug-text-muted dark:text-debug-text-muted-dark ml-auto">
                {Array.from(subMap.values()).reduce((acc, arr) => acc + arr.length, 0)} tokens
              </span>
            </button>

            {/* <Tag> Subcategories */}
            {isExpanded && (
              <div className="pl-5 mt-1 space-y-3">
                {cat.subcategories.map((sub) => {
                  const subTokens = subMap.get(sub.id);
                  if (!subTokens || subTokens.length === 0) return null;

                  return (
                    <div key={sub.id}>
                      <h4 className="text-[10px] uppercase tracking-widest font-semibold text-debug-text-muted dark:text-debug-text-muted-dark mb-2 px-2">
                        {sub.label}
                      </h4>
                      <div className="space-y-1">
                        {subTokens.map((token) => (
                          <DTTokenRow key={token.key} token={token} />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
