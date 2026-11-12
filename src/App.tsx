import { useState, useEffect, useRef, useCallback } from 'react';

interface Planet {
  name: string;
  nameRu: string;
  radius: number; // visual radius in pixels
  orbitRadius: number; // visual orbit radius
  color: string;
  realRadius: string; // actual radius
  distanceFromSun: string; // distance from sun
  orbitalPeriod: string; // orbital period
  speed: number; // orbital speed factor
  angle: number;
  description: string;
}

const planetsData: Planet[] = [
  {
    name: 'Mercury',
    nameRu: 'Меркурий',
    radius: 4,
    orbitRadius: 60,
    color: '#b5b5b5',
    realRadius: '2 439 км',
    distanceFromSun: '57,9 млн км',
    orbitalPeriod: '88 дней',
    speed: 4.15,
    angle: Math.random() * Math.PI * 2,
    description: 'Ближайшая к Солнцу планета. Самая маленькая планета Солнечной системы.'
  },
  {
    name: 'Venus',
    nameRu: 'Венера',
    radius: 7,
    orbitRadius: 95,
    color: '#e8cda0',
    realRadius: '6 052 км',
    distanceFromSun: '108,2 млн км',
    orbitalPeriod: '225 дней',
    speed: 1.62,
    angle: Math.random() * Math.PI * 2,
    description: 'Вторая планета от Солнца. Самая горячая планета из-за парникового эффекта.'
  },
  {
    name: 'Earth',
    nameRu: 'Земля',
    radius: 8,
    orbitRadius: 135,
    color: '#4da6ff',
    realRadius: '6 371 км',
    distanceFromSun: '149,6 млн км',
    orbitalPeriod: '365,25 дней',
    speed: 1.0,
    angle: Math.random() * Math.PI * 2,
    description: 'Третья планета от Солнца. Единственная известная планета с жизнью.'
  },
  {
    name: 'Mars',
    nameRu: 'Марс',
    radius: 5,
    orbitRadius: 175,
    color: '#e85d3a',
    realRadius: '3 390 км',
    distanceFromSun: '227,9 млн км',
    orbitalPeriod: '687 дней',
    speed: 0.53,
    angle: Math.random() * Math.PI * 2,
    description: 'Четвёртая планета от Солнца. Красная планета с двумя спутниками.'
  },
  {
    name: 'Jupiter',
    nameRu: 'Юпитер',
    radius: 18,
    orbitRadius: 240,
    color: '#d4a574',
    realRadius: '69 911 км',
    distanceFromSun: '778,5 млн км',
    orbitalPeriod: '11,86 лет',
    speed: 0.084,
    angle: Math.random() * Math.PI * 2,
    description: 'Пятая планета от Солнца. Крупнейшая планета Солнечной системы.'
  },
  {
    name: 'Saturn',
    nameRu: 'Сатурн',
    radius: 15,
    orbitRadius: 310,
    color: '#f0d68a',
    realRadius: '58 232 км',
    distanceFromSun: '1,434 млрд км',
    orbitalPeriod: '29,46 лет',
    speed: 0.034,
    angle: Math.random() * Math.PI * 2,
    description: 'Шестая планета от Солнца. Известна своими великолепными кольцами.'
  },
  {
    name: 'Uranus',
    nameRu: 'Уран',
    radius: 11,
    orbitRadius: 375,
    color: '#7de8e8',
    realRadius: '25 362 км',
    distanceFromSun: '2,871 млрд км',
    orbitalPeriod: '84,01 лет',
    speed: 0.012,
    angle: Math.random() * Math.PI * 2,
    description: 'Седьмая планета от Солнца. Ледяной гигант, вращающийся "на боку".'
  },
  {
    name: 'Neptune',
    nameRu: 'Нептун',
    radius: 10,
    orbitRadius: 430,
    color: '#4169e1',
    realRadius: '24 622 км',
    distanceFromSun: '4,495 млрд км',
    orbitalPeriod: '164,8 лет',
    speed: 0.006,
    angle: Math.random() * Math.PI * 2,
    description: 'Восьмая планета от Солнца. Самая далёкая планета Солнечной системы.'
  }
];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const planetsRef = useRef<Planet[]>(planetsData.map(p => ({ ...p })));
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [hoveredPlanet, setHoveredPlanet] = useState<string | null>(null);
  const isPlayingRef = useRef(isPlaying);
  const speedRef = useRef(speed);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const drawSolarSystem = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;

    // Clear canvas
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);

    // Draw stars
    drawStars(ctx, width, height);

    // Draw orbits
    planetsRef.current.forEach(planet => {
      ctx.beginPath();
      ctx.arc(centerX, centerY, planet.orbitRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw Sun
    const sunGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 35);
    sunGradient.addColorStop(0, '#fff7a0');
    sunGradient.addColorStop(0.3, '#ffdd00');
    sunGradient.addColorStop(0.7, '#ff9900');
    sunGradient.addColorStop(1, '#ff6600');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
    ctx.fillStyle = sunGradient;
    ctx.fill();

    // Sun glow
    const glowGradient = ctx.createRadialGradient(centerX, centerY, 25, centerX, centerY, 55);
    glowGradient.addColorStop(0, 'rgba(255, 200, 0, 0.3)');
    glowGradient.addColorStop(1, 'rgba(255, 200, 0, 0)');
    ctx.beginPath();
    ctx.arc(centerX, centerY, 55, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw planets
    planetsRef.current.forEach(planet => {
      const x = centerX + Math.cos(planet.angle) * planet.orbitRadius;
      const y = centerY + Math.sin(planet.angle) * planet.orbitRadius;

      // Planet glow for hovered
      if (hoveredPlanet === planet.name) {
        const hoverGlow = ctx.createRadialGradient(x, y, planet.radius, x, y, planet.radius + 10);
        hoverGlow.addColorStop(0, planet.color + '80');
        hoverGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(x, y, planet.radius + 10, 0, Math.PI * 2);
        ctx.fillStyle = hoverGlow;
        ctx.fill();
      }

      // Planet body
      const planetGradient = ctx.createRadialGradient(x - planet.radius * 0.3, y - planet.radius * 0.3, 0, x, y, planet.radius);
      planetGradient.addColorStop(0, lightenColor(planet.color, 40));
      planetGradient.addColorStop(1, planet.color);
      ctx.beginPath();
      ctx.arc(x, y, planet.radius, 0, Math.PI * 2);
      ctx.fillStyle = planetGradient;
      ctx.fill();

      // Saturn rings
      if (planet.name === 'Saturn') {
        ctx.beginPath();
        ctx.ellipse(x, y, planet.radius + 10, (planet.radius + 10) * 0.3, 0.3, 0, Math.PI * 2);
        ctx.strokeStyle = '#f0d68a88';
        ctx.lineWidth = 3;
        ctx.stroke();
      }

      // Planet name label
      if (hoveredPlanet === planet.name || selectedPlanet?.name === planet.name) {
        ctx.font = '12px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(planet.nameRu, x, y - planet.radius - 8);
      }
    });
  }, [hoveredPlanet, selectedPlanet]);

  const starsRef = useRef<{ x: number; y: number; size: number; opacity: number }[]>([]);

  const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2
        });
      }
    }
    starsRef.current.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();
    });
  };

  const lightenColor = (color: string, percent: number): string => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, ((num >> 8) & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return `rgb(${R},${G},${B})`;
  };

  const animate = useCallback(() => {
    if (isPlayingRef.current) {
      planetsRef.current.forEach(planet => {
        planet.angle += planet.speed * 0.005 * speedRef.current;
      });
    }
    drawSolarSystem();
    animationRef.current = requestAnimationFrame(animate);
  }, [drawSolarSystem]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      starsRef.current = []; // regenerate stars on resize
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let clicked: Planet | null = null;
    for (const planet of planetsRef.current) {
      const px = centerX + Math.cos(planet.angle) * planet.orbitRadius;
      const py = centerY + Math.sin(planet.angle) * planet.orbitRadius;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (dist <= planet.radius + 5) {
        clicked = planet;
        break;
      }
    }
    setSelectedPlanet(clicked);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    let hovered: string | null = null;
    for (const planet of planetsRef.current) {
      const px = centerX + Math.cos(planet.angle) * planet.orbitRadius;
      const py = centerY + Math.sin(planet.angle) * planet.orbitRadius;
      const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
      if (dist <= planet.radius + 5) {
        hovered = planet.name;
        break;
      }
    }
    setHoveredPlanet(hovered);
    canvas.style.cursor = hovered ? 'pointer' : 'default';
  };

  return (
    <div className="w-full h-screen bg-[#0a0a1a] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="text-center py-3 bg-gradient-to-r from-[#0a0a2e] via-[#1a1a3e] to-[#0a0a2e] border-b border-white/10">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          ☀️ Интерактивная Солнечная Система
        </h1>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Нажмите на планету для получения информации</p>
      </div>

      <div className="flex-1 flex flex-col md:flex-row relative">
        {/* Canvas */}
        <div className="flex-1 relative">
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
          />
        </div>

        {/* Planet Info Panel */}
        {selectedPlanet && (
          <div className="absolute top-4 right-4 md:relative md:w-80 bg-[#1a1a3e]/95 backdrop-blur-sm border border-white/20 rounded-xl p-5 m-4 shadow-2xl animate-fadeIn z-10">
            <button
              onClick={() => setSelectedPlanet(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full shadow-lg"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${lightenColor(selectedPlanet.color, 40)}, ${selectedPlanet.color})`
                }}
              />
              <div>
                <h2 className="text-xl font-bold text-white">{selectedPlanet.nameRu}</h2>
                <p className="text-sm text-gray-400">{selectedPlanet.name}</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{selectedPlanet.description}</p>
            <div className="space-y-3">
              <InfoRow icon="📏" label="Радиус" value={selectedPlanet.realRadius} />
              <InfoRow icon="🌍" label="Расстояние от Солнца" value={selectedPlanet.distanceFromSun} />
              <InfoRow icon="🔄" label="Орбитальный период" value={selectedPlanet.orbitalPeriod} />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-gradient-to-r from-[#0a0a2e] via-[#1a1a3e] to-[#0a0a2e] border-t border-white/10 px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {/* Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 border border-white/20 hover:border-white/40"
          >
            {isPlaying ? (
              <>
                <span className="text-lg">⏸</span>
                <span className="text-sm font-medium">Пауза</span>
              </>
            ) : (
              <>
                <span className="text-lg">▶️</span>
                <span className="text-sm font-medium">Воспроизведение</span>
              </>
            )}
          </button>

          {/* Speed Control */}
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm">🐢</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Скорость:</span>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-24 md:w-32 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-white text-sm font-mono min-w-[3ch]">{speed.toFixed(1)}x</span>
            </div>
            <span className="text-gray-400 text-sm">🐇</span>
          </div>

          {/* Speed presets */}
          <div className="flex gap-2">
            {[0.5, 1, 2, 5].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  speed === s
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-white/10 text-gray-300 border border-white/10 hover:bg-white/20'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Netlify link */}
          <a
            href="https://www.netlify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 hover:text-teal-100 transition-all duration-200 border border-teal-500/30 hover:border-teal-400/60 text-sm font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16.942 3.002L12 0 7.058 3.002 0 12l7.058 8.998L12 24l4.942-3.002L24 12l-7.058-8.998zM12 16.5c-2.485 0-4.5-2.015-4.5-4.5S9.515 7.5 12 7.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"/>
            </svg>
            <span>Netlify</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2">
      <span className="text-lg">{icon}</span>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

export default App;
