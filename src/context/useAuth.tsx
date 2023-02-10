import React, { createContext, useEffect, useMemo, useState } from "react";
export type Token = {
  accessToken: string;
  refreshToken: string;
  expires_at: number;
};

type AuthRequestParams = {
  code: string;
  state: string;
};
type AuthContextType = {
  tokens?: Token;
  parameters?: AuthRequestParams;
  setTokens: (token: Token) => void;
  setParameters: (params: AuthRequestParams) => void;
};

const getInitialTokens = (): Token | undefined => {
  const accessToken = sessionStorage.getItem("access_token");
  const refreshToken = sessionStorage.getItem("refresh_token");
  const expires_at = sessionStorage.getItem("expires_at");
  if (accessToken && refreshToken) {
    return {
      accessToken,
      refreshToken,
      expires_at: parseInt(expires_at || "0"),
    };
  }
  return undefined;
};

const AuthContext = createContext<AuthContextType>({
  setTokens: () => {},
  setParameters: () => {},
});

function AuthProvider({ children }: React.PropsWithChildren) {
  const [tokens, setTokens] = useState<Token | undefined>(getInitialTokens());
  const [parameters, setParameters] = useState<AuthRequestParams>();

  useEffect(() => {
    if (tokens) {
      sessionStorage.setItem("access_token", tokens.accessToken);
      sessionStorage.setItem("refresh_token", tokens.refreshToken);
      sessionStorage.setItem("expires_at", tokens.expires_at.toString());
    }
  }, [tokens]);

  const value = useMemo(() => {
    return { tokens, parameters, setTokens, setParameters };
  }, [tokens, parameters, setTokens, setParameters]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
