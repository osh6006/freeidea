import { cn, formatCurrency } from '@/lib/utils';

interface ITotalNumberProps {
  number: number;
  className?: string;
  unit?: string;
}

const TotalNumber = ({ number, className, unit = '건' }: ITotalNumberProps) => {
  return (
    <div className={cn('flex', className)}>
      <span className="text-[16px] font-[400]">
        전체
        <span className="font-[700]">
          <span className="mx-[4px]">{formatCurrency(number)}</span>
        </span>
        {unit}
      </span>
    </div>
  );
};

export default TotalNumber;
