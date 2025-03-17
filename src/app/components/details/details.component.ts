import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  standalone: false,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  idPokemon: string = '';
  pokemonDetails: any = null;
  types: string[] = []; // Lista de tipos procesados
  abilities: string[] = []; // Lista de habilidades procesadas

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  get pokemonTypes(): string[] {
    return this.pokemonDetails?.types.map((type: any) => type.name) || [];
  }

  get pokemonAbilities(): string[] {
    return this.pokemonDetails?.abilities.map((ability: any) => ability.name) || [];
  }

  ngOnInit(): void {
    this.idPokemon = this.route.snapshot.paramMap.get('idPokemon') || '';


    if (this.idPokemon) {
      this.pokemonService.getPokemonById(this.idPokemon).subscribe(
        (data) => {
          this.pokemonDetails = data;          


          // Procesar los tipos
          this.types = this.pokemonDetails.types.map(
            (type: any) => type.type.name
          );

          // Procesar las habilidades
          this.abilities = this.pokemonDetails.abilities.map(
            (ability: any) => ability.ability.name
          );
        },
        (error) => {
          console.error('Error al obtener los detalles del Pokémon:', error);
        }
      );
    }
  }
}
