import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { MapBrowserEvent } from 'ol';
import { toStringXY } from 'ol/coordinate';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Geometry } from 'ol/geom';
import { BarService } from '@app/services/bar/bar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent  implements OnInit, AfterViewInit {
  map!: Map;
  vectorSource!: VectorSource<Feature<Geometry>>;
  vectorLayer!: VectorLayer<VectorSource<Feature<Geometry>>>;
  coordinatesSubscription: Subscription;
  cordenadas:any;



  constructor(private bar:BarService){
    this.coordinatesSubscription = this.bar.getCoordinates().subscribe(coordinates => {
      if (coordinates) {
        this.edicioncordenadas(coordinates);
      }
    });
  }


  ngOnInit() {}

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap() { 

    this.vectorSource = new VectorSource<Feature<Geometry>>();
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource,
      style: new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: 'assets/icon/market.png', // Reemplaza esto con la ruta a tu icono de marcador
        }),
      }),
    });

    this.map = new Map({
      target: 'map', // ID del elemento HTML que contendrá el mapa
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        this.vectorLayer,
      ],
      view: new View({
        center: [-8861349.65, -239383.20],
        zoom: 16,
      }),
    });

     // Agregar un evento de clic al mapa
     this.map.on('click', (event: MapBrowserEvent<UIEvent>) => {
      this.handleMapClick(event);
    });
  }

  handleMapClick(event: MapBrowserEvent<UIEvent>) {
    // Obtener las coordenadas del clic
    const coordinates = event.coordinate;

    // Convertir las coordenadas a una cadena legible
    const coordinatesString = toStringXY(coordinates, 2);

    // Imprimir las coordenadas en la consola (puedes hacer algo más útil aquí)
    console.log('Ubicación seleccionada:', coordinatesString); 
    
    this.bar.sendCoordinates({ latitud: coordinates[1], longitud: coordinates[0] });
    // Limpiar marcadores anteriores
    this.vectorSource.clear(); 
    // Crear un nuevo marcador en la ubicación seleccionada
    const marker = new Feature({
      geometry: new Point(coordinates),
    });
    // Agregar el marcador a la capa de vectores
    this.vectorSource.addFeature(marker);

    // Puedes realizar otras acciones aquí, como enviar las coordenadas al formulario, etc.
  }

  edicioncordenadas(coordinates: { latitud: number; longitud: number }){
    console.log('Nuevas coordenadas recibidas:', coordinates);
    this.cordenadas = coordinates;
    this.vectorSource.clear(); 
    // Crear un nuevo marcador en la ubicación seleccionada
    const marker = new Feature({
    geometry: new Point(fromLonLat([coordinates.latitud, coordinates.longitud], 'EPSG:4326')),
  });
  
    // Agregar el marcador a la capa de vectores
    this.vectorSource.addFeature(marker);

  }
}