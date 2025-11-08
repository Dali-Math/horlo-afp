import type { Metadata } from "next";
import ComplicationsClient from "@/components/ComplicationsClient";

export const metadata: Metadata = {
  title: "Complications Horlogères Suisses | Encyclopédie HorloLearn",
  description: "L'encyclopédie ultime des complications horlogères suisses.",
};

export default function Page() {
  return <ComplicationsClient />;
}
