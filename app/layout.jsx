import './globals.css';

export const metadata = {
  title: 'Mo Famiz Productions',
  description: 'Premium Music Production, Mixing & Mastering',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
