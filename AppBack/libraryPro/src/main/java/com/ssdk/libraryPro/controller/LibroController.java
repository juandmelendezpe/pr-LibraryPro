package com.ssdk.libraryPro.controller;

import com.ssdk.libraryPro.model.Libro;
import com.ssdk.libraryPro.service.LibroService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libros")
@CrossOrigin(origins = "*")
public class LibroController {
    private final LibroService libroService;

    public LibroController(LibroService libroService) {
        this.libroService = libroService;
    }

    @GetMapping
    public List<Libro> listar() {
        return libroService.listarTodos();
    }

    @GetMapping("/buscar")
    public List<Libro> buscar(@RequestParam(required = false) String titulo,
                              @RequestParam(required = false) String autor,
                              @RequestParam(required = false) String genero) {
        if (titulo != null) return libroService.buscarPorTitulo(titulo);
        if (autor != null) return libroService.buscarPorAutor(autor);
        if (genero != null) return libroService.buscarPorGenero(genero);
        return libroService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> buscarPorId(@PathVariable Long id) {
        return libroService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Libro guardar(@RequestBody Libro libro) {
        return libroService.guardar(libro);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        libroService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
