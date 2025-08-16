import { Link } from "react-router-dom";

const SiteFooter = () => {
  return (
    <footer className="mt-16 border-t">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-lg font-bold font-display tracking-tight">EVNTING</span>
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          </div>
          <p className="text-sm text-muted-foreground">We design and deliver unforgettable events worldwide.</p>
        </div>
        <div>
          <h4 className="font-medium mb-3">Explore</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="story-link">Services</Link></li>
            <li><Link to="/portfolio" className="story-link">Portfolio</Link></li>
            <li><Link to="/teams" className="story-link">Teams</Link></li>
            <li><Link to="/booking" className="story-link">Booking</Link></li>
            <li><Link to="/blog" className="story-link">Blog</Link></li>
            <li><Link to="/about" className="story-link">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>WhatsApp: 9581 08 5678</li>
            <li>Email: contact@evnting.com</li>
            <li>Hours: Mon–Fri, 9:00–18:00</li>
            <li>HQ: Level IV, Kothari Centrum, Beside Nisum Technologies, Kondapur, Hyderabad, Telangana, Pin: 500084</li>
            <li>Instagram: <a className="underline" href="https://www.instagram.com/_evnting.com_/" target="_blank" rel="noreferrer">@_evnting.com_</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-3">Start Planning</h4>
          <p className="text-sm text-muted-foreground mb-3">Tell us about your event and we’ll craft a bespoke proposal.</p>
          <Link to="/booking" className="inline-flex">
            <span className="btn-hero border-soft rounded-md px-4 py-2 text-sm">Plan Your Event</span>
          </Link>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} EVNTING. All rights reserved.</div>
    </footer>
  );
};

export default SiteFooter;
