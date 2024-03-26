import { useEffect, useState } from "react";
// import { MdOutlineSearch } from "@react-icons/all-files/md/MdOutlineSearch";

import { MdClose } from "@react-icons/all-files/md/MdClose";
import useInputs from "@/hooks/useInput";
import styled from "styled-components";
import axios from "axios";
// import Button from "../atom/button/Button";

const SearchBar = ({ setMapCenter, setMapLevel, setIsSearchModalOpen }) => {
  const [search, onChange, resetForm] = useInputs({ keyword: "" });
  const [keywordList, setKeywordList] = useState([]);

  const handleKeywordClick = (region) => {
    // 리스트 아이템을 클릭하면 위치를 업데이트하고 SearchListBox를 숨기도록 상태 업데이트
    setMapCenter((prev) => ({
      ...prev,
      center: {
        lat: region.coords.lat,
        lng: region.coords.lng,
      },
      isLoading: false,
    }));
    setMapLevel(11);
  };

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

  useEffect(() => {
    const address = "서울특별시 강남구";
    axios
      .get(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          address
        )}`,
        {
          headers: {
            Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
          },
        }
      )
      .then((response) => {
        // 좌표 출력
        const coords = response.data.documents[0].address;
        console.log(response);
        console.log("위도:", coords.y, "경도:", coords.x);
      })
      .catch((error) => {
        console.error("API 호출 에러:", error);
      });
  }, []);

  return (
    <>
      <InputBox>
        <input
          name="keyword"
          aria-label="장소 검색"
          onChange={onChange}
          value={search.keyword}
          onClick={() => setIsSearchModalOpen(true)}
        />
        {search.keyword && <MdClose onClick={() => resetForm()} />}
        {/* <MdOutlineSearch size={20} /> */}
      </InputBox>
      {keywordList.length > 0 && search.keyword && (
        <>
          <KeywordListBox>
            {/* <hr className="divider" /> */}
            {keywordList.map((region, idx) => (
              <>{region.regionName}</>
            ))}
          </KeywordListBox>
        </>
      )}
    </>
  );
};

export default SearchBar;

const KeywordListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
  /* width: 100%; */
  /* & .divider {
    background-color: var(--color-gray-50);
    width: 100%;
    height: 1px;
    margin: 0.5rem 0;
  } */
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  border-radius: 15px;
  background-color: #fff;
  /* box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
    inset -3px -3px 10px rgba(255, 255, 255, 0.8); */
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
`;
