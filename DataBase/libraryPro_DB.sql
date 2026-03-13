-- Sample Data for LibraryPro (Normalized and Updated)

-- Insert Lookup Data
INSERT INTO rol (titulo) VALUES 
('Lector'), ('Responsable'), ('Admin'), ('SuperAdmin');

INSERT INTO estado_libro (descripcion_estado_libro) VALUES 
('Disponible'), ('Prestado'), ('Donado');

INSERT INTO estado_prestamo (descripcion_estado_prestamo) VALUES 
('Activo'), ('Devuelto');

-- Insert Usuarios
INSERT INTO usuario (nombre, email, password, telefono, direccion, rol_id, activo) VALUES
('Juan Pérez', 'juan.perez@email.com', NULL, '600111222', 'Calle Falsa 123', (SELECT id FROM rol WHERE titulo = 'Lector'), TRUE),
('Ana García', 'ana.garcia@email.com', 'secure456', '600333444', 'Avenida Siempre Viva 742', (SELECT id FROM rol WHERE titulo = 'Responsable'), TRUE),
('Carlos Admin', 'admin@librarypro.com', 'admin789', '600555666', 'Plaza Real 1', (SELECT id FROM rol WHERE titulo = 'Admin'), TRUE),
('Super User', 'super@librarypro.com', 'supersecret', '600777888', 'Torre de Control 10', (SELECT id FROM rol WHERE titulo = 'SuperAdmin'), TRUE);

-- Insert Libros
INSERT INTO libro (titulo, autor, genero, estado_id) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Realismo Mágico', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Disponible')),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clásico', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Disponible')),
('1984', 'George Orwell', 'Distopía', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Prestado')),
('El Principito', 'Antoine de Saint-Exupéry', 'Infantil', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Disponible')),
('El Hobbit', 'J.R.R. Tolkien', 'Fantasía', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Donado'));

-- Insert Prestamos
INSERT INTO prestamo (fecha_inicio, fecha_devolucion, estado_id, usuario_id, libro_id) VALUES
('2024-03-01', NULL, (SELECT id FROM estado_prestamo WHERE descripcion_estado_prestamo = 'Activo'), 
 (SELECT id FROM usuario WHERE email = 'juan.perez@email.com'), 
 (SELECT id FROM libro WHERE titulo = '1984'));

-- Insert Donaciones
INSERT INTO donacion (fecha, observaciones, usuario_id, libro_id) VALUES
('2024-03-10', 'Donación de libro nuevo en excelentes condiciones.', 
 (SELECT id FROM usuario WHERE email = 'ana.garcia@email.com'), 
 (SELECT id FROM libro WHERE titulo = 'El Hobbit'));
