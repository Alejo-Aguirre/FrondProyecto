import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  productos: ProductoGetDTO[];
  viewMode: string = 'grid'; // Establece la vista de cuadrícula como predeterminada

  constructor(private productoService: ProductoService) {
    this.productos = [];
  }

  ngOnInit(): void {
    this.productos = this.productoService.listar();
  }

  changeView(mode: string) {
    this.viewMode = mode;
  }

  agregarFavorito(producto: ProductoGetDTO) {
    this.productoService.agregarFavorito(producto);
  }

  agregarCarrito(producto: ProductoGetDTO) {
    this.productoService.agregarCarrito(producto);
  }

  quitarFavorito(producto: ProductoGetDTO) {
    this.productoService.quitarFavorito(producto);
  }

  esFavorito(producto: ProductoGetDTO): boolean {
    return this.productoService.esFavorito(producto);
  }
}

