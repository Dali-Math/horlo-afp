// Filter Types and Color Configuration for Planning UX Premium

export type FilterType = "all" | "matiere" | "salle" | "prof";

export interface FilterConfig {
  id: FilterType;
  label: string;
  color: string;
  description?: string;
}

export interface FilterState {
  activeFilter: FilterType;
  hiddenCategories: Set<string>;
}

// Predefined color palettes for different filter types
export const FILTER_COLORS = {
  // Matières (subjects) - vibrant educational colors
  matiere: {
    mathematiques: "#3B82F6", // Blue
    francais: "#EC4899", // Pink
    anglais: "#10B981", // Green
    histoire: "#F59E0B", // Amber
    sciences: "#8B5CF6", // Purple
    physique: "#06B6D4", // Cyan
    chimie: "#F43F5E", // Rose
    biologie: "#14B8A6", // Teal
    default: "#6366F1", // Indigo
  },
  // Salles (rooms) - professional grays and blues
  salle: {
    A101: "#64748B", // Slate
    A102: "#475569", // Slate dark
    B201: "#334155", // Slate darker
    B202: "#1E293B", // Slate darkest
    laboratoire: "#0EA5E9", // Sky
    gymnase: "#84CC16", // Lime
    default: "#71717A", // Zinc
  },
  // Professeurs (teachers) - warm, friendly colors
  prof: {
    default: "#F97316", // Orange
  },
} as const;

// Default filter configurations
export const DEFAULT_FILTERS: FilterConfig[] = [
  {
    id: "all",
    label: "Tous les cours",
    color: "#6B7280",
    description: "Afficher tous les cours sans filtre",
  },
  {
    id: "matiere",
    label: "Par matière",
    color: "#3B82F6",
    description: "Filtrer par matière enseignée",
  },
  {
    id: "salle",
    label: "Par salle",
    color: "#64748B",
    description: "Filtrer par salle de classe",
  },
  {
    id: "prof",
    label: "Par professeur",
    color: "#F97316",
    description: "Filtrer par enseignant",
  },
];

// Utility function to get color for a specific item
export function getColorForItem(
  filterType: FilterType,
  itemName?: string
): string {
  if (filterType === "all" || !itemName) {
    return DEFAULT_FILTERS.find((f) => f.id === filterType)?.color || "#6B7280";
  }

  const normalizedName = itemName.toLowerCase().replace(/\s+/g, "");

  if (filterType === "matiere") {
    // Check if the item name matches any predefined matière
    const matiereColors = FILTER_COLORS.matiere;
    for (const [key, color] of Object.entries(matiereColors)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return color;
      }
    }
    return matiereColors.default;
  }

  if (filterType === "salle") {
    const salleColors = FILTER_COLORS.salle;
    for (const [key, color] of Object.entries(salleColors)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return color;
      }
    }
    return salleColors.default;
  }

  if (filterType === "prof") {
    // Generate a consistent color based on professor name
    return generateProfColor(itemName);
  }

  return "#6B7280";
}

// Generate a consistent color for professor names
function generateProfColor(name: string): string {
  const colors = [
    "#F97316", // Orange
    "#EF4444", // Red
    "#EC4899", // Pink
    "#A855F7", // Purple
    "#3B82F6", // Blue
    "#06B6D4", // Cyan
    "#10B981", // Emerald
    "#F59E0B", // Amber
  ];

  // Simple hash function to generate consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// Extract unique items from planning data
export function extractFilterItems(
  courses: any[],
  filterType: FilterType
): string[] {
  if (filterType === "all") return [];

  const items = new Set<string>();

  courses.forEach((course) => {
    let value: string | undefined;

    switch (filterType) {
      case "matiere":
        value = course.matiere || course.subject || course.title;
        break;
      case "salle":
        value = course.salle || course.room || course.location;
        break;
      case "prof":
        value = course.prof || course.teacher || course.instructor;
        break;
    }

    if (value) {
      items.add(value);
    }
  });

  return Array.from(items).sort();
}
