// app/layout.tsx or app/layout.js
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // choose weights you need
  variable: '--font-poppins',
});

export const metadata = {
  title: "DigiMonitor",
  description: "App description",
  icons: {
    icon: "/favicon.ico", // path to your icon in /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ zoom: '0.75' }}>{children}</body>
    </html>
  );
}
