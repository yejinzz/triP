import { useState } from "react";
import { MAP_CATEGORIES } from "@/constants/categories";
import Button from "@/components/atom/button/Button";
import styled from "styled-components";
import instance from "../../../api/instanse";
import { useSelector } from "react-redux";

const MapCartegoryBtn = ({ setResult, setLoading, setIsSearchModalOpen }) => {
  const [isSelected, setIsSelected] = useState(1);

  const destination = useSelector((state) => state.place.destination);
  const searchPlaces = (placeType) => {
    setLoading(true);
    instance
      .get(
        `/api/places?regionCode=${destination.regionCode}&placeType=${placeType}`
      )
      .then((res) => {
        console.log(res);
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    // }
    // const coords = { lat: location.y, lng: location.x };
    // const { kakao } = window;
    // // 현재 위치가 없을 경우 함수 종료
    // // if (!state.center) return;
    // // places 서비스 객체 생성
    // const places = new kakao.maps.services.Places();

    // // 검색 옵션 설정
    // const options = {
    //   location: new kakao.maps.LatLng(
    //     mapCenter.center.lat,
    //     mapCenter.center.lng
    //   ),
    //   radius: 20000,
    //   // sort: kakao.maps.services.SortBy.DISTANCE,
    //   size: 15, // 한 페이지에 표시할 개수
    // };

    // // Places 서비스의 keywordSearch 메소드 호출
    // places.categorySearch(
    //   code,
    //   (data, status, _pagination) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //       const bounds = new kakao.maps.LatLngBounds();
    //       let placeInfos = [];
    //       console.log(data);
    //       for (var i = 0; i < data.length; i++) {
    //         // @ts-ignore
    //         placeInfos.push({
    //           position: {
    //             lat: data[i].y,
    //             lng: data[i].x,
    //           },
    //           phone: data[i].phone,
    //           address: data[i].road_address_name,
    //           content: data[i].place_name,
    //         });
    //         // @ts-ignore
    //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
    //       }
    //       setResult(placeInfos);
    //       map.setBounds(bounds);
    //     } else {
    //       console.error("검색에 실패하였습니다.");
    //     }
    //   },
    //   options // 검색 옵션 전달
    // );
  };
  return (
    <CartegoryWrapper>
      {MAP_CATEGORIES.map((category) => {
        return (
          <Button
            // variant="outline"
            className={`${isSelected === category.id ? "select" : null}`}
            key={category.id}
            onClick={() => {
              searchPlaces(category.placeType);
              setIsSelected(category.id);
              setIsSearchModalOpen(true);
            }}
          >
            {category.name}
          </Button>
        );
      })}
    </CartegoryWrapper>
  );
};

export default MapCartegoryBtn;
const CartegoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 1rem 0;
`;
