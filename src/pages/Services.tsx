import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const Section = ({ title, children, imageSrc, imageAlt }: { title: string; children: React.ReactNode; imageSrc?: string; imageAlt?: string }) => (
  <section className="container py-10">
    <h2 className="font-display text-3xl mb-3">{title}</h2>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        {imageSrc && (
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg border bg-muted">
            <img src={imageSrc} alt={imageAlt ?? `${title} service image`} loading="lazy" className="h-full w-full object-cover" />
          </AspectRatio>
        )}
        <div className="text-muted-foreground text-sm leading-relaxed">{children}</div>
      </div>
      <ul className="rounded-xl border p-6 bg-card shadow-elevated text-sm list-disc pl-6 space-y-1">
        <li>Concept & creative direction</li>
        <li>Design & decor</li>
        <li>Vendor management</li>
        <li>Logistics & production</li>
        <li>On-site coordination</li>
        <li>Budgeting & timeline</li>
      </ul>
    </div>
  </section>
);

const Services = () => {
  return (
    <main>
      <Helmet>
        <title>Services – EVNTING</title>
        <meta name="description" content="Corporate, social, festivals, exhibitions, and destination event management services by EVNTING." />
        <link rel="canonical" href="https://evnting.com/services" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Our Services</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Full-service planning, design, and production for every kind of celebration and brand experience.</p>
      </header>

      <Section title="Corporate Events" imageSrc={project1} imageAlt="Corporate events planning and production">
        Product launches, conferences, summits, trade shows, team offsites and galas that impress stakeholders and guests alike.
      </Section>
      <Section title="Social Events" imageSrc={project2} imageAlt="Luxury weddings and private celebrations">
        Weddings, birthdays, and private parties that feel personal, beautiful, and effortlessly organized.
      </Section>
      <Section title="Festivals & Concerts" imageSrc={project3} imageAlt="Festival stage production with lighting and sound">
        Crowd-first festival operations and stage productions with safety and spectacle in harmony.
      </Section>
      <Section title="Exhibitions & Fairs" imageSrc={project4} imageAlt="Exhibition booth and pavilion design">
        From booth design to full pavilion builds, we handle experience design, flow, and operations.
      </Section>
      <Section title="Destination Events" imageSrc={project5} imageAlt="Destination wedding and event planning">
        Global planning with trusted partners worldwide to take your celebration anywhere.
      </Section>

      <div className="container py-10">
        <Button variant="hero" size="lg" asChild>
          <a href="/booking">Book a Free Consultation</a>
        </Button>
      </div>
    </main>
  );
};

export default Services;
