'use client';

import { useFormContext } from 'react-hook-form';

import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  AdminEventFilterSchemaType,
  AdminEventKeywordType,
} from '@/types/admin/event';

import {
  FilterBox,
  FilterBoxContent,
  FilterBoxFooter,
  FilterBoxRow,
} from '../filter-box';
import {
  DateRangeFormField,
  InputFormField,
  RadioGroupFormField,
  SelectFormField,
} from '../filter-form-field';
import { initAdminEventFormState } from './provider';

const EVENT_SELECT_OPTS: {
  label: string;
  value: AdminEventKeywordType;
}[] = [
  { label: '제목', value: 'TITLE' },
  { label: '내용', value: 'CONTENTS' },
  { label: '제목 + 내용', value: 'TITLE_AND_CONTENTS' },
];

const EVENT_RADIO_OPTS = [
  { label: '전체', value: '' },
  { label: '공개', value: 'true' },
  { label: '비공개', value: 'false' },
];

const AdminEventFilter = () => {
  const { control, reset } = useFormContext<AdminEventFilterSchemaType>();

  const resetForm = () => {
    reset(initAdminEventFormState);
  };

  return (
    <FilterBox className="mt-[20px]">
      <FilterBoxContent className="flex flex-col">
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">검색 조건</span>
          <SelectFormField
            name="keywordType"
            control={control}
            options={EVENT_SELECT_OPTS}
          />
          <InputFormField
            name="keyword"
            control={control}
            placeholder="검색할 내용을 입력하세요"
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">작성일</span>
          <DateRangeFormField
            name="createDateRange"
            control={control}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">게시일</span>
          <DateRangeFormField
            name="publishDateRange"
            control={control}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">노출 상태</span>
          <RadioGroupFormField
            name="isUsed"
            control={control}
            options={EVENT_RADIO_OPTS}
          />
        </FilterBoxRow>
      </FilterBoxContent>
      <FilterBoxFooter className="gap-x-2">
        <Button
          type="button"
          className="gap-x-2"
          variant="outline"
          onClick={resetForm}
        >
          <UntitledIcon.Eraser width={18} />
          초기화
        </Button>
        <Button
          type="submit"
          className="gap-x-2"
        >
          <UntitledIcon.SearchMd width={18} />
          검색
        </Button>
      </FilterBoxFooter>
    </FilterBox>
  );
};

export default AdminEventFilter;
