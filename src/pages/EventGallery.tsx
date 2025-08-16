import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Lightbox from "@/components/portfolio/Lightbox";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Gallery {
  id: string;
  name: string;
  event_date: string | null;
  before_image_url: string | null;
  after_image_url: string | null;
}

interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
}

const EventGallery = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryData();
  }, [eventId]);

  const fetchGalleryData = async () => {
    try {
      const { data: galleryData, error: galleryError } = await supabase
        .from('galleries')
        .select('*')
        .eq('id', eventId)
        .single();

      if (galleryError) throw galleryError;

      const { data: imagesData, error: imagesError } = await supabase
        .from('gallery_images')
        .select('*')
        .eq('gallery_id', eventId)
        .order('sort_order', { ascending: true });

      if (imagesError) throw imagesError;

      setGallery(galleryData);
      setImages(imagesData || []);
    } catch (error) {
      console.error('Error fetching gallery data:', error);
      toast({
        title: "Error",
        description: "Failed to load gallery",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const allImages = [
    ...images.map((img, index) => ({ id: img.id, url: img.image_url, caption: img.caption || "" })),
    ...(gallery?.before_image_url && gallery?.after_image_url 
      ? [
          { id: 'before', url: gallery.before_image_url, caption: "Before" },
          { id: 'after', url: gallery.after_image_url, caption: "After" }
        ] 
      : [])
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!gallery) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Gallery Not Found</h1>
          <p className="text-muted-foreground">The requested gallery could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{gallery.name} - Event Gallery - EVNTING</title>
        <meta name="description" content={`Photo gallery for ${gallery.name} event managed by EVNTING`} />
        <link rel="canonical" href={`https://evnting.com/portfolio/${eventId}`} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-4xl font-bold mb-2">{gallery.name}</h1>
          {gallery.event_date && (
            <p className="text-muted-foreground">
              Event Date: {new Date(gallery.event_date).toLocaleDateString()}
            </p>
          )}
        </div>

        {/* Gallery Grid */}
        {images.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Event Photos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="aspect-square cursor-pointer overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-shadow"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.image_url}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Before & After */}
        {gallery.before_image_url && gallery.after_image_url && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Before & After</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div 
                className="space-y-4 cursor-pointer"
                onClick={() => openLightbox(images.length)}
              >
                <h3 className="text-lg font-semibold text-center">Before</h3>
                <div className="aspect-video overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-shadow">
                  <img
                    src={gallery.before_image_url}
                    alt="Before transformation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <div 
                className="space-y-4 cursor-pointer"
                onClick={() => openLightbox(images.length + 1)}
              >
                <h3 className="text-lg font-semibold text-center">After</h3>
                <div className="aspect-video overflow-hidden rounded-lg bg-muted hover:shadow-lg transition-shadow">
                  <img
                    src={gallery.after_image_url}
                    alt="After transformation"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Empty State */}
        {images.length === 0 && !gallery.before_image_url && !gallery.after_image_url && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No images available for this gallery yet.</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Lightbox
        images={allImages}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        currentIndex={currentImageIndex}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </main>
  );
};

export default EventGallery;