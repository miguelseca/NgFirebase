import { Component, NgZone, OnDestroy, OnInit } from "@angular/core";
import * as firebaseui from "firebaseui";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import firebase from "firebase/app";
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { UserService } from "../services/user.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  //ui: firebaseui.auth.AuthUI;

  uid: string;


  constructor(private afAuth: AngularFireAuth, private router: Router, private userService: UserService) {}

  ngOnInit() {
    //this.addUser();
    // this.logUser();

    // this.afAuth.app.then((app) => {
    //   const uiConfig = {
    //     signInOptions: [
    //       EmailAuthProvider.PROVIDER_ID,
    //       GoogleAuthProvider.PROVIDER_ID,
    //     ],
    //     callbacks: {
    //       signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
    //     },
    //   };

    //   this.ui = new firebaseui.auth.AuthUI(app.auth());

    //   console.log(app);

    //   this.ui.start("#firebaseui-auth-container", uiConfig);
    //   //this.ui.disableAutoSignIn();
    // });
  }

  onLogin() {
    this.userService.login("new@gmail.com", "qwertyuiop");
  }

  onRegister() {
    this.userService.login("yyy@gmail.com", "123456789");
  }


  onLoginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    // options:
    //firebase.auth().useDeviceLanguage();
    provider.setCustomParameters({
      'admin': 'true'
    });
   //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    // @type {firebase.auth.OAuthCredential}
    const credential = result.credential;

    console.log("RESULTADO");
    console.log(result);
    console.log("RESULTADO");

    // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.providerId;
    // The signed-in user info.
    var user = result.user;
    // IdP data available in result.additionalUserInfo.profile.
      // ...
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  }

  logUser() {
    firebase
      .auth()
      .signInWithEmailAndPassword("new@gmail.com", "qwertyuiop")
      .then((userCredential) => {
        // var user = userCredential.user;
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
      });


      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/v8/firebase.User
          this.uid = user.uid;
          console.log(this.uid);

          // ...
        } else {
          // User is signed out
          // ...
        }
      });


  }

  addUser() {
    firebase
      .auth()
      .createUserWithEmailAndPassword("new@gmail.com", "qwertyuiop")
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;

        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
      });


  }





  ngOnDestroy() {
    //this.ui.delete();
  }

  // onLoginSuccessful(result) {
  //   this.router.navigateByUrl("/courses");
  // }
}
