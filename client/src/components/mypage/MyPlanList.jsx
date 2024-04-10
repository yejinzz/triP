import { useEffect, useState } from "react";
import MyPlanCard from "./MyPlanCard";
import { instance } from "@/api/instance";
import styled from "styled-components";

const MyPlanList = () => {
  const [allPlan, setAllPlan] = useState([]);

  useEffect(() => {
    instance
      .get(`/api/plan/`)
      .then((res) => {
        console.log(res);
        setAllPlan(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {!(Array.isArray(allPlan) && allPlan.length === 0) ? (
        <TripPlanList>
          {allPlan.map((plan, idx) => {
            return (
              <li key={idx}>
                <MyPlanCard plan={plan} />
              </li>
            );
          })}
        </TripPlanList>
      ) : (
        <EmptyTripPlan>저장된 여행 일정이 없습니다.</EmptyTripPlan>
      )}
    </>
  );
};

export default MyPlanList;
const TripPlanList = styled.ul`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const EmptyTripPlan = styled.div`
  /* margin: 3rem; */
  display: flex;
  align-items: center;
  /* flex-direction: column; */
  /* row-gap: 2rem; */
  /* color: var(--color-gray-50); */
  /* width: 700px;
  height: 200px; */
  height: 200px;
  color: #5d5d5d;
  /* background-color: var(--color-gray-50); */
`;
