import { Component } from '@angular/core';
import { ProductoService } from 'src/app/servicios/producto.service';
import { ProductoGetDTO } from 'src/app/modelo/producto-get-dto';
import { Alerta } from 'src/app/modelo/alerta';

@Component({
  selector: 'app-mis-favoritos',
  templateUrl: './mis-favoritos.component.html',
  styleUrls: ['./mis-favoritos.component.css']
})
export class MisFavoritosComponent {
  favoritos: ProductoGetDTO[];
  alerta!:Alerta;

  constructor(private productoService: ProductoService) {
    this.favoritos = [];
  }

  ngOnInit(): void {
    this.favoritos = this.productoService.obtenerFavoritos();
  }

  quitarFavorito(producto: ProductoGetDTO) {
    this.productoService.quitarFavorito(producto);
    this.favoritos = this.productoService.obtenerFavoritos();
  
    this.alerta = new Alerta("Producto eliminado de favoritos", "success");
  }
  


}
