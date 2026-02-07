interface Props {
  currentVolume: number;
  totalCapacity: number;
}

export const GaugeLegend = ({ currentVolume, totalCapacity }: Props) => {
  return (
    <div className="flex w-full flex-col items-start gap-3 pt-3">
      {/* Embalsada (filled water) - uses primary color */}
      <div className="flex items-center gap-2">
        <span className="bg-primary h-4 w-4 rounded-full" />
        <span className="text-base-content text-base">
          Embalsada: {currentVolume}Hm³
        </span>
      </div>

      {/* Total capacity - uses total-water color */}
      <div className="flex items-center gap-2">
        <span className="bg-total-water h-4 w-4 rounded-full" />
        <span className="text-base-content text-base">
          Total: {totalCapacity}Hm³
        </span>
      </div>
    </div>
  );
};
