import Image from 'next/image';

interface PlaceSearchProps {
  label: string;
  type: string;
  placeholder?: string;
}

export const PlaceSearch: React.FC<PlaceSearchProps> = ({ label, type, placeholder }) => (
  <div>
    <div>{label}</div>
    <div>
      <input type={type} placeholder={placeholder} className="border-2 rounded-md border-gray-500 p-1 w-full" />
      {/* <Image src="https://ifh.cc/g/w9zqZj.png" alt="이미지" width={20} height={20} /> */}
    </div>
  </div>
);
