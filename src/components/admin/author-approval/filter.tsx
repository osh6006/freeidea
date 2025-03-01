'use client';

import { useFormContext } from 'react-hook-form';

import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';

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
import { initAuthorApprovalFormState } from './provider';

const APPROVAL_SELECT_OPTS = [
  { label: '전체', value: 'ALL' },
  { label: '회원ID', value: 'EMAIL' },
  { label: '회원명', value: 'USER_NAME' },
  { label: '닉네임', value: 'NICKNAME' },
  { label: '연락처', value: 'PHONE_NUMBER' },
];

const APPROVAL_RADIO_OPTS = [
  { label: '전체', value: '' },
  { label: '대기', value: 'CREATED' },
  { label: '승인', value: 'APPROVED' },
  { label: '거절', value: 'REJECTED' },
];

const AuthorApprovalFilter = () => {
  const { control, reset } = useFormContext();

  const resetForm = () => {
    reset(initAuthorApprovalFormState);
  };

  return (
    <FilterBox className="mt-[20px]">
      <FilterBoxContent className="flex flex-col">
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">검색 조건</span>
          <SelectFormField
            name="keywordType"
            control={control}
            options={APPROVAL_SELECT_OPTS}
          />
          <InputFormField
            name="keyword"
            control={control}
            placeholder="검색할 내용을 입력하세요"
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">승인 신청일</span>
          <DateRangeFormField
            name="applyDateRange"
            control={control}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">승인 심사일</span>
          <DateRangeFormField
            name="examineDateRange"
            control={control}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">승인 상태</span>
          <RadioGroupFormField
            name="requestStatus"
            control={control}
            options={APPROVAL_RADIO_OPTS}
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

export default AuthorApprovalFilter;
