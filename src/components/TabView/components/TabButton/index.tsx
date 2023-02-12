import { StyledButton } from "./styles";

interface Props {
  children?: React.ReactElement | React.ReactElement[];
  color: string;
  handleClick: () => void;
}

const TabButton = ({ handleClick, children, color }: Props) => {
  return (
    <StyledButton color={color} onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default TabButton;
