import { SafeImage } from "@/shared/components/ui/safe-image";

interface TrainingHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export function TrainingHero({ eyebrow, title, description, image, imageAlt }: TrainingHeroProps) {
  return (
    <section className="relative min-h-[320px] overflow-hidden bg-slate-950 text-white sm:min-h-[360px]">
      <SafeImage
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-slate-950/70" />
      <div className="site-container relative flex min-h-[320px] items-end py-10 sm:min-h-[360px] sm:py-12">
        <div className="max-w-3xl">
          <p className="text-xs font-bold text-sky-200 uppercase">{eyebrow}</p>
          <h1 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base sm:leading-7">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
