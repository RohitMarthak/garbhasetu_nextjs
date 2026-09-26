import Link from "next/link";

export default function RootNotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5 py-16 text-center text-ink">
      <div className="max-w-xl">
        <p className="text-sm uppercase tracking-[0.16em] text-saffron-deep">404</p>
        <h1 className="mt-3 font-display text-5xl text-maroon-deep">Page not found</h1>
        <p className="mt-4 leading-7 text-ink-soft">
          This page is unavailable. આ પૃષ્ઠ ઉપલબ્ધ નથી. Return to the GarbhaSetu home page.
        </p>
        <Link href="/" className="mt-8 inline-block rounded-full bg-maroon px-5 py-2.5 text-cream hover:bg-maroon-deep">
          GarbhaSetu home
        </Link>
      </div>
    </main>
  );
}
