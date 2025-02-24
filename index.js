import { useEffect, useState } from "react";

export default function FlyingBirdGame() {
  const [birdY, setBirdY] = useState(200);
  const [obstacles, setObstacles] = useState([]);
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') setVelocity(-8);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver) return;
    
    const gravity = 0.5;
    const interval = setInterval(() => {
      setBirdY((y) => Math.min(y + velocity, 400));
      setVelocity((v) => v + gravity);
    }, 30);

    return () => clearInterval(interval);
  }, [velocity, gameOver]);

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(() => {
      setObstacles((obs) => {
        const newObstacles = obs.map((o) => ({ ...o, x: o.x - 5 }));
        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].x < 300) {
          const gapY = Math.random() * 200 + 50;
          newObstacles.push({ x: 400, gapY });
        }
        return newObstacles.filter((o) => o.x > -50);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    obstacles.forEach(({ x, gapY }) => {
      if (x < 50 && x > 0 && (birdY < gapY - 50 || birdY > gapY + 50)) {
        setGameOver(true);
      }
    });
  }, [obstacles, birdY]);

  return (
    <div className="relative w-[400px] h-[400px] bg-blue-300 overflow-hidden">
      <div className="absolute left-10 w-10 h-10 bg-yellow-500 rounded-full" style={{ top: birdY }}></div>
      {obstacles.map(({ x, gapY }, index) => (
        <div key={index} className="absolute w-10 bg-green-600" style={{ left: x, height: gapY - 50, top: 0 }}></div>
      ))}
      {gameOver && <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">Game Over</div>}
    </div>
  );
}
