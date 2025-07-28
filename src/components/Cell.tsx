type CellProps = {
  isWall: boolean;
  onClick: () => void;
};

export default function Cell({ isWall, onClick }: CellProps) {
  return (
    <div
      className={`w-6 h-6 border border-gray-300 ${isWall ? 'bg-black' :  'bg-while'}`}
      onClick={onClick}
    />
  );
}
