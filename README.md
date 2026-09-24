# Game Night (PWA)

Seven party games in one app: **Karaoke Challenge**, **Imposter**, **Who Would**, **Liar's Cards**, **Undercover**, **Ballpark** and **Emoji Pictionary**. Live at https://reizun.github.io/game-night/

Static web app – no build step, no server logic. Karaoke Challenge runs on one device; every game runs with phones: players join with a 4-letter room code and use their own phone as a controller (draw, done, pass, sing-off votes, Imposter answers, Who Would ballots, Liar's Cards hands). Every card is worth 10 points, sing-offs add ±5, three secret awards are revealed at the end, and after each game the phones vote what to play next.

- **Karaoke Challenge** – draw a card, accept or pass before the timer runs out, sing, get challenged to a sing-off.
- **Imposter** – everyone answers a question on their phone, one player secretly got a different one; discuss and vote – votes are final, the fastest correct vote scores most (150 question pairs).
- **Who Would** – "Who would most likely …": everyone votes for a player, no points, review at the end (150 questions).
- **Liar's Cards** – Liar's Bar with points: play 1–3 cards face down as the table card; after every play everyone has 30 s to call liar. The pot grows with every play – first correct caller gets the pot, later callers less, wrong calls cost points. The deck grows with the player count (2–8).
- **Undercover** – everyone gets the same secret topic except the spy; talk, vote, then the spy guesses the topic from six options – or guesses early during the talk for up to 20 points (140 topics).
- **Ballpark** – percent questions, everyone guesses 0–100, closest wins (100 questions).
- **Emoji Pictionary** – the host shows an emoji card (124 built-in movies and anime, plus your own), everyone guesses the title on their phone (German titles count too, switchable in Settings); or switch to draw mode, where a player describes a title with emojis live.
- **Color** – like dialed.gg: a color flashes on the TV, everyone mixes it from memory on their phone (hue, saturation, brightness); scored 0–10 by color difference.
- **Color Toon** – a cartoon, game or anime character with one part hatched (Pikachu's cheeks, Mario's overalls, Goku's gi …); color it in from memory. 154 official pictures loaded from Wikipedia and Fandom wikis at runtime (not stored in this repo; every pixel of the region colour is recoloured, shading kept); a picture that fails to load is skipped.
- **Time Imposter** – everyone gets a secret time except the imposter; one after another everyone holds their button that long, the imposter copies the others; then all times are revealed, discuss and vote.
- **Guess the Song** – the host plays the first seconds of a song (YouTube intro, buffered in advance; iTunes preview as fallback), everyone picks one of four answers on their phone, fastest right answer scores most. Categories: 2000s, 2010s, Current hits, K-Pop, Disney (German), Anime (German), Anime (Japanese) (164 songs).

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
