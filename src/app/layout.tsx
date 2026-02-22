import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YourHouse",
  description: "Строительство каменных и каркасных домов с фиксацией цены",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="yandex-metrika"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=103926054', 'ym');
            
            ym(103926054, 'init', { ssr: true, webvisor: true, clickmap: true, accurateTrackBounce: true, trackLinks: true });
          `,
          }}
        />
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/103926054"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
        <Script
          id="bitrix24-site-button"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,u){
                var s=d.createElement('script');
                s.async=true;
                s.src=u+'?'+(Date.now()/60000|0);
                var h=d.getElementsByTagName('script')[0];
                h.parentNode.insertBefore(s,h);
              })(window,document,'https://cdn-ru.bitrix24.ru/b35125972/crm/site_button/loader_2_fk3g8x.js');
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
