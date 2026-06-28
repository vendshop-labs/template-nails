import { WHATSAPP_NUMBER } from '@/lib/constants';
import WhatsAppIcon from './WhatsAppIcon';

interface WhatsAppButtonProps {
  phone?: string | null;
}

export default function WhatsAppButton({ phone }: WhatsAppButtonProps) {
  const number = phone
    ? phone.replace(/\D/g, '')
    : WHATSAPP_NUMBER;
  const href = `https://wa.me/${number}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title="WhatsApp"
      className="whatsapp-float"
    >
      <WhatsAppIcon size={32} />
    </a>
  );
}
