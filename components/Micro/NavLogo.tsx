'use client';

import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

import Logo from './Logo';

const NavLogo = () => {
  const router = useRouter();

  const handleClick = () => {
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ['#ffdc58', '#f000', '#eca184', '#f8deb1'];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 70,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 70,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    if (window?.location?.pathname === '/') {
      frame();
    } else {
      router.push('/');
    }
  };
  return (
    <div
      className="flex bg-main p-2 cursor-pointer items-center justify-center gap-2"
      onClick={handleClick}
    >
      <Logo height={70} width={150} />
    </div>
  );
};

export default NavLogo;
