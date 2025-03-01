import { WorkNewSchemaType } from '@/types/work';

export const WORK_NEW_DEFAULT_VALUES: WorkNewSchemaType = {
  title: '',
  category: '',
  thumbnails: [],
  tags: [],
  fileTypes: [],
  modifyCount: '',
  workDays: '',
  useRange: [],
  optionGroups: [
    {
      optionGroupId: crypto.randomUUID(),
      optionGroupName: '',
      options: [
        {
          optionId: crypto.randomUUID(),
          optionName: '',
          optionPrice: 0,
        },
      ],
    },
  ],
  contents: '',
};
