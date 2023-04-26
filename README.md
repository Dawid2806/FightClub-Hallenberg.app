echo "# Fight Club Hallenberg Booking App

A booking application for Fight Club Hallenberg gym members. This app allows members to book training sessions and view news updates. The app is built using Next.js, Nhost, GraphQL, and Tailwind CSS.

[English](#english)
[Deutsch](#deutsch)

<a name=\"english\"></a>

## English

### Prerequisites

Before running the application, ensure you have the following:

1. Node.js installed (version 14.x or higher)
2. NPM installed (version 6.x or higher)

### Installation

To set up the project locally, follow these steps:

1. Clone the repository:

\`\`\`bash
git clone https://github.com/Dawid2806/fightclub-hallenberg.app.git
\`\`\`

2. Change to the project directory:

\`\`\`bash
cd fightclub-hallenberg.app
\`\`\`

3. Install the dependencies:

\`\`\`bash
npm install
\`\`\`

4. Copy the \`.env.example\` file to \`.env.local\`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

5. Update the environment variables in the \`.env.local\` file:

- \`NHOST_BACKEND_URL\`: Your Nhost backend URL.
- \`NHOST_JWT_SECRET\`: The JWT secret for your Nhost project.
- \`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN\`: Your Mapbox access token.

### Running the application

To start the development server, run the following command:

\`\`\`bash
npm run dev
\`\`\`

You can now access the application in your browser at [http://localhost:3000](http://localhost:3000).

### Deployment

To deploy the application, you can use a platform like [Vercel](https://vercel.com/), which is recommended for Next.js applications. Follow their deployment guide to set up your project for deployment.

### License

This project is licensed under the MIT License. For more information, see the [LICENSE](LICENSE) file.

<a name=\"deutsch\"></a>

## Deutsch

### Voraussetzungen

Bevor Sie die Anwendung ausführen, stellen Sie sicher, dass Sie folgendes haben:

1. Node.js installiert (Version 14.x oder höher)
2. NPM installiert (Version 6.x oder höher)

### Installation

Um das Projekt lokal einzurichten, führen Sie diese Schritte aus:

1. Das Repository klonen:

\`\`\`bash
git clone https://github.com/Dawid2806/fightclub-hallenberg.app.git
\`\`\`

2. Wechseln Sie in das Projektverzeichnis:

\`\`\`bash
cd fightclub-hallenberg.app
\`\`\`

3. Installieren Sie die Abhängigkeiten:

\`\`\`bash
npm install
\`\`\`

4. Kopieren Sie die \`.env.example\` Datei nach \`.env.local\`:

\`\`\`bash
cp .env.example .env.local
\`\`\`

5. Aktualisieren Sie die Umgebungsvariablen in der \`.env.local\` Datei:

- \`NHOST_BACKEND_URL\`: Ihre Nhost-Backend-URL.
- \`NHOST_JWT_SECRET\`: Der JWT-Geheimcode für Ihr Nhost-Projekt.
- \`NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN\`: Ihr Mapbox-Zugriffstoken.

### Anwendung starten

Um den Entwicklungsserver zu starten, führen Sie den folgenden Befehl aus:

\`\`\`bash
npm run dev
\`\`\`

Sie können nun auf die Anwendung in Ihrem Browser unter [http://localhost:3000](http://localhost:3000)zugreifen.

### Bereitstellung

Um die Anwendung bereitzustellen, können Sie eine Plattform wie Vercel verwenden, die für Next.js-Anwendungen empfohlen wird. Befolgen Sie deren Bereitstellungsanleitung, um Ihr Projekt für die Bereitstellung einzurichten.

### Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.[LICENSE](LICENSE).
