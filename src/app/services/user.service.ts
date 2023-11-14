import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import firebase from "firebase/app";
import { UserRoles } from "../model/user-roles";

@Injectable({
  providedIn: "root",
})
export class UserService {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  roles$: Observable<UserRoles>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    //afAuth.idToken.subscribe(jwt => console.log("jwt", jwt));
    //afAuth.authState.subscribe(auth => console.log("auth", auth));

    this.isLoggedIn$ = afAuth.authState.pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

    this.pictureUrl$ = afAuth.authState.pipe(
      map((user) => (user ? user.photoURL : null))
    );

    this.roles$ = this.afAuth.idTokenResult.pipe(
      map((token) => <any>token?.claims ?? { admin: false })
    );
  }

  logout() {
    //this.afAuth.signOut();
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.router.navigateByUrl("/login");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  login(email: string, pass: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, pass)
      .then((userCredential) => {
        // var user = userCredential.user;
        console.log(userCredential.user);

        this.router.navigateByUrl("/courses");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/v8/firebase.User
        console.log(user.uid); // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }
}
