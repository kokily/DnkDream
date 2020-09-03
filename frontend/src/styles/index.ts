import { css, createGlobalStyle } from 'styled-components';
import oc from 'open-color';

// 미디어 쿼리 헬퍼: https://www.styled-components.com/docs/advanced#media-templates 참조
const sizes = (maxWidth: number) => `
  @media screen and (max-width: ${maxWidth}px)
`;

export const media = {
  wide: sizes(1200),
  desktop: sizes(1000),
  tablet: sizes(920),
  phone: sizes(376),
};

// 그림자 효과: https://codepen.io/sdthornton/pen/wBZdXq 기반
export const shadow = (weight: number) => {
  const shadows = [
    css`
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    `,
    css`
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    `,
    css`
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
        0 10px 10px rgba(0, 0, 0, 0.22);
    `,
    css`
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3),
        0 15px 12px rgba(0, 0, 0, 0.22);
    `,
  ];

  return shadows[weight];
};

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    min-height: 100%;
    height: 100%;
    color: ${oc.gray[8]};
    @media (min-width: 769px) {
      margin-left: 200px;
    }
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;
