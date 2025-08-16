import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ClientLogo {
  id: string;
  name: string;
  logo_url: string;
}

const ClientLogosCarousel = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientLogos();
  }, []);

  const fetchClientLogos = async () => {
    try {
      const { data, error } = await supabase
        .from('client_logos')
        .select('id, name, logo_url')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setLogos(data || []);
    } catch (error) {
      console.error('Error fetching client logos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Clients</h2>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (logos.length === 0) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Clients</h2>
            <p className="text-muted-foreground">Client logos will be displayed here.</p>
          </div>
        </div>
      </section>
    );
  }

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Clients</h2>
          <p className="text-lg text-muted-foreground">
            Proud to work with industry leaders and growing businesses
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-x space-x-8 md:space-x-12">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 h-16 md:h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                style={{ minWidth: '120px' }}
              >
                <img
                  src={logo.logo_url}
                  alt={`${logo.name} logo`}
                  className="max-h-full max-w-full object-contain filter opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll-x {
          animation: scroll-x 30s linear infinite;
        }
        
        .animate-scroll-x:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ClientLogosCarousel;