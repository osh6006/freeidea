import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

export const membershipVariants = cva('border', {
  variants: {
    variant: {
      free: 'border-slate-200 text-slate-500 bg-slate-50',
      lite: [
        'border-neonGreen-600 bg-neonGreen-tint-5 text-neonGreen-600',
        'hover:border-neonGreen-600 hover:bg-neonGreen-tint-5 hover:text-neonGreen-600',
      ],
      plus: [
        'border-neonPurple-600 bg-neonPurple-tint-5 text-neonPurple-600',
        'hover:border-neonPurple-600 hover:bg-neonPurple-tint-5 hover:text-neonPurple-600',
      ],
      vip: [
        'border-mustard-600 bg-mustard-tint-5 text-mustard-600',
        'hover:border-mustard-600 hover:bg-mustard-tint-5 hover:text-mustard-600',
      ],
    },
    mode: {
      default: '',
      hover: '',
    },

    defaultVariants: {
      mode: 'default',
    },
  },

  compoundVariants: [
    {
      mode: 'hover',
      className:
        'pc-screen:border-inherit pc-screen:bg-inherit pc-screen:text-inherit',
    },
  ],
});

function Membership({
  children,
  className,
  variant,
  mode = 'default',
  ...props
}: {
  children: React.ReactNode;
  variant: 'free' | 'lite' | 'plus' | 'vip';
  mode?: 'default' | 'hover';
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(membershipVariants({ variant, mode }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default Membership;
