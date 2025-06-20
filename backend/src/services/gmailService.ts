import { gmail } from "../config";

export const sendConfirmationEmail = async (to: string, subject: string, message: string) => {
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
