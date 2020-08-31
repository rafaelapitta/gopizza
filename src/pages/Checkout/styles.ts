import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 24px;
  width: 300px;
  max-width: 300px;

  div {
    h3 {
      font-size: 24px;
      margin-bottom: 16px;
    }

    h5 {
      font-size: 18px;
      margin-bottom: 8px;
      border-bottom: 1px solid #999;
    }

    span {
      font-style: italic;
      color: #666;
    }

    div + div {
      margin-top: 16px;
    }

    li {
      list-style: none;
    }

    button {
      background-color: #16a085;

      span {
        color: #fff;
      }
      &:hover {
        background-color: #1abc9c;
      }
    }
  }

  .confirmation-button {
    display: flex;
    justify-content: center;
  }

  .confirmation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
      font-size: 16px;
      color: #1abc9c;
      margin-top: 32px;
    }
`;
