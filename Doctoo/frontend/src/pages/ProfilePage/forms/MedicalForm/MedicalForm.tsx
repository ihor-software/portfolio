import { useEffect, useState } from 'react';
import { Button } from 'src/ui/common/Button';

import { TagSelect } from './TagSelect';
import { Tag } from './useFoundTags';
import { useAppDispatch, useAppSelector } from 'src/hooks/redux';
import { patchPatientConditionsThunk } from 'src/store/slices/auth';
import { getUser as selectUser } from 'src/store/slices/auth/auth.slice';
import { selectPatient } from 'src/store/slices/patient';
import medicalConditionsSlice, {
  fetchAllMedicalConditions,
  getAllMedicalConditions,
} from 'src/store/slices/medical-conditions.slice';
import { fetchAllAllergies, getAllAllergies } from 'src/store/slices/allergies.slice';

interface MedicalFormProps {
  closeModal: () => void;
}

export type MedicalFormState = {
  medicalConditionsQuery: string;
  allergiesQuery: string;
};

const initialState: MedicalFormState = {
  medicalConditionsQuery: '',
  allergiesQuery: '',
};

const filterFoundtags = (foundTags: Tag[], selectedTags: Tag[]) => {
  return foundTags.filter(item => !selectedTags.find(tag => tag.id === item.id));
};

export function MedicalForm({ closeModal }: MedicalFormProps) {
  const patient = useAppSelector(selectPatient);
  const [selectedConditions, setSelectedConditions] = useState<Tag[]>(
    patient?.medicalConditions ?? [],
  );
  const [selectedAllergies, setSelectedAllergies] = useState<Tag[]>(patient?.allergies ?? []);
  const [foundConditions, setFoundConditions] = useState<Tag[]>([]);
  const [foundAllergies, setFoundAllergies] = useState<Tag[]>([]);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const medicalConditions = useAppSelector(getAllMedicalConditions);
  const allergies = useAppSelector(getAllAllergies);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    dispatch(fetchAllMedicalConditions());
    dispatch(fetchAllAllergies());
  }, [dispatch]);

  useEffect(() => {
    setFoundAllergies(allergies);
    setFoundConditions(medicalConditions);
  }, [medicalConditions, allergies]);

  const handleReset = () => {
    closeModal();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    dispatch(
      patchPatientConditionsThunk({
        allergies: selectedAllergies.map(item => item.id),
        conditions: selectedConditions.map(item => item.id),
      }),
    )
      .unwrap()
      .then(closeModal);
  };

  const onDeleteCondition = (id: number) => {
    const newSelected = selectedConditions.filter(tag => tag.id !== id);
    setSelectedConditions(newSelected);
  };

  const onSelectCondition = (id: number) => {
    const tag = foundConditions.find(tag => tag.id === id);
    if (!tag) return;
    setSelectedConditions([...selectedConditions, tag]);
    setState({ ...state, medicalConditionsQuery: '' });
  };

  const onDeleteAllergy = (id: number) => {
    const newSelected = selectedAllergies.filter(tag => tag.id !== id);
    setSelectedAllergies(newSelected);
  };

  const onSelectAllergy = (id: number) => {
    const tag = foundAllergies.find(tag => tag.id === id);
    if (!tag) return;
    setSelectedAllergies([...selectedAllergies, tag]);
    setState({ ...state, allergiesQuery: '' });
  };

  const onConditionsChange = async (name: string) => {
    setFoundConditions(
      medicalConditions.filter(medicalCondition =>
        medicalCondition.name.toLowerCase().includes(name.toLowerCase()),
      ) as Tag[],
    );
    setState({ ...state, medicalConditionsQuery: name });
  };

  const onAllergiesChange = async (name: string) => {
    setFoundAllergies(
      allergies.filter(allergy => allergy.name.toLowerCase().includes(name.toLowerCase())) as Tag[],
    );
    setState({ ...state, allergiesQuery: name });
  };

  const filteredAllergies = filterFoundtags(foundAllergies, selectedAllergies);
  const filteredConditions = filterFoundtags(foundConditions, selectedConditions);

  return (
    <form className='flex flex-col gap-6 ' onSubmit={handleSubmit} onReset={handleReset}>
      <h2 className='text-2xl font-medium leading-9'>Medical condition and allergies</h2>

      <TagSelect
        label='Medical condition'
        selectedTags={selectedConditions}
        foundTags={filteredConditions}
        query={state.medicalConditionsQuery}
        onChange={onConditionsChange}
        onSelect={onSelectCondition}
        onDelete={onDeleteCondition}
      />

      <TagSelect
        label='Allergies'
        selectedTags={selectedAllergies}
        foundTags={filteredAllergies}
        query={state.allergiesQuery}
        onChange={onAllergiesChange}
        onSelect={onSelectAllergy}
        onDelete={onDeleteAllergy}
      />

      <div className='flex gap-4'>
        <Button type='reset' variant='secondary' additionalStyle='w-1/2 '>
          Cancel
        </Button>
        <Button variant='main' type='submit' additionalStyle='w-1/2 '>
          Save
        </Button>
      </div>
    </form>
  );
}
