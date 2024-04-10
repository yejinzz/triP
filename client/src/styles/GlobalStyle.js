import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
  font-family: 'Pretendard';
  font-weight: bold;
  src: url('/src/assets/font/Pretendard-Bold.woff2') format('woff2');
}
@font-face {
  font-family: 'Pretendard';
  font-weight: 100;
  src: url('/src/assets/font/Pretendard-Thin.woff2') format('woff2');
}
  @font-face {
  font-family: 'Pretendard';
  font-weight: 400;
  src: url('/src/assets/font/Pretendard-Regular.woff2') format('woff2');
}


@font-face {
  font-family: 'Montserrat';
  font-weight: normal;
  src: url('/src/assets/font/Montserrat-Regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Montserrat';
  font-weight: bold;
  src: url('/src/assets/font/Montserrat-bold.woff2') format('woff2');
}

    *{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        font-family: 'Pretendard';
        font-weight: 400;

    }
    body{    
        background-color: #fff;
        letter-spacing: -1px;
        line-height: 1;
        font-size: 0.875rem;
        /* font-weight: 300; */
    }
h2{
    /* font-family: 'Pretendard';
        font-weight: bold; */
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
        font-size: 0.875rem;
        font-weight: 300;
        letter-spacing: -1px;
   
    }

    input,textarea:focus {
      background-color: transparent;
        outline: none;
    }
    ::-webkit-scrollbar {
    width: 5px;
    border-radius: 25px;
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--color-gray);
    border-radius: 4px;
  }
    /* logo */
    .logo_style {
    font-size: 1.5rem;
    font-family: 'Montserrat';
    letter-spacing:3px;
  }
  /* error message */
   .err_msg {
    color: #c62727;
  }
`;

export default GlobalStyles;
