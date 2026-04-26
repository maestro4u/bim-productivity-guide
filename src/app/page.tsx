import { Guide } from "../components/Guide";
import { Hero } from "../components/Hero";

export default function Page() {
  return (
    <main id="top" className="min-h-screen bg-[color:var(--bg)] text-[color:var(--ink)]">
      <Hero />
      <Guide />
    </main>
  );
}
