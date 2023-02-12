import styled from "styled-components";

export const StyledButton = styled.button<{ color: string }>`
  background-color: none;
  border: none;
  border-radius: 30px;
  margin-right: 20px;
  padding: 20px;
  font-size: 28px;
  background-color: ${({ color }) => color};
  color: white;
  font-weight: 700;
  height: 50px;
  width: 200px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
