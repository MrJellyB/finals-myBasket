import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  Snap: any;
  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem("basket", "[]");
  }

  logonPage() {
    this.router.navigate(['/login']);
  }


  register() {
    this.router.navigate(['/register']);
  }
}
