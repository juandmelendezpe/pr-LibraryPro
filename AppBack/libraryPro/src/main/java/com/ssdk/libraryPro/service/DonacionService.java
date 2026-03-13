package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Donacion;
import com.ssdk.libraryPro.repository.DonacionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DonacionService {
    private final DonacionRepository donacionRepository;

    public DonacionService(DonacionRepository donacionRepository) {
        this.donacionRepository = donacionRepository;
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
        return donacionRepository.save(donacion);
    }

    @Transactional
    public void eliminar(Long id) {
        donacionRepository.deleteById(id);
    }
}
