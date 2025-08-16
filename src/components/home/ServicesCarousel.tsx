import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import weddingsImage from "@/assets/services/weddings.jpg";
import corporateImage from "@/assets/services/corporate.jpg";
import socialImage from "@/assets/services/social.jpg";
import festivalsImage from "@/assets/services/festivals.jpg";
import exhibitionsImage from "@/assets/services/exhibitions.jpg";
import destinationImage from "@/assets/services/destination.jpg";

const services = [
  {
    id: 1,
    name: "Weddings",
    image: weddingsImage,
    link: "/services/weddings"
  },
  {
    id: 2,
    name: "Corporate Events",
    image: corporateImage,
    link: "/services/corporate"
  },
  {
    id: 3,
    name: "Social Gatherings",
    image: socialImage,
    link: "/services/social"
  },
  {
    id: 4,
    name: "Festivals",
    image: festivalsImage,
    link: "/services/festivals"
  },
  {
    id: 5,
    name: "Exhibitions",
    image: exhibitionsImage,
    link: "/services/exhibitions"
  },
  {
    id: 6,
    name: "Destination Events",
    image: destinationImage,
    link: "/services/destination"
  }
];

const ServicesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      {/* Carousel slides */}
      <div className="relative w-full h-full">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${service.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white space-y-6">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-wide">
                    {service.name}
                  </h2>
                  <Button 
                    asChild
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    <a href={service.link}>
                      Explore {service.name}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesCarousel;