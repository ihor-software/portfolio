import axios from 'axios';
import { FC, FormEvent, useCallback, useState } from 'react';
import { Button } from 'src/ui/common';
import { v4 as uuid } from 'uuid';
import { mockSummaryContent } from './mock-summary-content';

export type SummarizationClinicalNotesPageState = {
  content: string;
  result?: any;
  resultContent?: string;
};

const initialState: SummarizationClinicalNotesPageState = {
  content: '',
};

const SummarizationClinicalNotesPage: FC = () => {
  const [state, setState] = useState(initialState);

  const handleDownloadAppointmentSummary = async () => {
    const response = await axios.post(
      `api/v1/pdf/appointment-summary`,
      JSON.stringify(mockSummaryContent),
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

  const getContentWithHighlightedWords = useCallback((content, summarizationResult) => {
    const result: any[] = [];
    if (summarizationResult) {
      const entities = summarizationResult.entityMentions.map((mention: any) => mention.text);
      let previousEndOffset = 0;
      entities.forEach((entity: any) => {
        result.push(content.slice(previousEndOffset, entity.beginOffset));
        result.push(
          <span
            className='px-1 py-0.5 rounded-lg bg-green-medium cursor-pointer hover:bg-green-2 easy-in duration-300'
            key={uuid()}
          >
            {content.slice(entity.beginOffset, entity.beginOffset + entity.content.length)}
          </span>,
        );
        previousEndOffset = entity.beginOffset + entity.content.length;
      });
      result.push(content.slice(previousEndOffset, content.length));
    }

    return result;
  }, []);

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
    <div className='flex flex-row-reverse m-10 w-full m-auto bg-white rounded-xl relative'>
      <div className='flex top-0 sticky w-full'>
        <form
          className='w-full flex flex-col m-auto px-5 my-8 border-l border-grey-8'
          onSubmit={handleOnSubmit}
        >
          <header className='mb-5'>
            <h3 className='font-bold text-2xl'>Summarize clinical note</h3>
          </header>
          <label className='inline-flex mb-2 text-grey-1'>Clinical note: </label>
          <textarea
            className='w-full min-h-[400px] rounded-lg border border-grey outline-none p-2'
            value={state.content}
            onChange={event => setState({ ...state, content: event.target.value })}
          />
          <Button additionalStyle='w-full mt-3' type='submit'>
            Summarize
          </Button>
        </form>
      </div>
      <div className='w-full flex-col items-center justify-center m-auto px-5 my-8'>
        <h3 className='font-bold text-2xl mb-5'>Result</h3>
        {!state.result ? (
          <p>The result is empty</p>
        ) : (
          <p className='mb-6 leading-7'>
            {getContentWithHighlightedWords(state.resultContent, state.result)}
          </p>
        )}
        {state.result?.entityMentionsTypesMap?.PROBLEM?.length && (
          <div className='mb-6 border border-grey-8 rounded-xl p-4'>
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
          <div className='mb-6 border border-grey-8 rounded-xl p-4'>
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
          <div className='mb-6 border border-grey-8 rounded-xl p-4'>
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
        <Button onClick={handleDownloadAppointmentSummary}>Download PDF summary</Button>
      </div>
    </div>
  );
};

export default SummarizationClinicalNotesPage;
