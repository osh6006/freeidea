import { getTextFromHtml } from '@/lib/utils';
import { TCategory } from '@/types/common';
import { z } from 'zod';

export const requestSchema = z
  .object({
    category: z.string().refine(
      (data): data is TCategory | string => {
        const validCategories: TCategory[] = [
          'ILLUSTRATION',
          'VIRTUAL',
          'WEBTOON',
          'WRITING',
          'DESIGN',
        ];
        return validCategories.includes(data as TCategory);
      },
      { message: '카테고리를 선택해 주세요.' }
    ),
    budget: z.string().optional(),
    isDiscussionPossible: z.boolean().optional(),
    dueDate: z.date().optional(),
    useRange: z.string({
      required_error: '사용 범위를 선택해 주세요.',
    }),
    usePurpose: z
      .string({
        required_error: '사용 목적을 입력해 주세요',
      })
      .min(2, {
        message: '2글자 이상의 사용목적을 입력해주세요.',
      })
      .max(10, {
        message: '10자 이하의 사용목적을 입력해주세요.',
      }),

    title: z
      .string({
        required_error: '제목을 입력해 주세요.',
      })
      .min(5, {
        message: '5자 이상의 제목을 입력해 주세요.',
      })
      .max(45, {
        message: '45자 이하의 제목을 입력해주세요.',
      }),

    contents: z
      .string()
      .refine(
        (contents) => {
          return getTextFromHtml(contents).length >= 10;
        },
        { message: '10자 이상의 내용을 입력해주세요.' }
      )
      .refine(
        (contents) => {
          return getTextFromHtml(contents).length < 3000;
        },
        { message: '3000자 이하의 내용을 입력해주세요.' }
      ),
  })
  .refine(
    (data) => {
      const money = data.budget;
      const isDiscussion = data.isDiscussionPossible;

      if (isDiscussion) return true;
      if (!isDiscussion && money === undefined) {
        return false;
      }
      if (money === '') return false;

      return true;
    },
    {
      message: '금액협의가 체크되지 않은 경우 예산을 입력해야 합니다.',
      path: ['budget'],
      params: ['budget'],
    }
  )
  .refine(
    (data) => {
      const money = data.budget;
      const isDiscussion = data.isDiscussionPossible;

      if (isDiscussion) return true;
      if (!money) return false;
      if (!/^[0-9]+$/.test(money.replace(/,/g, ''))) {
        return false;
      }

      return true;
    },
    {
      message: '예산은 숫자만 입력이 가능합니다.',
      path: ['budget'],
      params: ['budget'],
    }
  )
  .refine(
    (data) => {
      const money = data.budget;
      const isDiscussion = data.isDiscussionPossible;

      if (isDiscussion) return true;
      if (!money) return false;
      const number = Number(money.replace(/,/g, ''));

      if (number >= 1000 && number < 100000000) {
        return true;
      }

      return false;
    },
    {
      message: '예산은 1천원 이상 1억원 이하로만 입력이 가능합니다.',
      path: ['budget'],
      params: ['budget'],
    }
  )
  .refine(
    (data) => {
      const dueDate = data.dueDate;
      return dueDate !== undefined;
    },
    {
      message: '마감 기한을 선택해 주세요.',
      path: ['dueDate'],
      params: ['dueDate'],
    }
  );
