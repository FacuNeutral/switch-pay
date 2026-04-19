import { useState } from "react";
import { Box } from "@/components/primitives/Box";

//<ORGANISM>
export function Card() {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);

  return (
    <Box
      dataId="card"
      className={`rounded-2xl border select-none overflow-hidden transition-[width,background-color,border-color,box-shadow] duration-500 ease-in-out ${
        expanded ? "w-120" : "w-64"
      } ${
        active
          ? "bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20"
          : "bg-zinc-900 border-zinc-800 text-zinc-100"
      }`}
    >
      {/* Main content */}
      <Box dataId="card-body" className="p-6">
        {/* Header: icon + expand button */}
        <Box dataId="card-header" className="flex items-start justify-between mb-4">
          {/* Magic button — toggles active */}
          <Box
            dataId="card-icon"
            as="button"
            type="button"
            onClick={() => setActive((v) => !v)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 cursor-pointer ${
              active ? "bg-white/20 hover:bg-white/30" : "bg-violet-600/20 hover:bg-violet-600/30"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z"
              />
            </svg>
          </Box>

          {/* Expand button */}
          <Box
            dataId="card-expand-btn"
            as="button"
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors duration-300 cursor-pointer ${
              active
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-400"
            }`}
          >
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5M3.75 12h16.5m-16.5 8.25h16.5" />
            </svg>
          </Box>
        </Box>

        <Box dataId="card-title" as="h3" className="text-lg font-semibold mb-1">
          Example Card
        </Box>
        <Box
          dataId="card-description"
          as="p"
          className={`text-sm transition-colors duration-300 ${
            active ? "text-violet-200" : "text-zinc-500"
          }`}
        >
          Click the icon to change the background. Expand to see more.
        </Box>
      </Box>

      {/* Expanded panel */}
      <Box
        dataId="card-expanded-content"
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <Box className="overflow-hidden">
          <Box
            dataId="card-extra"
            className={`px-6 pb-6 pt-2 border-t text-sm flex flex-col gap-3 transition-colors duration-300 ${
              active ? "border-violet-500/40 text-violet-200" : "border-zinc-800 text-zinc-500"
            }`}
          >
            <Box as="p">
              This extra content appears when the card expands. Ideal for
              showing details, additional actions, or component metadata.
            </Box>
            <Box className="flex gap-2">
              {["data-id", "data-role", "MutationObserver"].map((tag) => (
                <Box
                  key={tag}
                  as="span"
                  className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                    active
                      ? "border-violet-400/40 text-violet-300"
                      : "border-zinc-700 text-zinc-500"
                  }`}
                >
                  {tag}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
