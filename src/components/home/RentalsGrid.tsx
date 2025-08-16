const RentalsGrid = () => {
  const rentals = [
    { name: "German Hanger", icon: "🏗️" },
    { name: "Lighting", icon: "💡" },
    { name: "DJ / Audio Video", icon: "🎵" },
    { name: "Industrial Event AC", icon: "❄️" },
    { name: "Stage Setup", icon: "🎭" },
    { name: "LED Walls", icon: "📺" }
  ];

  return (
    <section className="container py-16 bg-muted/50">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl mb-4">Rentals</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Professional equipment and infrastructure for every type of event
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {rentals.map((rental, index) => (
          <a
            key={rental.name}
            href="/rentals"
            className="group flex items-center space-x-4 p-6 rounded-xl border bg-card hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <span className="text-3xl">{rental.icon}</span>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {rental.name}
            </h3>
          </a>
        ))}
      </div>
      
      <div className="text-center mt-10">
        <a
          href="/rentals"
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          View All Rental Options
        </a>
      </div>
    </section>
  );
};

export default RentalsGrid;