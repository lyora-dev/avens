import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ceoImg from "@/assets/team-ceo.jpg";
import cooImg from "@/assets/team-coo.jpg";
import creativeImg from "@/assets/team-creative-director.jpg";
import conceptImg from "@/assets/team-event-designer.jpg";
import productionImg from "@/assets/team-production-manager.jpg";
import seniorMgrImg from "@/assets/team-senior-event-manager.jpg";
import assistantMgrImg from "@/assets/team-assistant-event-manager.jpg";
import clientRelImg from "@/assets/team-client-relations.jpg";

const Teams = () => {
  const sections = [
    {
      title: "Core Leadership",
      members: [
        {
          role: "Founder / CEO",
          desc: "Visionary leader, sets company direction.",
          img: ceoImg,
          alt: "EVNTING Founder and CEO portrait",
        },
        {
          role: "Managing Director / COO",
          desc: "Oversees daily operations & client projects.",
          img: cooImg,
          alt: "EVNTING Managing Director / COO portrait",
        },
      ],
    },
    {
      title: "Creative & Planning",
      members: [
        {
          role: "Creative Director",
          desc: "Designs event themes & experiences.",
          img: creativeImg,
          alt: "Creative Director portrait",
        },
        {
          role: "Event Concept Designer",
          desc: "Turns client ideas into detailed plans.",
          img: conceptImg,
          alt: "Event Concept Designer portrait",
        },
        {
          role: "Production Manager",
          desc: "Oversees staging, lighting, sound, and decor.",
          img: productionImg,
          alt: "Production Manager portrait",
        },
      ],
    },
    {
      title: "Client & Project Management",
      members: [
        {
          role: "Senior Event Manager",
          desc: "Leads event projects from start to finish.",
          img: seniorMgrImg,
          alt: "Senior Event Manager portrait",
        },
        {
          role: "Assistant Event Manager",
          desc: "Supports managers in logistics & coordination.",
          img: assistantMgrImg,
          alt: "Assistant Event Manager portrait",
        },
        {
          role: "Client Relations Manager",
          desc: "Main contact for client communication.",
          img: clientRelImg,
          alt: "Client Relations Manager portrait",
        },
      ],
    },
  ];

  return (
    <main>
      <Helmet>
        <title>Team – EVNTING</title>
        <meta name="description" content="Meet EVNTING's leadership, creative, production, and client teams delivering world-class events." />
        <link rel="canonical" href="https://evnting.com/teams" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Our Team</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">
          The people behind EVNTING — strategists, producers, designers, and client partners crafting unforgettable experiences.
        </p>
      </header>

      {sections.map((section) => (
        <section key={section.title} className="container py-6">
          <h2 className="font-display text-2xl mb-4">{section.title}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {section.members.map((m) => (
              <article key={m.role} className="animate-fade-in">
                <Card className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={m.img}
                      alt={`${m.alt} – ${m.role}`}
                      loading="lazy"
                      width={512}
                      height={512}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{m.role}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                  </CardContent>
                </Card>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
};

export default Teams;
