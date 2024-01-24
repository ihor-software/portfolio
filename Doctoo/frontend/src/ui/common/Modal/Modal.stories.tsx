import { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Common/Modal',
  component: Modal,
};

export default meta;

export const ModalStory: StoryObj<typeof meta> = {
  render: () => {
    const [isModalOpened, setModalOpened] = useState(true);
    return (
      <>
        <Button variant='main' onClick={() => setModalOpened(true)}>
          Open
        </Button>
        {isModalOpened && (
          <Modal onClose={() => setModalOpened(false)}>
            <div className='p-10 border border-dashed rounded-lg'>
              MODAL CHILDREN WILL APPEAR HERE
            </div>
          </Modal>
        )}
      </>
    );
  },
};
