package com.ssdk.libraryPro.controller;

import com.ssdk.libraryPro.model.Devolucion;
import com.ssdk.libraryPro.service.DevolucionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/devoluciones")
@CrossOrigin(origins = "*") // Para permitir peticiones desde Angular
public class DevolucionController {

    @Autowired
    private DevolucionService devolucionService;

    @GetMapping
    public List<Devolucion> listarTodos() {
        return devolucionService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Devolucion> buscarPorId(@PathVariable Long id) {
        Optional<Devolucion> devolucion = devolucionService.buscarPorId(id);
        return devolucion.map(ResponseEntity::ok)
                         .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Devolucion> guardar(@RequestBody Devolucion devolucion) {
        Devolucion nuevaDevolucion = devolucionService.guardar(devolucion);
        return ResponseEntity.ok(nuevaDevolucion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (devolucionService.buscarPorId(id).isPresent()) {
            devolucionService.eliminar(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
