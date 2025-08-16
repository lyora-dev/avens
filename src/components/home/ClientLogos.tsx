import { useState, useEffect } from "react";

const ClientLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Placeholder client logos - replace with real ones from evnting.com
  const clients = [
    { name: "Client 1", logo: "/placeholder.svg" },
    { name: "Client 2", logo: "/placeholder.svg" },
    { name: "Client 3", logo: "/placeholder.svg" },
    { name: "Client 4", logo: "/placeholder.svg" },
    { name: "Client 5", logo: "/placeholder.svg" },
    { name: "Client 6", logo: "/placeholder.svg" },
    { name: "Client 7", logo: "/placeholder.svg" },
    { name: "Client 8", logo: "/placeholder.svg" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [clients.length]);

  return (
    <section className="py-16 overflow-hidden">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl mb-4">Trusted by Leading Brands</h2>
          <p className="text-muted-foreground">
            We've had the privilege of creating exceptional events for these amazing clients
          </p>
        </div>
      </div>
      
      {/* Auto-scrolling carousel */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 w-48 h-24 mx-8 flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Add custom CSS for marquee animation in global styles */}
    </section>
  );
};

export default ClientLogos;