import styled, { css } from "styled-components";

const Button = ({ children, variant = "default", ...prop }) => {
  return (
    <S_Button variant={variant} {...prop}>
      {children}
    </S_Button>
  );
};

export default Button;

const VARIANT = {
  default: css`
    /* font-weight: 500;
    text-shadow: 1px 1px 1px #fff; */
    /* box-shadow: 0px 0px 11px -5px rgba(0, 0, 0, 0.1); */
    box-shadow: -3px -3px 10px rgba(255, 255, 255, 0.7),
      5px 5px 10px rgba(0, 0, 0, 0.2);
    /* box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.2), 2px 2px 3px rgba(0, 0, 0, 0.2); */
    &:hover {
      box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.6),
        2px 2px 3px rgba(0, 0, 0, 0.1);
    }
    &:active {
      box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.8),
        inset 2px 2px 3px rgba(0, 0, 0, 0.1);
    }
  `,
  primary: css`
    color: #fff;
    background-color: var(--color-primary);
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.15);
    &:hover {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
    }
    &:active {
      box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.15);
    }
  `,
  outline: css`
    background-color: ${(props) =>
      props.selected ? "var(--color-primary)" : "transparent"};
    /* ${(props) =>
      props.className ? "var(--color-primary)" : "transparent"}; */
    /* color: var(--color-primary); */
    color: ${(props) => (props.selected ? "#fff" : "var(--color-primary)")};
    border: 1px solid var(--color-primary);
    /* box-shadow: none; */
    &:hover {
      border: 1px solid var(--color-primary-50);
      box-shadow: none;
    }
    &:active {
      box-shadow: inset 2px 2px 4px rgba(0, 0, 0, 0.15);
    }
  `,
};

const S_Button = styled.button`
  ${(props) => props.variant && VARIANT[props.variant]};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.radius ? props.radius : "10px")};
  /* width: ${(props) => (props.width ? props.width : "100%")}; */
  width: 100%;
  /* min-width: max-content; */
  transition: all 0.2s ease;
  text-transform: uppercase;
  padding: 0.7rem;

  &.select {
    background-color: var(--color-primary);
    color: #fff;
  }
`;
