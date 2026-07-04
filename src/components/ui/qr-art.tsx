function seededRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

const GRID = 9;

function Finder() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[6%] rounded-[18%] bg-ink" />
      <div className="absolute inset-[20%] rounded-[14%] bg-white" />
      <div className="absolute inset-[34%] rounded-[10%] bg-ink" />
    </div>
  );
}

export function QrArt({ className }: { className?: string }) {
  const cells = Array.from({ length: GRID * GRID }, (_, i) => {
    const x = i % GRID;
    const y = Math.floor(i / GRID);
    const inFinderZone =
      (x < 3 && y < 3) || (x > GRID - 4 && y < 3) || (x < 3 && y > GRID - 4);
    return { x, y, inFinderZone, on: seededRandom(i + 7) > 0.52 };
  });

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${GRID}, 1fr)`,
        gridTemplateRows: `repeat(${GRID}, 1fr)`,
      }}
    >
      {cells.map((cell) => {
        if (cell.inFinderZone) {
          if (cell.x % 3 === 0 && cell.y % 3 === 0) {
            return (
              <div
                key={`${cell.x}-${cell.y}`}
                style={{ gridColumn: "span 3", gridRow: "span 3" }}
                className="p-[6%]"
              >
                <Finder />
              </div>
            );
          }
          if (cell.x % 3 !== 0 || cell.y % 3 !== 0) return null;
        }
        return (
          <div key={`${cell.x}-${cell.y}`} className="flex items-center justify-center p-[2px]">
            <div
              className="aspect-square w-full rounded-[1px] bg-ink"
              style={{ opacity: cell.on ? 1 : 0 }}
            />
          </div>
        );
      })}
    </div>
  );
}
