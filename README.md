Setup:
im Verzeichnis ~/Webapp/server eine Datei namens .env anlegen mit dem Inhalt GEMINI_API_KEY=DEIN_API_KEY.
DEIN_API_KEY soll ersetzt werden durch einen unique API Key, den man bei Google AI Studio erstellen kann https://aistudio.google.com/app/api-keys.
Im Verzeichnis ~/Webapp muss noch npm install @google/genai installiert werden.

Um Node und Npm zu testen können die Befehle node -v und npm -v ausgeführt werden.

Es muss einmalig im Verzeichnis ~/Webapp der Befehl npm install ausgeführt werden.

Falls Sqlite noch nicht importiert, dann im Verzeichnis ~/Webapp npm install sqlite.

Um die Webapp zu starten im Verzeichnis ~/Webapp npm run dev ausführen.

Um Server zu starten im Verzeichnis ~/Webapp/server node server.js ausführen.