import admin from "firebase-admin";
admin.initializeApp();
export const db = admin.firestore();
export const messaging = admin.messaging();
export const auth = admin.auth();