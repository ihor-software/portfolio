import { useMemo } from 'react';

export interface Tag {
  id: number;
  name: string;
}

export function useFoundTags(query: string, tags: Tag[], selectedTags: Tag[]) {
  return useMemo(() => {
    const queryFormated = query.toLowerCase();
    return queryFormated
      ? tags.filter(item => {
          const isMatchedQuery = item.name.toLocaleLowerCase().includes(queryFormated);
          const isAlreadySelected = selectedTags.find(tag => tag.id === item.id);
          return isMatchedQuery && !isAlreadySelected;
        })
      : [];
  }, [query, tags, selectedTags]);
}
