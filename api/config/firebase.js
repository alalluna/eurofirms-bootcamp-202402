import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import dotenv from 'dotenv'

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectID: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appID: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID

}

const firebaseApp = initializeApp(firebaseConfig)

export const storage = getStorage(firebaseApp)
