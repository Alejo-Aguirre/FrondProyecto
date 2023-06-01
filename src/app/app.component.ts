import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from './servicios/producto.service';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  categorias: string[];
  selectedCategoria: string;
  productos: ProductoGetDTO[];
  mostrarProductos: boolean = false;

  constructor(public router: Router, private productoService: ProductoService) {
    this.categorias = [];
    this.selectedCategoria = '';
    this.productos = [];
  }

  ngOnInit() {
    this.categorias = this.productoService.obtenerCategorias();
    this.productos = this.productoService.listar();
    this.mostrarProductos = this.router.url === '/filtrar-productos'; // Mostrar productos solo en la página de inicio
  }

  iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }

  seleccionarCategoria(categoria: string) {
    if (categoria) {
      this.selectedCategoria = categoria;
      this.productos = this.productoService.obtenerProductosPorCategoria(this.selectedCategoria);
      this.redireccionarProductosFiltrados();
    } else {
      this.selectedCategoria = '';
      this.productos = this.productoService.listar();
      this.redireccionarPaginaPrincipal();
    }
  }

  redireccionarProductosFiltrados() {
    if (this.router.url === '/filtrar-productos/' + this.selectedCategoria) {
      return;
    }
    this.router.navigate(['/filtrar-productos', this.selectedCategoria]);
  }

  redireccionarPaginaPrincipal() {
    if (this.router.url === '/') {
      return;
    }
    this.router.navigate(['/']);
  }

  redireccionarCrearProducto() {
    this.router.navigate(['/crear-producto']);
  }

  redireccionarGestionProductos() {
    this.router.navigate(['/gestion-productos']);
  }

  redireccionarAFiltrar() {
    if (this.selectedCategoria) {
      this.router.navigate(['/filtrar-productos']);
    }
  }

  title = 'Unimarket';
}
