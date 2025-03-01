'use client';

import { useRouter } from 'next/navigation';

import SortOrder from '@/components/common/sort-order';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CHALLENGE_SORTS } from '@/constants/common';
import useQueryString from '@/hooks/use-query-string';
import { useGetChallengeList } from '@/service/lounge/use-service';

export default function ChallengeFilter() {
  const { searchParams } = useQueryString();
  const { replace } = useRouter();
  const { data: challengeList } = useGetChallengeList();

  const latestCohort = challengeList?.at(-1)?.challengeNumber;

  const cohort = searchParams.get('cohort') ?? String(latestCohort);

  const isLatestCohort = String(latestCohort) === cohort;

  return (
    <div className="flex justify-between">
      <Select
        defaultValue={cohort}
        value={cohort}
        onValueChange={(value) => {
          if (isLatestCohort) {
            replace(`?cohort=${value}&sort=RANKING`, { scroll: false });
          } else {
            replace(`?cohort=${value}`, { scroll: false });
          }
        }}
      >
        <SelectTrigger className="w-fit mb-[20px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {challengeList?.map(({ challengeNumber }) => (
            <SelectItem
              key={challengeNumber}
              value={String(challengeNumber)}
            >
              {challengeNumber}기 도전작
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isLatestCohort && <SortOrder sortList={CHALLENGE_SORTS} />}
    </div>
  );
}
