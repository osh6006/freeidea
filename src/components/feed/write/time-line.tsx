import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const FeedTimeLine = ({
  currentStep,
  maxStep,
}: {
  currentStep: number;
  maxStep: number;
}) => {
  return (
    <span className="h-full w-full relative max-w-[300px] ">
      <div className="flex items-center justify-center w-full gap-x-2">
        {Array.from({ length: 3 }, (_, i) => i + 1).map((step) => {
          const isLast = step == maxStep;

          return (
            <div
              key={step}
              className="flex items-center gap-x-2"
            >
              <div
                className={cn(
                  `w-6 h-6 rounded-full relative flex items-center justify-center 
            typo-body-14-regular-150-tight transition-colors duration-300`,
                  currentStep >= step
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-800'
                )}
                role="presentation"
              >
                {step}
              </div>
              {!isLast ? (
                <Separator
                  className={cn(
                    'w-[6px] bg-slate-300',
                    currentStep > step
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-800'
                  )}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </span>
  );
};

export default FeedTimeLine;
