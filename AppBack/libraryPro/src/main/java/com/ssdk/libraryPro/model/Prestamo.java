package com.ssdk.libraryPro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "prestamo")
public class Prestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDate fechaInicio = LocalDate.now();

    @Column(name = "fecha_devolucion")
    private LocalDate fechaDevolucion;

    @ManyToOne
    @JoinColumn(name = "estado_id")
    private EstadoPrestamo estado;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario prestatario;

    @ManyToOne
    @JoinColumn(name = "ejemplar_id")
    private Ejemplar ejemplar;

    public Prestamo() {}

    public Prestamo(Long id, LocalDate fechaInicio, LocalDate fechaDevolucion, EstadoPrestamo estado, Usuario prestatario, Ejemplar ejemplar) {
        this.id = id;
        this.fechaInicio = fechaInicio != null ? fechaInicio : LocalDate.now();
        this.fechaDevolucion = fechaDevolucion;
        this.estado = estado;
        this.prestatario = prestatario;
        this.ejemplar = ejemplar;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFechaInicio() { return fechaInicio; }
    public void setFechaInicio(LocalDate fechaInicio) { this.fechaInicio = fechaInicio; }

    public LocalDate getFechaDevolucion() { return fechaDevolucion; }
    public void setFechaDevolucion(LocalDate fechaDevolucion) { this.fechaDevolucion = fechaDevolucion; }

    public EstadoPrestamo getEstado() { return estado; }
    public void setEstado(EstadoPrestamo estado) { this.estado = estado; }

    public Usuario getPrestatario() { return prestatario; }
    public void setPrestatario(Usuario prestatario) { this.prestatario = prestatario; }

    public Ejemplar getEjemplar() { return ejemplar; }
    public void setEjemplar(Ejemplar ejemplar) { this.ejemplar = ejemplar; }
}
