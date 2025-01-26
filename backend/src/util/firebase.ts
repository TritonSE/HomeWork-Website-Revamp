import admin, { ServiceAccount } from "firebase-admin";

import { config } from "../config";

const firebaseConfig: ServiceAccount = {
  projectId: config.firebase.projectId,
  clientEmail: config.firebase.clientEmail,
  privateKey: config.firebase.privateKey,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
    databaseURL: config.firebase.databaseURL,
  });
}

export const firebaseAdminAuth = admin.auth();
