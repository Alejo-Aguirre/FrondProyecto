import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Alerta } from 'src/app/modelo/alerta';
import { ProductoDTO } from 'src/app/modelo/producto-dto';
import { CategoriaService } from 'src/app/servicios/categoria.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  producto: ProductoDTO;
  categorias: string[];
  modoEdicion: boolean = false;
  alerta!: Alerta;

  constructor(
    private route: ActivatedRoute,
    private imagenService: ImagenService,
    private categoriaService: CategoriaService,
    private productoService : ProductoService
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

  public subirImagenes() {
    if (this.archivos != null && this.archivos.length > 0) {
      const objeto = this;
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          objeto.producto.imagenes.push(data.respuesta.url);
          objeto.alerta = new Alerta('Las imágenes se subieron correctamente', 'success');
        },
        error: error => {
          console.log(error.error);
          objeto.alerta = new Alerta('Error al subir las imágenes', 'danger');
        }
      });
    } else {
      console.log('Debe seleccionar al menos una imagen y subirla');
      this.alerta = new Alerta('Debe seleccionar al menos una imagen y subirla', 'danger');
    }
  }
  onFileChange(event: any) {
    this.archivos = event.target.files;
    if (event.target.files.length > 0) {
      const files = event.target.files;
      console.log(files);
    }
  }

  archivos!: FileList;

  
  public crearProducto() {
    const objeto = this;
    this.productoService.crear(this.producto).subscribe({
      next: data => {
        objeto.alerta = new Alerta('El producto se creó correctamente', 'success');
      },
      error: error => {
        objeto.alerta = new Alerta('Error al crear el producto', 'danger');
      }
    });
  }
  
  
}
