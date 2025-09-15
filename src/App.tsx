import React, { useEffect, useState, useRef, useCallback } from 'react';

const messageText = `/ My Dearest BFF!

Happy birthday! I’m sorry your special day had already passed before you received this letter. 

Better late than never, dibah? Can you believe it—out of your 20 years of existence, our friendship has already stood strong for 12 years?

Thats more than half of your life! We basically grew up together, from our awkward kid days to the young adults we are now.

When I think about it, those 12 years weren't just measured in time. They were measured in laughter, inside jokes, random arguments, late-night conversations, and all the countless memories we’ve shared. 

And out of those years, we never had the most bad bitch photos together 😭 Baka ganon talaga pag meant to be😍

May this new chapter of your life make you stronger and tougher than ever. You are now a year closer to your success, and as your best friend who have basically grown with you, I know that everything you’re doing now—your efforts, your courage, and your determination to strive- will bring you to the life you deserve. 

You're one of the hardest-working people I know, and I am very proud of you. I will always be your number one supporter in everything you do. 

I apologize for my shortcomings, especially in those times you might have needed me, but I wasn't there. Still, know that I'm here for you whenever you need me. I know lately we’re not having chikas as much as before na (ala e magkaiba tayong campus hirap makakalap ng chismis), but I hope that won’t stop us from being BEST friends.

Honestly, you set my standards so high in friendship that I can't look at my other friends the way I look at you. We both may feel like life is unfair to us, but I am very thankful na hindi ka ipinutok ni daddy Wilson sa kumot, Kac kung hindi wala akong pretty bff 😍 Miserable man ang buhai pareho naman tayong maganda, mas maganda ka lang ngayon mga 0.5% tutal birthday mo naman.

Always remember that I'll always stay, even when everyone, or even the whole world, becomes against you. I may not be the most useful friend you have, but I'll always be the friend you can be whatever you want to be with. Happy birthday, bff! I wish nothing but the best for you at sana labasan ka na. Labyu.

Love, Ali!`;

const petalColors = [
  'rgba(255, 182, 193, 0.8)',
  'rgba(255, 105, 97, 0.7)',
  'rgba(220, 20, 60, 0.6)',
];

type Petal = {
  id: number;
  left: number;
  size: number;
  color: string;
  fallDuration: number;
  fallDelay: number;
  rotateStart: number;
  rotateDuration: number;
  swayDuration: number;
  swayDelay: number;
};

const galleryImages = [
  { src: './images/1.jpeg', alt: 'Photo of us at the beach' },
  { src: './images/2.jpeg', alt: 'Photo of us at a party' },
  { src: './images/3.jpeg', alt: 'Photo of us laughing together' },
  { src: './images/4.jpeg', alt: 'Photo of us on a trip' },
  { src: './images/5.jpeg', alt: 'Photo of us celebrating' },
  { src: './images/6.jpeg', alt: 'Photo of us with friends' },
  { src: './images/7.jpeg', alt: 'Photo of us at school' },
  { src: './images/8.jpeg', alt: 'Photo of us eating out' },
  { src: './images/9.jpeg', alt: 'Photo of us at a concert' },
  { src: './images/10.jpeg', alt: 'Photo of us smiling' },
];

const App: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [petals, setPetals] = useState<Petal[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const audio = useRef<HTMLAudioElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audio.current = new Audio('/audio.mp3');
    audio.current.loop = true;
    return () => {
      if (audio.current) {
        audio.current.pause();
        audio.current.src = '';
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audio.current) return;
    if (isMusicPlaying) {
      audio.current.pause();
      setIsMusicPlaying(false);
    } else {
      audio.current.play().catch((err) => {
        console.error('Error playing audio:', err);
      });
      setIsMusicPlaying(true);
    }
  }, [isMusicPlaying]);

  useEffect(() => {
    let index = 0;
    setTypedText('');

    const type = () => {
      setTypedText((prev) => prev + messageText.charAt(index));
      index++;
      if (index < messageText.length) {
        timeoutRef.current = setTimeout(type, 40);
      }
    };

    type();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const petalsArray: Petal[] = [];
    const petalCount = 15;
    for (let i = 0; i < petalCount; i++) {
      petalsArray.push({
        id: i,
        left: Math.random() * 100,
        size: 10 + Math.random() * 15,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        fallDuration: 12 + Math.random() * 8,
        fallDelay: Math.random() * 15,
        rotateStart: Math.random() * 360,
        rotateDuration: 6 + Math.random() * 6,
        swayDuration: 3 + Math.random() * 3,
        swayDelay: Math.random() * 15,
      });
    }
    setPetals(petalsArray);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script&family=Roboto&display=swap');
        body {
          margin: 0;
          font-family: 'Roboto', sans-serif;
          background: linear-gradient(135deg, #a52a2a, #b22222, #dc143c);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem 1rem 4rem;
          overflow-x: hidden;
          color: #fff0f0;
          position: relative;
        }
        header {
          font-family: 'Dancing Script', cursive;
          font-size: 3.5rem;
          font-weight: 700;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
          margin-bottom: 2rem;
          user-select: none;
          color: #fff;
          letter-spacing: 1px;
          cursor: pointer;
          transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease, outline-offset 0.3s ease;
          outline-offset: 4px;
        }
        header:hover,
        header:focus {
          color: #940313;
          transform: scale(1.1);
          text-shadow: 2px 2px 5px rgba(0,0,0,0.6);
          outline: 2px solid #940313;
          outline-offset: 6px;
        }
        .birthday-message {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(5px);
          max-width: 600px;
          padding: 2rem 2.5rem;
          border-radius: 20px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          font-size: 1.2rem;
          line-height: 1.6;
          font-family: 'Roboto', sans-serif;
          white-space: pre-wrap;
          text-align: center;
          color: #fff0f0;
          user-select: text;
          margin-bottom: 3rem;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .gallery-section {
          max-width: 900px;
          width: 100%;
          margin-bottom: 3rem;
          text-align: center;
        }
        .gallery-section h2 {
          font-family: 'Dancing Script', cursive;
          font-size: 2.5rem;
          color: #ffe6e6;
          margin-bottom: 1rem;
          user-select: none;
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          padding: 0 1rem;
        }
        .gallery-item {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gallery-item:hover,
        .gallery-item:focus {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
          z-index: 10;
          outline: none;
        }
        .gallery-item img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 15px 15px 0 0;
          user-select: none;
        }
        footer {
          font-family: 'Dancing Script', cursive;
          font-size: 1.4rem;
          color: #ffe6e6;
          text-align: center;
          margin-top: auto;
          user-select: none;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
        }
        /* Updated petal styles and animation */
        .petal {
          position: fixed;
          bottom: 0;
          border-radius: 70% 30% 60% 40% / 60% 40% 60% 40%;
          transform: translateX(-50%);
          opacity: 0.7;
          pointer-events: none;
          z-index: 1;
          background-color: pink;
          animation-name: fallSwayRotate;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes fallSwayRotate {
          0%   { transform: translateX(0) translateY(0) rotate(var(--rotate-start, 0deg)); opacity: 0.7; }
          25%  { transform: translateX(15px) translateY(25vh) rotate(calc(var(--rotate-start, 0deg) + 90deg)); opacity: 0.8; }
          50%  { transform: translateX(-10px) translateY(50vh) rotate(calc(var(--rotate-start, 0deg) + 180deg)); opacity: 0.9; }
          75%  { transform: translateX(10px) translateY(75vh) rotate(calc(var(--rotate-start, 0deg) + 270deg)); opacity: 0.8; }
          100% { transform: translateX(0) translateY(110vh) rotate(calc(var(--rotate-start, 0deg) + 360deg)); opacity: 0.7; }
        }
        @media (max-width: 480px) {
          header { font-size: 2.8rem; }
          .birthday-message { font-size: 1.1rem; padding: 1.5rem 2rem; }
          .gallery-section h2 { font-size: 1.8rem; }
          footer { font-size: 1.1rem; }
        }
      `}</style>

      <main>
        <header
          onClick={toggleMusic}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMusic();
            }
          }}
          aria-pressed={isMusicPlaying}
          aria-label={isMusicPlaying ? 'Pause birthday music' : 'Play birthday music'}
        >
          Happy Birthday, Shan!
        </header>

        <article className="birthday-message" aria-label="Birthday message">
          {typedText}
        </article>

        <section className="gallery-section" aria-label="Photo gallery">
          <h2>Some of Our Favorite Moments Together</h2>
          <div className="gallery-grid">
            {galleryImages.map(({ src, alt }, i) => (
              <div key={i} className="gallery-item" tabIndex={0}>
                <img src={src} alt={alt || `Birthday photo ${i + 1}`} />
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer>
        Here's to another year of unforgettable memories. Love you lots, <br />
        <span style={{ fontWeight: '700' }}>Aliyah</span> 💕🧁
      </footer>

      {/* Petals */}
      {petals.map(
        ({
          id,
          left,
          size,
          color,
          fallDuration,
          fallDelay,
          rotateStart,
        }) => (
          <div
            key={id}
            className="petal"
            style={{
              left: `${left}vw`,
              width: `${size}px`,
              height: `${size * 0.6}px`,
              backgroundColor: color,
              animationDuration: `${fallDuration}s`,
              animationDelay: `${fallDelay}s`,
              '--rotate-start': `${rotateStart}deg`,
            } as React.CSSProperties}
            aria-hidden="true"
          />
        )
      )}
    </>
  );
};

export default App;