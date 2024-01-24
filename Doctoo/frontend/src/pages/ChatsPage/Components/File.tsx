import React from 'react';
import icons from 'src/ui/common/Icon/iconPaths';

const File: React.FC = () => {
  return (
    <div className='flex flex-row p-2 bg-grey-5 rounded m-3'>
      <img src={icons.file} alt={'Unknown'} className=' w-8 h-8 left-0' />
      <div className='flex flex-col pl-4'>
        <span className='text-xs'>{'File 1'}</span>
      </div>
    </div>
  );
};

export default File;
