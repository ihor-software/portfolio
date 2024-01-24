import { FC } from 'react';
import { CardPlaceholder } from './card-placeholder';

type SectionPlaceholderProps = {
  cardsCount: number;
};

const SectionPlaceholder: FC<SectionPlaceholderProps> = ({ cardsCount }) => {
  let id = 0;
  const cards = Array.from({ length: cardsCount }, () => <CardPlaceholder key={id++} />);
  return (
    <>
      <div className='bg-grey-5 w-8/12 h-6 rounded-lg'></div>
      {cards ? cards : <div className='h-80' />}
    </>
  );
};

export default SectionPlaceholder;
