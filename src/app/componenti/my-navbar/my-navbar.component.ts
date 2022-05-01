import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'my-navbar',
  templateUrl: './my-navbar.component.html',
  styleUrls: ['./my-navbar.component.scss']
})
export class MyNavbar implements OnInit {

  constructor(private route : ActivatedRoute,private elementRef: ElementRef) { }

  ngOnInit(): void {
  }

  isCollapse:boolean=false


}
