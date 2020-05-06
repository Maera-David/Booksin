import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const firebaseConfig = {
      apiKey: "AIzaSyCUkOxB_BWorkSA_dyi228Ybk7gcnkxzvU",
      authDomain: "booksin-1408c.firebaseapp.com",
      databaseURL: "https://booksin-1408c.firebaseio.com",
      projectId: "booksin-1408c",
      storageBucket: "booksin-1408c.appspot.com",
      messagingSenderId: "621087467135",
      appId: "1:621087467135:web:ced2d218d455b5a63bc14a",
      measurementId: "G-WVD6DPQGG4"
    };
    firebase.initializeApp(firebaseConfig);
  }
}