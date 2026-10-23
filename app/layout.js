import "./globals.css";
import { CartProvider } from "./CartContext";
import Navbar from "./Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CartProvider>
          <Navbar />
          <div style={{ paddingTop: '65px' }}>
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
