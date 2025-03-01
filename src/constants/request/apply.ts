import { requestDateRangeDict, requestPriceRangeDict } from '../dictionary';

export const APPLY_PRICE_ARR = [
  {
    label: requestPriceRangeDict.data.FiveThousandToTenThousand.ko,
    value: requestPriceRangeDict.data.FiveThousandToTenThousand.en,
  },
  {
    label: requestPriceRangeDict.data.TenThousandToThirtyThousand.ko,
    value: requestPriceRangeDict.data.TenThousandToThirtyThousand.en,
  },
  {
    label: requestPriceRangeDict.data.ThirtyThousandToFiftyThousand.ko,
    value: requestPriceRangeDict.data.ThirtyThousandToFiftyThousand.en,
  },
  {
    label: requestPriceRangeDict.data.FiftyThousandToHundredThousand.ko,
    value: requestPriceRangeDict.data.FiftyThousandToHundredThousand.en,
  },
  {
    label: requestPriceRangeDict.data.MoreThanHundredThousand.ko,
    value: requestPriceRangeDict.data.MoreThanHundredThousand.en,
  },
];

export const APPLY_DATE_ARR = [
  {
    label: requestDateRangeDict.data.WITHIN_7_DAYS.ko,
    value: requestDateRangeDict.data.WITHIN_7_DAYS.en,
  },
  {
    label: requestDateRangeDict.data.WITHIN_2_WEEKS.ko,
    value: requestDateRangeDict.data.WITHIN_2_WEEKS.en,
  },
  {
    label: requestDateRangeDict.data.WITHIN_3_WEEKS.ko,
    value: requestDateRangeDict.data.WITHIN_3_WEEKS.en,
  },
  {
    label: requestDateRangeDict.data.WITHIN_1_MONTH.ko,
    value: requestDateRangeDict.data.WITHIN_1_MONTH.en,
  },
  {
    label: requestDateRangeDict.data.MORE_THAN_1_MONTH.ko,
    value: requestDateRangeDict.data.MORE_THAN_1_MONTH.en,
  },
];
