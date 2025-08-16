import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Mail, Phone, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface EventType {
  id: string;
  name: string;
  slug: string;
  hero_image_url: string | null;
  description: string | null;
  process_steps: any;
}

interface Gallery {
  id: string;
  name: string;
  cover_image_url: string | null;
}

const EventDetails = () => {
  const { eventType } = useParams<{ eventType: string }>();
  const [event, setEvent] = useState<EventType | null>(null);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchEventData();
  }, [eventType]);

  const fetchEventData = async () => {
    try {
      const { data: eventData, error: eventError } = await supabase
        .from('event_types')
        .select('*')
        .eq('slug', eventType)
        .single();

      if (eventError) throw eventError;

      const { data: galleryData, error: galleryError } = await supabase
        .from('galleries')
        .select('id, name, cover_image_url, event_type_id')
        .eq('event_type_id', eventData.id);

      if (galleryError) throw galleryError;

      setEvent(eventData);
      setGalleries(galleryData || []);
    } catch (error) {
      console.error('Error fetching event data:', error);
      toast({
        title: "Error",
        description: "Failed to load event details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('enquiry_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          event_type: event?.name,
          source_page: `events/${eventType}`
        });

      if (error) throw error;

      toast({
        title: "Enquiry Sent!",
        description: "We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      toast({
        title: "Error",
        description: "Failed to send enquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-muted-foreground">The requested event type could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{event.name} - EVNTING</title>
        <meta name="description" content={event.description || `Professional ${event.name.toLowerCase()} management services`} />
        <link rel="canonical" href={`https://evnting.com/events/${eventType}`} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        {event.hero_image_url && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${event.hero_image_url})` }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        )}
        
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{event.name}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            {event.description || `Professional ${event.name.toLowerCase()} management services`}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Event Description */}
        {event.description && (
          <section className="mb-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">About Our {event.name}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {event.description}
              </p>
            </div>
          </section>
        )}

        {/* Process Steps */}
        {event.process_steps && Array.isArray(event.process_steps) && event.process_steps.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">How We Manage This Event</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {event.process_steps.map((step: any, index: number) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Event Photos */}
        {galleries.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Event Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <Card key={gallery.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative">
                    {gallery.cover_image_url && (
                      <img
                        src={gallery.cover_image_url}
                        alt={gallery.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{gallery.name}</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.location.href = `/portfolio/${gallery.id}`}
                    >
                      View Gallery
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Enquire Now Form */}
        <section>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold mb-4">Enquire Now</h2>
                  <p className="text-muted-foreground">
                    Ready to plan your {event.name.toLowerCase()}? Get in touch with us today!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Tell us about your ${event.name.toLowerCase()} requirements...`}
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Enquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};

export default EventDetails;