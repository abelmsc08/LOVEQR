export type Theme = {
  id: string;
  name: string;
  swatch: [string, string, string];
  gradientFrom: string;
  gradientTo: string;
  deluxAccent: string;
};

export const themes: Theme[] = [
  {
    id: "classico",
    name: "Clássico",
    swatch: ["#b91c1c", "#ffffff", "#ef4444"],
    gradientFrom: "#b91c1c",
    gradientTo: "#7f1d1d",
    deluxAccent: "#b91c1c",
  },
  {
    id: "dourado",
    name: "Dourado",
    swatch: ["#b45309", "#ffffff", "#d97706"],
    gradientFrom: "#b45309",
    gradientTo: "#78350f",
    deluxAccent: "#b45309",
  },
  {
    id: "rose",
    name: "Rosé",
    swatch: ["#be185d", "#ffffff", "#f472b6"],
    gradientFrom: "#be185d",
    gradientTo: "#831843",
    deluxAccent: "#be185d",
  },
  {
    id: "safira",
    name: "Safira",
    swatch: ["#1e3a8a", "#ffffff", "#3b82f6"],
    gradientFrom: "#1e3a8a",
    gradientTo: "#0f172a",
    deluxAccent: "#1e3a8a",
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    swatch: ["#065f46", "#ffffff", "#10b981"],
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
    deluxAccent: "#065f46",
  },
  {
    id: "noturno",
    name: "Noturno",
    swatch: ["#27272a", "#ffffff", "#71717a"],
    gradientFrom: "#3f3f46",
    gradientTo: "#0a0a0a",
    deluxAccent: "#3f3f46",
  },
];

export function getTheme(id: string | undefined) {
  return themes.find((t) => t.id === id) ?? themes[0];
}

export function hexToRgba(hex: string, alpha: number) {
  const parsed = hex.replace("#", "");
  const r = parseInt(parsed.substring(0, 2), 16);
  const g = parseInt(parsed.substring(2, 4), 16);
  const b = parseInt(parsed.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
