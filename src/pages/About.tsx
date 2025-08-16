import { Helmet } from "react-helmet-async";
import heroImage from "@/assets/hero-events.jpg";

const About = () => {
  return (
    <main>
      <Helmet>
        <title>About EVNTING – Luxury Event Management</title>
        <meta name="description" content="Discover EVNTING's story, mission, team, and why leading brands trust us for unforgettable events worldwide." />
        <link rel="canonical" href="https://evnting.com/about" />
      </Helmet>
      {/* Hero banner */}
      <section className="relative h-[280px] md:h-[380px]">
        <img
          src={heroImage}
          alt="EVNTING luxury events showcase hero"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/40" />
        <div className="container relative z-10 h-full flex flex-col items-center justify-end pb-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl">Our Story</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Founded with a passion for extraordinary experiences, EVNTING has grown into a full-service event house delivering luxury
            weddings, corporate productions, and festivals across 50+ cities.
          </p>
        </div>
      </section>

      {/* What we stand for */}
      <section className="container py-12 grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border p-6 bg-card shadow-elevated animate-fade-in">
          <h3 className="font-medium">Mission</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Design unforgettable, stress-free events that feel effortless and bespoke to every client.
          </p>
        </article>
        <article className="rounded-xl border p-6 bg-card shadow-elevated animate-fade-in">
          <h3 className="font-medium">Why Clients Trust Us</h3>
          <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Decade of proven excellence</li>
            <li>World-class vendor network</li>
            <li>Creative studio and technical producers</li>
            <li>Transparent budgeting and logistics</li>
          </ul>
        </article>
        <article className="rounded-xl border p-6 bg-card shadow-elevated animate-fade-in">
          <h3 className="font-medium">Awards & Certifications</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Recognized by leading industry bodies for innovation, safety, and sustainability.
          </p>
        </article>
      </section>

      {/* Founder & Vision */}
      <section className="container pb-14 grid gap-6 md:grid-cols-2">
        <article className="rounded-xl border p-6 bg-card shadow-elevated animate-fade-in">
          <h2 className="font-display text-2xl">Founder’s Note</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            “At EVNTING, our purpose is simple — design experiences that move people. We obsess over details, innovate fearlessly, and
            measure success by the smiles we see on show day. Thank you for trusting us with your most important moments.”
          </p>
        </article>
        <article className="rounded-xl border p-6 bg-card shadow-elevated animate-fade-in">
          <h2 className="font-display text-2xl">Mission & Vision</h2>
          <ul className="mt-3 text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>
              <strong>Mission:</strong> Craft unforgettable, stress-free events tailored to every client.
            </li>
            <li>
              <strong>Vision:</strong> Be the most trusted experiential partner across India and global destinations.
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};

export default About;
