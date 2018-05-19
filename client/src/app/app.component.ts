import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrls: ['./app.component.css'],
  // animations: [
  //   trigger(
  //     'slideIn',
  //     [
  //       transition(
  //         ':enter', [
  //           style({ opacity: 0 }),
  //           animate('3s', style({ opacity: 1 }))
  //         ]
  //       ),
  //       transition(
  //         ':leave', [
  //           style({ 'opacity': 1 }),
  //           animate('3s', style({ opacity: 0 }))
  //         ]
  //       )
  //     ])
  // ]
})
export class AppComponent implements OnInit {
  title = 'app';
  Snap: any;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  backgroundImage: string;

  constructor(private router: Router) { }
  //backgroundImages: string[] = ["", "", ""];

  ngOnInit() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          //this.getRandomBackgroundImage();
        }
      });
  }

  // getRandomBackgroundImage() {
  //   this.backgroundImage = "assets/img/background/" + this.getRandomInt(1, 12) + ".png";
  // }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  logonPage() {
    this.router.navigate(['/login']);
  }

  register() {
    this.router.navigate(['/register']);
  }
}
