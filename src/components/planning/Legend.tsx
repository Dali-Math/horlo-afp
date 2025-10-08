"use client";

import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export interface LegendItem {
  id: string;
  label: string;
  color: string;
  count?: number;
}

export interface LegendProps {
  items: LegendItem[];
  onToggle?: (id: string) => void;
  compact?: boolean;
}

export default function Legend({
  items,
  onToggle,
  compact = false,
}: LegendProps) {
  const [hiddenItems, setHiddenItems] = useState<Set<string>>(new Set());

  const handleToggle = (id: string) => {
    const newHidden = new Set(hiddenItems);
    if (newHidden.has(id)) {
      newHidden.delete(id);
    } else {
      newHidden.add(id);
    }
    setHiddenItems(newHidden);
    onToggle?.(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 ${
        compact ? "max-w-md" : "max-w-2xl"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Légende
        </h3>
        <span className="text-xs text-gray-500">
          {items.length} catégories
        </span>
      </div>

      <div
        className={`grid gap-2 ${
          compact ? "grid-cols-1" : "grid-cols-2 md:grid-cols-3"
        }`}
      >
        {items.map((item) => {
          const isHidden = hiddenItems.has(item.id);
          return (
            <motion.button
              key={item.id}
              onClick={() => handleToggle(item.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                isHidden
                  ? "border-gray-200 dark:border-gray-700 opacity-50"
                  : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <motion.div
                animate={{
                  scale: isHidden ? 0.8 : 1,
                  opacity: isHidden ? 0.5 : 1,
                }}
                className="w-4 h-4 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex-1 text-left">
                <span
                  className={`text-sm font-medium ${
                    isHidden
                      ? "text-gray-400 line-through"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="text-xs text-gray-500 ml-1">
                    ({item.count})
                  </span>
                )}
              </div>
              {isHidden ? (
                <EyeOff className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <Eye className="w-3.5 h-3.5 text-gray-600" />
              )}
            </motion.button>
          );
        })}
      </div>

      {hiddenItems.size > 0 && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setHiddenItems(new Set())}
          className="mt-3 w-full py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
        >
          Tout afficher
        </motion.button>
      )}
    </motion.div>
  );
}
