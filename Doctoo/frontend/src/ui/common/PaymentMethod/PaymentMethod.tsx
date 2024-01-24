import icons from 'src/ui/common/Icon/iconPaths';
import { Icon } from '../Icon';

interface PaymentMethodProps {
  className?: string;
  cardNumber: string;
  expYear: number;
  expMonth: number;
}

export function PaymentMethod({
  className = '',
  cardNumber,
  expMonth,
  expYear,
}: PaymentMethodProps) {
  return (
    <div className={`flex flex-col items-center w-full gap-4 md:flex-row ${className}`}>
      <div className='flex justify-center w-10 h-10 rounded-md shrink-0 item-center bg-main-light'>
        <Icon src={icons.creditCard} alt='credit card' width={24} height={24} iconColor='inline' />
      </div>
      <div className='flex-grow'>
        <p className='font-medium leading-6 text-black-2 '>**** **** **** {cardNumber}</p>
        <p className='text-sm leading-5 text-grey-1'>{`Expires ${
          expMonth < 9 ? '0' + expMonth : expMonth
        }/${expYear}`}</p>
      </div>
    </div>
  );
}
