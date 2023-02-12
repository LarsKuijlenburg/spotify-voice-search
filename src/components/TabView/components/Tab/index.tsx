import { Container, Content } from "./styles";

export interface TabProps {
  title: string;
  color: string;
  children?: React.ReactElement | React.ReactElement[];
}

export const Tab = ({ children, color }: TabProps) => {
  return (
    <Container color={color}>
      <Content>{children}</Content>
    </Container>
  );
};

export default Tab;
