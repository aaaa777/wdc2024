import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto({ weight: "500", subsets: ["latin"]});

export const metadata = {
  title: "Sort Museum | ボゾソート",
  description: "Sort Museum | ボゾソート",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
