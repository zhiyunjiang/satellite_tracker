import styled from 'styled-components';

export const SContainer = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  width: 200px;
  background: rgba(38, 38, 38, 0.95);
  border: 1px solid #444444;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px #000000;
  border-radius: 8px;
`;

export const SHeader = styled.div`
  display: flex;
  align-items: center;
  background: #545454;
  border-radius: 8px 8px 0px 0px;
  padding: 5px 12px;
`;

export const SHeaderText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
`;

export const SBody = styled.div`
  padding: 10px 12px;
`;

export const SItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SItemLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  margin-right: 12px;
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
`;

export const SItemContent = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 16px;
  color: #ffffff;
`;
