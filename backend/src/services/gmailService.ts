import dotenv from "dotenv";
dotenv.config();

import { google } from "googleapis";

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN, GMAIL_REDIRECT_URI } =
  process.env;

const oauth2Client = new google.auth.OAuth2({
  clientId: GMAIL_CLIENT_ID,
  clientSecret: GMAIL_CLIENT_SECRET,
  redirectUri: GMAIL_REDIRECT_URI,
});

oauth2Client.setCredentials({
  refresh_token: GMAIL_REFRESH_TOKEN,
});

const getAuthorizedGmail = async () => {
  console.log("Getting fresh access token...");
  const token = await oauth2Client.getAccessToken();
  console.log("Access Token:", token.token);
  return google.gmail({ version: "v1", auth: oauth2Client });
};

export const sendConfirmationEmail = async (to: string, subject: string, message: string) => {
  const gmail = await getAuthorizedGmail();

  const rawMessage = Buffer.from(
    `To: ${to}\r\n` +
      `Subject: ${subject}\r\n` +
      `Content-Type: text/plain; charset="UTF-8"\r\n\r\n` +
      message,
  )
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: rawMessage,
    },
  });

  return response.data.threadId;
};

export const getRecentMessages = async (maxResults = 50) => {
  const gmail = await getAuthorizedGmail();

  const list = await gmail.users.messages.list({
    userId: "me",
    maxResults,
    labelIds: ["INBOX"],
  });

  const messagePromises = (list.data.messages ?? [])
    .filter((msg): msg is { id: string; threadId: string } => Boolean(msg.id && msg.threadId))
    .map(async (msg) => {
      const full = await gmail.users.messages.get({
        userId: "me",
        id: msg.id,
        format: "full",
      });

      const id = full.data.id ?? "";
      const threadId = full.data.threadId ?? "";
      const snippet = full.data.snippet ?? "";

      if (!id || !threadId) {
        return null; // skip invalid
      }

      return {
        id,
        threadId,
        snippet,
      };
    });

  const messages = (await Promise.all(messagePromises)).filter(Boolean);

  return messages;
};
