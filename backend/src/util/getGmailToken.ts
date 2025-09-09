import dotenv from "dotenv";
import { google } from "googleapis";
import readline from "readline";

dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  "http://localhost",
);

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: SCOPES,
});

console.log("Authorize this app by visiting this url:\n", authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("\nPaste the code here: ", (code) => {
  void (async () => {
    try {
      const { tokens } = await oAuth2Client.getToken(code);
      console.log("\nTokens Retrieved:\n");
      console.log("Access Token:", tokens.access_token);
      console.log("Refresh Token:", tokens.refresh_token);
      console.log("Expiry Date:", tokens.expiry_date);
    } catch (err) {
      console.error("Failed to exchange code for tokens:", err);
    } finally {
      rl.close();
    }
  })();
});
