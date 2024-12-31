// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

export default class FirebaseConnection {
  app
  db

  constructor() {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBMrINLhJMIS6QlYQ3qJyMCIOc-O3D3Ui4",
      projectId: "solaro-bot",
      appId: "1:414066197233:web:a02dba616cf1da90ab1f50",
      databaseURL: "https://solaro-bot-default-rtdb.europe-west1.firebasedatabase.app"
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getDatabase(this.app);
  }

  loadData(onChangeCallBack) {
    const positionRef = ref(this.db, "data/");

    onValue(positionRef, (snapshot) => {
      const newData = snapshot.val();
      onChangeCallBack(newData);
    })
  }
}
