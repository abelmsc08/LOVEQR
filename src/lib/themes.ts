export type Theme = {
  id: string;
  name: string;
  swatch: [string, string, string];
  gradientFrom: string;
  gradientTo: string;
};

export const themes: Theme[] = [
  {
    id: "classico",
    name: "Clássico",
    swatch: ["#b91c1c", "#ffffff", "#ef4444"],
    gradientFrom: "#b91c1c",
    gradientTo: "#7f1d1d",
  },
  {
    id: "dourado",
    name: "Dourado",
    swatch: ["#b45309", "#ffffff", "#d97706"],
    gradientFrom: "#b45309",
    gradientTo: "#78350f",
  },
  {
    id: "rose",
    name: "Rosé",
    swatch: ["#be185d", "#ffffff", "#f472b6"],
    gradientFrom: "#be185d",
    gradientTo: "#831843",
  },
  {
    id: "safira",
    name: "Safira",
    swatch: ["#1e3a8a", "#ffffff", "#3b82f6"],
    gradientFrom: "#1e3a8a",
    gradientTo: "#0f172a",
  },
  {
    id: "esmeralda",
    name: "Esmeralda",
    swatch: ["#065f46", "#ffffff", "#10b981"],
    gradientFrom: "#065f46",
    gradientTo: "#022c22",
  },
  {
    id: "noturno",
    name: "Noturno",
    swatch: ["#27272a", "#ffffff", "#71717a"],
    gradientFrom: "#3f3f46",
    gradientTo: "#0a0a0a",
  },
];

export function getTheme(id: string | undefined) {
  return themes.find((t) => t.id === id) ?? themes[0];
}
