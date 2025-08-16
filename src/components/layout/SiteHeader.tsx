import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/teams", label: "Teams" },
  { to: "/booking", label: "Booking" },
  { to: "/blog", label: "Blog" },
  { to: "/about", label: "About" },
];

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <nav className="container flex items-center gap-4 py-3">
        <Link to="/" className="flex items-baseline gap-1">
          <span className="text-xl font-bold font-display tracking-tight">EVNTING</span>
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
        </Link>
        <div className="ml-auto hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'} transition-colors`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Button asChild variant="premium" size="sm">
            <Link to="/booking">Plan Your Event</Link>
          </Button>
        </div>
        {/* Mobile quick CTA */}
        <div className="ml-auto md:hidden">
          <Button asChild variant="premium" size="sm">
            <Link to="/booking">Plan</Link>
          </Button>
        </div>
      </nav>
      {/* Mobile nav scroller */}
      <div className="md:hidden border-t">
        <div className="container overflow-x-auto no-scrollbar">
          <div className="flex gap-5 py-2">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
