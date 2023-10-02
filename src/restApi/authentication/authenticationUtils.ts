import { OAuth2Client } from "google-auth-library";

export function getAuthUrl() {
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  return client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
}

export async function getUserCredentials(code: string) {
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  const tokenResponse = await client.getToken(code);
  await client.setCredentials(tokenResponse.tokens);

  const userCredentials = client.credentials;
  return userCredentials;
}

export async function getUserInfo(
  accessToken: string | null | undefined
): Promise<unknown> {
  try {
    const userInfoResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
    );
    return await userInfoResponse.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getNewAccessToken(refreshToken: string) {
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  await client.setCredentials({ refresh_token: refreshToken });
  const tokens = await client.refreshAccessToken();

  return tokens.credentials;
}

export async function logout() {
  const client = new OAuth2Client({
    clientId: process.env.GOOGLE_API_CLIENT_ID,
    clientSecret: process.env.GOOGLE_API_CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  await client.revokeCredentials();
}
