import { Helmet } from "react-helmet-async";
import HeroCarousel from "@/components/home/HeroCarousel";
import RentalServicesGrid from "@/components/home/RentalServicesGrid";
import ClientLogosCarousel from "@/components/home/ClientLogosCarousel";
import ContactForm from "@/components/home/ContactForm";
import NewsAchievementsSection from "@/components/home/NewsAchievementsSection";

const Index = () => {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'EVNTING',
    url: 'https://evnting.com',
    sameAs: ['https://wa.me/919581085678', 'https://www.instagram.com/_evnting.com_/'],
  };

  return (
    <main>
      <Helmet>
        <title>EVNTING – Luxury Event Management</title>
        <meta name="description" content="Luxury weddings, corporate events, exhibitions, concerts and private parties. We create unforgettable events worldwide." />
        <link rel="canonical" href="https://evnting.com/" />
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
      </Helmet>
      
      {/* Hero Section - Full-screen carousel with event types */}
      <HeroCarousel />
      
      {/* Rental Services Section */}
      <RentalServicesGrid />
      
      {/* Trusted Clients Logos */}
      <ClientLogosCarousel />
      
      {/* News & Achievements */}
      <NewsAchievementsSection />
      
      {/* Get in Touch */}
      <ContactForm />
    </main>
  );
};

export default Index;
