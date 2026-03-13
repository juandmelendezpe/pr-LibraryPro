package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Prestamo;
import com.ssdk.libraryPro.repository.PrestamoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class PrestamoService {
    private final PrestamoRepository prestamoRepository;

    public PrestamoService(PrestamoRepository prestamoRepository) {
        this.prestamoRepository = prestamoRepository;
    }

    @Transactional(readOnly = true)
    public List<Prestamo> listarTodos() {
        return prestamoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Prestamo> buscarPorId(Long id) {
        return prestamoRepository.findById(id);
    }

    @Transactional
    public Prestamo guardar(Prestamo prestamo) {
        return prestamoRepository.save(prestamo);
    }

    @Transactional
    public void eliminar(Long id) {
        prestamoRepository.deleteById(id);
    }
}
