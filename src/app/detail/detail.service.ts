import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

declare var appSettings: any;

@Injectable()
export class DetailService
{
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    /**
     * Get movie details by id
     *
     * @param {number} movieId
     * @returns {Promise<any>}
     */
    getMovieDetailsById( movieId: number): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(appSettings.apiURL + 'movie/' + movieId +'?api_key=' + appSettings.apiKey)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });

    }
}
