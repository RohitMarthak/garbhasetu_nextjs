export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-7 text-ink">
          <span className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-saffron" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
