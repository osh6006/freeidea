import PngIcon from './common/png-icon';

export function RankingGlod({ className }: { className?: string }) {
  return (
    <PngIcon
      className={className}
      src="/icons/ranking-gold.png"
    />
  );
}

export function RankingSilver({ className }: { className?: string }) {
  return (
    <PngIcon
      className={className}
      src="/icons/ranking-silver.png"
    />
  );
}

export function RankingBronze({ className }: { className?: string }) {
  return (
    <PngIcon
      className={className}
      src="/icons/ranking-bronze.png"
    />
  );
}
