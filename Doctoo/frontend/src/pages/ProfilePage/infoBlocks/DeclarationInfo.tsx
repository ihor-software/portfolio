import { Button } from 'src/ui/common/Button';
import icons from 'src/ui/common/Icon/iconPaths';
import { useAppSelector } from 'src/hooks/redux';
import { selectPatient } from 'src/store/slices/patient';

interface DeclarationInfoProps {
  onEdit: () => void;
}

export function DeclarationInfo({ onEdit }: DeclarationInfoProps) {
  const patient = useAppSelector(selectPatient);
  const allergies = patient?.allergies?.map(item => item.name).join(', ');
  const conditions = patient?.medicalConditions?.map(item => item.name).join(', ');

  return (
    <div className='flex items-start gap-4 p-8 bg-white rounded-2xl'>
      <ul className='flex flex-col w-full gap-4 '>
        <li className='flex items-center justify-between gap-4 text-base leading-6'>
          <p className='font-normal text-grey-1'>Declaration number</p>
          <p className='px-4 py-2 font-medium rounded-lg bg-main-light'>
            {patient?.declaration_number ?? '—'}
          </p>
        </li>

        <li className='flex items-start justify-between gap-4 text-base leading-6'>
          <div className='flex flex-col justify-center gap-1'>
            <p className='font-normal text-grey-1'>Medical condition</p>
            <p className='font-medium '>{conditions || '—'}</p>
          </div>
          <Button variant='flat' icon={icons.edit} onClick={onEdit}>
            Edit
          </Button>
        </li>

        <li className='flex-col justify-center gap-1 text-base leading-6'>
          <p className='font-normal text-grey-1'>Allergies</p>
          <p className='font-medium '>{allergies || '—'}</p>
        </li>
      </ul>
    </div>
  );
}
