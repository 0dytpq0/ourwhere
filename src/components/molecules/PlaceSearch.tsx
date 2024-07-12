import Input from '../atoms/js-Input/Input';

interface PlaceSearchProps {
  label?: string;
  type?: string;
  placeholder?: string;
}

export const PlaceSearch = ({ label, type, placeholder }: PlaceSearchProps) => {
  const ps = new kakao.maps.services.Places();

  const response = ps.keywordSearch('이태원 맛집', () => {
    console.log('aa');
  });
  console.log('response', response);

  return (
    <div className="flex">
      <Input label={label} />
      <button
        onClick={() => {
          const response = ps.keywordSearch('이태원 맛집', () => {
            console.log('aa');
          });
          console.log('response', response);
        }}
        className="w-10"
      >
        검색
      </button>
    </div>
  );
};
