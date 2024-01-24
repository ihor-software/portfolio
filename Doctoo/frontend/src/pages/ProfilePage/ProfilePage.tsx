import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import { PersonalInfo, DeclarationInfo, PaymentInfo, AddressInfo, PatientData } from './infoBlocks';
import { Modal } from 'src/ui/common/Modal';
import { useEffect, useReducer } from 'react';
import { PersonalInfoForm } from './forms/PersonalInfoForm/PersonalInfoForm';
import { AddressForm } from './forms/AddressForm/AddressForm';
import { MedicalForm } from './forms/MedicalForm/MedicalForm';
import { getUser as selectUser } from 'src/store/slices/auth/auth.slice';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { getAddresses } from 'src/store/slices/address';
import { getCountries } from 'src/store/slices/countries';
import { selectPatient, getPatient } from 'src/store/slices/patient';
import SpinnerComponent from 'src/ui/common/SpinnerComponent/SpinnerComponent';
import { Button } from 'src/ui/common';

const initialModalState = {
  isPersonalFormOpened: false,
  isAddressFormOpened: false,
  isMedicalFormOpened: false,
  isPaymentFormOpened: false,
  isAuthAlertOpened: false,
  isSuccessAlertOpened: false,
};

export default function ProfilePage() {
  const [modalState, modalDispatch] = useReducer(modalReducer, initialModalState);
  const patient = useAppSelector(selectPatient);
  const isLoading = useAppSelector(state => state.patient.isLoading);
  const user = useAppSelector(selectUser)!;
  const dispatch = useAppDispatch();
  const clientId = 'f3d3ec23-a386-4bd9-b56a-f90d56c9f4b7';
  const redirect = 'https://doctoo.org/dashboard';

  useEffect(() => {
    dispatch(getPatient());
    dispatch(getAddresses());
    dispatch(getCountries());
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='w-full h-[100vh] flex items-center justify-center'>
          <SpinnerComponent />
        </div>
      ) : (
        <div className='w-full h-full p-8 bg-bg'>
          <div className='flex justify-between'>
            <div className='flex items-center gap-3 mb-6 '>
              <Icon src={icons.account} alt='profile' iconColor='main' />
              <h1 className='text-2xl leading-9 text-black-1'>Profile</h1>
            </div>
            <Button>
              <a
                href={`https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize?response_type=code&redirect_uri=${redirect}&client_id=${clientId}&state=1234&scope=patient.read, patient.search, condition.read, condition.search`}
              >
                Load data from EPIC <Icon src={icons.download} alt='' iconColor='white' />
              </a>
            </Button>
          </div>
          <div className='flex flex-col gap-6 md:flex-row '>
            <div className='flex flex-col flex-grow gap-6 font-meduim'>
              <PersonalInfo onEdit={() => modalDispatch('openPersonalForm')} />
              <DeclarationInfo onEdit={() => modalDispatch('openMedicalForm')} />
              <PaymentInfo />
              <AddressInfo onEdit={() => modalDispatch('openAddressForm')} />
            </div>

            <ul className='flex flex-col gap-6'>
              <PatientData
                title='Height, cm'
                fieldName='height'
                icon={icons.body}
                param={patient?.height ?? ''}
              />
              <PatientData
                title='Weight, kg'
                fieldName='weight'
                icon={icons.weight}
                param={patient?.weight ?? ''}
              />
              <PatientData
                title='Blood type'
                fieldName='bloodtype'
                icon={icons.blood}
                param={patient?.bloodtype ?? ''}
              />
              {!user.isRegisteredWithGoogle && (
                <li className='flex gap-2 p-6 pb-4 bg-white  justify-between group rounded-lg md:max-w-[196px]'>
                  <div className='flex flex-col gap-2 leading-6 '>
                    <p className='text-grey-1'>Gender</p>
                    <div className='flex items-center gap-2'>
                      <p className='font-medium text-black-1'>{user.gender_cd}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-center w-10 h-10 rounded-lg bg-bg'>
                    <Icon src={icons.gender} alt='Gender' width={24} height={24} />
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
      {modalState.isPersonalFormOpened && (
        <Modal
          className='w-full md:max-w-[510px]'
          onClose={() => modalDispatch('closePersonalForm')}
        >
          <PersonalInfoForm closeModal={() => modalDispatch('closePersonalForm')} />
        </Modal>
      )}
      {modalState.isAddressFormOpened && (
        <Modal onClose={() => modalDispatch('closeAddressForm')}>
          <AddressForm closeModal={() => modalDispatch('closeAddressForm')} />
        </Modal>
      )}
      {modalState.isMedicalFormOpened && (
        <Modal className='w-full max-w-[612px]' onClose={() => modalDispatch('closeMedicalForm')}>
          <MedicalForm closeModal={() => modalDispatch('closeMedicalForm')} />
        </Modal>
      )}
    </>
  );
}

function modalReducer(state: typeof initialModalState, action: string) {
  switch (action) {
    case 'openPersonalForm': {
      return { ...state, isPersonalFormOpened: true };
    }
    case 'openMedicalForm': {
      return { ...state, isMedicalFormOpened: true };
    }
    case 'openAddressForm': {
      return { ...state, isAddressFormOpened: true };
    }
    case 'openPaymentForm': {
      return { ...state, isPaymentFormOpened: true };
    }
    case 'openAuthAlert': {
      return { ...state, isAuthAlertOpened: true };
    }
    case 'openSuccessAlert': {
      return { ...state, isSuccessAlertOpened: true };
    }
    case 'closePersonalForm': {
      return { ...state, isPersonalFormOpened: false };
    }
    case 'closeMedicalForm': {
      return { ...state, isMedicalFormOpened: false };
    }
    case 'closeAddressForm': {
      return { ...state, isAddressFormOpened: false };
    }
    case 'closePaymentForm': {
      return { ...state, isPaymentFormOpened: false };
    }
    case 'closeAuthAlert': {
      return { ...state, isAuthAlertOpened: false };
    }
    case 'closeSuccessAlert': {
      return { ...state, isSuccessAlertOpened: false };
    }
    default:
      return state;
  }
}
