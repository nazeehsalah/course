import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../model/user';
import { AngularFireDatabase } from 'angularfire2/database'
import { UserProvider } from '../user/user';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private user: firebase.User
  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public userProvider: UserProvider

  ) {
    afAuth.authState.subscribe(user => {
      this.user = user
    })
  }
  signIn(user: { email: string, password: string }) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
  }
  signUp(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
  }
  logout() {
    return this.afAuth.auth.signOut()
  }
  deleteUser(user:User) {
   /*  console.log(user.email)
    this.afAuth.auth.currentUser.
    this.afAuth.auth.currentUser.delete() */
  }
}
