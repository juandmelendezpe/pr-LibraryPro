package com.ssdk.libraryPro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "devolucion")
public class Devolucion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false)
    @JoinColumn(name = "prestamo_id", nullable = false)
    private Prestamo prestamo;

    @Column(name = "fecha_devolucion", nullable = false)
    private LocalDate fechaDevolucion = LocalDate.now();

    @ManyToOne(optional = false)
    @JoinColumn(name = "gestor_id", nullable = false)
    private Usuario gestorReceptor;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    public Devolucion() {
    }

    public Devolucion(Long id, Prestamo prestamo, LocalDate fechaDevolucion, Usuario gestorReceptor, String descripcion) {
        this.id = id;
        this.prestamo = prestamo;
        this.fechaDevolucion = fechaDevolucion != null ? fechaDevolucion : LocalDate.now();
        this.gestorReceptor = gestorReceptor;
        this.descripcion = descripcion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Prestamo getPrestamo() {
        return prestamo;
    }

    public void setPrestamo(Prestamo prestamo) {
        this.prestamo = prestamo;
    }

    public LocalDate getFechaDevolucion() {
        return fechaDevolucion;
    }

    public void setFechaDevolucion(LocalDate fechaDevolucion) {
        this.fechaDevolucion = fechaDevolucion;
    }

    public Usuario getGestorReceptor() {
        return gestorReceptor;
    }

    public void setGestorReceptor(Usuario gestorReceptor) {
        this.gestorReceptor = gestorReceptor;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}
