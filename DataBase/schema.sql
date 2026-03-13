-- Database Schema for LibraryPro - Postgres 17 (Refactored/Normalized)

-- Drop tables if they exist to allow clean re-execution
DROP TABLE IF EXISTS donacion;
DROP TABLE IF EXISTS prestamo;
DROP TABLE IF EXISTS libro;
DROP TABLE IF EXISTS usuario;
DROP TABLE IF EXISTS rol;
DROP TABLE IF EXISTS estado_libro;
DROP TABLE IF EXISTS estado_prestamo;

-- Lookup Tables
CREATE TABLE rol (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE estado_libro (
    id SERIAL PRIMARY KEY,
    descripcion_estado_libro VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE estado_prestamo (
    id SERIAL PRIMARY KEY,
    descripcion_estado_prestamo VARCHAR(20) UNIQUE NOT NULL
);

-- Create Usuario table
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    rol_id INT REFERENCES rol(id),
    activo BOOLEAN DEFAULT TRUE
);

-- Create Libro table
CREATE TABLE libro (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    genero VARCHAR(50),
    estado_id INT REFERENCES estado_libro(id)
);

-- Create Prestamo table
CREATE TABLE prestamo (
    id SERIAL PRIMARY KEY,
    fecha_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
    fecha_devolucion DATE,
    estado_id INT REFERENCES estado_prestamo(id),
    usuario_id INT REFERENCES usuario(id) ON DELETE CASCADE,
    libro_id INT REFERENCES libro(id) ON DELETE CASCADE
);

-- Create Donacion table
CREATE TABLE donacion (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    observaciones TEXT,
    usuario_id INT REFERENCES usuario(id) ON DELETE SET NULL,
    libro_id INT REFERENCES libro(id) ON DELETE CASCADE
);
