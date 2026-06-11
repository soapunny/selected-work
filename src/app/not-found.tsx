import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10">
        <Image
          src="/404.png"
          alt="404 page not found"
          width={1280}
          height={720}
          className="w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
