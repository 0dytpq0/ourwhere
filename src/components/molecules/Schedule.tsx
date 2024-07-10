import React from 'react';

function Schedule() {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-white">1</div>
          <div className="ml-2 text-purple-500">11:30</div>
        </div>
        <div>
          <div className="text-xl font-bold text-gray-800">케이크 밀쿠</div>
          <div className="mt-1 text-sm text-gray-500">서울 마포구 연희로1길 7 1층</div>
        </div>
      </div>
      <div className="mt-4 p-4 bg-purple-100 rounded-lg">
        <div className="text-sm">
          <span role="img" aria-label="pencil">
            ✍️
          </span>{' '}
          레터링 케이크 픽업
        </div>
        <div className="text-sm">~~~ 이름으로 주문함</div>
      </div>
    </div>
  );
}

export default Schedule;
