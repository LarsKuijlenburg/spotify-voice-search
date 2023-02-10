import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccessCode } from "../../api/queries";
import { useAuth } from "../../context/useAuth";

const Callback = () => {
  const [searchParams] = useSearchParams();
  const { setParameters, parameters, setTokens } = useAuth();
  const { data: accessTokens } = useQuery(
    ["getAccessCode", parameters?.code],
    () => getAccessCode(parameters?.code || ""),
    {
      enabled: !!parameters?.code,
    }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (state && code) {
      setParameters({ state, code });
    }
  }, [setParameters, searchParams]);

  useEffect(() => {
    if (accessTokens) {
      setTokens({
        accessToken: accessTokens.access_token,
        refreshToken: accessTokens.refresh_token,
        expires_at: accessTokens.expires_in * 1000 + Date.now(),
      });

      navigate("/");
    }
  }, [accessTokens, setTokens, navigate]);

  return <div>Callback page</div>;
};

export default Callback;
