import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-24">
      <h1 className="font-display text-5xl text-maroon-deep">GarbhaSetu</h1>
      <p className="mt-4">
        <Link href="/" className="text-maroon underline-offset-2 hover:underline">
          GarbhaSetu
        </Link>
      </p>
    </div>
  );
}
