import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  productosCarrito: ProductoGetDTO[];
  alerta: Alerta;

  constructor(private productoService: ProductoService) {
    this.productosCarrito = [];
    this.alerta = new Alerta('', '');
  }

  ngOnInit(): void {
    this.productosCarrito = this.productoService.obtenerCarrito();
  }

  quitarProducto(producto: ProductoGetDTO) {
    this.productoService.quitarCarrito(producto);
    this.productosCarrito = this.productoService.obtenerCarrito();
    this.alerta = new Alerta('Producto eliminado del carrito', 'success');
  }
  

  calcularSubtotal(): number {
    return this.productosCarrito.reduce((subtotal, producto) => subtotal + producto.precio, 0);
  }

  calcularTotal(): number {
    const subtotal = this.calcularSubtotal();
    const impuesto = subtotal * 0.16; // Supongamos un impuesto del 16%
    return subtotal + impuesto;
  }

  comprar() {
    // Lógica para realizar la compra
    // Puedes implementar la funcionalidad según tus requerimientos
    this.alerta = new Alerta('Compra realizada con éxito', 'success');
    this.productosCarrito = [];
  }
}
