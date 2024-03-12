// import { useState } from "react";
import { Map as KakaoMap, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useSelector } from "react-redux";
import styled, { css } from "styled-components";

const Map = ({ menuView, mapLevel, mapCenter, setMapCenter, result }) => {
  const selectedDay = useSelector((state) => state.schedule.selectedDay);

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
  return (
    <StyledMap
      center={mapCenter.center}
      isPanto={true}
      level={mapLevel}
      menuView={menuView}
      onCenterChanged={(map) =>
        setMapCenter((prev) => ({
          ...prev,
          center: {
            lat: map.getCenter().getLat(),
            lng: map.getCenter().getLng(),
          },
          // isLoading: false,
        }))
      }
    >
      {result.map((marker) => (
        <MapMarker
          key={`marker-${marker.placeInfo.name}-${marker.placeInfo.coords.lat},${marker.placeInfo.coords.lng}`}
          position={{
            lat: marker.placeInfo.coords.lat,
            lng: marker.placeInfo.coords.lng,
          }}
          // onClick={() => setInfo(marker)}
        />
      ))}
      {schedules[selectedDay]?.map((marker) => (
        <MapMarker
          key={`marker-${marker.placeInfo.name}-${marker.placeInfo.coords.lat},${marker.placeInfo.coords.lng}`}
          position={{
            lat: marker.placeInfo.coords.lat,
            lng: marker.placeInfo.coords.lng,
          }}
          // onClick={() => setInfo(marker)}
        />
      ))}
      {schedules[selectedDay]?.map((schedule, dayNumber) => {
        console.log(schedule.placeInfo.coords.lat);
        console.log(linePath);
        // let linePath = [];

        // schedule 객체에서 lat와 lng를 추출하여 linePath 배열에 추가
        linePath.push({
          lat: schedule.placeInfo.coords.lat,
          lng: schedule.placeInfo.coords.lng,
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
