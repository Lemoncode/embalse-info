interface GaugeDimensions {
  width: number;
  height: number;
}

interface ArcConfig {
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  cornerRadius: number;
}

export const gaugeDimensions: GaugeDimensions = {
  width: 220,
  height: 184,
};

export const arcConfig: ArcConfig = {
  innerRadius: 90,
  outerRadius: 110,
  startAngle: -Math.PI * 0.75,
  endAngle: Math.PI * 0.75,
  cornerRadius: 12,
};
