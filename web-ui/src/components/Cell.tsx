import { CellType } from '@/types/cellTypes';

type CellProps = {
  type: CellType;
  onClick: () => void;
};

export default function Cell({ type, onClick }: CellProps) {
  const bg: Record<CellType, string> = {
    free: 'bg-white',
    wall: 'bg-black',
    start: 'bg-green-500',
    goal: 'bg-red-500',
  };

  return (
    <div
      className={`w-6 h-6 border border-gray-300 ${bg[type]} cursor-pointer`}
      onClick={onClick}
    />
  );
}
