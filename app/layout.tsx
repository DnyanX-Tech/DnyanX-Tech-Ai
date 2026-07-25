import type { Metadata } from 'next';
import './globals.css';

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
      <body className="antialiased selection:bg-[#00FF66] selection:text-black">
        {children}
      </body>
    </html>
  );
}
