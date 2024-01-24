import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from './redux';
import { fetchData } from 'src/store/services/fetchDataUtils';
import { Doctor } from 'src/types/doctor.types';

export const useDoctorFilters = (
  savedDoctors: Doctor[],
  specialties: string[],
  hospitals: string[],
  setSpecialties: (arg0: any) => void,
  setHospitals: (arg0: any) => void,
) => {
  useEffect(() => {
    const savedSpecialties = savedDoctors.map(doctor => doctor.specialty);
    const savedHospitals = savedDoctors.map(doctor => doctor.hospital?.name);
    console.log(savedHospitals);
    setSpecialties(
      specialties.length === 1
        ? [
            ...specialties,
            ...(savedSpecialties.filter(specialty => specialty !== undefined) as string[]),
          ]
        : [
            'All specializations',
            ...(savedSpecialties.filter(specialty => specialty !== undefined) as string[]),
          ],
    );
    setHospitals(
      hospitals.length === 1
        ? [...hospitals, ...(savedHospitals.filter(hospital => hospital !== undefined) as string[])]
        : [
            'All hospitals',
            ...(savedHospitals.filter(specialty => specialty !== undefined) as string[]),
          ],
    );
  }, [savedDoctors]);
};

export const useDefaultFilters = (
  setSpecialties: (arg0: any) => void,
  setHospitals: (arg0: any) => void,
) => {
  useEffect(() => {
    fetchData('/api/v1/specialties').then(result => {
      const specialtyData = result.map((specialty: { specialty: string }) => {
        return specialty.specialty;
      });
      setSpecialties(['All specializations', ...specialtyData]);
      return specialtyData;
    });
    fetchData('/api/v1/hospitals').then(result => {
      const hospitalsData = result.map((hospital: { name: string }) => {
        return hospital.name;
      });
      setHospitals(['All hospitals', ...hospitalsData]);
      return hospitalsData;
    });
  }, []);
};
