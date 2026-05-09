import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="flex flex-col items-center justify-center space-y-8 text-center mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-primary">
            NHIA Pharmacy Inventory System
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px]">
            Federal Medical Centre (FMC) Abeokuta. Digitizing and automating pharmacy inventory movement, stock monitoring, and transfer documentation.
          </p>
          
          <div className="flex gap-4 mt-8">
            <Link 
              href="/dashboard" 
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Enter App
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
