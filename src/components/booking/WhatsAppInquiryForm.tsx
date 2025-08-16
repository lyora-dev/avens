import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  budget: string;
  message: string;
}

const WhatsAppInquiryForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_requests')
        .insert({
          name: formData.name,
          email: formData.email || null,
          phone: formData.phone,
          message: `Event Type: ${formData.eventType}\nDate: ${formData.eventDate}\nGuests: ${formData.guestCount}\nBudget: ${formData.budget}\n\nMessage: ${formData.message}`,
          source_page: 'booking'
        });

      if (dbError) throw dbError;

      // Format WhatsApp message
      const whatsappMessage = `Hi! I'm interested in planning an event.

Name: ${formData.name}
${formData.email ? `Email: ${formData.email}` : ''}
Phone: ${formData.phone}
${formData.eventType ? `Event Type: ${formData.eventType}` : ''}
${formData.eventDate ? `Event Date: ${formData.eventDate}` : ''}
${formData.guestCount ? `Guest Count: ${formData.guestCount}` : ''}
${formData.budget ? `Budget: ${formData.budget}` : ''}
${formData.message ? `\nAdditional Details:\n${formData.message}` : ''}`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://wa.me/919581085678?text=${encodedMessage}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Success!",
        description: "Your inquiry has been saved and WhatsApp is opening.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        guestCount: "",
        budget: "",
        message: "",
      });

    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Send WhatsApp Inquiry
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email (Optional)</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={formData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="birthday">Birthday Party</SelectItem>
                  <SelectItem value="corporate">Corporate Event</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="baby-shower">Baby Shower</SelectItem>
                  <SelectItem value="engagement">Engagement</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventDate">Preferred Date</Label>
              <Input
                id="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={(e) => handleInputChange('eventDate', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expected Guests</Label>
              <Select value={formData.guestCount} onValueChange={(value) => handleInputChange('guestCount', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-50">1-50 guests</SelectItem>
                  <SelectItem value="51-100">51-100 guests</SelectItem>
                  <SelectItem value="101-200">101-200 guests</SelectItem>
                  <SelectItem value="201-500">201-500 guests</SelectItem>
                  <SelectItem value="500+">500+ guests</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select value={formData.budget} onValueChange={(value) => handleInputChange('budget', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-1lakh">Under ₹1 Lakh</SelectItem>
                  <SelectItem value="1-3lakh">₹1-3 Lakh</SelectItem>
                  <SelectItem value="3-5lakh">₹3-5 Lakh</SelectItem>
                  <SelectItem value="5-10lakh">₹5-10 Lakh</SelectItem>
                  <SelectItem value="10lakh+">₹10 Lakh+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Additional Details</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell us about your vision, venue preferences, specific requirements..."
              rows={4}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send WhatsApp Inquiry
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default WhatsAppInquiryForm;