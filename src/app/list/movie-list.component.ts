import { Component } from '@angular/core';
import { MovieListService } from './movie-list.service';

@Component({
    selector: 'movie-list-component',
    templateUrl: './movie-list.component.html',
    styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent {
    movies: any[];

    constructor(
        private _movieListService: MovieListService
    ) {
        this._movieListService.getMostPopularDesc().then( data => {
            this.movies = data.results.map(r => ({ title: r.title, id: r.id }));
        }, err => {
            throw new Error(err);       
        })
    }
}
