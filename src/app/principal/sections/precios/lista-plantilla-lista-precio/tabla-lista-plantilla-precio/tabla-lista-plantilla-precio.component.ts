import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantillaListaPreciosDTO } from 'src/app/dto/PlantillaListaPreciosDTO';
import { PlantillaListaPreciosService } from 'src/app/services/plantilla-lista-precios.service';

@Component({
  selector: 'app-tabla-lista-plantilla-precio',
  templateUrl: './tabla-lista-plantilla-precio.component.html',
  styleUrls: ['./tabla-lista-plantilla-precio.component.scss']
})
export class TablaListaPlantillaPrecioComponent implements OnInit {

  plantillaPreciosList: PlantillaListaPreciosDTO[]=[];


  constructor(private plantillaListaPreciosService: PlantillaListaPreciosService,
              private route: Router) { }

  ngOnInit(): void {
    this.getAllPlantillaListaPrecios();
  }

  getAllPlantillaListaPrecios() {
    this.plantillaListaPreciosService.getAll().subscribe(
      data => {
        if (data.status ='OK') {
          this.plantillaPreciosList = data.data!;
        }    
      },
      error => {
        console.log(error);
        return "Error";
      }
    )
  }

  irVistaNuevaPlantillaListaPrecios() {
    this.route.navigate(['precio/plantilla-lista-precio']);
  }

  irVistaInformacionListaPrecios(plantilla: PlantillaListaPreciosDTO) {
    this.route.navigate(['precio/ver-plantilla-lista-precio/' + `${plantilla.plantillaListaPreciosId}`]);
  }


}
