import { Helmet } from "react-helmet-async";
import { useState } from "react";

const Planner = () => {
  const [proposal, setProposal] = useState<null | { title: string; bullets: string[]; budget: string }>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget) as any) as Record<string,string>;
    const guests = parseInt(data.guests || '100', 10);
    const budget = parseInt(data.budget || '50000', 10);
    const vibe = data.vibe || 'luxurious';

    const decor = vibe === 'boho' ? 'Organic florals, natural textures, warm lights' : vibe === 'modern' ? 'Sleek lines, dynamic lighting, minimal palette' : 'Statement florals, layered textures, gold accents';
    const allocation = `Venue ${Math.round(budget*0.35)} • Decor ${Math.round(budget*0.25)} • Catering ${Math.round(budget*0.25)} • Tech ${Math.round(budget*0.1)} • Contingency ${Math.round(budget*0.05)}`;

    setProposal({
      title: `${data.type || 'Event'} for ${guests} guests in ${data.city || 'your city'}`,
      bullets: [
        `Venue style: ${data.venue || 'Hotel ballroom'} (shortlist 3 options)` ,
        `Design direction: ${decor}` ,
        `Entertainment: ${data.entertainment || 'DJ + live act'}` ,
        `Logistics: timeline, floorplan, vendor run-sheets` ,
        `Team: Lead planner + producer + coordinators` ,
      ],
      budget: allocation,
    });
  };

  return (
    <main>
      <Helmet>
        <title>Virtual Event Planner – EVNTING</title>
        <meta name="description" content="Get a tailored event proposal instantly. Enter details and receive a curated plan from EVNTING." />
        <link rel="canonical" href="https://evnting.com/planner" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Virtual Event Planner</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Tell us your vision. We’ll craft a proposal instantly.</p>
      </header>

      <section className="container grid gap-8 lg:grid-cols-3 pb-12">
        <form onSubmit={onSubmit} className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-elevated grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <select name="type" className="h-10 rounded-md border bg-background px-3 text-sm">
              <option>Event type</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Festival</option>
              <option>Exhibition</option>
              <option>Private Party</option>
            </select>
            <input name="city" placeholder="City / Destination" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input name="guests" placeholder="Guest count" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input name="budget" placeholder="Budget (USD)" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <select name="venue" className="h-10 rounded-md border bg-background px-3 text-sm">
              <option>Hotel ballroom</option>
              <option>Resort garden</option>
              <option>Convention center</option>
              <option>Private villa</option>
              <option>Waterfront venue</option>
            </select>
            <select name="vibe" className="h-10 rounded-md border bg-background px-3 text-sm">
              <option value="luxurious">Luxurious</option>
              <option value="modern">Modern</option>
              <option value="boho">Boho</option>
            </select>
            <input name="entertainment" placeholder="Entertainment" className="h-10 rounded-md border bg-background px-3 text-sm sm:col-span-2" />
          </div>
          <button className="btn-hero border-soft rounded-md px-4 py-2 text-sm">Generate Proposal</button>
        </form>
        <aside className="rounded-xl border bg-card p-6 shadow-elevated">
          <h3 className="font-medium">Tailored Proposal</h3>
          {!proposal ? (
            <p className="mt-2 text-sm text-muted-foreground">Fill the form to see your plan.</p>
          ) : (
            <div className="mt-3 text-sm">
              <h4 className="text-lg font-semibold">{proposal.title}</h4>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-muted-foreground">
                {proposal.bullets.map((b) => (<li key={b}>{b}</li>))}
              </ul>
              <div className="mt-3"><span className="font-medium">Budget allocation:</span> <span className="text-muted-foreground">{proposal.budget}</span></div>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
};

export default Planner;
