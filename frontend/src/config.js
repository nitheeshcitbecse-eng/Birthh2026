// ─────────────────────────────────────────────────────────────
//  EDIT EVERYTHING HERE. Nothing else needs to change.
// ─────────────────────────────────────────────────────────────

export const config = {
  // Who it's for
  name: 'Akshaya',
  initial: 'A', // shown on the wax seal
  from: 'Nitheesh',

  // Envelope screen
  envelope: {
    eyebrow: 'A sealed letter has arrived',
    hint: 'Tap the seal to open',
  },

  // The letter itself
  letter: {
    greeting: 'Happy Birthday, Akshaya.',
    paragraphs: [
      "I could have sent you a two-word text like a normal person. But two words felt like a scam for someone like you kov.",
      "the plans we made and immediately cancelled, and the days you showed up without being asked — you became one of those rare, permanent people.",
      "So here's to another year of you. May it be loud, ridiculous, slightly irresponsible, and exactly as good as you deserve.",
    ],
    signoff: 'Always in your corner,',
  },

  // "Keep going" journey
  hero: {
    kicker: 'And one more thing…',
    line: "It's your day. Scroll.",
  },

  reasons: [
    'You are very different Friend than others.',
    'You have never once made me feel like an inconvenience.',
    'You remember the small things nobody else bothers to remember.',
    'You are The one who was always there for me in my bad days.Maybe The one who stayed with me some months but Highest compared to others ',
   
  ],

  // Put images in /public/photos/ and use "/photos/one.jpg".
  // Leave image as '' to fall back to a gradient + emoji card.
  memories: [
    { title: 'The first day', caption: 'Neither of us knew what we were starting.', image: '', emoji: '🌱' },
    { title: 'That Badmiton', caption: 'Terrible planning. Perfect memory.', image: '', emoji: '🚗' },
    { title: 'Polambals Talks', caption: 'Myself myself,Not you ! :) ', image: '', emoji: '🌙' },
    { title: 'The bad day', caption: 'You stayed. I never forgot that.', image: '', emoji: '☔' },
    { title: 'laughter', caption: 'We still cannot explain this one.', image: '', emoji: '😂' },
    { title: 'Right now', caption: 'Still here. Still glad about it.', image: '', emoji: '✨' },
  ],

  cake: {
    candles: 5,
    prompt: 'Blow out the candles',
    hint: 'tap each flame',
    wish: 'Wish noted. The universe is on it.',
  },

  finale: {
    line: "Here's to you, always.",
    sub: 'Now go have the best day.',
  },
};