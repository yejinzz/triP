import { useEffect, useState } from "react";
import MyPlanCard from "./MyPlanCard";
import { instance } from "@/api/instance";
import styled from "styled-components";

const MyPlanList = () => {
  const [allPlan, setAllPlan] = useState([]);

  useEffect(() => {
    instance.get(`/api/plan`).then((res) => {
      setAllPlan(res.data);
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
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
`;

const EmptyTripPlan = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  color: #5d5d5d;
`;
