package com.ssdk.libraryPro.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "donacion")
public class Donacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate fecha = LocalDate.now();

    @Column(columnDefinition = "TEXT")
    private String observaciones;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario donante;

    @ManyToOne
    @JoinColumn(name = "ejemplar_id")
    private Ejemplar ejemplar;

    public Donacion() {}

    public Donacion(Long id, LocalDate fecha, String observaciones, Usuario donante, Ejemplar ejemplar) {
        this.id = id;
        this.fecha = fecha != null ? fecha : LocalDate.now();
        this.observaciones = observaciones;
        this.donante = donante;
        this.ejemplar = ejemplar;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getObservaciones() { return observaciones; }
    public void setObservaciones(String observaciones) { this.observaciones = observaciones; }

    public Usuario getDonante() { return donante; }
    public void setDonante(Usuario donante) { this.donante = donante; }

    public Ejemplar getEjemplar() { return ejemplar; }
    public void setEjemplar(Ejemplar ejemplar) { this.ejemplar = ejemplar; }
}
