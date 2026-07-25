import type { Metadata } from 'next';
import './globals.css';
import Particles from '@/components/Particles';

export const metadata: Metadata = {
  title: 'DnyanX AI | Branded AI Assistant',
  description: 'Custom AI Assistant for client queries, quotes, & services by DnyanX Tech.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-[#00FF66] selection:text-black bg-grid relative overflow-x-hidden bg-[#020617]">
        {/* Animated Background Glowing Orbs */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        
        {/* Particle Canvas */}
        <Particles />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
