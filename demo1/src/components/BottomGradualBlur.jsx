export default function BottomGradualBlur({
  height = 160,
  maxBlur = 20,
  layers = 6,
  tint = 'rgba(37, 19, 15, 0.22)',
  zIndex = 48,
  className = '',
}) {
  const resolvedHeight = typeof height === 'number' ? `${height}px` : height
  const layerCount = Math.max(1, Math.min(layers, 10))

  return (
    <div
      aria-hidden="true"
      className={`bottom-gradual-blur ${className}`.trim()}
      style={{
        height: resolvedHeight,
        zIndex,
      }}
    >
      {Array.from({ length: layerCount }).map((_, index) => {
        const progress = (index + 1) / layerCount
        const blur = maxBlur * Math.pow(progress, 1.8)
        const start = Math.max(0, (index / layerCount) * 100 - 10)
        const end = Math.min(100, progress * 100 + 10)
        const mask = `linear-gradient(to bottom, transparent ${start}%, black ${end}%)`

        return (
          <div
            key={index}
            className="bottom-gradual-blur__layer"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        )
      })}

      <div
        className="bottom-gradual-blur__tint"
        style={{
          background: `linear-gradient(to bottom, transparent, ${tint})`,
        }}
      />
    </div>
  )
}
