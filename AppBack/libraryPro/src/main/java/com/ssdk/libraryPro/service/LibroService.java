package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Libro;
import com.ssdk.libraryPro.repository.LibroRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LibroService {
    private final LibroRepository libroRepository;

    public LibroService(LibroRepository libroRepository) {
        this.libroRepository = libroRepository;
    }

    @Transactional(readOnly = true)
    public List<Libro> listarTodos() {
        return libroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Libro> buscarPorTitulo(String titulo) {
        return libroRepository.findByTituloContainingIgnoreCase(titulo);
    }

    @Transactional(readOnly = true)
    public List<Libro> buscarPorAutor(String autor) {
        return libroRepository.findByAutorContainingIgnoreCase(autor);
    }

    @Transactional(readOnly = true)
    public List<Libro> buscarPorGenero(String genero) {
        return libroRepository.findByGeneroContainingIgnoreCase(genero);
    }

    @Transactional(readOnly = true)
    public Optional<Libro> buscarPorId(Long id) {
        return libroRepository.findById(id);
    }

    @Transactional
    public Libro guardar(Libro libro) {
        return libroRepository.save(libro);
    }

    @Transactional
    public void eliminar(Long id) {
        libroRepository.deleteById(id);
    }
}
