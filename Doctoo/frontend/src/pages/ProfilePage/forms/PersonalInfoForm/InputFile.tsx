import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';

interface InputFileProps {
  isPhoto: boolean;
  onChange: (file?: File) => void;
  onDelete: () => void;
}

export function InputFile({ isPhoto, onChange, onDelete }: InputFileProps) {
  return (
    <div className='flex gap-6'>
      <label className='flex items-center gap-2 cursor-pointer'>
        {isPhoto && <Icon src={icons.change} alt='change avatar' iconColor='main' />}
        <span className='font-medium text-main'>{isPhoto ? 'Change photo' : 'Upload photo'}</span>
        <input
          className='hidden'
          type='file'
          accept='image/*'
          value=''
          onChange={e => onChange(e.currentTarget.files?.[0])}
        />
      </label>
      {isPhoto && (
        <a
          className='flex items-center gap-2 font-medium text-grey-1 cursor-pointer'
          onClick={onDelete}
        >
          <Icon src={icons.trash} alt='change avatar' iconColor='icon' />
          Delete photo
        </a>
      )}
    </div>
  );
}
