import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  producto: ProductoDTO;
  categorias: string[];
  modoEdicion: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private imagenService: ImagenService,
    private categoriaService: CategoriaService
  ) {
    this.categorias = [];
    this.producto = new ProductoDTO();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.modoEdicion = params['modoEdicion'] === 'true';
      this.cargarCategorias();
    });
  }

  private cargarCategorias() {
    this.categoriaService.listar().subscribe(
      data => {
        this.categorias = data.respuesta;
      },
      error => {
        console.log('Ocurrió un error al cargar las categorías.');
        // Mostrar un mensaje de error genérico o realizar alguna otra acción
      }
    );
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files);
    }
  }

  archivos!: FileList;

  public crearProducto() {
    if (this.archivos != null && this.archivos.length > 0) {
      console.log(this.producto);
    } else {
      console.log('Debe seleccionar al menos una imagen');
    }
  }
}
