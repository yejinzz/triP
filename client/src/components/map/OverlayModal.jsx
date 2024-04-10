import { IoTimeOutline } from "@react-icons/all-files/io5/IoTimeOutline";
import { IoRestaurantOutline } from "@react-icons/all-files/io5/IoRestaurantOutline";
import { IoLocationOutline } from "@react-icons/all-files/io5/IoLocationOutline";
import { IoCallOutline } from "@react-icons/all-files/io5/IoCallOutline";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useCloseModal from "@/hooks/useCloseModal";
import { getPlaceDetails } from "@/api/api";
import { Loading } from "../common/Loding";
import { getPlaceTypeLabel } from "@/utils/getPlaceTypeLabel";
import PlaceItemImg from "@/components/common/place_parts/PlaceItemImg";
import PlaceAddBtn from "@/components/common/place_parts/PlaceAddBtn";

const OverlayModal = ({ markerInfo }) => {
  const [additionalInfo, setAdditionalInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const overlayRef = useRef();
  useCloseModal(overlayRef);

  useEffect(() => {
    setLoading(true);
    getPlaceDetails(markerInfo.contentid, markerInfo.contenttypeid).then(
      (res) => {
        setLoading(false);
        console.log(res.data.response.body.items.item[0]);
        setAdditionalInfo(res.data.response.body.items.item[0]);
      }
    );
  }, [markerInfo]);

  console.log(additionalInfo);
  return (
    <Modal ref={overlayRef}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <PlaceItemImg placeImg={markerInfo.firstimage} />
          {/* <img src={markerInfo.firstimage} alt="place_img" /> */}
          <div className="place_info">
            {markerInfo.contenttypeid === "12" && (
              <>
                <p>{getPlaceTypeLabel(markerInfo)}</p>
                <h3>{markerInfo.title}</h3>
                <div className="place_address">
                  <strong>
                    <IoLocationOutline />
                  </strong>

                  <span>{`${markerInfo.addr1} ${markerInfo.addr2}`}</span>
                </div>
                <div className="place_tel_num">
                  <strong>
                    <IoCallOutline />
                  </strong>

                  <span>
                    {markerInfo.tel
                      ? markerInfo.tel
                      : additionalInfo.infocenter}
                  </span>
                </div>
                {additionalInfo.usetime && (
                  <div className="place_usetime">
                    <strong>
                      <IoTimeOutline />
                    </strong>

                    <span>{additionalInfo.usetime}</span>
                  </div>
                )}
              </>
            )}
            {markerInfo.contenttypeid === "39" && (
              <>
                <p>{getPlaceTypeLabel(markerInfo)}</p>
                <h3>{markerInfo.title}</h3>
                <div className="place_address">
                  <strong>
                    <IoLocationOutline />
                  </strong>

                  <span>{`${markerInfo.addr1} ${markerInfo.addr2}`}</span>
                </div>
                <div className="place_tel_num">
                  <strong>
                    <IoCallOutline />
                  </strong>
                  <span>{additionalInfo.infocenterfood}</span>
                </div>
                <div className="place_usetime">
                  <strong>
                    <IoTimeOutline />
                  </strong>

                  <span>{additionalInfo.opentimefood}</span>
                </div>
                <div>
                  <strong>
                    <IoRestaurantOutline />
                  </strong>

                  <span>{additionalInfo.firstmenu}</span>
                </div>
              </>
            )}
            {markerInfo.contenttypeid === "32" && (
              <>
                <p>{getPlaceTypeLabel(markerInfo)}</p>
                <h3>{markerInfo.title}</h3>

                <div className="place_address">
                  <strong>
                    <IoLocationOutline />
                  </strong>
                  <span>{`${markerInfo.addr1} ${markerInfo.addr2}`}</span>
                </div>

                <div className="place_tel_num">
                  <strong>
                    <IoCallOutline />
                  </strong>

                  <span>{additionalInfo.infocenterlodging}</span>
                </div>
                <div>
                  <span>체크인</span> <span>{additionalInfo.checkintime}</span>
                </div>
                <div>
                  <span>체크아웃</span>
                  <span>{additionalInfo.checkouttime}</span>
                </div>
              </>
            )}
          </div>
          <PlaceAddBtn place={markerInfo} />
        </>
      )}
    </Modal>
  );
};

export default OverlayModal;
const Modal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20rem;
  min-height: 8rem;
  gap: 1rem;
  position: relative;
  bottom: 55px;
  background-color: #fff;
  padding: 1rem;
  box-shadow: var(--shadow-box);

  .place_info {
    display: flex;
    flex-direction: column;
    width: 170px;
    gap: 0.5rem;

    & > p {
      font-size: 0.75rem;
      color: #4568dc;
    }
    & > div {
      display: flex;
      align-items: center;
      white-space: normal;

      & > strong {
        margin-right: 0.3rem;
      }
      & > span {
        color: #6c6c6c;
        font-size: 0.75rem;
      }
    }
    & > h3 {
      font-size: 1rem;
      font-weight: bold;
    }
  }
`;
