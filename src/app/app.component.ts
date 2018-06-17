import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    const config = {
      apiKey: "AIzaSyDZ9sdhoMemfVH6E3q9_h0VZqo9BKl7jQo",
      authDomain: "passei-ed759.firebaseapp.com",
      databaseURL: "https://passei-ed759.firebaseio.com",
      projectId: "passei-ed759",
      storageBucket: "passei-ed759.appspot.com",
      messagingSenderId: "674768827208"
    };
    firebase.initializeApp(config);
    firebase.firestore().settings ({timestampsInSnapshots: true});
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

