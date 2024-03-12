import { useEffect, useState } from "react";
import ZoomBtn from "@/components/map/MapZoomBtn";
import Map from "@/components/map/Map";
import styled from "styled-components";
import PlannerWindow from "@/components/plan/PlannerWindow";
import Modal from "@/components/common/modal/Modal";
import Button from "@/components/atom/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal, setCloseModal } from "@/store/slice/modalSlice";
import RegionCard from "@/components/common/RegionCard";
import { REGIONS_INFO } from "@/datas/regions";
import TripDatePicker from "@/components/plan/date/TripDatePicker";
import PlaceSearchTool from "@/components/plan/place/PlaceSearchTool";
import { setDestination } from "@/store/slice/placeSlice";

const PlanMapPage = () => {
  const dispatch = useDispatch();

  const modalOpen = useSelector((state) => state.modal.isOpen);
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);

  const [menuView, setMenuView] = useState(true);
  const [mapLevel, setMapLevel] = useState(8);
  const [result, setResult] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState({});
  const [mapCenter, setMapCenter] = useState({
    center: {
      lat: 37.5666612,
      lng: 126.9783785,
    },
    errMsg: null,
    isLoading: true,
    // isPanto: false,
  });

  const handleRegionClick = (region) => {
    setSelectedRegion((prev) => ({
      ...prev,
      coords: { lat: region.coords.lat, lng: region.coords.lng },
      regionCode: region.code,
      regionName: region.name,
      regionImg: region.imgUrl,
    }));
  };

  const handleCreateSchedule = () => {
    if (!(startDate && endDate)) {
      return alert("날짜를 선택해주세요.");
    } else if (
      Object.entries(selectedRegion).length === 0 &&
      selectedRegion.constructor === Object
    ) {
      return alert("지역을 선택해주세요.");
    }

    if (startDate && endDate && selectedRegion) {
      dispatch(setDestination(selectedRegion));
      setMapCenter((prev) => ({
        ...prev,
        center: {
          lat: selectedRegion.coords.lat,
          lng: selectedRegion.coords.lng,
        },
        isLoading: false,
      }));
      return dispatch(setCloseModal());
    }
  };

  useEffect(() => {
    dispatch(setOpenModal());
  }, []);

  return (
    <PlanMapContainer>
      {modalOpen && (
        <Modal>
          <RegionLists>
            <h1 className="title">🗓️ 여행 날짜를 선택해 주세요.</h1>
            <TripDatePicker />
            <h1 className="title">🚐 여행 지역을 선택해 주세요.</h1>
            <ul>
              {REGIONS_INFO.map((region) => {
                const isSelected = selectedRegion.regionCode === region.code;
                return (
                  <li key={region.id}>
                    <RegionCard
                      isSelected={isSelected}
                      regionInfo={region}
                      onClick={() => handleRegionClick(region)}
                    />
                  </li>
                );
              })}
            </ul>

            <Button onClick={() => handleCreateSchedule()}>일정만들기</Button>
          </RegionLists>
        </Modal>
      )}
      <PlannerWindow menuView={menuView} setMenuView={setMenuView} />
      <PlaceSearchTool
        result={result}
        setMapCenter={setMapCenter}
        setMapLevel={setMapLevel}
        setResult={setResult}
      />
      <Map
        menuView={menuView}
        mapLevel={mapLevel}
        mapCenter={mapCenter}
        setMapCenter={setMapCenter}
        result={result}
      />
      <ZoomBtn mapLevel={mapLevel} setMapLevel={setMapLevel} />
    </PlanMapContainer>
  );
};

export default PlanMapPage;

const PlanMapContainer = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 80px);
  overflow: hidden;
`;
const RegionLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  .title {
    font-size: 1.2rem;
  }
  & > ul {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    width: 750px;
    height: 350px;
    overflow-y: scroll;
    /* padding-bottom: 1rem; */
    /* margin: 1.5rem 0; */
  }
`;
