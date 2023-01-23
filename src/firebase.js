import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// https://firebase.google.com/docs/web/setup#available-libraries

const app = initializeApp({
    apiKey: "AIzaSyByZcIoLuxgSazO2_EqHi3146Bp6rUXcKY",
    authDomain: "upload-files-app.firebaseapp.com",
    projectId: "upload-files-app",
    storageBucket: "upload-files-app.appspot.com",
    messagingSenderId: "121597473248",
    appId: "1:121597473248:web:688b972e139b1d0213bb85"
})

export const storage = getStorage(app)
