import { MouseEventHandler } from 'react';

import { cn, formatCurrency } from '@/lib/utils';
import { XCircle } from '@untitled-ui/icons-react';

import CountButtonGroup from './count-button-group';

const ProductDeatilAddedItem = ({
  onMinusClick,
  onPlusClick,
  onRemoveClick,
  onCountChange,
  count,
  name,
  price,
  nameStyle,
}: {
  onMinusClick?: MouseEventHandler<HTMLButtonElement>;
  onPlusClick?: MouseEventHandler<HTMLButtonElement>;
  onRemoveClick?: MouseEventHandler<HTMLButtonElement>;
  onCountChange?: (count: number) => void;
  count: number;
  name: string;
  price: number;
  nameStyle?: string;
}) => {
  return (
    <div className="pt-[18px] pb-[20px]">
      <div className="flex w-full justify-between items-center ">
        <span className={cn('typo-body-14-medium-100-tight', nameStyle)}>
          {name}
        </span>
        <button
          type="button"
          onClick={onRemoveClick}
        >
          <XCircle className="size-4 text-slate-300" />
        </button>
      </div>
      <div className="flex justify-between items-end mt-[12px]">
        <CountButtonGroup
          count={count}
          onMinusClick={onMinusClick}
          onPlusClick={onPlusClick}
          onCountChange={onCountChange}
        />

        <span className="typo-body-14-bold-100-tight text-slate-800">{`${formatCurrency(price)}원`}</span>
      </div>
    </div>
  );
};

export default ProductDeatilAddedItem;
