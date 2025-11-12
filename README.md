Setup:
im Verzeichnis ~/Webapp/server eine Datei namens .env anlegen mit dem Inhalt GEMINI_API_KEY=DEIN_API_KEY.
DEIN_API_KEY soll direkt nach dem = Zeichen ersetzt werden durch einen unique API Key, den man bei Google AI Studio erstellen kann 
https://aistudio.google.com/app/api-keys.
Im Verzeichnis ~/Webapp muss noch npm install @google/genai installiert werden.

In der zweiten Zeile der .env Datei ELEVENLABS_API_KEY=Dein_API_KEY anlegen. DEIN_API_KEY soll ersetzt werden durch einen unique API KEY den man
ähnlich wie bei Google AI Studio nach dem Log In generieren kann https://elevenlabs.io/app/developers/api-keys. 

Es muss einmalig im Verzeichnis ~/Webapp der Befehl npm install ausgeführt werden.

Falls Sqlite noch nicht importiert, dann im Verzeichnis ~/Webapp npm install sqlite, sowie npm install sqlite3.

Um die Webapp zu starten im Verzeichnis ~/Webapp npm run dev ausführen.

Um Server zu starten im Verzeichnis ~/Webapp/server node server.js ausführen.