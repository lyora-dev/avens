import { Button } from "@/components/ui/button";
import heroPoster from "@/assets/hero-events.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative">
      {/* Background video with graceful fallback */}
      <div className="absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={heroPoster}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 animate-gradient opacity-60" />
      </div>

      <div className="container min-h-[72vh] flex flex-col items-start justify-center py-20 gap-8">
        <div className="max-w-3xl animate-enter">
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-tight">We Create Unforgettable Events</h1>
          <p className="mt-4 text-lg text-muted-foreground">From luxury weddings to large-scale corporate experiences, our team delivers seamless planning, stunning design, and flawless execution.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="lg" className="hover-scale">
              <Link to="/booking">Plan Your Event</Link>
            </Button>
            <Button asChild variant="premium" size="lg" className="hover-scale">
              <Link to="/services">Explore Services</Link>
            </Button>
          </div>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap gap-2">
          {["Weddings","Corporate","Exhibitions","Concerts","Private Parties"].map((label) => (
            <Link key={label} to="/services" className="rounded-full border px-4 py-2 text-sm bg-background/70 hover:bg-accent/10 transition-colors">
              {label}
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { k: "500+", l: "Events Managed" },
            { k: "50+", l: "Cities" },
            { k: "99%", l: "Client Satisfaction" },
            { k: "10y+", l: "Experience" },
          ].map((s) => (
            <div key={s.l} className="rounded-xl border bg-card/70 p-4 text-center shadow-elevated">
              <div className="text-2xl font-semibold">{s.k}</div>
              <div className="text-xs text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
