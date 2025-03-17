import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Pokemon {
  name: string;
  url: string;
  id: number;

}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private _urlBase: string = "https://pokeapi.co/api/v2/pokemon";

  constructor(private _httpClient: HttpClient) { }

  getList(url: string = this._urlBase): Observable<any> {
    return this._httpClient.get(url);
  }

  // Método para procesar los resultados y añadir el ID
  processResults(data: any): Pokemon[] {
    return data.results.map((result: any) => {
      const urlParts = result.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2], 10); // Extraemos el ID
      return { ...result, id };

    });
  }

  getPokemonById(id: string): Observable<any> {
    return this._httpClient.get(`${this._urlBase}/${id}`);
  }

}