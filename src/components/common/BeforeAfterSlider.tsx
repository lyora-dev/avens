import { useRef, useState } from "react";

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
}

const BeforeAfterSlider = ({ beforeSrc, afterSrc, alt }: BeforeAfterSliderProps) => {
  const [value, setValue] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-hidden rounded-xl shadow-elevated" ref={containerRef}>
      <img src={afterSrc} alt={alt || 'After'} className="w-full h-auto block select-none" loading="lazy" />
      <div
        className="absolute inset-0"
        style={{ width: `${value}%`, overflow: 'hidden' }}
      >
        <img src={beforeSrc} alt={alt || 'Before'} className="w-full h-auto block select-none" loading="lazy" />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[60%]"
        aria-label="Before and after slider"
      />
    </div>
  );
};

export default BeforeAfterSlider;
