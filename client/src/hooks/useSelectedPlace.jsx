import { useDispatch } from "react-redux";
import { setSelectedPlace } from "../store/slice/placeSlice";
import { setMapCenter } from "../store/slice/mapSlice";
import { setOpenModal } from "../store/slice/modalSlice";

const useSelectedPlace = () => {
  const dispatch = useDispatch();

  const handleSelectedPlace = (place) => {
    dispatch(setSelectedPlace(place));
    dispatch(
      setMapCenter({
        lat: place.mapy,
        lng: place.mapx,
      })
    );
    dispatch(setOpenModal());
  };

  return handleSelectedPlace;
};

export default useSelectedPlace;
