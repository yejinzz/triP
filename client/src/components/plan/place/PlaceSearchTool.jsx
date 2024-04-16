import { useRef, useState } from "react";
import SearchBar from "@/components/map/SearchBar";
import PlaceItem from "@/components/plan/place/PlaceItem.jsx";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { MAP_CATEGORIES } from "@/datas/categories";
import SearchResultBox from "./SearchResultBox";
import Loading from "@/components/common/Loding";
import useCloseModal from "@/hooks/useCloseModal";
import Confirm from "@/components/common/dialog/Confirm";
import { getPlaceByCategory } from "@/api/api";
import { setSearchPlace } from "@/store/slice/placeSlice";
import useOpenDialog from "@/hooks/useOpenDialog";
import PlaceAddBtn from "../../common/place_parts/PlaceAddBtn";

const PlaceSearchTool = () => {
  const dispatch = useDispatch();
  const [isOpenDialog, openDialog, closeDialog] = useOpenDialog();

  const destination = useSelector((state) => state.schedule.destination);
  const searchResult = useSelector((state) => state.place.searchResult);

  const [loading, setLoading] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(null);

  const searchResultRef = useRef(null);

  const searchByKeyword = (category) => {
    setLoading(true);

    getPlaceByCategory(category.typeId, destination.regionCode).then((res) => {
      dispatch(setSearchPlace(res.data.response.body.items.item));
      setLoading(false);
    });

    setIsSelected(category.name);
    setIsSearchModalOpen(true);
  };

  useCloseModal(searchResultRef, () => setIsSearchModalOpen(false));
  return (
    <>
      {isOpenDialog && (
        <Confirm
          title="알림"
          content="일정은 하루에 14개까지 추가 가능합니다."
          primaryLabel="확인"
          onClickPrimaryButton={() => closeDialog()}
        />
      )}
      <SearchToolContainer ref={searchResultRef}>
        <SearchBar
          setIsSearchModalOpen={setIsSearchModalOpen}
          setLoading={setLoading}
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
          <SearchResultBox totalNum={searchResult.length}>
            {loading ? (
              <div className="search_box">
                <Loading />
              </div>
            ) : (
              <>
                {searchResult.length !== 0 ? (
                  <PlaceList>
                    {searchResult.map((place, idx) => {
                      return (
                        <li key={idx}>
                          <PlaceItem place={place} />
                          <PlaceAddBtn place={place} openDialog={openDialog} />
                        </li>
                      );
                    })}
                  </PlaceList>
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
    </>
  );
};

export default PlaceSearchTool;

const SearchToolContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 8;
  width: 300px;
  @media (max-width: 430px) {
    /* display: none; */
    /* z-index: 2; */
    right: 0;
    top: 10px;
    /* left: 0; */
    padding: 0 1rem;
    width: 100%;
  }
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
  background-color: #f1f1f1;
  &:hover {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
  }
  &:active {
    box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.15);
  }
`;

const PlaceList = styled.ul`
  max-height: 55vh;
  overflow-y: auto;
  padding: 0 1rem;
  padding-bottom: 1rem;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 1rem 0;
    border-bottom: 0.5px solid var(--color-gray);
  }
`;
