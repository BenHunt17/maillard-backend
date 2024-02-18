import { OAuth2Client } from "google-auth-library";
import { ApiError } from "../../domain/types/common/apiError";
import { isAdminOrThrow } from "../../authorization/isAdminOrThrow";

export async function getTokensWithCode(code: string) {
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    redirectUri: "postmessage",
  });
  try {
    const response = await client.getToken(code);

    if (!response.tokens.access_token) {
      throw Error();
    }
    const userInfo = await getUserInfo(response.tokens.access_token);
    await isAdminOrThrow(userInfo.id, userInfo.email);

    return response.tokens;
  } catch (e) {
    console.error(e);
    throw new ApiError(`Authentication failed`, 401);
  }
}

export async function getTokensWithRefreshToken(refreshToken: string) {
  try {
    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_API_CLIENT_ID,
      clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
      redirectUri: "postmessage",
    });
    client.setCredentials({ refresh_token: refreshToken });

    const response = await client.refreshAccessToken();
    return response.credentials;
  } catch (e) {
    console.error(e);
    throw new ApiError("There was a problem trading in the refresh token", 401);
  }
}

export async function getUserInfo(accessToken: string) {
  try {
    const client = new OAuth2Client({
      clientId: process.env.GOOGLE_API_CLIENT_ID,
      clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
      redirectUri: "postmessage",
    });
    const response = await client.getTokenInfo(accessToken);

    return { id: response.sub, email: response.email };
  } catch (e) {
    console.error(e);
    throw new ApiError("There was a problem getting user info", 401);
  }
}
