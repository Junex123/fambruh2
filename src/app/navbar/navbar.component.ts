import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  body!: HTMLElement | null;
  menuIcon!: HTMLElement | null;
  navContent!: HTMLElement | null;
navActive: any;

  constructor() { }

  ngOnInit(): void {
    this.body = document.body;
    this.menuIcon = document.querySelector('.menu-icon');
    this.navContent = document.querySelector('.nav__content');
    this.updateMenuIconColor();
  }

  isBackgroundDark(color: string): boolean {
    const rgb = color.match(/\d+/g);
    if (rgb) {
      const brightness = (Number(rgb[0]) * 299 + Number(rgb[1]) * 587 + Number(rgb[2]) * 114) / 1000;
      return brightness <= 128; // Change the condition here
    } else {
      // Handle the case where rgb is null
      return false; // or return a default value
    }
  }

  updateMenuIconColor(): void {
    if (this.body && this.menuIcon) {
      const backgroundColor = window.getComputedStyle(this.body).backgroundColor;
      const isDark = this.isBackgroundDark(backgroundColor); // Change the method call
      this.menuIcon.style.color = isDark ? 'white' : 'black'; // Adjust the color assignment
    }
  }

  toggleNav(): void {
    if (this.body && this.navContent) {
      this.body.classList.toggle('nav-active');
      this.navContent.style.visibility = this.body.classList.contains('nav-active') ? 'visible' : 'hidden';
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateMenuIconColor();
  }

  onMenuIconClick(): void {
    this.toggleNav();
  }

  onNavContentClick(event: MouseEvent): void {
    if (event.target === this.navContent) {
      this.toggleNav();
    }
  }
}
