import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "EVNTING delivered a flawless brand launch for us. The attention to detail and creative vision were unmatched.",
    name: "Ananya Sharma",
    role: "Marketing Lead, TechCo",
  },
  {
    quote:
      "From planning to production, the team handled everything seamlessly. Our guests still talk about it!",
    name: "Rahul Verma",
    role: "Founder, RV Group",
  },
  {
    quote:
      "World-class execution. Safety, logistics, and design — all on point.",
    name: "Neha Gupta",
    role: "Operations Head, ExpoHub",
  },
];

const TestimonialsCarousel = () => {
  return (
    <section className="container py-14">
      <header className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl">What Clients Say</h2>
        <p className="text-muted-foreground">Trusted by brands and families across India and beyond.</p>
      </header>
      <Carousel className="w-full">
        <CarouselContent>
          {testimonials.map((t) => (
            <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
              <article className="h-full rounded-xl border bg-card p-6 shadow-elevated">
                <p className="text-sm leading-relaxed">“{t.quote}”</p>
                <div className="mt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{t.name}</span> · {t.role}
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default TestimonialsCarousel;
