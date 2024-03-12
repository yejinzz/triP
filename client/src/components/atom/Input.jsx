import React from "react";
import { styled } from "styled-components";

const Input = ({ onChange, label, variant = "default", ...attributes }) => {
  return (
    <InputWrapper>
      <label htmlFor={attributes.name}>{label}</label>
      <input variant={variant} onChange={onChange} {...attributes} />
    </InputWrapper>
  );
};

export default Input;
const InputWrapper = styled.div`
  & label {
    display: inline-block;
    font-weight: 300;
    margin-bottom: 0.5rem;
  }
  & input {
    width: 100%;
    padding: 0.8rem;
    border-radius: 20px;
    box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1),
      inset -3px -3px 10px rgba(255, 255, 255, 0.8);
    transition: all 0.2s ease-in-out;

    &:focus {
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.1),
        inset -1px -1px 2px rgba(255, 255, 255, 0.8);
    }
  }
  & .err_msg {
    margin-top: 0.5rem;
    color: #c62727;
  }
`;

/* padding: 0.5rem 1rem;
  font-size: 1rem;
  width: 100%;
  //border: 1px solid var(--color-gray);
  //border-radius: 10px;
  border-bottom: solid var(--color-gray) 1px;
  padding-bottom: 10px;
  padding-left: 10px; */
