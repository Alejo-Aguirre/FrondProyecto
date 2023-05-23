import { Injectable } from '@angular/core';
import { ProductoGetDTO } from '../modelo/producto-get-dto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos: ProductoGetDTO[];

  constructor() {
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
        ["https://assets.adidas.com/images/w_600,f_auto,q_auto/1fc445687ea5477d9ebdabef00b40901_9366/Ultraboost_Zapatillas_Negro_FZ0420_01_standard.jpg"],
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
        ["https://www.asus.com/media/global/products/9sK9TjACIgrQku8J/P_setting_fff_1_90_end_500.png"],
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
        ["https://www.canon-europe.com/media/eos-800d-hero_tcm13-1621932.png"],
        ["TECNOLOGIA", "FOTOGRAFIA"]
      )
    );
  
    
    

    // Agregar más productos aquí...

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
}