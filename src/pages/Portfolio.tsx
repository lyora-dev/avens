import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Images, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Lightbox from "@/components/portfolio/Lightbox";
import { useToast } from "@/hooks/use-toast";

interface Gallery {
  id: string;
  name: string;
  slug: string;
  event_date: string | null;
  cover_image_url: string | null;
  created_at: string;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

const Portfolio = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [lightboxImages, setLightboxImages] = useState<any[]>([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from('galleries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast({
        title: "Error",
        description: "Failed to load portfolio galleries",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openGallery = async (galleryId: string) => {
    try {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('sort_order', { ascending: true });

      if (error) throw error;

      const formattedImages = (data || []).map((img: GalleryImage) => ({
        id: img.id,
        url: img.image_url,
        caption: img.caption,
        alt: img.caption || 'Gallery image'
      }));

      setLightboxImages(formattedImages);
      setCurrentImageIndex(0);
      setIsLightboxOpen(true);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery images",
        variant: "destructive",
      });
    }
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setLightboxImages([]);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === lightboxImages.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? lightboxImages.length - 1 : prev - 1
    );
  };

  const formatEventDate = (dateString: string | null) => {
    if (!dateString) return 'Date TBD';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          Loading portfolio...
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Portfolio - Event Galleries | EVNTING</title>
        <meta name="description" content="Explore our stunning event portfolio featuring weddings, corporate events, and celebrations we've brought to life." />
        <link rel="canonical" href="https://evnting.com/portfolio" />
      </Helmet>

      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="container py-12">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-6xl mb-4">Portfolio</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Take a glimpse into the extraordinary events we've crafted. From intimate gatherings to grand celebrations, each gallery tells a unique story.
            </p>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="container pb-16">
          {galleries.length === 0 ? (
            <div className="text-center py-16">
              <Images className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Galleries Yet</h2>
              <p className="text-muted-foreground">
                Our portfolio galleries will appear here once they're added by our team.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleries.map((gallery) => (
                <Card key={gallery.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={gallery.cover_image_url || '/placeholder.svg'}
                      alt={gallery.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button
                        onClick={() => openGallery(gallery.id)}
                        className="bg-white text-black hover:bg-white/90"
                      >
                        <Images className="h-4 w-4 mr-2" />
                        View Gallery
                      </Button>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{gallery.name}</CardTitle>
                    {gallery.event_date && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatEventDate(gallery.event_date)}
                      </div>
                    )}
                  </CardHeader>

                  <CardContent>
                    <Button
                      onClick={() => openGallery(gallery.id)}
                      variant="outline"
                      className="w-full"
                    >
                      <Images className="h-4 w-4 mr-2" />
                      View Gallery
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        isOpen={isLightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </>
  );
};

export default Portfolio;