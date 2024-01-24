import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { selectAddresses, setEditingId } from 'src/store/slices/address';
import { Button } from 'src/ui/common/Button';
import { Icon } from 'src/ui/common/Icon/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { formatAddress } from 'src/utils/formats';

interface AddressInfoProps {
  onEdit: () => void;
}

export function AddressInfo({ onEdit }: AddressInfoProps) {
  const addresses = useAppSelector(selectAddresses);
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col gap-4 p-8 bg-white rounded-2xl'>
      {!addresses?.length ? (
        <div className='flex items-center justify-between '>
          <h3 className='text-lg font-media'>Address</h3>
          <Button
            variant='secondary'
            onClick={() => {
              dispatch(setEditingId(null));
              onEdit();
            }}
          >
            <div className='flex items-center justify-center gap-2'>
              <Icon src={icons.plus} alt='add' iconColor='main' />
              <span>Add</span>
            </div>
          </Button>
        </div>
      ) : (
        <>
          <h3 className='text-lg font-media'>Address</h3>
          {addresses?.map(address => (
            <div key={address.id} className='flex items-start justify-between gap-1'>
              <p className='font-medium text-black-2'>{formatAddress(address)}</p>
              <Button
                variant='flat'
                icon={icons.edit}
                onClick={() => {
                  dispatch(setEditingId(address.id));
                  onEdit();
                }}
              >
                Edit
              </Button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
