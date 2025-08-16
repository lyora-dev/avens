import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const slides = [
  { src: project1, title: "Royal Wedding Reception" },
  { src: project2, title: "Global Summit Conference" },
  { src: project3, title: "Aurora Night Festival" },
  { src: project4, title: "Iconic Product Launch" },
  { src: project5, title: "Private Garden Soirée" },
];

const FeaturedProjectsCarousel = () => {
  return (
    <section className="container py-14">
      <div className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl">Featured Projects</h2>
        <p className="text-muted-foreground">A glimpse of our most loved productions.</p>
      </div>
      <Carousel className="relative">
        <CarouselContent>
          {slides.map((s, i) => (
            <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
              <article className="group overflow-hidden rounded-xl border bg-card shadow-elevated hover-scale">
                <img src={s.src} alt={`${s.title} event`} className="h-56 w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <h3 className="font-medium">{s.title}</h3>
                </div>
              </article>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Controls inside provider */}
        <div className="hidden md:flex gap-2 absolute right-0 -top-12">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <div className="md:hidden mt-4 flex justify-center gap-2">
          <CarouselPrevious />
          <CarouselNext />
        </div>
      </Carousel>
    </section>
  );
};

export default FeaturedProjectsCarousel;
