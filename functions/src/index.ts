import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { HttpsError } from "firebase-functions/lib/providers/https";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

admin.initializeApp();

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

export const getLevel = functions.https.onRequest(async (request, response) => {
  const db = admin.firestore();
  functions.logger.info("Hello logs!", { structuredData: true });
  if (!request.body.name) {
    throw new HttpsError("invalid-argument", "bad request, missing name");
  }
  const result = await db.doc(request.body.name);
  response.send(result);
});

export const submitLevel = functions.https.onRequest(
  async (request, response) => {
    const db = admin.firestore();
    functions.logger.info("Hello logs!", { structuredData: true });
    if (!request.body.name || !request.body.level) {
      throw new HttpsError(
        "invalid-argument",
        "bad request, missing name or level"
      );
    }
    await db
      .collection("levels")
      .doc(request.body.name)
      .set({
        level: JSON.stringify(request.body.level),
      });
    response.send("success");
  }
);
