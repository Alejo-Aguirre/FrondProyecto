import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';
import { ProductoDTO } from '../modelo/producto-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private proURL = "http://localhost:8080/api/producto";
  productos: ProductoGetDTO[] = [];
  favoritos: ProductoGetDTO[] = [];
  carrito: ProductoGetDTO[] = [];

  constructor(private http: HttpClient) {
    this.productos = [];
    
    
    this.productos.push(
      new ProductoGetDTO(
        1,
        "Televisor LG 4K",
        "Descripción 1",
        3500000,
        2,
        ["https://www.lg.com/cl/images/televisores/md07533310/gallery/D-01C.jpg"],
        ["TECNOLOGIA"]
      )
    );
    this.productos.push(
      new ProductoGetDTO(
        1,
        "Televisor Samsung 4K",
        "Descripción 2",
        3800000,
        2,
        ["https://images.samsung.com/is/image/samsung/p6pim/pe/un55bu8200gxpe/gallery/pe-crystaluhd-bu8000-452513-un55bu8200gxpe-535540407?$650_519_PNG$"],
        ["TECNOLOGIA"]
      )
    );
    this.productos.push(
      new ProductoGetDTO(
        3,
        "Smartphone iPhone 12",
        "Potente smartphone con cámara de alta resolución y pantalla Retina.",
        879000,
        5,
        ["https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-12-select-2020?wid=470&hei=556&fmt=png-alpha&.v=1604343705000"],
        ["TECNOLOGIA"]
      )
    );
    this.productos.push(
      new ProductoGetDTO(
        4,
        "Zapatillas Adidas Ultraboost",
        "Zapatillas deportivas con tecnología de amortiguación y gran comodidad.",
        189900,
        7,
        ["https://assets.adidas.com/images/w_600,f_auto,q_auto/8cb978de57934d0b9227aaea00df82c6_9366/Zapatillas_para_correr_Ultraboost_20_Negro_EG1341_01_standard.jpg"],
        ["ROPA", "DEPORTE"]
      )
    );
    
    this.productos.push(
      new ProductoGetDTO(
        5,
        "Monitor Gaming ASUS",
        "Monitor de alta velocidad de respuesta y excelente calidad de imagen.",
        599999,
        3,
        ["https://i.blogs.es/1bcbed/asus-tuf-gaming-vg27vq-2/1366_2000.jpeg"],
        ["TECNOLOGIA"]
      )
    );
    
    this.productos.push(
      new ProductoGetDTO(
        6,
        "Cámara Canon EOS Rebel T7i",
        "Cámara réflex digital con sensor de imagen de alta resolución.",
        1299999,
        4,
        ["https://falabella.scene7.com/is/image/FalabellaCO/27321550_5?wid=800&hei=800&qlt=70"],
        ["TECNOLOGIA", "FOTOGRAFIA"]
      )
    );
    this.productos.push(
      new ProductoGetDTO(
        7,
        "PlayStation 5",
        "Consola de última generación con gráficos de alta calidad y gran rendimiento.",
        499990,
        10,
        ["https://cloudfront-us-east-1.images.arcpublishing.com/semana/6C6PRPOQNZCGZBNCLL6ZVEXAL4.jpg"],
        ["VIDEOJUEGOS", "TECNOLOGIA"]
      )
    );
    
    this.productos.push(
      new ProductoGetDTO(
        8,
        "Nintendo Switch",
        "Consola híbrida que permite jugar tanto en casa como en modo portátil.",
        299990,
        8,
        ["https://http2.mlstatic.com/D_NQ_NP_2X_919090-MCO31111792328_062019-F.webp"],
        ["VIDEOJUEGOS", "TECNOLOGIA"]
      )
    );

    this.productos.push(
      new ProductoGetDTO(
        9,
        "El Gran Gatsby",
        "Novela clásica escrita por F. Scott Fitzgerald que retrata la vida en la década de 1920.",
        15900,
        10,
        ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCP5jV16BHBifyrSdAhXBxMX9EeqsogTMpw&usqp=CAU"],
        ["LIBROS"]
      )
    );
    
    
     

/*
    this.cargarProductos().subscribe(
      (productos: ProductoGetDTO[]) => {
        this.productos = productos;
      },
      (error) => {
        console.error('Error al cargar los productos desde la base de datos:', error);
      }
    );
    */
  }
  
/*
  private cargarProductos(): Observable<ProductoGetDTO[]> {
    return this.http.get<any>(`${this.proURL}/listarproductos`).pipe(
      catchError((error: any): Observable<ProductoGetDTO[]> => {
        console.error('Error al cargar los productos desde la base de datos. Se utilizarán los productos quemados.', error);
        return throwError('Error al cargar los productos');
      }),
      map((response: any) => response.productos) // Extraer los productos de la respuesta
    );
  }
  */

  public crear(producto: ProductoDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.proURL}/crear`, producto);
  }
  
  public listar(): ProductoGetDTO[] {
    return this.productos;
  }

  public obtenerProductosPorCategoria(categoria: string): ProductoGetDTO[] {
    return this.productos.filter((producto) => producto.categorias.includes(categoria));
  }

  public obtenerCategorias(): string[] {
    const categorias: Set<string> = new Set();
    this.productos.forEach((producto) => {
      producto.categorias.forEach((categoria) => {
        categorias.add(categoria);
      });
    });
    return Array.from(categorias);
  }

  agregarFavorito(producto: ProductoGetDTO) {
    this.favoritos.push(producto);
  }
  agregarCarrito(producto: ProductoGetDTO) {
    this.carrito.push(producto);
  }


  quitarFavorito(producto: ProductoGetDTO) {
    const index = this.favoritos.findIndex((p) => p.codigo === producto.codigo);
    if (index !== -1) {
      this.favoritos.splice(index, 1);
    }
  }

  quitarCarrito(producto: ProductoGetDTO) {
    const index = this.productos.findIndex((p) => p.codigo === producto.codigo);
    if (index !== -1) {
      this.productos.splice(index, 1);
    }
  }
  

  obtenerFavoritos(): ProductoGetDTO[] {
    return this.favoritos;
  }

  obtenerCarrito(): ProductoGetDTO[] {
    return this.carrito;
  }

  esFavorito(producto: ProductoGetDTO): boolean {
    return this.favoritos.some((p) => p.codigo === producto.codigo);
  }


}