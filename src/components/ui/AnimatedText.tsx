import React, { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block whitespace-pre">
      <span className="invisible">{char}</span>
      <motion.span style={{ opacity }} className="absolute inset-0 select-none pointer-events-none">
        {char}
      </motion.span>
    </span>
  );
};

export interface AnimatedTextProps {
  text?: string;
  className?: string;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "I'm a passionate Software Developer with 3 years of professional experience in building modern, scalable, and user-focused web applications. I specialize in .NET, C#, ASP.NET Core, Blazor, and database technologies, with experience in developing both front-end and back-end solutions. I enjoy solving complex problems, exploring new technologies, and transforming ideas into meaningful digital experiences. Always curious, always learning, and always building something better. Let's build something incredible together!",
  className = '',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = text.split('');
  const total = characters.length;

  return (
    <p
      ref={containerRef}
      className={`text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[760px] mx-auto ${className}`}
      style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
    >
      {characters.map((char, index) => {
        const start = index / total;
        const end = Math.min(1, start + 1 / total);
        return (
          <Character
            key={index}
            char={char}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </p>
  );
};

export default AnimatedText;
