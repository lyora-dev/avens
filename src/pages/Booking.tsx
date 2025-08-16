import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import WhatsAppInquiryForm from "@/components/booking/WhatsAppInquiryForm";

const Booking = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Booking request sent",
        description: "We’ll get back to you within 24 hours.",
      });
    }, 1000);
  };

  return (
    <main>
      <Helmet>
        <title>Booking – EVNTING</title>
        <meta name="description" content="Book your event with EVNTING. Secure your date and share details for a tailored proposal." />
        <link rel="canonical" href="https://evnting.com/booking" />
      </Helmet>

      <header className="container py-12">
        <h1 className="font-display text-4xl md:text-5xl">Book Your Event</h1>
        <p className="mt-3 text-muted-foreground max-w-2xl">Tell us about your celebration or brand experience and we’ll craft a bespoke plan.</p>
      </header>

      <section className="container pb-12">
        <Tabs defaultValue="whatsapp" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="whatsapp">WhatsApp Inquiry</TabsTrigger>
            <TabsTrigger value="booking">Booking Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Quick WhatsApp Inquiry</h2>
              <p className="text-muted-foreground">Get instant response via WhatsApp - fastest way to connect with us!</p>
            </div>
            <WhatsAppInquiryForm />
          </TabsContent>
          
          <TabsContent value="booking" className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold mb-2">Detailed Booking Form</h2>
              <p className="text-muted-foreground">Submit a comprehensive booking request for detailed planning</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              <form onSubmit={onSubmit} className="space-y-5 rounded-xl border bg-card p-6 shadow-elevated">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input id="name" name="name" required placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" type="tel" required placeholder="+1 555 000 0000" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Event type</Label>
                    <Select name="eventType" defaultValue="corporate">
                      <SelectTrigger>
                        <SelectValue placeholder="Select event" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corporate">Corporate</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="concert">Concert</SelectItem>
                        <SelectItem value="exhibition">Exhibition</SelectItem>
                        <SelectItem value="private">Private Party</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred date</Label>
                    <Input id="date" name="date" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="guests">Guest count</Label>
                    <Input id="guests" name="guests" type="number" min={1} placeholder="e.g. 250" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="City, venue, or country" />
                  </div>
                  <div className="space-y-2">
                    <Label>Budget</Label>
                    <Select name="budget" defaultValue="50-100k">
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<25k">Under $25k</SelectItem>
                        <SelectItem value="25-50k">$25k – $50k</SelectItem>
                        <SelectItem value="50-100k">$50k – $100k</SelectItem>
                        <SelectItem value=">100k">Over $100k</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" name="notes" rows={5} placeholder="Share your vision, special requests, timelines, or references." />
                </div>
                <Button type="submit" size="lg" variant="hero" disabled={loading} className="w-full md:w-auto">
                  {loading ? "Submitting..." : "Request Booking"}
                </Button>
              </form>

              <aside className="rounded-xl border bg-card p-6 shadow-elevated space-y-4">
                <h3 className="font-medium text-lg">What happens next?</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                  <li>Our producer will contact you within 24 hours.</li>
                  <li>We'll confirm availability and outline next steps.</li>
                  <li>Receive a tailored proposal and timeline.</li>
                </ul>
                <div className="pt-2 text-sm">
                  Prefer WhatsApp? Switch to the <button 
                    onClick={() => (document.querySelector('[value="whatsapp"]') as HTMLElement)?.click()} 
                    className="underline"
                  >
                    WhatsApp tab
                  </button> for instant messaging.
                </div>
              </aside>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default Booking;
