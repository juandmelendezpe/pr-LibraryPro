package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Donacion;
import com.ssdk.libraryPro.repository.DonacionRepository;
import com.ssdk.libraryPro.repository.EjemplarRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DonacionService {
    private final DonacionRepository donacionRepository;
    private final EjemplarRepository ejemplarRepository;

    public DonacionService(DonacionRepository donacionRepository, EjemplarRepository ejemplarRepository) {
        this.donacionRepository = donacionRepository;
        this.ejemplarRepository = ejemplarRepository;
    }

    @Transactional(readOnly = true)
    public List<Donacion> listarTodas() {
        return donacionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Optional<Donacion> buscarPorId(Long id) {
        return donacionRepository.findById(id);
    }

    @Transactional
    public Donacion guardar(Donacion donacion) {
        if (donacion.getEjemplar() != null && donacion.getEjemplar().getId() == null) {
            ejemplarRepository.save(donacion.getEjemplar()); 
        }
        return donacionRepository.save(donacion);
    }

    @Transactional
    public void eliminar(Long id) {
        donacionRepository.deleteById(id);
    }
}
