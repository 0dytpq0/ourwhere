import useKakaoStore from '@/stores/kakao.store';
interface PlaceInfo {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

function PlaceList({ places }: { places: PlaceInfo[] }) {
  const { setPlace, place } = useKakaoStore((state) => state);

  return (
    <div>
      <select
        onChange={(e) => {
          const selectedPlace = places.filter((place) => place.place_name === e.target.value);
          setPlace(selectedPlace[0]);
        }}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-2 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {places.map((place: any, idx: number) => (
          <option key={idx} className="flex flex-col">
            {place.place_name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PlaceList;
