package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Ejemplar;
import com.ssdk.libraryPro.repository.EjemplarRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EjemplarService {
    private final EjemplarRepository ejemplarRepository;

    public EjemplarService(EjemplarRepository ejemplarRepository) {
        this.ejemplarRepository = ejemplarRepository;
    }

    @Transactional(readOnly = true)
    public List<Ejemplar> listarTodos() {
        return ejemplarRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Ejemplar> buscarPorLibroId(Long libroId) {
        return ejemplarRepository.findByLibroId(libroId);
    }

    @Transactional(readOnly = true)
    public List<Ejemplar> buscarPorEstadoId(Long estadoId) {
        return ejemplarRepository.findByEstadoId(estadoId);
    }

    @Transactional(readOnly = true)
    public Optional<Ejemplar> buscarPorId(Long id) {
        return ejemplarRepository.findById(id);
    }

    @Transactional
    public Ejemplar guardar(Ejemplar ejemplar) {
        return ejemplarRepository.save(ejemplar);
    }

    @Transactional
    public void eliminar(Long id) {
        ejemplarRepository.deleteById(id);
    }
}
