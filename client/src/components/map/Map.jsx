import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
} from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import OverlayModal from "./OverlayModal";
import { setMapCenter } from "../../store/slice/mapSlice";
import useSelectedPlace from "../../hooks/useSelectedPlace";
import PolyLine from "./PolyLine";

const Map = ({ menuView }) => {
  let linePath = [];

  const dispatch = useDispatch();
  const schedules = useSelector((state) => state.schedule.schedules);
  const searchResult = useSelector((state) => state.place.searchResult);

  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const modalOpen = useSelector((state) => state.modal.modalOpen);
  const mapCenter = useSelector((state) => state.map.mapCenter);
  const mapLevel = useSelector((state) => state.map.mapLevel);
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const isEdit = useSelector((state) => state.editedSchedule.isEdit);
  const editedSchedules = useSelector(
    (state) => state.editedSchedule.editedSchedules
  );
  const handleClickPlace = useSelectedPlace();

  return (
    <StyledMap
      center={mapCenter}
      isPanto={true}
      level={mapLevel}
      menuView={menuView}
      onCenterChanged={(map) =>
        dispatch(
          setMapCenter({
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          })
        )
      }
    >
      {searchResult.map((marker) => (
        <>
          <MapMarker
            key={`marker-${marker.title}-${marker.mapy},${marker.mapx}`}
            position={{
              lat: marker.mapy,
              lng: marker.mapx,
            }}
            image={{
              src: "/markers/marker.svg",
              size: {
                width: 35,
                height: 35,
              },
            }}
            clickable={true}
            onClick={() => handleClickPlace(marker)}
          />
        </>
      ))}
      {isEdit
        ? editedSchedules[selectedDay]?.map((marker, idx) => (
            <MapMarker
              key={`marker-${marker.title}-${marker.mapy},${marker.mapx}`}
              position={{
                lat: marker.mapy,
                lng: marker.mapx,
              }}
              image={{
                src: `/markers/marker_${idx + 1}.svg`,
                size: {
                  width: 40,
                  height: 50,
                },
              }}
              zIndex={999}
              onClick={() => {
                handleClickPlace(marker);
              }}
            />
          ))
        : schedules[selectedDay]?.map((marker, idx) => (
            <MapMarker
              key={`marker-${marker.title}-${marker.mapy},${marker.mapx}`}
              position={{
                lat: marker.mapy,
                lng: marker.mapx,
              }}
              image={{
                src: `/markers/marker_${idx + 1}.svg`,
                size: {
                  width: 40,
                  height: 50,
                },
              }}
              zIndex={999}
              onClick={() => {
                handleClickPlace(marker);
              }}
            />
          ))}

      {modalOpen && (
        <CustomOverlayMap
          position={{ lat: selectedPlace.mapy, lng: selectedPlace.mapx }}
          yAnchor={1}
          zIndex={999}
        >
          <OverlayModal markerInfo={selectedPlace} />
        </CustomOverlayMap>
      )}

      {!isEdit
        ? schedules[selectedDay]?.map((schedule, idx) => {
            // schedule 객체에서 lat와 lng를 추출하여 linePath 배열에 추가
            linePath.push({
              lat: schedule.mapy,
              lng: schedule.mapx,
            });
            return <PolyLine key={idx} linePath={linePath} />;
          })
        : editedSchedules[selectedDay]?.map((schedule, idx) => {
            // schedule 객체에서 lat와 lng를 추출하여 linePath 배열에 추가
            linePath.push({
              lat: schedule.mapy,
              lng: schedule.mapx,
            });
            return <PolyLine key={idx} linePath={linePath} />;
          })}
    </StyledMap>
  );
};
export default Map;

const StyledMap = styled(KakaoMap)`
  /* width: 100%;
  height: 100%; */
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  transition: left 0.5s;
  ${({ menuView }) =>
    menuView &&
    css`
      left: 100px;
    `}
`;
