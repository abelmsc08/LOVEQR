import { Suspense } from "react";
import { Wizard } from "@/components/criar/wizard";

export default function CriarPage() {
  return (
    <Suspense fallback={null}>
      <Wizard />
    </Suspense>
  );
}
