const ServicesGrid = () => {
  const services = [
    { name: "Weddings", link: "/services/weddings" },
    { name: "Corporate Events", link: "/services/corporate" },
    { name: "Social Gatherings", link: "/services/social" },
    { name: "Festivals", link: "/services/festivals" },
    { name: "Exhibitions", link: "/services/exhibitions" },
    { name: "Destination Events", link: "/services/destination" }
  ];

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl mb-4">Services</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          From intimate gatherings to grand celebrations, we create unforgettable experiences
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {services.map((service, index) => (
          <a
            key={service.name}
            href={service.link}
            className="group text-center p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <h3 className="text-xl md:text-2xl font-semibold group-hover:text-primary transition-colors">
              {service.name}
            </h3>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ServicesGrid;