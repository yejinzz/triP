import { useRef, useState } from "react";
import SearchBar from "@/components/map/SearchBar";
import PlaceItem from "./PlaceItem";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { MAP_CATEGORIES } from "@/datas/categories";
import SearchResultBox from "./SearchResultBox";
import Loading from "@/components/common/Loding";
import useCloseModal from "@/hooks/useCloseModal";
import { instance } from "@/api/instance";

const PlaceSearchTool = ({ setResult, result }) => {
  const destination = useSelector((state) => state.place.destination);

  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  // const searchRef = useRef(null);
  const searchResultRef = useRef(null);

  const searchByKeyword = (category) => {
    setLoading(true);

    instance
      .get(
        `/api/places?regionCode=${destination.regionCode}&placeType=${category.typeId}`
      )
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsSelected(category.name);
    setIsSearchModalOpen(true);
    // TourInstance.get(
    //   `/areaBasedList1?serviceKey=${
    //     import.meta.env.VITE_TOUR_API_KEY
    //   }&numOfRows=100&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=R&contentTypeId=${
    //     category.typeId
    //   }&areaCode=${destination.regionCode}`
    // ).then((res) => {
    //   setLoading(false);
    //   setResult(res.data.response.body.items.item);
    //   console.log(res.data.response.body.items.item);
    // });
  };
  useCloseModal(searchResultRef, () => setIsSearchModalOpen(false));

  return (
    <SearchToolContainer ref={searchResultRef}>
      <SearchBar
        // setMapCenter={setMapCenter}
        // setMapLevel={setMapLevel}
        setIsSearchModalOpen={setIsSearchModalOpen}
        // searchRef={searchRef}
      />
      <CartegoryWrapper>
        {MAP_CATEGORIES.map((category) => {
          return (
            <CategoryButton
              aria-label={`${category.name} 키워드 버튼`}
              selected={isSelected === category.name}
              key={category.id}
              onClick={() => {
                searchByKeyword(category);
              }}
            >
              {category.icon}
            </CategoryButton>
          );
        })}
      </CartegoryWrapper>
      {isSearchModalOpen && (
        <SearchResultBox totalNum={result.length} isSelected={isSelected}>
          {loading ? (
            <div className="search_box">
              <Loading />
            </div>
          ) : (
            <>
              {result.length !== 0 ? (
                <List>
                  {result.map((place, idx) => (
                    <li key={idx}>
                      <PlaceItem place={place} isAddEnabled={true} />
                    </li>
                  ))}
                </List>
              ) : (
                <div className="search_box">
                  <p>검색결과가 없습니다.</p>
                </div>
              )}
            </>
          )}
        </SearchResultBox>
      )}
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

const CartegoryWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
`;
const CategoryButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  padding: 0.7rem;
  font-size: 25px;
  color: #5d5d5d;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  }
  &:active {
    box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const List = styled.ul`
  max-height: 55vh;
  overflow-y: auto;
  padding: 1rem;
`;
