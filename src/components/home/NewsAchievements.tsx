const NewsAchievements = () => {
  return (
    <section className="container py-14">
      <header className="mb-6">
        <h2 className="font-display text-3xl md:text-4xl">News & Achievements</h2>
        <p className="text-muted-foreground">Milestones and recognition from the industry.</p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        <article className="rounded-xl border bg-card p-6 shadow-elevated">
          <h3 className="font-medium">Best Experiential Agency – 2024</h3>
          <p className="mt-2 text-sm text-muted-foreground">Honored for innovation and client satisfaction by Event Guild India.</p>
        </article>
        <article className="rounded-xl border bg-card p-6 shadow-elevated">
          <h3 className="font-medium">50+ City Footprint</h3>
          <p className="mt-2 text-sm text-muted-foreground">Successfully executed events across India and international destinations.</p>
        </article>
        <article className="rounded-xl border bg-card p-6 shadow-elevated">
          <h3 className="font-medium">Sustainability Initiative</h3>
          <p className="mt-2 text-sm text-muted-foreground">Introduced a green production framework reducing waste at large events.</p>
        </article>
      </div>
    </section>
  );
};

export default NewsAchievements;
