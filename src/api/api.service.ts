import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { map, catchError } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpService) {}

  async searchMovies(search: string) {
    const key = process.env.OMDB_API_KEY;
    return this.http
      .get(`http://www.omdbapi.com/?apikey=${key}&s=${search}`)
      .pipe(
        map((res) => {
          return res.data?.Search;
        }),
      )
      .pipe(
        catchError(() => {
          throw new Error('API not available');
        }),
      );
  }

  async getMovieById(id: string) {
    const key = process.env.OMDB_API_KEY;
    return this.http
      .get(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
      .pipe(
        map((res) => {
          return {
            Title: res.data.Title,
            Plot: res.data.Plot,
            Poster: res.data.Poster,
            Actors: res.data.Actors,
            Review: res.data.imdbRating,
            imdbID: res.data.imdbID,
            Response: res.data.Response,
          };
        }),
      )
      .pipe(
        catchError(() => {
          throw new Error('API not available');
        }),
      );
  }
}
