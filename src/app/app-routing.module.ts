import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './pagina/inicio/inicio.component';
import { LoginComponent } from './pagina/login/login.component';
import { RegistroComponent } from './pagina/registro/registro.component';
import { CrearProductoComponent } from './pagina/crear-producto/crear-producto.component';
import { BusquedaComponent } from './pagina/busqueda/busqueda.component';
import { GestionProductosComponent } from './pagina/gestion-productos/gestion-productos.component';
import { FiltrarProductosComponent } from './pagina/filtrar-productos/filtrar-productos.component';
import { LoginGuard } from './guards/permiso.service';
import { MisFavoritosComponent } from './pagina/mis-favoritos/mis-favoritos.component';
import { CarritoComponent } from './pagina/carrito/carrito.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
  { path: 'mis-favoritos', component: MisFavoritosComponent },
  { path: 'carrito', component: CarritoComponent },
  { path: 'crear-producto', component: CrearProductoComponent },
  { path: 'gestion-productos', component: GestionProductosComponent },
  { path: 'filtrar-productos', component: FiltrarProductosComponent },
  { path: 'busqueda/:texto', component: BusquedaComponent },
  { path: 'producto/:categoria', component: FiltrarProductosComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
