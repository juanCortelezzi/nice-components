import { buttonVariants } from "@/components/button";
export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl">
      <nav className="flex items-center justify-between">
        <span>Logo</span>
        <div>
          <button className={buttonVariants({ variant: "ghost" })}>
            Products
          </button>
          <button className={buttonVariants({ variant: "ghost" })}>
            Pricing
          </button>
          <button className={buttonVariants({ variant: "ghost" })}>
            Resources
          </button>
          <button className={buttonVariants({ variant: "ghost" })}>
            Contact
          </button>
        </div>
      </nav>
      <header>
        <div className="my-20 space-y-2">
          <h1 className="text-6xl font-bold">Your thing, Reimagined</h1>
          <h2 className="text-4xl text-text/80">
            Brought to you by psychodelics
          </h2>
        </div>
        <div className="flex items-center justify-start space-x-2">
          <button className={buttonVariants({ size: "xl" })}>
            Get Started!
          </button>
          <button
            className={buttonVariants({ variant: "secondary", size: "xl" })}
          >
            Documentation
          </button>
          <button className={buttonVariants({ variant: "ghost", size: "xl" })}>
            Bolas
          </button>
          <div className="grid h-14 rounded-md bg-gradient-to-r from-blue-500 via-sky-500 via-60% to-emerald-400 p-[1px]">
            <button className="rounded-md bg-base px-10 text-xl font-semibold hover:bg-transparent">
              Give me $$$
            </button>
          </div>
        </div>
      </header>

      <div className="my-10" />

      <div className="grid grid-cols-2 gap-2 rounded-md">
        <div className="h-32 w-full rounded-md bg-ring" />
        <div className="h-32 w-full rounded-md bg-base" />
        <div className="h-32 w-full rounded-md bg-primary" />
        <div className="h-32 w-full rounded-md bg-primary-forgeground" />
        <div className="h-32 w-full rounded-md bg-secondary" />
        <div className="h-32 w-full rounded-md bg-secondary-foreground" />
      </div>
    </main>
  );
}
