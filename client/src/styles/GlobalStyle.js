import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    body{    
        background-color: var(--color-bg-100);
        letter-spacing: -1px;
        line-height: 1;
        font-family: "Noto Sans KR", sans-serif;
        font-size: 0.875rem;
        font-weight: 300;
    }

    a{
        text-decoration: none;
        color: inherit;
    }

    ol, ul, li{
        list-style: none;
    }
    button {
        
        border: none;
        background: transparent;
        cursor: pointer;
    }

    button,
    textarea,
    input {
        background-color: var(--color-bg-100);
        font-family: "Noto Sans KR", sans-serif;
        font-size: 0.875rem;
        font-weight: 300;
        letter-spacing: -1px;
    }

    input,textarea:focus {
        outline: none;
    }

    /* logo */
    .logo_style {
    color:#fff;
    font-size: 3rem;
    /* font-family: 'Noto Serif KR', serif; */
    font-family: 'Montserrat', sans-serif;
    font-weight:200;

  }
`;

export default GlobalStyles;
