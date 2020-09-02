import React from 'react';
import styled from 'styled-components';
import AsideContainer from 'containers/common/AsideContainer';

interface PageProps {}

const PageTemplate: React.FC<PageProps> = ({ children }) => {
  return (
    <>
      <AsideContainer />
      <Main>{children}</Main>
    </>
  );
};

export default PageTemplate;

// Style
const Main = styled.main`
  margin: 5rem 1rem;
`;
