import { Helmet } from "react-helmet-async";

const posts = [
  {
    title: '5 Trends for 2025 Weddings',
    excerpt: 'From monochrome florals to immersive lighting, here are the wedding trends to watch in 2025.',
  },
  {
    title: 'How to Host a Perfect Corporate Gala',
    excerpt: 'A step-by-step guide to planning a polished, goal-driven corporate gala that delights guests.',
  }
];

const Blog = () => {
  return (
    <main>
      <Helmet>
        <title>Blog & Event Tips – EVNTING</title>
        <meta name="description" content="Expert articles and event planning tips from EVNTING: weddings, corporate galas, festivals, and more." />
        <link rel="canonical" href="https://evnting.com/blog" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Insights & Tips</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Stay ahead with our expert guides and trend reports.</p>
      </header>

      <section className="container grid gap-6 md:grid-cols-2 pb-12">
        {posts.map((p) => (
          <article key={p.title} className="rounded-xl border bg-card p-6 shadow-elevated">
            <h2 className="text-xl font-semibold">{p.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
            <a href="#" className="story-link mt-3 inline-block text-sm">Read article</a>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Blog;
