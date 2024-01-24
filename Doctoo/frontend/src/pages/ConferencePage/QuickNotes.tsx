import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { Button } from 'src/ui/common';
import { Patient } from 'src/types/patient.types';
import { useParams } from 'react-router-dom';
import { FormEvent, useCallback, useState } from 'react';
import { SummarizationClinicalNotesPageState } from '../SummarizationClinicalNotesPage/SummarizationClinicalNotesPage';
import icons from 'src/ui/common/Icon/iconPaths';

const initialState: SummarizationClinicalNotesPageState = {
  content: '',
};

function QuickNotes({ patient }: { patient: Patient }) {
  const [state, setState] = useState(initialState);
  const { id: appointmentId } = useParams<{ id: string }>();

  const handleDownloadAppointmentSummary = async () => {
    const response = await axios.post(
      `/api/v1/pdf/appointment-summary`,
      JSON.stringify({
        doctorNote: state.resultContent,
        appointment_id: parseInt(appointmentId as string),
        summary: state.result,
      }),
      {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const blobUrl = URL.createObjectURL(response.data);
    const link = document.createElement('a');

    link.setAttribute('href', blobUrl);
    link.setAttribute('download', `appointment-summary-${uuid()}`);

    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  };

  const handleOnSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (state.content) {
      const response = await axios.post(
        `/api/v1/summarization`,
        JSON.stringify({ documentContent: state.content }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 201) {
        setState({ ...state, result: response.data, resultContent: state.content });
      }
    }
  };

  const getMedicineInfo = useCallback((entity: any, state: any | undefined) => {
    let firstIndex = 0,
      lastIndex = state.content.length - 1;

    for (let i = entity.text.beginOffset - 1; i >= 0; i--) {
      if (state.resultContent?.[i] === '.') {
        firstIndex = i;
        break;
      }
    }

    for (
      let i = entity.text.beginOffset + entity.text.content.length;
      i < state.resultContent?.length;
      i++
    ) {
      if (state.resultContent?.[i] === '.') {
        lastIndex = i;
        break;
      }
    }

    const entities = state.result?.entityMentions?.filter(
      (entity: any) =>
        entity.text.beginOffset >= firstIndex && entity.text.beginOffset <= lastIndex,
    );

    let frequency, strength, dose, unit, form;
    for (const entityItem of entities) {
      if (entityItem.type === 'MED_FREQUENCY' && !frequency) {
        frequency = entityItem.text.content.toLowerCase();
      }

      if (entityItem.type === 'MED_DOSE' && !dose) {
        dose = entityItem.text.content.toLowerCase();
      }

      if (entityItem.type === 'MED_STRENGTH' && !strength) {
        strength = entityItem.text.content.toLowerCase();
      }

      if (entityItem.type === 'MED_UNIT' && !unit) {
        unit = entityItem.text.content.toLowerCase();
      }

      if (entityItem.type === 'MED_FORM' && !form) {
        form = entityItem.text.content.toLowerCase();
      }
    }
    return { name: entity.text.content.toLowerCase(), strength, unit, dose, frequency, form };
  }, []);

  return (
    <div className='w-full h-full flex flex-col gap-4 m-7'>
      <div className='w-4/5 flex flex-row justify-start items-center gap-4'>
        <img
          src={patient.user?.avatar ?? icons.account}
          alt='patient avatar'
          className='w-16 h-16 object-cover rounded-lg'
        />
        <p className='text-xl'>{`${patient.user?.first_name} ${patient.user?.last_name}`}</p>
      </div>
      <form className='w-full flex flex-col' onSubmit={handleOnSubmit}>
        <label className='inline-flex mb-2 text-grey-1'>Clinical note: </label>
        <textarea
          className='w-full min-h-[300px] rounded-lg border border-grey outline-none p-2'
          value={state.content}
          onChange={event => setState({ ...state, content: event.target.value })}
        />
        <Button additionalStyle='w-full mt-3' type='submit'>
          Summarize
        </Button>
        {state.result && (
          <Button additionalStyle='w-full mt-3' onClick={handleDownloadAppointmentSummary}>
            Download PDF summary
          </Button>
        )}
      </form>

      {state.result?.entityMentionsTypesMap?.PROBLEM?.length && (
        <div className='mb-6 border border-grey-8 rounded-xl p-4 w-full'>
          <h4 className='font-bold mb-4 border-b border-grey-8 pb-1'>Chief complaints:</h4>
          <div className='flex flex-col'>
            <p>During the appointment, the following patient complaints were identified: </p>
            <ul className='mt-2'>
              {state.result?.entityMentionsTypesMap?.PROBLEM?.map(
                (entity: any) =>
                  !entity.text.content.toLowerCase().includes('symptom') && (
                    <li key={uuid()} className='text-red'>
                      - {entity.text.content.toLowerCase()}
                    </li>
                  ),
              )}
            </ul>
          </div>
        </div>
      )}
      {state.result?.entityMentionsTypesMap?.ANATOMICAL_STRUCTURE?.length && (
        <div className='mb-6 border border-grey-8 rounded-xl p-4 w-full'>
          <h4 className='font-bold mb-4 border-b border-grey-8 pb-1'>Problematic body parts:</h4>
          <div className='flex flex-col'>
            <p>A list of body parts that may have problems:</p>
            <ul className='mt-2'>
              {state.result?.entityMentionsTypesMap?.ANATOMICAL_STRUCTURE?.map((entity: any) => (
                <li key={uuid()} className='text-red'>
                  - {entity.text.content.toLowerCase()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {state.result?.entityMentionsTypesMap?.MEDICINE?.length && (
        <div className='mb-6 border border-grey-8 rounded-xl p-4 w-full'>
          <h4 className='font-bold mb-4 border-b border-grey-8 pb-1'>Treatment: </h4>
          <div className='flex flex-col'>
            <p>The doctor suggests the following treatment: </p>
            <ul className='mt-2'>
              {state.result?.entityMentionsTypesMap?.MEDICINE?.map((entity: any) => {
                const medicationInfo = getMedicineInfo(entity, state);
                return (
                  !medicationInfo.name.includes('medication') && (
                    <li key={uuid()} className='text-green'>
                      - {medicationInfo.dose} {medicationInfo.strength}{' '}
                      {medicationInfo.form ? `${medicationInfo.form} of ` : ``}{' '}
                      {medicationInfo.unit ? `${medicationInfo.unit} of ` : ``}{' '}
                      {medicationInfo.name}
                      {medicationInfo.frequency ? `, ${medicationInfo.frequency}` : ``}
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuickNotes;
