import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { PrestamoService } from '../../../services/prestamo.service';
import { DevolucionService } from '../../../services/devolucion.service';
import { DonacionService } from '../../../services/donacion.service';
import { Usuario, Prestamo, Devolucion, Donacion } from '../../../models/models';

@Component({
  selector: 'app-usuario-activity',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './usuario-activity.html'
})
export class UsuarioActivityComponent implements OnInit {
  usuario: Usuario | null = null;
  prestamos: Prestamo[] = [];
  devoluciones: Devolucion[] = [];
  donaciones: Donacion[] = [];

  activeTab: 'prestamos' | 'devoluciones' | 'donaciones' = 'prestamos';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: UsuarioService,
    private prestamoService: PrestamoService,
    private devolucionService: DevolucionService,
    private donacionService: DonacionService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.cargarUsuarioYDatos(id);
      }
    });
  }

  cargarUsuarioYDatos(id: number) {
    this.usuarioService.buscarPorId(id).subscribe(u => {
      this.usuario = u;
      this.cargarActividad(id);
    });
  }

  cargarActividad(id: number) {
    // Para simplificar, nos traemos todo y lo filtramos.
    // Una mejora futura es crear endpoints específicos en backend.
    this.prestamoService.listarTodos().subscribe(ps => {
      this.prestamos = ps.filter(p => p.prestatario?.id === id);
    });

    this.devolucionService.listarTodos().subscribe(ds => {
      // Asumimos que Devolucion tiene un 'prestamo' que tiene 'prestatario'
      this.devoluciones = ds.filter(d => d.prestamo?.prestatario?.id === id);
    });

    this.donacionService.listarTodas().subscribe(dos => {
      this.donaciones = dos.filter(do_ => do_.donante?.id === id);
    });
  }

  cambiarPestana(tab: 'prestamos' | 'devoluciones' | 'donaciones') {
    this.activeTab = tab;
  }

  gestionarDevolucion(prestamoId: number | undefined) {
    if (prestamoId) {
      this.router.navigate(['/devoluciones/nuevo', prestamoId]);
    }
  }

  volver() {
    this.router.navigate(['/gestion-responsables']);
  }
}
