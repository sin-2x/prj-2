# Dinara Romantic Website

Cinematic, mobile-first romantic surprise website for Dinara. Built with React 19, TypeScript, Vite, React Router DOM, GSAP + ScrollTrigger, tsParticles, Lottie, Framer Motion, CSS Modules, React Icons, and QR code support.

## Installation

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
```

## Add The Song

Place the music file here:

```text
public/assets/audio/song.mp3
```

The browser starts music only after the visitor taps `❤️ Бастау`, which is required for mobile autoplay rules.

## Add Photos

Place WebP photos here:

```text
public/assets/images/
```

The gallery currently uses elegant placeholders so the site still feels complete before photos are added. Replace the card data in `src/components/Gallery/Gallery.tsx` when photos are ready.

## Telegram Bot Setup

Create a `.env` file:

```text
VITE_TELEGRAM_BOT_TOKEN=
VITE_TELEGRAM_CHAT_ID=
```

How to get values:

1. Create a bot with Telegram `@BotFather`.
2. Copy the bot token into `VITE_TELEGRAM_BOT_TOKEN`.
3. Send a message to your bot.
4. Open `https://api.telegram.org/botYOUR_TOKEN/getUpdates`.
5. Copy your chat id into `VITE_TELEGRAM_CHAT_ID`.

The site sends a browser-side Telegram notification every time it opens. There is no backend.

## Lyric Timestamps

Edit timestamps and text in:

```text
src/components/MusicPlayer/MusicPlayer.tsx
```

Each lyric object has `time`, `text`, and `mood`. The `mood` changes the section background.

## QR Code

The footer QR button opens a modal with the current website URL. When someone scans it and opens the page, Telegram notification fires normally.

## Customize Text And Colors

Text lives inside each component folder:

```text
src/components/Hero/
src/components/LoveLetter/
src/components/MusicPlayer/
src/components/FinalScene/
```

Colors are global CSS variables in:

```text
src/index.css
```

## Deploy

Vercel:

```bash
npm run build
```

Then import the project in Vercel and add the same environment variables.

Netlify:

Build command:

```text
npm run build
```

Publish directory:

```text
dist
```

## Notes

The experience is intentionally slow, emotional, and mobile-first. Animations are decorative only where they support the story.
