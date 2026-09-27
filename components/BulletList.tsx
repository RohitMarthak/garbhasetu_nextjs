import { CheckCircle2 } from "lucide-react";

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 rounded-xl border border-[#E6DFD1]/80 bg-[#FAF6EE] p-3 text-xs sm:text-sm font-medium text-[#142621] hover:bg-white hover:border-[#153C33]/20 transition-all"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#153C33]" aria-hidden />
          <span className="leading-snug">{item}</span>
        </li>
      ))}
    </ul>
  );
}
