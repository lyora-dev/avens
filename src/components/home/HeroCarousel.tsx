import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface EventType {
  id: string;
  name: string;
  slug: string;
  hero_image_url: string | null;
  short_description: string | null;
}

const HeroCarousel = () => {
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEventTypes();
  }, []);

  useEffect(() => {
    if (eventTypes.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % eventTypes.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [eventTypes.length]);

  const fetchEventTypes = async () => {
    try {
      const { data, error } = await supabase
        .from('event_types')
        .select('id, name, slug, hero_image_url, short_description')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setEventTypes(data || []);
    } catch (error) {
      console.error('Error fetching event types:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % eventTypes.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + eventTypes.length) % eventTypes.length);
  };

  if (loading) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </section>
    );
  }

  if (eventTypes.length === 0) {
    return (
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">We Create Unforgettable Events</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Professional event management services for all occasions
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {eventTypes.map((eventType, index) => (
          <div
            key={eventType.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              {eventType.hero_image_url ? (
                <img
                  src={eventType.hero_image_url}
                  alt={eventType.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
              )}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
                  {eventType.name}
                </h1>
                <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-200">
                  {eventType.short_description || `Professional ${eventType.name.toLowerCase()} management`}
                </p>
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 animate-fade-in delay-400"
                  onClick={() => window.location.href = `/events/${eventType.slug}`}
                >
                  Explore {eventType.name}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {eventTypes.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-12 w-12"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-12 w-12"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {eventTypes.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {eventTypes.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default HeroCarousel;