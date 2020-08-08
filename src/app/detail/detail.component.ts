import { Component } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DetailService } from './detail.service';

export interface MovieDetails {
  id: number,
  original_title: string,
  overview: string,
  poster_path: string,
  release_date: Date,
  vote_average: number,
  tagline: string
};

declare var appSettings: any;

@Component({
  selector: 'detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  movieId: number;
  movieDetails: MovieDetails

  constructor(
    private route: ActivatedRoute,
    private detailService: DetailService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];

      if (this.movieId == null)
        throw new Error("Movie id was not provided!");

      this.detailService.getMovieDetailsById(this.movieId).then(data => {
        debugger;
        this.movieDetails = data;
      }, err => {
        throw new Error(err);
      })

    })
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

}
