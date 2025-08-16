import { MessageCircle } from "lucide-react";

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919581085678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 btn-premium border-soft rounded-full p-3 shadow-glow hover-scale"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
};

export default FloatingWhatsAppButton;
