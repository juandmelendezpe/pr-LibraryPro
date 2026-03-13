package com.ssdk.libraryPro.model;

import jakarta.persistence.*;

@Entity
@Table(name = "estado_prestamo")
public class EstadoPrestamo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descripcion_estado_prestamo", unique = true, nullable = false, length = 20)
    private String descripcion;

    public EstadoPrestamo() {}

    public EstadoPrestamo(Long id, String descripcion) {
        this.id = id;
        this.descripcion = descripcion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
}
