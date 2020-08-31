import styled, { css } from 'styled-components';

interface ItemContainerProps {
  disabled?: boolean;
}

export const ItemContainer = styled.div<ItemContainerProps>`
  display: flex;
  align-items: center;
  padding: 8px 0px;

  ${(props) =>
    props.disabled &&
    css`
      filter: opacity(0.4);
    `}

  img {
    height: 32px;
    width: 32px;
    border-radius: 32px;
    object-fit: cover;
  }
`;
