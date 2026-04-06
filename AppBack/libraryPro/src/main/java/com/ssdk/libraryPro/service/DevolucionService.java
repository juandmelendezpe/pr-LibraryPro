package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Devolucion;
import com.ssdk.libraryPro.model.Ejemplar;
import com.ssdk.libraryPro.model.EstadoLibro;
import com.ssdk.libraryPro.model.EstadoPrestamo;
import com.ssdk.libraryPro.model.Prestamo;
import com.ssdk.libraryPro.repository.DevolucionRepository;
import com.ssdk.libraryPro.repository.EjemplarRepository;
import com.ssdk.libraryPro.repository.PrestamoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DevolucionService {

    @Autowired
    private DevolucionRepository devolucionRepository;

    @Autowired
    private PrestamoRepository prestamoRepository;

    @Autowired
    private EjemplarRepository ejemplarRepository;

    public List<Devolucion> listarTodos() {
        return devolucionRepository.findAll();
    }

    public Optional<Devolucion> buscarPorId(Long id) {
        return devolucionRepository.findById(id);
    }

    @Transactional
    public Devolucion guardar(Devolucion devolucion) {
        // Enlazar el préstamo real desde BD si viene con ID
        if (devolucion.getPrestamo() != null && devolucion.getPrestamo().getId() != null) {
            Optional<Prestamo> prestamoOpt = prestamoRepository.findById(devolucion.getPrestamo().getId());
            if (prestamoOpt.isPresent()) {
                Prestamo prestamo = prestamoOpt.get();
                
                // Actualizar Estado del Préstamo a Devuelto/Finalizado (Asumimos ID 2 o similar)
                EstadoPrestamo estadoTerminado = new EstadoPrestamo();
                estadoTerminado.setId(2L); // 2: Cerrado/Devuelto
                prestamo.setEstado(estadoTerminado);
                prestamo.setFechaDevolucion(LocalDate.now());
                prestamoRepository.save(prestamo);

                // Actualizar Estado del Ejemplar a Disponible (Asumimos ID 1)
                Ejemplar ejemplar = prestamo.getEjemplar();
                if (ejemplar != null) {
                    EstadoLibro estadoDisponible = new EstadoLibro();
                    estadoDisponible.setId(1L); // 1: Disponible
                    ejemplar.setEstado(estadoDisponible);
                    ejemplarRepository.save(ejemplar);
                }
            }
        }

        // Guardar la devolución
        return devolucionRepository.save(devolucion);
    }

    @Transactional
    public void eliminar(Long id) {
        devolucionRepository.deleteById(id);
    }
}
