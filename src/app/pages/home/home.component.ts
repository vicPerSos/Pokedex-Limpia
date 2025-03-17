import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../services/pokemon.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public resultados: Pokemon[] = [];
  public nextPage: string = "";
  public prevPage: string = "";
  public loading = true;
  public error = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.cargarLista();
  }

  cargarLista(url: string = "https://pokeapi.co/api/v2/pokemon"): void {
    this.loading = true;
    this.error = false;

    this.pokemonService.getList(url).subscribe(
      (data: any) => {
        this.resultados = this.pokemonService.processResults(data);

       
        this.resultados.forEach(pokemon => {
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
          // Verificar si la imagen existe haciendo una solicitud HEAD
          fetch(imageUrl, { method: 'HEAD' })
            .then(response => {
              if (!response.ok) {
                console.warn(`Imagen no encontrada para ${pokemon.name}:`, imageUrl);
              }
            })
            .catch(error => {
              console.error(`Error al verificar la imagen para ${pokemon.name}:`, error);
            });
        });

        this.nextPage = data.next;
        this.prevPage = data.previous;
        this.loading = false;
      },
      (error) => {
        this.error = true;
        this.loading = false;        console.error('Error:', error);
      }
    );
  }
}