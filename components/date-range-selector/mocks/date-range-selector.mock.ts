export interface DatePreset {
  label: string;
  days: number;
}

export interface DateRangeSelectorProps {
  startDate: string;
  endDate: string;
  onChange: (start: string, end: string) => void;
  presets?: DatePreset[];
}

export const dateRangeSelectorMock = {
  startDate: "2026-03-01",
  endDate: "2026-03-30",
  presets: [
    { label: "7d", days: 7 },
    { label: "30d", days: 30 },
    { label: "90d", days: 90 },
  ] as DatePreset[],
};
