import { useEffect, useState } from 'react';
import { Appointment } from 'src/types/appointment.types';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from './PaymentForm';
import { userAPI } from 'src/store/services/api/userAPI';
import SpinnerComponent from 'src/ui/common/SpinnerComponent/SpinnerComponent';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setMessage } from 'src/store/slices/systemMessage.slice';

const stripePromise = loadStripe(
  `pk_test_51NnOHIK6algMCn4zTEr2WOIBXP1JkVRjcyUybVk90zekyjHL1oTJYrAp0rzEE6S3fpHMVFzZ0O8EN6BGUPnraE9o00pCgPujFr`,
);

type IntentDataType = {
  clientSecret: string;
  id: string;
};

export const PaymentPage = () => {
  const [intentData, setIntentData] = useState<IntentDataType | null>(null);
  const [appointmentData, setAppointmentData] = useState<Appointment | null>(null);
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchAppointment = async () => {
    if (!appointmentId) {
      navigate(-1);
    }

    try {
      const { data } = await userAPI.retrieveAppointment(Number(appointmentId));
      setAppointmentData(data);
      await charge(data);
    } catch (error: any) {
      dispatch(setMessage({ message: `${error.message}`, status: 'error' }));
    }
  };

  const charge = async (appointment: Appointment) => {
    try {
      if (!appointment) return;
      const { data } = await userAPI.chargeUser(Number(appointment.doctor?.payrate));
      setIntentData(data);
    } catch (err: any) {
      dispatch(setMessage({ message: err.message, status: 'error' }));
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchAppointment();

    return () => {
      setAppointmentData(null);
      setIntentData(null);
    };
  }, []);

  return (
    <div className='flex w-full h-[100vh] items-center justify-center'>
      {intentData?.clientSecret && appointmentData ? (
        <Elements stripe={stripePromise} options={{ clientSecret: intentData.clientSecret }}>
          <PaymentForm appointment={appointmentData} clientSecret={intentData.clientSecret} />
        </Elements>
      ) : (
        <SpinnerComponent additionalClass='max-w-[50px]' />
      )}
    </div>
  );
};
