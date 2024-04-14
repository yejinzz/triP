import styled from "styled-components";

const PlanDetail = ({ children = null, label }) => {
  return (
    <PlanDetailContainer>
      <h3>{label}</h3>
      <span>{children}</span>
    </PlanDetailContainer>
  );
};

export default PlanDetail;

const PlanDetailContainer = styled.div`
  & > h3 {
    display: inline;
    margin-right: 0.8rem;
    font-size: 0.875rem;
  }
  span {
    font-weight: 100;
  }
`;
