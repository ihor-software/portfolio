import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userAPI } from 'src/store/services/api/userAPI';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { Button, Icon } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import SpinnerComponent from 'src/ui/common/SpinnerComponent/SpinnerComponent';

type EditCardProps = {
  cardId?: string;
  closeModal: (...args: any[]) => void;
  setCardList: () => Promise<void>;
};

const EditCardForm: FC<EditCardProps> = ({ cardId, closeModal, setCardList }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const getPaymentMethodId = async () => {
    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) return;

    const { error, paymentMethod } = await stripe?.createPaymentMethod({ element: cardElement });

    if (error || !paymentMethod) {
      dispatch(
        setMessage({ message: error.message || 'Some error has occurred', status: 'error' }),
      );
      return;
    }
    return paymentMethod.id;
  };

  const handleDelete = async () => {
    if (!cardId) return;

    setIsLoading(true);
    try {
      await userAPI.deleteCard(cardId);
      await setCardList();

      closeModal();
      dispatch(setMessage({ message: 'Your card was deleted!', status: 'success' }));
    } catch (err: any) {
      dispatch(setMessage({ message: err.message, status: 'error' }));
    }
    setIsLoading(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    setIsLoading(true);

    event.preventDefault();

    const paymentMethodId = await getPaymentMethodId();

    if (!paymentMethodId) return;
    const { data } = await userAPI.addCard(paymentMethodId);

    const setupIntent = await stripe?.confirmCardSetup(data.client_secret);
    if (setupIntent?.error) {
      dispatch(setMessage({ message: `${setupIntent.error.message}`, status: 'error' }));
    } else {
      await setCardList();
      dispatch(
        setMessage({ message: 'Your card was saved for future invoices!', status: 'success' }),
      );
    }
    setIsLoading(false);
    closeModal();
  };

  return (
    <form
      className='flex flex-col w-full gap-14 min-w-[500px] min-h-fit'
      onSubmit={cardId ? handleDelete : handleSubmit}
    >
      <h2 className='text-center text-lg'>{cardId ? 'Delete' : 'Add'} payment method </h2>
      {!cardId ? (
        <CardElement />
      ) : (
        <div className='flex gap-3 justify-center text-xl'>
          <Icon src={icons.warning} alt='warning' />
          <p className='text-error'>Are you sure you want to delete this card?</p>
        </div>
      )}
      <div className='flex justify-evenly'>
        <Button variant='secondary' onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type='submit'
          disabled={isLoading || !stripe || !elements}
          variant={cardId ? 'error' : 'main'}
        >
          {cardId ? 'Delete' : 'Save'} card
          {isLoading && <SpinnerComponent />}
        </Button>
      </div>
    </form>
  );
};

export default EditCardForm;
