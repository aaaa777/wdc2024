import { Inter, M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const mpr1c = M_PLUS_Rounded_1c({ weight: "400", subsets: ["latin"]});

export const metadata = {
  title: "WDC2024 | Sort Museum",
  description: "WDC2024 | Sort Museum",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={mpr1c.className}>{children}</body>
    </html>
  );
}
