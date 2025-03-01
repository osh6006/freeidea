'use client';

import { useFormContext } from 'react-hook-form';

import { UntitledIcon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
  AdminMemberFilterSchemaType,
  AdminMemberKeywordType,
  AdminMemberLevelType,
  AdminMemberStatusType,
} from '@/types/admin/member';

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
import { initAdminMemberFormState } from './provider';

const MEMBER_SELECT_OPTS: {
  label: string;
  value: AdminMemberKeywordType;
}[] = [
  { label: '전체', value: 'ALL' },
  { label: '회원ID', value: 'EMAIL' },
  { label: '회원명', value: 'USER_NAME' },
  { label: '닉네임', value: 'NICKNAME' },
  { label: '연락처', value: 'PHONE_NUMBER' },
];

const MEMBER_LEVEL_RADIO_OPTS: {
  label: string;
  value: AdminMemberLevelType;
}[] = [
  { label: '전체', value: 'ALL' },
  { label: '유저', value: 'USER' },
  { label: '작가', value: 'AUTHOR' },
  { label: '관리자', value: 'ADMIN' },
  { label: '마스터', value: 'MASTER' },
];

const MEMBER_STATUS_RADIO_OPTS: {
  label: string;
  value: AdminMemberStatusType;
}[] = [
  { label: '전체', value: 'ALL' },
  { label: '활성화', value: 'JOINED' },
  { label: '비활성화', value: 'SUSPENDED' },
  { label: '탈퇴', value: 'LEFT' },
];

const AdminMemberFilter = () => {
  const { control, reset } = useFormContext<AdminMemberFilterSchemaType>();

  const resetForm = () => {
    reset(initAdminMemberFormState);
  };

  return (
    <FilterBox className="mt-[20px]">
      <FilterBoxContent className="flex flex-col">
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">검색 조건</span>
          <SelectFormField
            name="keywordType"
            control={control}
            options={MEMBER_SELECT_OPTS}
          />
          <InputFormField
            name="keyword"
            control={control}
            placeholder="검색할 내용을 입력하세요"
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">가입일</span>
          <DateRangeFormField
            name="createDateRange"
            control={control}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">회원 구분</span>
          <RadioGroupFormField
            name="userLevel"
            control={control}
            options={MEMBER_LEVEL_RADIO_OPTS}
          />
        </FilterBoxRow>
        <FilterBoxRow className="w-full">
          <span className="w-[150px]">회원 상태</span>
          <RadioGroupFormField
            name="userStatus"
            control={control}
            options={MEMBER_STATUS_RADIO_OPTS}
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

export default AdminMemberFilter;
