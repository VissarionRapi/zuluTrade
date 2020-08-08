import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

declare var appSettings: any;

@Injectable()
export class MovieListService implements Resolve<any>
{
    mostPopulasMoviesDesc: any[];
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
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getMostPopularDesc()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Most popular movies in desc orser
     *
     * @returns {Promise<any>}
     */
    getMostPopularDesc(): Promise<any> {

        return new Promise((resolve, reject) => {
            this._httpClient.get(appSettings.apiURL + 'discover/movie?sort_by=popularity.desc&api_key=' + appSettings.apiKey)
                .subscribe((response: any) => {
                    this.mostPopulasMoviesDesc = response;
                    resolve(response);
                }, reject);
        });

    }
}
