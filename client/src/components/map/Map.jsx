import {
  CustomOverlayMap,
  Map as KakaoMap,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import OverlayModal from "./OverlayModal";
import { setMapCenter } from "../../store/slice/mapSlice";
import useSelectedPlace from "../../hooks/useSelectedPlace";

const Map = ({ menuView, result }) => {
  const dispatch = useDispatch();
  const selectedDay = useSelector((state) => state.schedule.selectedDay);
  const modalOpen = useSelector((state) => state.modal.isOpen);
  const mapCenter = useSelector((state) => state.map.mapCenter);
  const mapLevel = useSelector((state) => state.map.mapLevel);
  const selectedPlace = useSelector((state) => state.place.selectedPlace);
  const handleClickPlace = useSelectedPlace();
  // const handleClickPlace = (marker) => {
  //   // 선택된 장소 정보를 업데이트합니다.
  //   useSelectedPlace(marker);
  // };
  // const { kakao } = window;
  // const [search, setSearch] = useState([]);

  // const searchPlaces = (keyword) => {
  //   // 현재 위치가 없을 경우 함수 종료
  //   // if (!state.center) return;
  //   // places 서비스 객체 생성
  //   const places = new kakao.maps.services.Places();
  //   // 검색 옵션 설정
  //   const options = {
  //     location: new kakao.maps.LatLng(
  //       mapCenter.center.lat,
  //       mapCenter.center.lng
  //     ),
  //     radius: 5000,
  //     sort: kakao.maps.services.SortBy.DISTANCE,
  //   };

  //   // Places 서비스의 keywordSearch 메소드 호출
  //   places.keywordSearch(
  //     keyword,
  //     (data, status, _pagination) => {
  //       if (status === kakao.maps.services.Status.OK) {
  //         setSearch(data); // 검색 결과를 search 상태에 저장
  //       } else {
  //         console.error("검색에 실패하였습니다.");
  //       }
  //     },
  //     options // 검색 옵션 전달
  //   );
  // };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     // GeoLocation을 이용해서 접속 위치 업데이트
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setMapCenter((prev) => ({
  //           ...prev,
  //           center: {
  //             lat: position.coords.latitude, // 위도
  //             lng: position.coords.longitude, // 경도
  //           },
  //           isLoading: false,
  //         }));
  //         setMapLevel(4);
  //       },
  //       (err) => {
  //         setMapCenter((prev) => ({
  //           ...prev,
  //           errMsg: err.message,
  //           isLoading: false,
  //         }));
  //       }
  //     );
  //   } else {
  //     // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
  //     setMapCenter((prev) => ({
  //       ...prev,
  //       errMsg: "geolocation을 사용할수 없어요..",
  //       isLoading: false,
  //     }));
  //   }
  // }, []);
  // console.log(mapCenter.errMsg);
  let linePath = [];
  const schedules = useSelector((state) => state.schedule.schedules);
  console.log(schedules);
  // console.log(isOpen);

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
      {Object.keys(schedules).length === 0 &&
        schedules.constructor === Object &&
        result.map((marker) => (
          <>
            <MapMarker
              key={`marker-${marker.title}-${marker.mapy},${marker.mapx}`}
              position={{
                lat: marker.mapy,
                lng: marker.mapx,
              }}
              clickable={true}
              onClick={() => handleClickPlace(marker)}
            />
          </>
        ))}

      {schedules[selectedDay]?.map((marker) => (
        <MapMarker
          key={`marker-${marker.title}-${marker.mapy},${marker.mapx}`}
          position={{
            lat: marker.mapy,
            lng: marker.mapx,
          }}
          onClick={() => {
            handleClickPlace(marker);
          }}
        />
      ))}

      {modalOpen && (
        <CustomOverlayMap
          position={{ lat: selectedPlace.mapy, lng: selectedPlace.mapx }}
          yAnchor={1}
        >
          <OverlayModal markerInfo={selectedPlace} />
        </CustomOverlayMap>
      )}
      {schedules[selectedDay]?.map((schedule, dayNumber) => {
        console.log(schedule.mapy);
        console.log(linePath);
        // let linePath = [];

        // schedule 객체에서 lat와 lng를 추출하여 linePath 배열에 추가
        linePath.push({
          lat: schedule.mapy,
          lng: schedule.mapx,
        });
        return (
          <Polyline
            key={dayNumber}
            path={linePath}
            strokeOpacity={1}
            strokeWeight={14 - mapLevel}
            strokeStyle={"solid"}
            strokeColor={"#db4040"}
          />
        );
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
  ${({ menuView }) =>
    menuView &&
    css`
      left: 225px;
    `}
`;
