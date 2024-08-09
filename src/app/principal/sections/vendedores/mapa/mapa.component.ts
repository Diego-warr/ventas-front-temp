import { AgmInfoWindow } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {

  lat!: number;
  lon!: number;
  zoom!: number;

  arrayMarkers: any[]=[];

  currentIW!: AgmInfoWindow;
  previousIW!: AgmInfoWindow;

  constructor(private webSocketService: WebsocketService) { }

  ngOnInit(): void {
    this.lat = -12.24796090216206;
    this.lon = -76.89106540544851;
    this.zoom = 10;

    this.webSocketService.listen().subscribe({
      next: (data) => {
        console.log("SOCKET IN DATA", data.data)
        let json = JSON.parse(data.data)
        let parseDate = new Date(json.timestamp)
        console.log('TIEMSTAMP', parseDate);
        json.timestamp = parseDate;
        this.validateVendedorOnline(json);
      }
    })
  }

  validateVendedorOnline(json: any) {
    let marker = this.arrayMarkers.find(m => m.vendedorId === json.vendedorId);
    if(marker){
      marker.timestamp = json.timestamp;
      marker.latitud = json.latitud;
      marker.longitud = json.longitud
    } else{
      this.arrayMarkers.push(json)
    }
  }

  mapClick() {
    if (this.previousIW) {
      this.previousIW.close();
    }
  }

  markerClick(infoWindow) {
    if (this.previousIW) {
      this.currentIW = infoWindow;
      this.previousIW.close();
    }
    this.previousIW = infoWindow;
  }

}
