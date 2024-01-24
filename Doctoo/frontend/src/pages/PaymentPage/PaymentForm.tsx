import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAPI } from 'src/store/services/api/userAPI';
import { setMessage } from 'src/store/slices/systemMessage.slice';
import { Button, CheckBox, Icon, PaymentMethod, RadioButton } from 'src/ui/common';
import icons from 'src/ui/common/Icon/iconPaths';
import { AppointmentInfo } from './AppointmentInfo';
import { AppointmentCalc } from './AppointmentCalc';
import { Link } from 'react-router-dom';
import { SuccessMessage } from './SuccessMessage';
import { Modal } from 'src/ui/common';
import { Appointment } from 'src/types/appointment.types';

type PaymentFormProps = {
  appointment: Appointment;
  clientSecret: string;
};

export const PaymentForm: FC<PaymentFormProps> = ({ appointment, clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);
  const [savedMethods, setSavedMethods] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false);

  const [chosenMethod, setChosenMethod] = useState('newCard');
  const [chosenSavedCard, setChosenSavedCard] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChooseMethod = (e: string) => {
    setChosenMethod(e);
  };

  const handleCLose = () => {
    setOpenModal(false);
    navigate(-1);
  };

  const getPaymentList = async () => {
    try {
      const { data } = await userAPI.getCardList();
      setSavedMethods(data);
    } catch (err: any) {
      dispatch(setMessage({ message: err.message, status: 'error' }));
    }
  };

  const handleUpdateMethod = async (paymentId: string) => {
    if (paymentId === chosenSavedCard) return;
    setChosenSavedCard(paymentId);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const responseData =
      chosenMethod === 'newCard' ? await newCardSubmit() : await savedCardSubmit();
    setIsLoading(false);

    if (responseData?.error) {
      dispatch(setMessage({ message: `${responseData?.error.message}`, status: 'error' }));
    } else if (responseData?.paymentIntent && responseData?.paymentIntent.status === 'succeeded') {
      const { status } = await userAPI.updateAppointment(appointment.id, { is_paid: true });
      if (status === 200) {
        setOpenModal(true);
      }
    }
  };

  const savedCardSubmit = async () => {
    if (!stripe || !elements) return;

    return await stripe?.confirmCardPayment(clientSecret, {
      payment_method: chosenSavedCard,
    });
  };

  const newCardSubmit = async () => {
    if (!stripe || !elements) return;

    return await stripe?.confirmPayment({
      elements,
      redirect: 'if_required',
    });
  };

  useEffect(() => {
    getPaymentList();
  }, []);

  return (
    <form className='flex w-full gap-12 p-8 h-full  justify-center my-11' onSubmit={handleSubmit}>
      <div className='w-full md:max-w-[600px]'>
        <div onClick={() => navigate(-1)} className='flex gap-1.5 mb-5 cursor-pointer'>
          <Icon src={icons.arrowLeft} alt='back' iconColor='icon' width={10} height={10} />
          <span className='text-sm font-medium text-black-2'> Back</span>
        </div>

        <div className='p-6 pl-8 bg-white rounded-2xl'>
          <p className='mb-6 text-lg font-medium leading-6 text-black-1'>Payment Method</p>

          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-4'>
              <RadioButton
                id={'savedCard'}
                checked={chosenMethod === 'savedCard'}
                value='savedCard'
                disabled={savedMethods.length < 1}
                name='payment'
                labelText='Saved payment methods'
                onChange={e => onChooseMethod(e.target.value)}
              />

              {chosenMethod === 'savedCard' && savedMethods.length > 0 && (
                <ul className='relative flex flex-col gap-4 -translate-x-2 '>
                  {savedMethods.map((paymentMethod, index) => (
                    <li
                      key={index}
                      className={`flex rounded-md px-4 py-2.5  flex-col items-start gap-4 md:flex-row md:justify-between border hover:border-main active:border-main cursor-pointer transition ${
                        paymentMethod.id === chosenSavedCard ? 'border-main' : 'border-transparent'
                      }`}
                      onClick={() => handleUpdateMethod(paymentMethod.id)}
                    >
                      <PaymentMethod
                        cardNumber={paymentMethod.last4}
                        expMonth={paymentMethod.exp_month}
                        expYear={paymentMethod?.exp_year}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className='flex flex-col gap-4'>
              <RadioButton
                id={'newCard'}
                value='newCard'
                checked={chosenMethod === 'newCard'}
                name='payment'
                labelText='Bank card'
                onChange={e => onChooseMethod(e.target.value)}
              />
              {chosenMethod === 'newCard' && <PaymentElement options={{ layout: 'tabs' }} />}
            </div>
          </div>
        </div>
      </div>

      {appointment.doctor && (
        <div className='w-full md:max-w-[310px]'>
          <p className='mb-4 text-lg font-medium leading-6'>Your appointment</p>
          <AppointmentInfo className='p-6 mb-2 bg-white rounded-2xl ' appointment={appointment} />
          <AppointmentCalc className='mb-2' cost={Number(appointment.doctor?.payrate)} />
          <CheckBox
            className='pr-2 mb-4 translate-x-3'
            id='privacy'
            checked={isPrivacyAgreed}
            value=''
            name='privacy'
            labelText={
              <span>
                By clicking Pay now button, I confirm that I have read and accept{' '}
                <Link className='underline' to='#'>
                  General Terms and Conditions
                </Link>
                , and{' '}
                <Link className='underline' to='#'>
                  Privacy statement
                </Link>
              </span>
            }
            onChange={() => setIsPrivacyAgreed(prev => !prev)}
          />
          <Button
            type='submit'
            additionalStyle='w-full'
            disabled={isLoading || !stripe || !elements || !isPrivacyAgreed}
          >
            {isLoading ? 'Processing...' : 'Pay now'}
          </Button>
        </div>
      )}
      {openModal && (
        <Modal onClose={handleCLose} isOpen={openModal}>
          <SuccessMessage />
        </Modal>
      )}
    </form>
  );
};
