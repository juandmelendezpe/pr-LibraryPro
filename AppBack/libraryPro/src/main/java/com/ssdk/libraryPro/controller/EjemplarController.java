package com.ssdk.libraryPro.controller;

import com.ssdk.libraryPro.model.Ejemplar;
import com.ssdk.libraryPro.service.EjemplarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ejemplares")
@CrossOrigin(origins = "*")
public class EjemplarController {
    private final EjemplarService ejemplarService;

    public EjemplarController(EjemplarService ejemplarService) {
        this.ejemplarService = ejemplarService;
    }

    @GetMapping
    public List<Ejemplar> listar() {
        return ejemplarService.listarTodos();
    }

    @GetMapping("/libro/{libroId}")
    public List<Ejemplar> buscarPorLibro(@PathVariable Long libroId) {
        return ejemplarService.buscarPorLibroId(libroId);
    }

    @GetMapping("/estado/{estadoId}")
    public List<Ejemplar> buscarPorEstado(@PathVariable Long estadoId) {
        return ejemplarService.buscarPorEstadoId(estadoId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ejemplar> buscarPorId(@PathVariable Long id) {
        return ejemplarService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Ejemplar guardar(@RequestBody Ejemplar ejemplar) {
        return ejemplarService.guardar(ejemplar);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        ejemplarService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
