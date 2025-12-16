type Props = {
  title: string;
};

export default function HomeCardsSkeleton({ title }: Props) {
  const count = 8;

  return (
    <div className="relative group w-full">
      <h1 className="text-2xl text-white mb-4">{title}</h1>

      {/* Carrusel simulado */}
      <div className="flex gap-6 overflow-hidden py-4">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-neutral-800/80 rounded-lg animate-pulse w-48 h-64 flex-shrink-0"
          >
            <div className="flex flex-col gap-3 h-full py-3">
              <div className="mx-auto bg-neutral-700 rounded-md w-40 h-40" />
              <div className="h-4 bg-neutral-700 rounded mx-4" />
              <div className="h-3 bg-neutral-700 rounded mx-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
