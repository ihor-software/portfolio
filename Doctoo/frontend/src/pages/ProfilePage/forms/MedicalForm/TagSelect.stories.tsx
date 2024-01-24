import { Meta, StoryObj } from '@storybook/react';
import { TagSelect } from './TagSelect';
import { useState } from 'react';
import { Tag, useFoundTags } from './useFoundTags';

const meta: Meta<typeof TagSelect> = {
  title: 'UI/forForm/TagSelect',
  component: TagSelect,
};

export default meta;

export const TagSelectStory: StoryObj<typeof meta> = {
  render: () => {
    const [selectedConditions, setSelectedConditions] = useState<Tag[]>([]);
    const [queryConditions, setQueryConditions] = useState('a');
    const foundConditions = useFoundTags(queryConditions, conditions, selectedConditions);

    const onSelectCondition = (id: number) => {
      const tag = conditions.find(tag => tag.id === id);
      if (!tag) return;
      setSelectedConditions([...selectedConditions, tag]);
    };

    const onDeleteCondition = (id: number) => {
      const newSelected = selectedConditions.filter(tag => tag.id !== id);
      setSelectedConditions(newSelected);
    };

    return (
      <div className='max-w-[600px] p-8 '>
        <TagSelect
          label='Medical condition'
          selectedTags={selectedConditions}
          foundTags={foundConditions}
          query={queryConditions}
          onChange={setQueryConditions}
          onSelect={onSelectCondition}
          onDelete={onDeleteCondition}
        />
      </div>
    );
  },
};

const conditions = [
  {
    id: 1,
    name: 'Asthma',
  },
  {
    id: 2,
    name: 'Coronary heart disease',
  },
  {
    id: 3,
    name: 'Hypertension',
  },
  {
    id: 4,
    name: 'Heart failure',
  },
  {
    id: 5,
    name: 'Laryngitis',
  },
  {
    id: 6,
    name: 'Bipolar disorder',
  },
  {
    id: 7,
    name: 'Coronavirus (COVID-19)',
  },
];
