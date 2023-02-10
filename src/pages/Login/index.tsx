import { v4 } from "uuid";
import { getLoginUrl } from "../../api/queries";

const Login = () => {
  const state = v4();
  return (
    <div>
      <a href={getLoginUrl(state)}>Login</a>
    </div>
  );
};

export default Login;
