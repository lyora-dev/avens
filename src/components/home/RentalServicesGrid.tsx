import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RentalService {
  id: string;
  name: string;
  description: string | null;
}

const RentalServicesGrid = () => {
  const [services, setServices] = useState<RentalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRentalServices();
  }, []);

  const fetchRentalServices = async () => {
    try {
      const { data, error } = await supabase
        .from('rental_services')
        .select('id, name, description')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching rental services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleServiceClick = () => {
    // Navigate to e-commerce page
    window.location.href = '/ecommerce';
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rental Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional event equipment and services available for rental
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card 
                key={service.id} 
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                onClick={handleServiceClick}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{service.name}</span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </CardTitle>
                </CardHeader>
                {service.description && (
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No rental services available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RentalServicesGrid;