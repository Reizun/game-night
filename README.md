# Game Night (PWA)

Three party games in one app: **Karaoke Challenge**, **Imposter** and **Who Would**. Live at https://reizun.github.io/game-night/

Static web app – no build step, no server logic. Play on one device (pass it around) or host with phones: every player joins with a 4-letter room code and uses their own phone as a controller (draw, done, pass, vote for the best performance of each round). Three secret awards are revealed at the end.

## Run locally
Any static server works, e.g.:

    npx serve .

Open http://localhost:3000 and use "Install app" (Chrome/Edge) or Share → "Add to Home Screen" (iOS Safari).

## Deploy (free)
- **GitHub Pages:** push this folder to a repo, Settings → Pages → Deploy from branch → root. URL: https://<user>.github.io/<repo>/
- **Netlify Drop:** drag the folder onto https://app.netlify.com/drop

Service worker needs HTTPS (or localhost) – both hosts provide it.

## Phones as controllers (Firebase Realtime Database, free)
1. Create a Firebase project, add a **Realtime Database** (start in test mode).
2. Rules tab – paste:

        {
          "rules": {
            "rooms": {
              "$code": { ".read": true, ".write": true, ".validate": "$code.matches(/^[A-Z2-9]{4}$/)" }
            }
          }
        }

3. In index.html replace `__DB_URL__` with your database URL (looks like `https://<project>-default-rtdb.<region>.firebasedatabase.app`).

On localhost the app talks to a local stand-in at http://127.0.0.1:3130 instead. Rooms live under `/rooms/<CODE>`: the host writes `state`, phones register under `members`, send `actions` (draw/done/pass) and `votes`.

## Files
- index.html – the whole app (cards, logic, styles, multiplayer)
- manifest.webmanifest – PWA metadata
- sw.js – offline cache (app shell + fonts; database traffic is never cached)
- icon-*.png – app icons
