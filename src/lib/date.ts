import { MINUTE } from '@/constants/time';
import {
  addHours,
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  format,
  formatDistanceToNow,
  isBefore,
  isSameYear,
} from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * @description
 * - 1분 미만: "방금 전"
 * - 1시간 미만: "몇 분 전"
 * - 1일 미만: "몇 시간 전"
 * - 1일 이후, 같은 연도: "m월 d일"
 * - 년도가 바뀐 이후: "yyyy년 m월 d일"
 */
export function formatRelativeDate(date: Date) {
  const minutesDiff = differenceInMinutes(getKstNow(), date);

  if (minutesDiff < 1) {
    return `방금 전`;
  }

  const now = getKstNow();

  const hoursDiff = differenceInHours(now, date);
  if (hoursDiff < 24) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ko,
    });
  }

  const daysDiff = differenceInDays(now, date);
  if (daysDiff >= 1 && isSameYear(now, date)) {
    return format(date, 'M월 d일');
  }

  return format(date, 'yyyy년 M월 d일');
}

export function formatCreatedTimeDate(createdDate: Date): string {
  const minutesDiff = differenceInMinutes(getKstNow(), createdDate);

  if (minutesDiff < 1) {
    return `방금 전`;
  }

  if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  }

  return formatDistanceToNow(createdDate, {
    addSuffix: true,
    locale: ko,
  });
}

export function formatDeadlineTimeDate(
  deadlineDate: Date,
  isFinished: boolean
): string {
  const now = getKstNow();

  if (isBefore(deadlineDate, now) || isFinished === true) {
    return '모집 마감';
  }

  const hoursDifference = differenceInHours(deadlineDate, now);
  const minutesDifference = differenceInMinutes(deadlineDate, now);

  if (hoursDifference < 1) {
    return minutesDifference < 60
      ? '곧 마감'
      : `마감 ${Math.abs(hoursDifference)}시간 전`;
  }
  if (hoursDifference < 24) {
    return `마감 ${hoursDifference}시간 전`;
  }

  const daysDifference = Math.floor(hoursDifference / 24);
  return `마감 ${daysDifference}일 전`;
}

export function getKstNow() {
  const date = new Date();
  const utcDate = new Date().getTime() + date.getTimezoneOffset() * MINUTE;
  return addHours(utcDate, 9);
}
