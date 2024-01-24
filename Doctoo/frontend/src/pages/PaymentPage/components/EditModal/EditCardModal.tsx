import { Elements } from '@stripe/react-stripe-js';
import { FC } from 'react';
import { Modal } from 'src/ui/common';
import EditCardForm from './EditCardForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  `pk_test_51NnOHIK6algMCn4zTEr2WOIBXP1JkVRjcyUybVk90zekyjHL1oTJYrAp0rzEE6S3fpHMVFzZ0O8EN6BGUPnraE9o00pCgPujFr`,
);

type EditCardModalProps = {
  cardId?: string;
  isOpen: boolean;
  onClose: (...args: any[]) => void;
  setCardList: () => Promise<void>;
};

const EditCardModal: FC<EditCardModalProps> = ({ cardId, isOpen, onClose, setCardList }) => {
  return (
    <Modal {...{ isOpen, onClose }}>
      <Elements stripe={stripePromise}>
        <EditCardForm cardId={cardId} closeModal={onClose} setCardList={setCardList} />
      </Elements>
    </Modal>
  );
};

export default EditCardModal;
