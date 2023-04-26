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
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="description"
          content="Anmelde-App für Trainingskurse mit Filterung verfügbarer Kurse basierend auf Benutzerrollen, für ein deutsches Unternehmen."
        />
        <meta
          name="keywords"
          content="Trainingsanmeldung, Benutzerrollen, Kursfilterung, deutsche Firma, Trainings"
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
