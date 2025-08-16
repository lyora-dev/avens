import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: 'Inquiry sent', description: 'We will reach out shortly via email and WhatsApp.' });
    }, 800);
  };

  return (
    <main>
      <Helmet>
        <title>Contact & Inquiry – EVNTING</title>
        <meta name="description" content="Get an instant quote: event type, date, location, and budget. Contact EVNTING via WhatsApp or email." />
        <link rel="canonical" href="https://evnting.com/contact" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Contact & Inquiry</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Tell us about your event. We typically respond within 24 hours.</p>
      </header>

      <section id="inquiry" className="container grid gap-8 lg:grid-cols-3 pb-12">
        <form onSubmit={onSubmit} className="lg:col-span-2 rounded-xl border bg-card p-6 shadow-elevated grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <input required name="name" placeholder="Full name" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input required type="email" name="email" placeholder="Email" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input name="phone" placeholder="Phone / WhatsApp" className="h-10 rounded-md border bg-background px-3 text-sm sm:col-span-2" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <select name="type" className="h-10 rounded-md border bg-background px-3 text-sm">
              <option>Event type</option>
              <option>Wedding</option>
              <option>Corporate</option>
              <option>Festival</option>
              <option>Exhibition</option>
              <option>Private Party</option>
            </select>
            <input type="date" name="date" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input name="location" placeholder="Location/City" className="h-10 rounded-md border bg-background px-3 text-sm" />
            <input name="budget" placeholder="Budget (USD)" className="h-10 rounded-md border bg-background px-3 text-sm" />
          </div>
          <textarea name="message" placeholder="Tell us more" rows={4} className="rounded-md border bg-background p-3 text-sm" />
          <button disabled={loading} className="btn-hero border-soft rounded-md px-4 py-2 text-sm">
            {loading ? 'Sending...' : 'Get Instant Quote'}
          </button>
        </form>
        <aside className="rounded-xl border bg-card p-6 shadow-elevated">
          <h3 className="font-medium">Talk to Us</h3>
          <ul className="mt-2 text-sm text-muted-foreground space-y-1">
            <li>WhatsApp: +1 555 123 4567</li>
            <li>Email: hello@evnting.com</li>
            <li>Hours: Mon–Fri, 9:00–18:00</li>
          </ul>
          <div className="mt-4 rounded-md overflow-hidden border">
            <iframe title="EVNTING Office" width="100%" height="220" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=New%20York%20City&output=embed"></iframe>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default Contact;
