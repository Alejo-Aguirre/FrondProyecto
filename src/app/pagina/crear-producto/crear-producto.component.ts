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
  archivos!: FileList;
  codigoUsuario: string = '1'; // Código del usuario en la base de datos

  constructor(
    private route: ActivatedRoute,
    private imagenService: ImagenService,
    private categoriaService: CategoriaService,
    private productoService: ProductoService
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
      const formData = new FormData();
      formData.append('file', this.archivos[0]);
      this.imagenService.subir(formData).subscribe({
        next: data => {
          this.producto.imagenes.push(data.respuesta.url);
          this.alerta = new Alerta('Las imágenes se subieron correctamente', 'success');
        },
        error: error => {
          console.log(error.error);
          this.alerta = new Alerta('Error al subir las imágenes', 'danger');
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

  public crearProducto() {
        this.productoService.crear(this.producto).subscribe({
      next: data => {
        this.alerta = new Alerta('El producto se creó correctamente', 'success');
      },
      error: error => {
        this.alerta = new Alerta('Error al crear el producto', 'danger');
        console.error('Error en la creación del producto:', error);
      }
    });
  }

  //evento multiple
  handleMouseDown(event: MouseEvent) {
    event.preventDefault();
    const select = event.target as HTMLSelectElement;
    const option = event.target as HTMLOptionElement;
    
    if (option.selected) {
      select.multiple = false;
      option.selected = false;
    } else {
      select.multiple = true;
      option.selected = true;
    }
  }
  
  handleClick(event: MouseEvent) {
    const option = event.target as HTMLOptionElement;
    if (option.selected) {
      option.selected = false;
    } else {
      option.selected = true;
    }
  }

  
  
}
