import { useEffect, useState } from "react";
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
import { setMapCenter } from "@/store/slice/mapSlice";
import { useParams } from "react-router-dom";
import { setInitSchedule } from "../store/slice/scheduleSlice";
import { getDayDiff } from "../utils/getDayDiff";

const PlanMapPage = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const destination = useSelector((state) => state.schedule.destination);
  const startDate = useSelector((state) => state.schedule.startDate);
  const endDate = useSelector((state) => state.schedule.endDate);

  const [initialModal, setInitialModal] = useState(false);
  const [menuView, setMenuView] = useState(false);
  const dayDiff = getDayDiff(startDate, endDate);

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
      dispatch(setInitSchedule({ dayDiff }));
      return;
    }
  };

  useEffect(() => {
    setInitialModal(true);
  }, []);

  return (
    <PlanMapContainer>
      {!id && initialModal && (
        <Modal>
          <RegionLists>
            <h2 className="title">🗓️ 여행 날짜를 선택해 주세요.</h2>
            <TripDatePicker />
            <h2 className="title">🚐 여행 지역을 선택해 주세요.</h2>
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
      <PlaceSearchTool />
      <Map $menuView={menuView} />
      <ZoomBtn />
    </PlanMapContainer>
  );
};

export default PlanMapPage;

const PlanMapContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const RegionLists = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */

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
  }
  @media (max-width: 768px) {
    & > ul {
      width: 100%;
      height: 250px;
    }
  }
`;
