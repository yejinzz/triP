import styled, { css } from "styled-components";

const Button = ({ children, variant = "default", className, ...prop }) => {
  return (
    <S_Button className={className} variant={variant} {...prop}>
      {children}
    </S_Button>
  );
};

export default Button;

const VARIANT = {
  default: css`
    background-color: var(--color-bg-100);
    box-shadow: -3px -3px 10px rgba(255, 255, 255, 0.7),
      5px 5px 10px rgba(0, 0, 0, 0.2);

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
    background-color: ${(props) =>
      props.disabled ? "var(--color-gray)" : "var(--color-primary)"};
    box-shadow: 5px 5px 6px rgba(0, 0, 0, 0.15);

    &:hover {
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15);
    }
    &:active {
      box-shadow: inset 4px 4px 6px rgba(0, 0, 0, 0.15);
    }
  `,
  outline: css`
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
    &.active {
      background-color: var(--color-primary-80);
      color: #fff;
    }
    &:hover {
      border: 1px solid var(--color-primary-50);
      box-shadow: none;
    }
    &:active {
      box-shadow: inset 1px 1px 2px rgba(0, 0, 0, 0.15);
    }
  `,
};

const S_Button = styled.button`
  ${(props) => props.variant && VARIANT[props.variant]};
  border-radius: ${(props) => (props.radius ? props.radius : "10px")};
  width: ${(props) => (props.width ? props.width : "100%")};
  /* background-color: ${(props) => props.color && props.color}; */
  /* min-width: max-content; */
  white-space: nowrap;
  transition: all 0.2s ease;
  text-transform: uppercase;
  padding: 0.7rem;
  &:disabled {
    background-color: #ccc;
    box-shadow: none;
    cursor: not-allowed;
  }
`;
