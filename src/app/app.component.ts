import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCJplxKoKjr0QTCUEnfi6neo88L55kwwQU',
      authDomain: 'ng-recipe-book-4271a.firebaseapp.com'
    });
  }
}
