import React, { useCallback } from 'react';

import { Badge } from '../ui/badge';

export interface ITag {
  id: number;
  name: string;
}

export interface ITagFilterProps extends React.HTMLAttributes<HTMLDivElement> {
  tagList: ITag[];
  setSelectedTags: (tags: ITag[]) => void;
  selectedTags: ITag[];
}

const RequestTag = ({
  tagList,
  selectedTags,
  setSelectedTags,
}: ITagFilterProps) => {
  const isSelectedTag = useCallback(
    (item: ITag) => {
      return selectedTags.find((tag) => tag.id === item.id);
    },
    [selectedTags]
  );

  const toggleActiveName = useCallback(
    (tag: ITag) => {
      if (isSelectedTag(tag)) {
        setSelectedTags(
          selectedTags.filter((selectedTag) => selectedTag.id !== tag.id)
        );
      } else {
        setSelectedTags([...selectedTags, tag]);
      }
    },
    [isSelectedTag, selectedTags, setSelectedTags]
  );

  return (
    <>
      <ul className="flex gap-[10px] w-full items-center justify-center">
        {tagList.map((tag) => {
          return (
            <li
              className="select-none"
              key={tag.id}
            >
              <Badge
                variant={isSelectedTag(tag) ? 'clickRequest' : 'basicRequest'}
                onClick={() => toggleActiveName(tag)}
              >
                {tag.name}
              </Badge>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RequestTag;
