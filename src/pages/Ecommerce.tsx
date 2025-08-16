import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
}

interface EnquiryForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Ecommerce = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [enquiryForms, setEnquiryForms] = useState<{ [key: string]: EnquiryForm }>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (productId: string, field: keyof EnquiryForm, value: string) => {
    setEnquiryForms(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const getFormData = (productId: string): EnquiryForm => {
    return enquiryForms[productId] || { name: "", email: "", phone: "", message: "" };
  };

  const handleSubmit = async (e: React.FormEvent, productId: string, productName: string) => {
    e.preventDefault();
    
    const formData = getFormData(productId);
    
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('enquiry_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          product_id: productId,
          source_page: 'ecommerce'
        });

      if (error) throw error;

      toast({
        title: "Enquiry Sent!",
        description: `We'll get back to you about ${productName}.`,
      });

      // Clear form
      setEnquiryForms(prev => ({
        ...prev,
        [productId]: { name: "", email: "", phone: "", message: "" }
      }));
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

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Event Equipment Rental - EVNTING</title>
        <meta name="description" content="Rent professional event equipment including lighting, sound systems, stages, and more from EVNTING" />
        <link rel="canonical" href="https://evnting.com/ecommerce" />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.location.href = '/'}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl font-bold mb-4">Event Equipment Rental</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Premium event equipment available for rental. Get professional-grade equipment 
            for your events with our competitive pricing and expert support.
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {products.map((product) => {
              const formData = getFormData(product.id);
              
              return (
                <Card key={product.id} className="overflow-hidden">
                  <div className="md:flex">
                    {/* Product Image */}
                    <div className="md:w-1/2">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-64 md:h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-64 md:h-full bg-muted flex items-center justify-center">
                          <span className="text-muted-foreground">No Image</span>
                        </div>
                      )}
                    </div>

                    {/* Product Details & Form */}
                    <div className="md:w-1/2 p-6">
                      <div className="mb-6">
                        <div className="flex items-start justify-between mb-3">
                          <h2 className="text-2xl font-bold">{product.name}</h2>
                          {product.price && (
                            <Badge variant="secondary" className="text-lg px-3 py-1">
                              ₹{product.price.toLocaleString()}
                            </Badge>
                          )}
                        </div>
                        
                        {product.description && (
                          <p className="text-muted-foreground mb-4">
                            {product.description}
                          </p>
                        )}
                      </div>

                      {/* Enquiry Form */}
                      <form onSubmit={(e) => handleSubmit(e, product.id, product.name)} className="space-y-4">
                        <h3 className="font-semibold text-lg mb-3">Enquire Now</h3>
                        
                        <div>
                          <Label htmlFor={`name-${product.id}`}>Full Name *</Label>
                          <Input
                            id={`name-${product.id}`}
                            type="text"
                            value={formData.name}
                            onChange={(e) => handleFormChange(product.id, 'name', e.target.value)}
                            required
                            placeholder="Your full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`email-${product.id}`}>Email</Label>
                          <Input
                            id={`email-${product.id}`}
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleFormChange(product.id, 'email', e.target.value)}
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`phone-${product.id}`}>Phone</Label>
                          <Input
                            id={`phone-${product.id}`}
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleFormChange(product.id, 'phone', e.target.value)}
                            placeholder="+91 98765 43210"
                          />
                        </div>

                        <div>
                          <Label htmlFor={`message-${product.id}`}>Requirements</Label>
                          <Textarea
                            id={`message-${product.id}`}
                            value={formData.message}
                            onChange={(e) => handleFormChange(product.id, 'message', e.target.value)}
                            placeholder={`Tell us about your ${product.name.toLowerCase()} requirements...`}
                            rows={3}
                          />
                        </div>

                        <Button type="submit" className="w-full">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Enquiry
                        </Button>
                      </form>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">No Products Available</h2>
            <p className="text-muted-foreground">
              Our product catalog is being updated. Please check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Ecommerce;