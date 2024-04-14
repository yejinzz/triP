import Button from "@/components/atom/button/Button";
import { PROFILE_IMAGE } from "@/datas/profiles";
import styled from "styled-components";

const ProfileImgChangeForm = ({ setSelected, onClose, onChange }) => {
  return (
    <Form>
      <ul className="profile__list">
        {PROFILE_IMAGE.map((imgUrl, idx) => {
          return (
            <li key={idx}>
              <label htmlFor={`profile_${idx}`}>
                <ProfileItem
                  type="radio"
                  name="profile"
                  value={imgUrl}
                  id={`profile_${idx}`}
                  $imgUrl={imgUrl}
                  onClick={(e) => setSelected(e.target.value)}
                />
              </label>
            </li>
          );
        })}
      </ul>
      <div className="profile__btn_wrap">
        <Button variant="outline" onClick={onClose}>
          취소
        </Button>
        <Button variant="primary" onClick={onChange}>
          변경
        </Button>
      </div>
    </Form>
  );
};

export default ProfileImgChangeForm;

const Form = styled.form`
  .profile__list {
    display: flex;
    justify-content: center;
    gap: 2rem;
    flex-wrap: wrap;
    width: 400px;
    padding: 2rem 0;
  }
  .profile__btn_wrap {
    display: flex;
    gap: 1rem;
  }
  @media (max-width: 768px) {
    .profile__list {
      width: 100%;
    }
  }
`;

const ProfileItem = styled.input`
  background-image: ${({ $imgUrl }) => $imgUrl && `url(${$imgUrl})`};
  background-size: cover;
  appearance: none;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: 2px 2px 5px rgb(0, 0, 0, 0.2);

  transition: all 0.2s ease;

  cursor: pointer;
  &:focus {
    border: 5px solid var(--color-primary);
  }
  &:checked {
    border: 5px solid var(--color-primary);
  }
  &:hover {
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  }
  &:active {
    box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.1);
  }
`;
