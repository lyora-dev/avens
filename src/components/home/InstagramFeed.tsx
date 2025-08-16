import project1 from "@/assets/project1.jpg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";

const images = [project1, project2, project3, project4, project5, project1];

const InstagramFeed = () => {
  return (
    <section className="container py-14">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl">Instagram</h2>
          <p className="text-muted-foreground">Follow our latest events, designs, and behind-the-scenes.</p>
        </div>
        <a
          href="https://www.instagram.com/_evnting.com_/"
          target="_blank"
          rel="noreferrer"
          className="btn-hero border-soft rounded-md px-4 py-2 text-sm"
          aria-label="Follow EVNTING on Instagram"
        >
          Follow us
        </a>
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {images.map((src, i) => (
          <a
            key={i}
            href="https://www.instagram.com/_evnting.com_/"
            target="_blank"
            rel="noreferrer"
            className="group overflow-hidden rounded-lg border bg-card"
            aria-label={`Open EVNTING Instagram - post ${i + 1}`}
          >
            <img
              src={src}
              alt={`EVNTING Instagram preview ${i + 1}`}
              loading="lazy"
              className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105 md:h-32 lg:h-36"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
