import { AccessTokenResponse, SearchResponse } from "./types";

export const getLoginUrl = (state: string) => {
  const parameters = {
    response_type: "code",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
    scope: "user-read-private user-read-email",
    redirect_uri: "http://localhost:3000/callback",
    state: state,
  };

  return `https://accounts.spotify.com/authorize?${createQueryString(
    parameters
  )}`;
};

const createQueryString = (params: { [key: string]: string }) => {
  return Object.keys(params)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    .join("&");
};

export const getAccessCode = async (
  code: string
): Promise<AccessTokenResponse> => {
  const parameters = {
    code: code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/callback",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID || "",
    client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || "",
  };

  return await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: createQueryString(parameters),
  }).then((response) => response.json());
};

export const search = async (
  query: string,
  accessKey: string
): Promise<SearchResponse> => {
  return await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track,album,artist`,
    {
      headers: {
        Authorization: `Bearer ${accessKey}`,
      },
    }
  ).then((response) => response.json());
};
