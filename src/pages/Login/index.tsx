import { v4 } from "uuid";
import { getLoginUrl } from "../../api/queries";
import { Container, LoginButton } from "./styles";

const Login = () => {
  const state = v4();
  return (
    <Container>
      <LoginButton href={getLoginUrl(state)}>Login</LoginButton>
    </Container>
  );
};

export default Login;
