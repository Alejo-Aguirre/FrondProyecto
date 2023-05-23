import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';

@Component({
  selector: 'app-filtrar-productos',
  templateUrl: './filtrar-productos.component.html',
  styleUrls: ['./filtrar-productos.component.css']
})
export class FiltrarProductosComponent implements OnInit {
  categorias: string[];
  selectedCategoria: string;
  productos: ProductoGetDTO[];

  

  constructor(private productoService: ProductoService) {
    this.categorias = this.productoService.obtenerCategorias();
    this.selectedCategoria = "";
    this.productos = [];
  }

  ngOnInit(): void {
  }

  seleccionarCategoria(categoria: string): void {
    if (categoria) {
      this.selectedCategoria = categoria;
      this.filtrarProductosPorCategoria(this.selectedCategoria);
      this.productos = [];
    }
  }

  filtrarProductosPorCategoria(categoria: string): void {
    this.productos = this.productoService.obtenerProductosPorCategoria(categoria);
  }
}

