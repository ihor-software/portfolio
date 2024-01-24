import { FC, useEffect, useState } from 'react';
import { Icon } from 'src/ui/common/Icon';
import icons from 'src/ui/common/Icon/iconPaths';
import styles from './SearchPade.module.css';
import { useAppSelector } from 'src/hooks/redux';
import { useDispatch } from 'react-redux';
import { Calendar } from 'src/ui/Calendar/Calendar';
import { NavLink } from 'react-router-dom';
import { Doctor } from 'src/types/doctor.types';
import Filter from 'src/ui/common/Filter/Filter';
import DoctorCard from 'src/ui/DoctorCard/DoctorCard';
import doctor from '../../images/doctor.svg';
import DoctorModal from 'src/ui/common/DoctorModal/DoctorModal';
import { useDefaultFilters, useDoctorFilters } from 'src/hooks/useFilters';
import { fetchDoctors, fetchMoreDoctors } from 'src/store/slices/doctor.slice';
import { searchSliceActions } from 'src/store/slices/searchSlice';

const SearchPage: FC = () => {
  const dispatch = useDispatch();
  const search = useAppSelector(state => state.searchReducer.search);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | undefined>();
  const [hospitals, setHospitals] = useState<string[]>(['All hospitals']);
  const [specialties, setSpecialties] = useState<string[]>(['All specializations']);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All specializations');
  const [selectedHospital, setSelectedHospital] = useState<string>('All hospitals');
  const [page, setPage] = useState<number>(1);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  const allDoctors = useAppSelector(state => state.doctorsReducer.doctors);

  useDefaultFilters(setSpecialties, setHospitals);

  const [date, setDate] = useState(new Date());

  useEffect(() => {
    dispatch(
      fetchMoreDoctors({
        keyword: search,
        page: page,
        pageSize: 10,
        specialty: selectedSpecialty === 'All specializations' ? '' : selectedSpecialty,
        hospital: selectedHospital === 'All hospitals' ? '' : selectedHospital,
      }),
    );
    // setPage(page + 1);
  }, [page]);

  useEffect(() => {
    dispatch(
      fetchDoctors({
        keyword: search,
        page: 1,
        pageSize: 10,
        specialty: selectedSpecialty === 'All specializations' ? '' : selectedSpecialty,
        hospital: selectedHospital === 'All hospitals' ? '' : selectedHospital,
      }),
    );
    setPage(2);
  }, [search, selectedSpecialty, selectedHospital]);

  return (
    <>
      <div
        className={styles.content + ' max-h-screen overflow-auto'}
        onScroll={e => {
          const scrollY = e.currentTarget.scrollTop;
          setScrollPosition(scrollY);
          const containerHeight = e.currentTarget.scrollHeight - e.currentTarget.clientHeight;

          if (scrollY >= containerHeight - 200) {
            // dispatch(fetchMoreDoctors({ keyword: search, page: page, pageSize: 10 }));
            setPage(page + 1);
          }
        }}
      >
        <div className={styles.header}>
          <div className='flex'>
            <p className='pb-3 text-sm text-black-2 cursor-pointer'>
              <NavLink to={'/dashboard'}>&lt;- Back to Dashboard</NavLink>
            </p>
          </div>
        </div>
        <div className='flex items-start gap-4 flex-col lg:flex-row'>
          <div className='flex flex-col flex-1 w-full'>
            <div className={styles.titlesection}>
              <Icon src={icons.doctors} alt='dashboard' iconColor='main' />
              <h2 className={styles.title}>Best doctors available now</h2>
            </div>
            <div className='flex bg-white lg:w-full mb-6 h-10 rounded-lg'>
              <Icon src={icons.search} alt='search' iconColor='search' />
              <input
                className={styles.search}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(searchSliceActions.setSearch(e.target.value));
                }}
                placeholder={'Search by doctor'}
              />
            </div>
            <div className='flex gap-4 flex-wrap mb-6'>
              <Filter
                selectedValue='All time'
                values={['9:00am - 12:00pm', '12:00pm - 16:00pm', '16:00pm - 20:00pm']}
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
            <div className='flex flex-col gap-4'>
              {allDoctors.map(item => (
                <DoctorCard
                  key={item.user_id}
                  src={doctor}
                  option='search'
                  doctor={item}
                  selectDoctor={() => setSelectedDoctor(item)}
                />
              ))}
            </div>
          </div>
          <div className='w-full lg:basis-1/5'>
            <Calendar value={date} onChange={setDate} />
          </div>
        </div>
      </div>
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(undefined)}
          onBook={() => setSelectedDoctor(undefined)}
        />
      )}
    </>
  );
};

export default SearchPage;
