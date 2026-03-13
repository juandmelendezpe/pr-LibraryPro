package com.ssdk.libraryPro.controller;

import com.ssdk.libraryPro.model.Donacion;
import com.ssdk.libraryPro.service.DonacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donaciones")
@CrossOrigin(origins = "*")
public class DonacionController {
    private final DonacionService donacionService;

    public DonacionController(DonacionService donacionService) {
        this.donacionService = donacionService;
    }

    @GetMapping
    public List<Donacion> listar() {
        return donacionService.listarTodas();
    }

    @PostMapping
    public Donacion guardar(@RequestBody Donacion donacion) {
        return donacionService.guardar(donacion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        donacionService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
