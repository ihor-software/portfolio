interface AppointmentCalcProps {
  className: string;
  cost: number;
}

export function AppointmentCalc({ className, cost }: AppointmentCalcProps) {
  return (
    <div className={`flex flex-col divide-y divide-grey-4 ${className}`}>
      <p className='flex items-center justify-between py-2 text-base font-medium text-black-2'>
        <span>1 hour</span>
        <span>{`$${cost.toFixed(2)}`}</span>
      </p>
      <p className='flex items-center justify-between py-2 text-lg font-medium text-black-1'>
        <span>Total</span>
        <span>{`$${cost.toFixed(2)}`}</span>
      </p>
    </div>
  );
}
