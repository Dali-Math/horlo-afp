"use client";

import { useState, useMemo, useCallback } from "react";
import {
  FilterType,
  FilterConfig,
  DEFAULT_FILTERS,
  extractFilterItems,
  getColorForItem,
} from "@/types/filters";

export interface Course {
  id: string;
  matiere?: string;
  salle?: string;
  prof?: string;
  start: Date | string;
  end: Date | string;
  [key: string]: any;
}

export interface UsePlanningFiltersReturn {
  // Current filter state
  activeFilter: FilterType;
  filteredCourses: Course[];
  
  // Filter management
  setActiveFilter: (filter: FilterType) => void;
  
  // Available filters with metadata
  availableFilters: FilterConfig[];
  
  // Legend items for current filter
  legendItems: Array<{
    id: string;
    label: string;
    color: string;
    count: number;
  }>;
  
  // Hidden categories management
  hiddenCategories: Set<string>;
  toggleCategory: (categoryId: string) => void;
  showAllCategories: () => void;
  
  // Utility functions
  getColorForCourse: (course: Course) => string;
}

export function usePlanningFilters(
  courses: Course[]
): UsePlanningFiltersReturn {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [hiddenCategories, setHiddenCategories] = useState<Set<string>>(
    new Set()
  );

  // Extract unique items for current filter
  const filterItems = useMemo(() => {
    return extractFilterItems(courses, activeFilter);
  }, [courses, activeFilter]);

  // Generate legend items with counts
  const legendItems = useMemo(() => {
    if (activeFilter === "all") return [];

    const itemCounts = new Map<string, number>();

    courses.forEach((course) => {
      let value: string | undefined;

      switch (activeFilter) {
        case "matiere":
          value = course.matiere;
          break;
        case "salle":
          value = course.salle;
          break;
        case "prof":
          value = course.prof;
          break;
      }

      if (value) {
        itemCounts.set(value, (itemCounts.get(value) || 0) + 1);
      }
    });

    return Array.from(itemCounts.entries()).map(([label, count]) => ({
      id: label,
      label,
      color: getColorForItem(activeFilter, label),
      count,
    }));
  }, [courses, activeFilter]);

  // Filter courses based on active filter and hidden categories
  const filteredCourses = useMemo(() => {
    if (activeFilter === "all" && hiddenCategories.size === 0) {
      return courses;
    }

    return courses.filter((course) => {
      // Check if category is hidden
      let categoryValue: string | undefined;

      switch (activeFilter) {
        case "matiere":
          categoryValue = course.matiere;
          break;
        case "salle":
          categoryValue = course.salle;
          break;
        case "prof":
          categoryValue = course.prof;
          break;
        case "all":
          return true;
      }

      if (categoryValue && hiddenCategories.has(categoryValue)) {
        return false;
      }

      return true;
    });
  }, [courses, activeFilter, hiddenCategories]);

  // Get color for a specific course
  const getColorForCourse = useCallback(
    (course: Course): string => {
      let itemName: string | undefined;

      switch (activeFilter) {
        case "matiere":
          itemName = course.matiere;
          break;
        case "salle":
          itemName = course.salle;
          break;
        case "prof":
          itemName = course.prof;
          break;
        case "all":
        default:
          return "#6B7280"; // Default gray
      }

      return getColorForItem(activeFilter, itemName);
    },
    [activeFilter]
  );

  // Toggle category visibility
  const toggleCategory = useCallback((categoryId: string) => {
    setHiddenCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  // Show all categories
  const showAllCategories = useCallback(() => {
    setHiddenCategories(new Set());
  }, []);

  // Update filter and clear hidden categories
  const handleSetActiveFilter = useCallback((filter: FilterType) => {
    setActiveFilter(filter);
    setHiddenCategories(new Set());
  }, []);

  return {
    activeFilter,
    filteredCourses,
    setActiveFilter: handleSetActiveFilter,
    availableFilters: DEFAULT_FILTERS,
    legendItems,
    hiddenCategories,
    toggleCategory,
    showAllCategories,
    getColorForCourse,
  };
}
