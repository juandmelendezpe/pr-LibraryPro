package com.ssdk.libraryPro.service;

import com.ssdk.libraryPro.model.Rol;
import com.ssdk.libraryPro.model.Usuario;
import com.ssdk.libraryPro.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UsuarioServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UsuarioService usuarioService;

    private Usuario usuarioMock;

    @BeforeEach
    void setUp() {
        // Crear un Rol simulado para el usuario
        Rol rol = new Rol(1L, "lector");

        // Construir un Usuario simulado utilizando el constructor completo
        usuarioMock = new Usuario(
                1L, 
                "Juan Perez", 
                "juan@correo.com", 
                "password123", 
                "123456789", 
                "Calle Falsa 123", 
                rol, 
                true
        );
    }

    @Test
    void testCrearUsuario_GuardarExitoso() {
        // Arrange: Instruimos al mock del repositorio para que retorne usuarioMock
        // cuando se intente guardar cualquier objeto de tipo Usuario.
        when(usuarioRepository.save(any(Usuario.class))).thenReturn(usuarioMock);

        // Act: Ejecutamos el método del servicio encargado de crear el usuario.
        Usuario nuevoUsuario = new Usuario();
        nuevoUsuario.setNombre("Juan Perez");
        nuevoUsuario.setEmail("juan@correo.com");
        
        Usuario usuarioGuardado = usuarioService.guardar(nuevoUsuario);

        // Assert: Validamos que el resultado no sea nulo y contenga los datos esperados.
        assertNotNull(usuarioGuardado, "El usuario guardado no debe ser nulo");
        assertEquals("Juan Perez", usuarioGuardado.getNombre(), "El nombre debe coincidir con el mock");
        assertEquals("juan@correo.com", usuarioGuardado.getEmail(), "El correo debe coincidir con el mock");
        assertEquals(1L, usuarioGuardado.getId(), "El ID generado debe ser 1");
        
        // Verificamos que el repositorio efectivamente llamó al método save() exactamente una vez.
        verify(usuarioRepository, times(1)).save(nuevoUsuario);
    }

    @Test
    void testLogin_BuscarPorEmail_Exitoso() {
        // Arrange: En este backend la base del login (comprobación de credenciales)
        // recae en buscar el usuario por su email. Simulamos que sí existe en la BD.
        when(usuarioRepository.findByEmail("juan@correo.com")).thenReturn(Optional.of(usuarioMock));

        // Act: Solicitamos el usuario al servicio
        Optional<Usuario> usuarioEncontrado = usuarioService.buscarPorEmail("juan@correo.com");

        // Assert: Comprobamos que el usuario fue encontrado y tiene la contraseña correcta (Login Ok)
        assertTrue(usuarioEncontrado.isPresent(), "El usuario debería existir en la base de datos");
        assertEquals("password123", usuarioEncontrado.get().getContrasena(), "La contraseña debe coincidir para proceder con la autorización");
        
        // Verificamos que el método del repositorio se ejecutó una vez
        verify(usuarioRepository, times(1)).findByEmail("juan@correo.com");
    }

    @Test
    void testLogin_BuscarPorEmail_FalloNoExiste() {
        // Arrange: Simulamos un intento de login con un correo que no está registrado
        when(usuarioRepository.findByEmail("desconocido@correo.com")).thenReturn(Optional.empty());

        // Act: Intentamos buscar
        Optional<Usuario> usuarioEncontrado = usuarioService.buscarPorEmail("desconocido@correo.com");

        // Assert: Validamos que retorne vacío (Login Fallido)
        assertFalse(usuarioEncontrado.isPresent(), "No debería encontrar ningún usuario con ese correo");
        
        // Verificamos que se ejecutó la consulta en el repositorio
        verify(usuarioRepository, times(1)).findByEmail("desconocido@correo.com");
    }
}
