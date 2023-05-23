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
        2,
        "Tenis Nike",
        "Descripción 2",
        650000,
        4,
        ["https://picsum.photos/450/225"],
        ["ROPA", "DEPORTE"]
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