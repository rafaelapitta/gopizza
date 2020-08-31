import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 24px;
  width: 320px;
  width: 100%;

  span,
  label,
  p,
  h1,
  h2,
  h3,
  legend {
    font-size: 18px;
  }

  span {
    text-transform: capitalize;
  }

  button > span {
    font-size: 14px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;
