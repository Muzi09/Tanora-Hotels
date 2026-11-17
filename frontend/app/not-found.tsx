import Link from "next/link";

export const metadata = {
  title: "Page Not Found | TANORA",
};

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-background text-on-background px-6 text-center">
      <span className="text-label-sm font-label-sm uppercase tracking-[0.2em] text-secondary mb-6">
        Error 404
      </span>
      <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-6">
        This page could not be found
      </h1>
      <p className="max-w-xl text-body-md font-body-md text-on-surface-variant mb-10">
        The page you are looking for may have been moved, renamed, or is
        temporarily unavailable. Return to the homepage to continue
        exploring TANORA.
      </p>
      <Link
        href="/"
        className="bg-primary text-secondary-fixed px-10 py-4 font-label-sm uppercase tracking-widest hover:bg-primary-container transition-all duration-300 shadow-xl"
      >
        Return Home
      </Link>
    </section>
  );
}
