import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { BagProvider } from "@/context/BagContext";
import { MetaPixel } from "@/components/MetaPixel";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loja Status — Grandes marcas, produtos originais",
  description:
    "Mais de 40 anos vestindo histórias. Grandes marcas, produtos originais e envio para todo o Brasil. Escolha sua peça e finalize com atendimento próximo.",
  openGraph: {
    title: "Loja Status — Grandes marcas, produtos originais",
    description:
      "São Francisco de Assis · RS. Peças selecionadas, atendimento de perto e envio para todo o Brasil.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="min-h-screen bg-cream text-espresso antialiased">
        <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ""} />
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-espresso focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-cream"
        >
          Ir para o conteúdo principal
        </a>
        <BagProvider>{children}</BagProvider>
      </body>
    </html>
  );
}
