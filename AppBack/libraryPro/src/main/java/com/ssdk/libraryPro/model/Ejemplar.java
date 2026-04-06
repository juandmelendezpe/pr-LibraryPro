package com.ssdk.libraryPro.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "ejemplar")
public class Ejemplar {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "libro_id")
	@JsonIgnoreProperties("ejemplares")
	private Libro libro;

	@Column(name = "fec_ingreso", nullable = false)
	private LocalDate fecIngreso = LocalDate.now();

	@Column(length = 100)
	private String detalle;

	@ManyToOne
	@JoinColumn(name = "estado_id")
	private EstadoLibro estado;

	public Ejemplar() {
	}

	public Ejemplar(Long id, Libro libro, LocalDate fecIngreso, String detalle, EstadoLibro estado) {
		this.id = id;
		this.libro = libro;
		this.fecIngreso = fecIngreso != null ? fecIngreso : LocalDate.now();
		this.detalle = detalle;
		this.estado = estado;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Libro getLibro() {
		return libro;
	}

	public void setLibro(Libro libro) {
		this.libro = libro;
	}

	public LocalDate getFecIngreso() {
		return fecIngreso;
	}

	public void setFecIngreso(LocalDate fecIngreso) {
		this.fecIngreso = fecIngreso;
	}

	public String getDetalle() {
		return detalle;
	}

	public void setDetalle(String detalle) {
		this.detalle = detalle;
	}

	public EstadoLibro getEstado() {
		return estado;
	}

	public void setEstado(EstadoLibro estado) {
		this.estado = estado;
	}
}
