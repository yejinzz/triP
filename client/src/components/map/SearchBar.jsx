import { IoIosSearch } from "@react-icons/all-files/io/IoIosSearch";
import { MdClose } from "@react-icons/all-files/md/MdClose";
import useInputs from "@/hooks/useInput";
import { getSearchPlace } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setSearchPlace } from "../../store/slice/placeSlice";
import styled from "styled-components";

const SearchBar = ({ setIsSearchModalOpen, setLoading }) => {
  const dispatch = useDispatch();
  const destination = useSelector((state) => state.schedule.destination);
  const [search, onChange, resetForm] = useInputs({ keyword: "" });

  // const handleKeywordClick = (region) => {
  //   // 리스트 아이템을 클릭하면 위치를 업데이트하고 SearchListBox를 숨기도록 상태 업데이트
  //   setMapCenter((prev) => ({
  //     ...prev,
  //     center: {
  //       lat: region.coords.lat,
  //       lng: region.coords.lng,
  //     },
  //     isLoading: false,
  //   }));
  //   setMapLevel(11);
  // };

  // const updateKeyword = () => {
  //   let filteredCities = REGIONS_INFO.filter((data) =>
  //     data.regionName.includes(search.keyword)
  //   );
  //   setKeywordList(filteredCities);
  // };

  // useEffect(() => {
  //   const debounce = setTimeout(() => {
  //     if (search.keyword) updateKeyword();
  //   }, 100);
  //   return () => {
  //     clearTimeout(debounce);
  //   };
  // }, [search.keyword]);

  const handleSearch = () => {
    if (search.keyword !== "") {
      setIsSearchModalOpen(true);
      setLoading(true);
      getSearchPlace(destination.regionCode, search.keyword).then((res) => {
        if (res.data.response.body.totalCount !== 0) {
          const filteredItems = res.data.response.body.items.item.filter(
            (item) => {
              const contenttypeid = item.contenttypeid;
              return (
                contenttypeid === "12" ||
                contenttypeid === "32" ||
                contenttypeid === "39"
              );
            }
          );
          dispatch(setSearchPlace(filteredItems));
          setLoading(false);
        } else {
          dispatch(setSearchPlace([]));
          setLoading(false);
        }
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };
  return (
    <>
      <SearchForm>
        <div className="search__box">
          <input
            name="keyword"
            aria-label="장소 검색"
            onChange={onChange}
            value={search.keyword}
            onClick={() => setIsSearchModalOpen(true)}
            onKeyDown={handleKeyPress}
          />
          {search.keyword && <MdClose onClick={() => resetForm()} />}
          {/* <MdOutlineSearch size={20} /> */}
          <SearchIcon onClick={handleSearch} />
        </div>
      </SearchForm>
    </>
  );
};

export default SearchBar;

const SearchForm = styled.form`
  .search__box {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease-in-out;
    & > input {
      background-color: unset;
      width: 100%;
    }
    &:focus {
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1),
        inset -1px -1px 2px rgba(255, 255, 255, 0.8);
    }
  }
`;
const SearchIcon = styled(IoIosSearch)`
  font-size: 1.5rem;
  cursor: pointer;
`;
