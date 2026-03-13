package com.ssdk.libraryPro.repository;

import com.ssdk.libraryPro.model.EstadoLibro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoLibroRepository extends JpaRepository<EstadoLibro, Long> {
}
