package com.ssdk.libraryPro.repository;

import com.ssdk.libraryPro.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);

    @org.springframework.data.jpa.repository.Query("SELECT u FROM Usuario u WHERE LOWER(u.nombre) LIKE LOWER(CONCAT('%', :termino, '%')) OR u.email = :termino OR u.telefono = :termino")
    java.util.List<Usuario> buscarPorNombreEmailOTelefono(@org.springframework.data.repository.query.Param("termino") String termino);
}
