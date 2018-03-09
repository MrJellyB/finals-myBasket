import { Component, Renderer2, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UsersServiceService} from '../../modules/login/users-service.service';
import { BasketModule } from '../../modules/basket/basket.module';
import { BasketService } from '../../services/basketService/basket-service.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @ViewChild('supermarketVideo') supermarketVideo: ElementRef; 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.supermarketVideo.nativeElement.muted = false;
  }
}
