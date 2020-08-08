import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MovieListService } from './list/movie-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  searchForm = new FormGroup({
    'searchControl': new FormControl()
  });
  popularMovies: any[];
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    private _movieListService: MovieListService,
    private router: Router
  ) {
    this._movieListService.getMostPopularDesc().then(data => {
      this.options = data.results.map(r => r.title);
      this.popularMovies = data.results.map(r => ({ title: r.title, id: r.id }));
    });
  }

  ngOnInit() {
    this.filteredOptions = this.searchForm.controls['searchControl'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  searchMovie() {
    const selectedValue = this.searchForm.controls['searchControl'].value;

    if (selectedValue == null || selectedValue === "") {
      alert("Please enter a movie title!")
    } else {

      const selectedMovie = this.popularMovies.find(m => m.title === selectedValue);

      if (selectedMovie == null) {
        alert("Movie not found!")
      } else {
        this.router.navigate(['/movie/' + selectedMovie.id]);
      }

    }
  }

}
