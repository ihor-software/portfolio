import { useState, useEffect } from 'react';
import { Button } from 'src/ui/common/Button';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { PaymentMethod } from 'src/ui/common/PaymentMethod/PaymentMethod';
import { userAPI } from 'src/store/services/api/userAPI';
import { useDispatch } from 'react-redux';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import EditCardModal from 'src/pages/PaymentPage/components/EditModal/EditCardModal';

export function PaymentInfo() {
  const dispatch = useDispatch();

  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | undefined>('');

  const getPaymentList = async () => {
    try {
      const { data } = await userAPI.getCardList();
      setPaymentMethods(data);
    } catch (err: any) {
      dispatch(setMessage({ message: err.message, status: 'error' }));
    }
  };
  const openPaymentModal = (paymentId?: string) => {
    setSelectedCard(paymentId);
    setOpenModal(true);
  };

  useEffect(() => {
    getPaymentList();
    return () => setPaymentMethods([]);
  }, []);

  return (
    <div className='flex flex-col gap-4 p-8 bg-white rounded-2xl'>
      <div className='flex items-center justify-between '>
        <h3 className='text-lg font-media'>Payment methods</h3>
        <Button variant='secondary' onClick={() => openPaymentModal()}>
          <div className='flex items-center justify-center gap-2'>
            <Icon src={icons.plus} alt='add' iconColor='main' />
            <span className='font-sans '>Add</span>
          </div>
        </Button>
      </div>
      <ul className='flex flex-col gap-4'>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((paymentMethod, index) => (
            <li
              key={index}
              className='flex rounded-md px-4 py-2.5  flex-col items-start gap-4 md:flex-row md:justify-between'
            >
              <PaymentMethod
                cardNumber={paymentMethod.last4}
                expMonth={paymentMethod.exp_month}
                expYear={paymentMethod?.exp_year}
              />
              <Button
                variant='flat'
                icon={icons.trash}
                onClick={() => openPaymentModal(paymentMethod.id)}
              />
            </li>
          ))
        ) : (
          <p className='text-center text-gray'>You haven`t provided any payment method yet</p>
        )}
      </ul>
      {openModal && (
        <EditCardModal
          cardId={selectedCard}
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          setCardList={getPaymentList}
        />
      )}
    </div>
  );
}
