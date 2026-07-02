import WhatsAppIcon from './WhatsAppIcon';

interface WhatsAppButtonProps {
  phone?: string | null;
}

export default function WhatsAppButton({ phone }: WhatsAppButtonProps) {
  const number = (phone ?? '').replace(/[^\d]/g, '');
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      className="whatsapp-float"
    >
      <WhatsAppIcon size={32} />
    </a>
  );
}
