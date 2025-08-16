import { Helmet } from "react-helmet-async";

const vendors = [
  { title: 'Decor & Floral', items: ['Luxury florists', 'Set designers', 'Drapery & staging'] },
  { title: 'Catering', items: ['Fine dining', 'Live stations', 'Bespoke menus'] },
  { title: 'Audio & Lighting', items: ['Sound engineers', 'Lighting designers', 'LED walls'] },
  { title: 'Entertainment', items: ['Live bands', 'DJs', 'Hosts & artists'] },
  { title: 'Photo & Video', items: ['Editorial photographers', 'Cinematic videographers'] },
  { title: 'Logistics', items: ['Security', 'Transportation', 'Permits & safety'] },
];

const Vendors = () => {
  return (
    <main>
      <Helmet>
        <title>Vendors & Partners – EVNTING</title>
        <meta name="description" content="Meet EVNTING's trusted vendor network: decorators, caterers, sound engineers, and premium partners." />
        <link rel="canonical" href="https://evnting.com/vendors" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Vendors & Partners</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Our handpicked network brings reliability, creativity, and polish to every event.</p>
      </header>

      <section className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-12">
        {vendors.map((v) => (
          <article key={v.title} className="rounded-xl border bg-card p-6 shadow-elevated">
            <h3 className="font-medium">{v.title}</h3>
            <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
              {v.items.map((i) => (<li key={i}>{i}</li>))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Vendors;
