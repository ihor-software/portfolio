import { FC, useEffect, useState } from 'react';
import { Icon } from 'src/ui/common/Icon';
import styles from './MyDoctorsPage.module.css';
import icons from 'src/ui/common/Icon/iconPaths';
import { Button } from 'src/ui/common/Button';
import DoctorCard from 'src/ui/DoctorCard/DoctorCard';
import doctor from '../../images/doctor.svg';
import { useAppSelector } from 'src/hooks/redux';
import { Calendar } from 'src/ui/Calendar/Calendar';
import Filter from 'src/ui/common/Filter/Filter';
import { useDoctorFilters } from 'src/hooks/useFilters';
import { useDispatch } from 'react-redux';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';
import { Doctor } from 'src/types/doctor.types';
import { fetchAllAppointments, getAllAppointments } from 'src/store/slices/appointment.slice';
import { getUniqueDoctors } from 'src/utils/appointmentSlice';
import { searchSliceActions } from 'src/store/slices/searchSlice';
import { ROUTES } from 'src/utils/routes';
import { NavLink } from 'react-router-dom';
import { fetchDoctorById, getSelectedDoctor } from 'src/store/slices/doctor.slice';
import HeaderPage from 'src/ui/common/HeaderPage/HeaderPage';

const MyDoctors: FC = () => {
  const search = useAppSelector(state => state.searchReducer.search);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const familyDoctor = useAppSelector(getSelectedDoctor);
  const [hospitals, setHospitals] = useState<string[]>(['All hospitals']);
  const [specialties, setSpecialties] = useState<string[]>(['All specializations']);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All specializations');
  const [selectedHospital, setSelectedHospital] = useState<string>('All hospitals');
  const [selectedTime, setSelectedTime] = useState<string>('All time');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();
  const [savedDoctors, setSavedDoctors] = useState<Doctor[]>([]);

  useDoctorFilters(savedDoctors, specialties, hospitals, setSpecialties, setHospitals);

  const appointments = useAppSelector(getAllAppointments);

  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, []);

  useEffect(() => {
    if (appointments[0]?.patient?.family_doctor?.user_id) {
      dispatch(fetchDoctorById(appointments[0].patient.family_doctor.user_id));
    }
    setSavedDoctors(getUniqueDoctors(appointments));
  }, [appointments]);

  const filteredDoctors = savedDoctors
    .map(e => {
      return e;
    })
    .filter(
      value => value.specialty === selectedSpecialty || selectedSpecialty === 'All specializations',
    )
    .filter(
      value => value.hospital?.name === selectedHospital || selectedHospital === 'All hospitals',
    );

  return (
    <>
      <div className={styles.content + ' max-h-screen overflow-auto'}>
        <HeaderPage icon={icons.doctors} title='My Doctors' />
        <div className='flex items-start gap-4 flex-col lg:flex-row'>
          <div className='flex flex-col flex-1 gap-4 w-full'>
            <div className='flex gap-4 flex-wrap'>
              <Filter
                selectedValue='All time'
                values={['All time', '9:00am - 12:00pm', '12:00pm - 16:00pm', '16:00pm - 20:00pm']}
                optionClasses='w-52'
              />
              <Filter
                selectedValue={selectedSpecialty}
                values={specialties}
                onChange={(value: string) => setSelectedSpecialty(value)}
              />
              <Filter
                selectedValue={selectedHospital}
                values={hospitals}
                onChange={(value: string) => setSelectedHospital(value)}
                optionClasses='w-52'
              />
            </div>
            {familyDoctor && (
              <>
                <h3 className='text-lg'>Family Doctor</h3>
                <DoctorCard
                  src={doctor}
                  option='saved'
                  doctor={familyDoctor}
                  selectDoctor={() => setSelectedDoctor(familyDoctor ? familyDoctor : undefined)}
                  filterByTime={selectedTime !== 'All time'}
                />
              </>
            )}

            <h3 className='text-lg mt-4'>My Doctors ({savedDoctors.length})</h3>
            {filteredDoctors.map(item => (
              <DoctorCard
                key={item.user_id}
                src={doctor}
                option='saved'
                doctor={item}
                selectDoctor={() => setSelectedDoctor(item)}
                filterByTime={selectedTime !== 'All time'}
              />
            ))}
          </div>
          <div className='w-full lg:basis-1/3'>
            <Calendar value={date} onChange={setDate} />
          </div>
        </div>
      </div>
      {selectedDoctor && (
        <DoctorModal doctor={selectedDoctor} onClose={() => setSelectedDoctor(undefined)} />
      )}
    </>
  );
};

export default MyDoctors;
