import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '⚡ CodeForge Labs - AI-Powered Experimental Testing Platform',
  description:
    '🚀 Revolutionary self-improving experimental testing system that uses AI agents to continuously experiment, measure, and optimize your application in real-time',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <QueryProvider>
          <div className="min-h-screen relative overflow-hidden">
            {/* Animated background particles */}
            <div className="fixed inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-500 rounded-full floating-element opacity-20"></div>
              <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-cyan-500 rounded-full floating-element opacity-30" style={{animationDelay: '2s'}}></div>
              <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-blue-400 rounded-full floating-element opacity-40" style={{animationDelay: '4s'}}></div>
              <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-pink-500 rounded-full floating-element opacity-25" style={{animationDelay: '1s'}}></div>
            </div>
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
