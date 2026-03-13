package com.ssdk.libraryPro.repository;

import com.ssdk.libraryPro.model.EstadoPrestamo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoPrestamoRepository extends JpaRepository<EstadoPrestamo, Long> {
}
