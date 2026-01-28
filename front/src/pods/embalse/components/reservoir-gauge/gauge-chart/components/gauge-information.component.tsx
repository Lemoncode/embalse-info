interface Props {
  percentage: number;
  measurementDate: string;
}

export const GaugeInformation = ({ percentage, measurementDate }: Props) => {
  const displayPercentage = `${Math.round(percentage * 100)}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-base-content text-5xl font-semibold">
        {displayPercentage}
        <span className="text-3xl">%</span>
      </span>
      <span className="text-base-content text-lg font-medium">
        {measurementDate}
      </span>
    </div>
  );
};
