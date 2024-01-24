import React from 'react';
import Button from '../../../ui/common/Button/Button';
import File from 'src/pages/ChatsPage/Components/File';

const FileList = () => {
  const fileListItems = [
    { id: 1, name: 'file1.txt' },
    { id: 2, name: 'document.pdf' },
    { id: 3, name: 'image.jpg' },
  ];

  return (
    <div className='p-4 font-normal'>
      <h2 className='text-lg'>Attached Files</h2>
    </div>
  );
};

export default FileList;
