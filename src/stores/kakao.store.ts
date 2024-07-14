import { create } from 'zustand';

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

interface KakaoStore {
  places: PlaceInfo[] | null;
  place: PlaceInfo | null;
  setPlaces: (places: PlaceInfo[]) => void;
  setPlace: (place: PlaceInfo | null) => void;
}

const useKakaoStore = create<KakaoStore>((set) => ({
  places: null,
  place: null,
  setPlaces: (places: PlaceInfo[]) => set((state) => ({ places })),
  setPlace: (place: PlaceInfo | null) => set((state) => ({ place }))
}));

export default useKakaoStore;
