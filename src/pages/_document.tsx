import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-32x32.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/favicon-32x32.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          name="description"
          content="Tritt unserem Kampfkunstschule in Hallenberg bei! Wir bieten eine Vielzahl von Trainingsprogrammen an, wie MMA, Theiboxen, spezielle Kinder- und Frauentraining. Bei uns entwickelst du deine Fähigkeiten in einer freundlichen Umgebung. Wir planen auch, neue Disziplinen einzuführen. Beginnen wir jetzt"
        />
        <meta
          name="keywords"
          content="Kampfkunstschule Hallenberg, MMA Hallenberg, Theiboxen Hallenberg, Kindertraining, Frauentraining, Kampfkunstschule, Kampfkunst für Kinder, Kampfkunst für Frauen, Kampffähigkeiten entwickeln, Neue Kampfkunst-Disziplinen, Tritt uns bei, Kampfkunsttraining, MMA-Club Kampfkunstschule Hallenberg, MMA Training Hallenberg, Theiboxen Training Hallenberg, Kinder Kampfkunst, Frauen Kampfkunst, Lokale Kampfsportschule, MMA für Anfänger, Theiboxen für Anfänger, Professionelles Kampftraining, Gesundheitsorientiertes Training, Personal Training, Kampfkunsttechniken, Selbstverteidigung Kurse, Fitness und Kampfkunst, Kampfsport Events Hallenberg, Kampfsport Ausstattung, Qualifizierte Kampfsporttrainer, Beitreten Kampfkunstschule, Kostenlose Probestunde, Kampfkunst Lifestyle, Kundenspezifisches Training, Sportliche Herausforderung, Gruppen Kampfkunst Kurse, Individuelles Kampftraining"
        />

        <meta property="og:title" content="FightClub-HallenbergApp" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FightClub-HallenbergApp" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
