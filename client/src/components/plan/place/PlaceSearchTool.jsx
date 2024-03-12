import { useEffect, useRef, useState } from "react";
import SearchBar from "@/components/map/SearchBar";
// import PlaceCartegoryBtn from "./PlaceCartegoryBtn";
import PlaceListCard from "./PlaceListCard";
import styled from "styled-components";
import instance from "@/api/instanse";
import { useDispatch, useSelector } from "react-redux";
import { MAP_CATEGORIES } from "@/constants/categories";
import Button from "@/components/atom/button/Button";
import { setSchedule } from "@/store/slice/scheduleSlice";

const PlaceSearchTool = ({ setMapCenter, setMapLevel, setResult, result }) => {
  const destination = useSelector((state) => state.place.destination);
  const selectedDay = useSelector((state) => state.schedule.selectedDay);

  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  const searchRef = useRef(null);
  const searchResultRef = useRef(null);

  const searchByKeyword = (category) => {
    setLoading(true);
    instance
      .get(
        `/api/places?regionCode=${destination.regionCode}&placeType=${category.placeType}`
      )
      .then((res) => {
        console.log(res);
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsSelected(category.name);
    setIsSearchModalOpen(true);
  };

  useEffect(() => {
    // 영역 외 클릭 시 발생하는 이벤트
    const handleFocus = (e) => {
      if (searchRef.current && !searchResultRef.current.contains(e.target)) {
        setIsSearchModalOpen(false);
        setResult([]);
        setIsSelected(null);
      }
    };

    document.addEventListener("click", handleFocus);
    return () => {
      document.removeEventListener("click", handleFocus);
    };
  }, [searchRef, searchResultRef]);

  const dispatch = useDispatch();

  const addSchedule = (schedule) => {
    const day = selectedDay;
    dispatch(setSchedule({ day, schedule }));
  };

  return (
    <SearchToolContainer ref={searchResultRef}>
      <SearchBar
        setMapCenter={setMapCenter}
        setMapLevel={setMapLevel}
        setIsSearchModalOpen={setIsSearchModalOpen}
        searchRef={searchRef}
      />
      <CartegoryWrapper>
        {MAP_CATEGORIES.map((category) => {
          return (
            <Button
              // variant="outline"
              className={`${isSelected === category.name ? "select" : null}`}
              key={category.id}
              onClick={() => {
                searchByKeyword(category);
              }}
            >
              {category.name}
            </Button>
          );
        })}
      </CartegoryWrapper>
      {isSearchModalOpen &&
        (result.length === 0 ? (
          <PlaceList>
            <p>검색결과가 없습니다.</p>
          </PlaceList>
        ) : (
          <PlaceList>
            {loading ? (
              <p>로딩중</p>
            ) : (
              result.map((place, idx) => {
                return (
                  <PlaceListCard
                    key={idx}
                    place={place}
                    onClick={() => addSchedule(place)}
                  />
                );
              })
            )}
          </PlaceList>
        ))}
    </SearchToolContainer>
  );
};

export default PlaceSearchTool;

const SearchToolContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 10;
  width: 350px;
`;

const PlaceList = styled.div`
  padding: 0 0.5rem;
  /* height: calc(100% - 150px); */

  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: 0 6px 6px 2px rgba(0, 0, 0, 0.15);

  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 25px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray);
    border-radius: 4px;
  }
`;
const CartegoryWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin: 1rem 0;
`;
