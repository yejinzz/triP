import { useState } from "react";
import ZoomBtn from "@/components/map/MapZoomBtn";
import Map from "@/components/map/Map";
import styled from "styled-components";
import PlannerWindow from "@/components/plan/PlannerWindow";
import Modal from "@/components/common/modal/Modal";
import Button from "@/components/atom/button/Button";
import { useDispatch, useSelector } from "react-redux";
import RegionCard from "@/components/common/RegionCard";
import { REGIONS_INFO } from "@/datas/regions";
import TripDatePicker from "@/components/plan/date/TripDatePicker";
import PlaceSearchTool from "@/components/plan/place/PlaceSearchTool";
import { setMapCenter } from "../store/slice/mapSlice";

const PlanMapPage = () => {
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.place.destination);
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);

  const [initialModal, setInitialModal] = useState(true);
  const [menuView, setMenuView] = useState(false);
  const [result, setResult] = useState([]);

  const handleCreateSchedule = () => {
    if (!(startDate && endDate)) {
      return alert("날짜를 선택해주세요.");
    } else if (
      Object.entries(destination).length === 0 &&
      destination.constructor === Object
    ) {
      return alert("지역을 선택해주세요.");
    }

    if (startDate && endDate && destination) {
      dispatch(
        setMapCenter({
          lat: destination.coords.lat,
          lng: destination.coords.lng,
        })
      );
      setInitialModal(false);
      setMenuView(true);
      return;
    }
  };

  // const handleInfoWindow = async (place) => {
  //   setSelectedPlace(place);
  //   setMapCenter((prev) => ({
  //     ...prev,
  //     center: {
  //       lat: place.mapy,
  //       lng: place.mapx,
  //     },
  //     // isLoading: false,
  //   }));
  //   dispatch(setOpenModal());
  // };

  return (
    <PlanMapContainer>
      {initialModal && (
        <Modal>
          <RegionLists>
            <h1 className="title">🗓️ 여행 날짜를 선택해 주세요.</h1>
            <TripDatePicker />
            <h1 className="title">🚐 여행 지역을 선택해 주세요.</h1>
            <ul>
              {REGIONS_INFO.map((region) => {
                return (
                  <li key={region.id}>
                    <RegionCard regionInfo={region} />
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
        setResult={setResult}
        // setMapCenter={setMapCenter}
        // handleInfoWindow={handleInfoWindow}
      />
      <Map menuView={menuView} result={result} />
      <ZoomBtn
      // mapLevel={mapLevel} setMapLevel={setMapLevel}
      />
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
