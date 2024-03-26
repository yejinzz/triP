import styled from "styled-components";

const SearchResultBox = ({ children, totalNum, isSelected }) => {
  return (
    <SearchResultContainer>
      <div className="search__total">
        <span>{isSelected}</span>검색 결과
        <span>{totalNum}</span>건
      </div>
      {children}
    </SearchResultContainer>
  );
};

export default SearchResultBox;

const SearchResultContainer = styled.div`
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 6px 6px 2px rgba(0, 0, 0, 0.15);
  /* min-height: 150px; */
  &::-webkit-scrollbar {
    width: 5px;
    border-radius: 25px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-gray);
    border-radius: 4px;
  }
  .search_box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 150px;
  }
  .search__total {
    background-color: #fff;
    border-bottom: 0.5px solid var(--color-gray);
    padding: 1rem;
    & > span {
      color: #4568dc;
      margin: 0 0.45rem;
    }
  }
`;
