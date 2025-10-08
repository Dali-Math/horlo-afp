"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import { useState } from "react";

export type FilterType = "matiere" | "salle" | "prof" | "all";

export interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  filters: Array<{
    id: FilterType;
    label: string;
    color: string;
    count?: number;
  }>;
}

export default function FilterBar({
  activeFilter,
  onFilterChange,
  filters,
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Filter Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filtres</span>
          </button>

          {/* Active Filter Display */}
          {activeFilter !== "all" && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              <span className="text-sm font-medium">
                {filters.find((f) => f.id === activeFilter)?.label}
              </span>
              <button
                onClick={() => onFilterChange("all")}
                className="p-0.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.id}
                    onClick={() => {
                      onFilterChange(filter.id);
                      setIsOpen(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      activeFilter === filter.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                    }`}
                    style={{
                      borderColor:
                        activeFilter === filter.id ? filter.color : undefined,
                    }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: filter.color }}
                      />
                      <span className="font-medium text-sm">{filter.label}</span>
                      {filter.count !== undefined && (
                        <span className="text-xs text-gray-500">
                          {filter.count} cours
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
