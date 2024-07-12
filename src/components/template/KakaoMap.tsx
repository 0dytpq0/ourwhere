import React from 'react';

interface Props {
  order: number;
}

const MarkerWithOrder: React.FC<Props> = ({ order }) => {
  return (
    <div className="flex items-center justify-center w-16 h-16 text-black bg-white border-[10px] border-[#8085F2] rounded-full text-3xl font-bold drop-shadow-xl">
      {order}
    </div>
  );
};

export default MarkerWithOrder;
