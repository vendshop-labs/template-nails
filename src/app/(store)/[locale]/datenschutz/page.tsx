import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Datenschutzerklärung',
    robots: { index: false, follow: false },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'de') notFound();

  return (
    <main style={{
      maxWidth: 720,
      margin: '4rem auto',
      padding: '0 1.5rem 4rem',
      fontFamily: 'inherit',
      lineHeight: 1.7,
    }}>
      <h1>Datenschutzerklärung</h1>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>Stand: Juli 2026</p>

      <h2>1. Verantwortliche Stelle</h2>
      <p>
        Lumière Nails<br />
        Inhaberin: [Vorname Nachname]<br />
        Friedrichstraße 100, 10117 Berlin<br />
        Telefon: +49 30 901 820 60<br />
        E-Mail: info@lumiere-nails.de
      </p>

      <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
      <p>
        Wir erheben personenbezogene Daten nur, soweit dies für die
        Bereitstellung unserer Dienstleistungen erforderlich ist.
      </p>

      <h3>2.1 Beim Besuch der Website</h3>
      <p>
        Beim Aufrufen dieser Website werden automatisch technische Daten
        übermittelt (IP-Adresse, Browser-Typ, Uhrzeit). Diese Daten werden
        ausschließlich für den Betrieb der Website verwendet und nach
        spätestens 7 Tagen gelöscht.
      </p>

      <h3>2.2 Online-Terminbuchung</h3>
      <p>Bei der Terminbuchung erheben wir:</p>
      <ul>
        <li>Vorname / Name</li>
        <li>Telefonnummer</li>
        <li>Optionale Anmerkungen</li>
      </ul>
      <p>
        Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).<br />
        Die Daten werden ausschließlich zur Terminbestätigung verwendet und
        nach Ablauf des Termins gelöscht. Eine Weitergabe an Dritte erfolgt nicht.
      </p>

      <h3>2.3 WhatsApp-Kontakt</h3>
      <p>
        Wenn Sie uns über WhatsApp kontaktieren, werden Ihre Nachrichten
        von WhatsApp (Meta Platforms Ireland Ltd.) verarbeitet.
        Informationen zum Datenschutz bei WhatsApp:{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          whatsapp.com/legal/privacy-policy
        </a>
      </p>

      <h2>3. Cookies</h2>
      <p>
        Diese Website verwendet ausschließlich technisch notwendige Cookies,
        die für den Betrieb der Buchungsfunktion erforderlich sind.
        Es werden keine Tracking-, Analyse- oder Werbe-Cookies eingesetzt.
      </p>

      <h2>4. Google Maps</h2>
      <p>
        Zur Darstellung unseres Standorts nutzen wir Google Maps
        (Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA).<br />
        Bei Verwendung von Google Maps kann Google Daten über Ihre Nutzung
        der Kartenfunktionen erheben. Weitere Informationen:{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          policies.google.com/privacy
        </a>
      </p>

      <h2>5. Hosting</h2>
      <p>
        Diese Website wird auf Servern von Vercel Inc.
        (340 Pine Street Suite 701, San Francisco, CA 94104, USA) gehostet.
        Vercel verarbeitet Verbindungsdaten gemäß ihrer{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung
        </a>.
      </p>

      <h2>6. Ihre Rechte (DSGVO)</h2>
      <p>Sie haben das Recht auf:</p>
      <ul>
        <li><strong>Auskunft</strong> (Art. 15 DSGVO)</li>
        <li><strong>Berichtigung</strong> (Art. 16 DSGVO)</li>
        <li><strong>Löschung</strong> (Art. 17 DSGVO)</li>
        <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
        <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
        <li><strong>Widerspruch</strong> (Art. 21 DSGVO)</li>
      </ul>
      <p>
        Zur Wahrnehmung Ihrer Rechte wenden Sie sich an: info@lumiere-nails.de
      </p>

      <h2>7. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei der zuständigen Datenschutzbehörde
        zu beschweren. In Berlin: Berliner Beauftragte für Datenschutz und
        Informationsfreiheit, Friedrichstr. 219, 10969 Berlin.
      </p>

      <h2>8. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
        wenn sich rechtliche Anforderungen ändern.
      </p>
    </main>
  );
}
