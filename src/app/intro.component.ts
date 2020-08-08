import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'intro-component',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {
  title = 'zt';
  searchForm = new FormGroup({});

  movies: any[] = ["Terminator", "Star Wars", "Star Trek", "Avatar", "Titanic", "The Rock"];
}
