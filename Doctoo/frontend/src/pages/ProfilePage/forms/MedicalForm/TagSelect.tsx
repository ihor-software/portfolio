import Tag, { TagTextType } from 'src/ui/common/Tag/Tag';
import debounce from 'lodash.debounce';
import styles from './TagSelect.module.css';

export interface TagSelectProps {
  label: string;
  selectedTags: { id: number; name: string }[];
  foundTags: { id: number; name: string }[];
  query: string;
  onChange: (newQuery: string) => void;
  onSelect: (tagId: number) => void;
  onDelete: (tagId: number) => void;
}

export function TagSelect({
  label,
  selectedTags,
  foundTags,
  query,
  onChange,
  onSelect,
  onDelete,
}: TagSelectProps) {
  return (
    <div>
      <label className='block mb-2'>
        <p className='mb-2 text-grey-2'>{label}</p>
        <ul className={styles.input}>
          {selectedTags.map(tag => (
            <li key={tag.id}>
              <Tag
                variant={TagTextType.Secondary}
                onClose={() => onDelete(tag.id)}
                text={tag.name}
              />
            </li>
          ))}
          <li>
            <input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
              className='w-40 leading-6 outline-none bg-bg'
            />
          </li>
        </ul>
      </label>

      <ul className='flex flex-wrap items-center gap-2 max-h-[150px] overflow-y-auto'>
        {foundTags.map(tag => (
          <li className='cursor-pointer' key={tag.id} onClick={() => onSelect(tag.id)}>
            <Tag variant={TagTextType.Primary} text={tag.name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
