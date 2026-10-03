# Game Night (PWA)

Sixteen party games in one app: **Karaoke Challenge**, **Imposter**, **Who Would**, **Liar's Cards**, **Undercover**, **Ballpark**, **Emoji Pictionary**, **Color**, **Color Toon**, **Time Imposter**, **Guess the Song**, **Number Rush**, **Count It**, **Rank It**, **Attack Zone** and **Punchline**. English or German (Settings › General › Language). Live at https://reizun.github.io/game-night/

Static web app – no build step, no server logic. **Solo mode** runs on one device: the host screen with your phone controller embedded next to it, offering the games that work alone. Otherwise every game runs with phones: players join with a 4-letter room code and use their own phone as a controller (draw, done, pass, sing-off votes, Imposter answers, Who Would ballots, Liar's Cards hands). Every card is worth 10 points, a sing-off moves ±5 for the holder (+10 or −5 for the challenger), three secret awards are revealed at the end, and after each game the phones vote what to play next. Some games ask the phones one more question before they start: song categories (Guess the Song), normal or 18+ (Imposter, Who Would), emoji cards or live (Emoji Pictionary). Solo and duo: Karaoke, Ballpark, Emoji cards, Color, Color Toon and Guess the Song work with a single player, Liar's Cards and Emoji live with two.

Tonight's totals count placement points per game (1st 10, 2nd 8, 3rd 6, then 5, 4, 3 …), so every game weighs the same; a game is counted the moment it ends (after the awards in karaoke) with the players who played it – only a game without any points (Who Would) is left out. Speed rankings treat answers within 300 ms of each other as a tie. Reconnect: the same phone rejoins automatically; on another device, joining with the same name takes over the player once the old phone has been offline for 30 s (phones send a heartbeat every 10 s). Clocks may differ: the host compares heartbeats with the server's clock, phones run their countdowns on the host's clock. One host per browser: a second tab of the hosting browser keeps its own state (it can join as a phone) instead of becoming a second host, and a host lets go of a room that another device opened again. Times a phone reports (Number Rush, Time Imposter) are held against the host's own clock.

- **Karaoke Challenge** – draw a card, accept or pass, sing, get challenged to a sing-off.
- **Imposter** – everyone answers a question on their phone, one player secretly got a different one; discuss and vote – votes are final, the fastest correct vote scores most (150 question pairs + 50 deep ones; 18+ mode mixes in 50 spicy pairs).
- **Who Would** – "Who would most likely …": everyone votes for a player, no points, review at the end (150 questions + 50 deep ones; 18+ mode mixes in 50 spicy ones).
- **Liar's Cards** – Liar's Bar with points: play 1–3 cards face down as the table card; after every play everyone has 30 s to call liar. The pot grows with every play – first correct caller gets the pot, later callers less, wrong calls cost half the pot plus 5, every bluffed card nobody catches earns +5 – counted secretly and paid at the end of the deal, without showing when anyone bluffed – and the first player without cards +10. The deck grows with the player count (2–8).
- **Undercover** – everyone gets the same secret topic except the spy; talk, vote, then the spy guesses the topic from six options – or guesses early during the talk for up to 20 points (140 topics).
- **Ballpark** – percent questions, everyone guesses 0–100; points by distance: closest 20, then 15, 12, 10 … (same distance, same points) – the result names every player's place and shows the ladder (100 questions).
- **Emoji Pictionary** – the host shows an emoji card (172 built-in movies, anime and TV series, plus your own), everyone guesses the title on their phone (German titles count too, switchable in Settings; emojis look the same on every phone via Twemoji); or switch to draw mode, where a player describes a title with emojis live.
- **Color** – like dialed.gg: a color flashes on the TV, everyone mixes it from memory on their phone (hue, saturation, brightness); scored 0–10 by color difference.
- **Color Toon** – a cartoon, game or anime character with one part hatched (Pikachu's cheeks, Mario's overalls, Goku's gi …); color it in from memory. 143 official pictures loaded from Wikipedia and Fandom wikis at runtime (not stored in this repo; every pixel of the region colour is recoloured, shading kept); a picture that fails to load is skipped.
- **Time Imposter** – everyone gets a secret time except the imposter; one after another everyone holds their button that long, the imposter copies the others; then all times are revealed, discuss and vote. The imposter gets the average accuracy points of the others (they have no time to hit); a turn is skipped after 20 s without holding.
- **Guess the Song** – the host plays the first seconds of a song (YouTube intro from fixed video IDs, the first song loads during the category vote, the next one while the current round plays, so YouTube ads run silently in the background; the sound only comes on while the song itself runs; while an ad delays the song, host and phones say so; iTunes preview as fallback; on phones, where a browser pauses a song whose sound is switched on without a tap, the preview takes over on an audio element unlocked by the first tap, or a "Tap to turn the sound on" button appears), everyone types artist and title on their phone (no suggestions; small typos are fine; anime and movie names are strict – Dragon Ball ≠ Dragon Ball Z, Conan alone ≠ Detektiv Conan; unlimited tries for the artist, 3 for the title), a "⚑ Report song" button (host while loading, playing and at the reveal, phones at the reveal) sends broken or wrong songs to the developer (Firebase rooms/SONG/actions) and leaves that song out on this device (a song reported while loading or playing is skipped right away) – Guess the Song settings can bring reported songs back; fastest right answer scores most (title 12, 9, 7 …, artist 8, 6, 5 …; a wrong guess locks for 2 s). First 10 s of the intro, then 30 s to guess; if nobody has the title, the song plays again until the 2 minutes are up; after the first right title everyone gets 10 more seconds. Categories: 2000s, 2010s, Current hits, K-Pop, Disney (German), Anime (German), Anime (Japanese), Studio Ghibli – 100 songs each (Current hits 99, Anime (Japanese) 184 incl. the anime that ran on German TV – VOX, MTV, VIVA, Animax, ProSieben Maxx), 111 German TV intros (several seasons / openings per series, the season is shown at the reveal; incl. Winx Club), 46 Ghibli songs (guess the movie; German, English and Japanese titles count) – 840 songs.
- **Number Rush** – the numbers 1–9 appear in a random 3×3 grid on the host screen for a few seconds (default 7), then disappear; everyone taps the squares in order 1 → 9 on their phone. A wrong square pauses you for half a second. The phone measures your own time; fastest finisher 20, then 15, 12, 10 … (default 5 rounds, 45 s to tap).
- **Count It** – a picture full of emoji things stays on the host screen (mostly they move: drifting, roaming across the picture, spinning, popping in and out, or a mix); the announcer says what to count, everyone types one number. Exactly right: 20, 15, 12 … by speed, off by one: 5 (default 8 pictures, 30 s).
- **Rank It** – five things appear on the host screen and the announcer says how to order them (release year, height, weight, speed, population …, 32 sets); everyone drags them into order on their phone. 3 points per thing in the right place; all five right gets a speed bonus of +5, +3, +2, +1 (default 6 rounds, 45 s).
- **Attack Zone** – like Battleship for everyone at once: each player secretly hides 5 lives on a shared grid on their phone (several players may share a field), then every round everyone attacks 2 fields at the same time. An attack hits every life on the field – your own too – and the field is locked; after each round the host shows who attacked where and whose lives were hit. +10 per foreign life hit, +10 per life that survives. Grid and rounds follow the group size (2 players: 7×7, 6 rounds … 8 players: 10×10, 3 rounds; 90 s to hide, 45 s per attack).
- **Punchline** – a card with a blank is read aloud, everyone secretly plays the funniest answer card from a hand of 7 (some cards take two, one hand swap per game, a random card if you run out of time). The announcer reads the answers without names, then everyone votes for the funniest one – not their own. +10 per vote, +10 for the round winner, ties go to a 15-second second vote (100 prompt cards, 500 answer cards, always in English, humour from cheeky to dark; 3–8 players, default 8 cards).

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
