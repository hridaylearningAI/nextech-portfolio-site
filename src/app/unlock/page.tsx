import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Logo } from "../ui";
import UnlockForm from "./unlock-form";

export const metadata: Metadata = {
  title: "Preview access - Nextech Energy Development",
  robots: { index: false, follow: false },
};

export default function Unlock() {
  return (
    <section className="relative isolate flex min-h-dvh items-center justify-center overflow-hidden bg-ink px-6 py-16">
      <div
        aria-hidden
        className="absolute top-[-20%] left-1/2 -z-10 size-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(87,162,157,0.20),transparent_65%)]"
      />
      <div className="w-full max-w-sm">
        <Logo onDark />
        <h1 className="mt-10 text-3xl font-bold tracking-tight text-white">
          Site preview
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          The new Nextech Energy Development website is still being built. Enter
          the password to look around.
        </p>

        <Suspense fallback={null}>
          <UnlockForm />
        </Suspense>

        <p className="mt-8 text-xs text-white/45">
          Not what you were after?{" "}
          <Link href="/" className="font-medium text-brand hover:underline">
            Back to the holding page
          </Link>
        </p>
      </div>
    </section>
  );
}
