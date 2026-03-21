import random
import datetime

# --- Data Arrays ---
first_names = ["Juan", "María", "Carlos", "Ana", "Luis", "Elena", "Pedro", "Laura", "Jorge", "Carmen", "Diego", "Sofía", "Miguel", "Lucía", "José", "Paula", "Manuel", "Marta", "David", "Julia", "Javier", "Alba", "Antonio", "Noelia", "Fernando", "Patricia", "Roberto", "Sara", "Alejandro", "Raquel", "Daniel", "Beatriz", "Francisco", "Silvia", "Rubén", "Andrea", "Alberto", "Rocío", "Pablo", "Cristina", "Álvaro", "Nuria", "Víctor", "Irene", "Mario", "Teresa", "Raúl", "Inés", "Sergio", "Rosa"]
last_names = ["García", "Rodríguez", "González", "Fernández", "López", "Martínez", "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández", "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez", "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez", "Serrano", "Blanco", "Molina", "Morales", "Suárez", "Ortega", "Delgado", "Castro", "Ortiz", "Rubio", "Marín", "Sanz", "Núñez", "Iglesias", "Medina", "Garrido", "Cortes", "Castillo", "Santos", "Lozano", "Guerrero", "Cano", "Prieto"]

book_titles_and_authors = [
    ("100 años de soledad", "Gabriel García Márquez", "Realismo Mágico"), ("Don Quijote de la Mancha", "Miguel de Cervantes", "Clásico"), 
    ("1984", "George Orwell", "Distopía"), ("El Principito", "Antoine de Saint-Exupéry", "Infantil"), ("El Hobbit", "J.R.R. Tolkien", "Fantasía"),
    ("Orgullo y Prejuicio", "Jane Austen", "Romance"), ("El Señor de los Anillos", "J.R.R. Tolkien", "Fantasía"), ("Cumbres Borrascosas", "Emily Brontë", "Clásico"),
    ("Crimen y Castigo", "Fiódor Dostoyevski", "Ficción Psicológica"), ("La Odisea", "Homero", "Épico"), ("Moby Dick", "Herman Melville", "Aventura"),
    ("Matar a un Ruiseñor", "Harper Lee", "Ficción Histórica"), ("El Gran Gatsby", "F. Scott Fitzgerald", "Clásico"), ("Guerra y Paz", "León Tolstói", "Histórico"),
    ("Ulises", "James Joyce", "Modernista"), ("Hamlet", "William Shakespeare", "Tragedia"), ("Fahrenheit 451", "Ray Bradbury", "Ciencia Ficción"),
    ("Un Mundo Feliz", "Aldous Huxley", "Distopía"), ("La Divina Comedia", "Dante Alighieri", "Épico"), ("Los Miserables", "Victor Hugo", "Histórico"),
    ("Madame Bovary", "Gustave Flaubert", "Realismo"), ("En Busca del Tiempo Perdido", "Marcel Proust", "Modernista"), ("La Metamorfosis", "Franz Kafka", "Absurdo"),
    ("El Conde de Montecristo", "Alexandre Dumas", "Aventura"), ("Frankenstein", "Mary Shelley", "Gótico"), ("Drácula", "Bram Stoker", "Terror"),
    ("Jane Eyre", "Charlotte Brontë", "Romance"), ("Siddhartha", "Hermann Hesse", "Filosófico"), ("El Extranjero", "Albert Camus", "Filosófico"),
    ("Ensayo sobre la Ceguera", "José Saramago", "Novela"), ("La Casa de los Espíritus", "Isabel Allende", "Realismo Mágico"), ("Ficciones", "Jorge Luis Borges", "Cuento"),
    ("Rayuela", "Julio Cortázar", "Novela"), ("Pedro Páramo", "Juan Rulfo", "Realismo Mágico"), ("El Aleph", "Jorge Luis Borges", "Cuento"),
    ("Crónica de una Muerte Anunciada", "Gabriel García Márquez", "Novela"), ("La Sombra del Viento", "Carlos Ruiz Zafón", "Misterio"),
    ("Los Detectives Salvajes", "Roberto Bolaño", "Novela"), ("La Ciudad y los Perros", "Mario Vargas Llosa", "Novela"), ("2666", "Roberto Bolaño", "Novela"),
    ("El Túnel", "Ernesto Sabato", "Filosófico"), ("Nada", "Carmen Laforet", "Novela"), ("Niebla", "Miguel de Unamuno", "Novela"),
    ("Las Crónicas de Narnia", "C.S. Lewis", "Fantasía"), ("Harry Potter y la Piedra Filosofal", "J.K. Rowling", "Fantasía"),
    ("Los Juegos del Hambre", "Suzanne Collins", "Ciencia Ficción"), ("Dune", "Frank Herbert", "Ciencia Ficción"), ("Fundación", "Isaac Asimov", "Ciencia Ficción"),
    ("Cien Años de Perdón", "Jorge Fernández", "Thriller"), ("El Nombre de la Rosa", "Umberto Eco", "Misterio Histórico")
]
# Make it up to 100 by duplicating or adding generic ones if needed
while len(book_titles_and_authors) < 100:
    book_titles_and_authors.append( (f"Libro Genérico Vol {len(book_titles_and_authors)}", "Autor Desconocido", "Variado") )

f = open("libraryPro_DB.sql", "w", encoding="utf-8")

def w(text):
    f.write(text + "\n")

w("-- Sample Data for LibraryPro (Normalized and Generated)")
w("")
w("-- Insert Lookup Data")
w("INSERT INTO rol (titulo) VALUES ")
w("('Lector'), ('Responsable'), ('Admin'), ('SuperAdmin');")
w("")
w("-- NOTA SOBRE ESTADO LIBRO: 'Donado' se reemplaza aquí por 'Extraviado' o se omite.")
w("-- Dado que las donaciones son entradas de libros, el libro simplemente está 'Disponible'.")
w("INSERT INTO estado_libro (descripcion_estado_libro) VALUES ")
w("('Disponible'), ('Prestado'), ('Extraviado'), ('Baja / Dañado');")
w("")
w("INSERT INTO estado_prestamo (descripcion_estado_prestamo) VALUES ")
w("('Activo'), ('Devuelto');")
w("")

# Users
w("-- Insert Usuarios (Lectores y admins)")
w("INSERT INTO usuario (nombre, email, password, telefono, direccion, rol_id, activo) VALUES")
usuarios_sql = []
# Base users
usuarios_sql.append("('Ana Administradora', 'admin@librarypro.com', 'admin789', '600000001', 'Plaza Mayor 1', (SELECT id FROM rol WHERE titulo = 'Admin'), TRUE)")
usuarios_sql.append("('Super Admin', 'super@librarypro.com', 'super', '600000002', 'Central 1', (SELECT id FROM rol WHERE titulo = 'SuperAdmin'), TRUE)")

# Generate 50 Lector users
users = []
for i in range(50):
    nombre = random.choice(first_names)
    apellido = random.choice(last_names)
    full_name = f"{nombre} {apellido}"
    email = f"{nombre.lower()}.{apellido.lower()}{i}@ejemplo.com"
    tel = f"6{random.randint(10000000, 99999999)}"
    direccion = f"Calle {random.choice(last_names)} {random.randint(1, 100)}"
    users.append( (full_name, email) )
    usuarios_sql.append(f"('{full_name}', '{email}', 'pwd123', '{tel}', '{direccion}', (SELECT id FROM rol WHERE titulo = 'Lector'), TRUE)")

w(",\n".join(usuarios_sql) + ";\n")

# Libros
w("-- Insert Libros (100 libros)")
w("INSERT INTO libro (isbn, titulo, autor, genero) VALUES")
libros_sql = []
for i, (titulo, autor, genero) in enumerate(book_titles_and_authors):
    isbn = f"978-0-{random.randint(100,999)}-{random.randint(10000,99999)}-{random.randint(0,9)}"
    libros_sql.append(f"('{isbn}', '{titulo}', '{autor}', '{genero}')")
w(",\n".join(libros_sql) + ";\n")

# Ejemplares
w("-- Insert Ejemplares (1 ejemplar por libro por defecto, para un total de 100)")
w("INSERT INTO ejemplar (libro_id, fec_ingreso, detalle, estado_id) VALUES")
ejemplares_sql = []
for i in range(100):
    titulo = book_titles_and_authors[i][0]
    detalle = random.choice(["Nuevo", "Usado - Buen estado", "Usado - Marcas menores"])
    # By default, state is 'Disponible'
    ejemplares_sql.append(f"((SELECT id FROM libro WHERE titulo = '{titulo}' LIMIT 1), '2023-01-01', '{detalle}', (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Disponible'))")

w(",\n".join(ejemplares_sql) + ";\n")

# Donaciones (50 donaciones -> We will link the first 50 ejemplares to these donaciones)
w("-- Insert Donaciones (50 donaciones asociadas a los primeros 50 ejemplares)")
w("INSERT INTO donacion (fecha, observaciones, usuario_id, ejemplar_id) VALUES")
donaciones_sql = []
for i in range(50):
    titulo = book_titles_and_authors[i][0]
    user_email = random.choice(users)[1]
    fecha = f"2023-{(i%12)+1:02d}-{random.randint(1,28):02d}"
    obs = "Donado por usuario"
    donaciones_sql.append(f"('{fecha}', '{obs}', (SELECT id FROM usuario WHERE email = '{user_email}'), (SELECT id FROM ejemplar INNER JOIN libro ON ejemplar.libro_id = libro.id WHERE libro.titulo = '{titulo}' LIMIT 1))")

w(",\n".join(donaciones_sql) + ";\n")

# Prestamos (10 prestamos -> We will create prestamos for the next 10 ejemplares)
# For the active loans, we should update the ejemplar status to 'Prestado', but since we already inserted them as 'Disponible', 
# in a real system the app changes it. Here we'll just write an UPDATE script.
w("-- Insert Prestamos (10 préstamos)")
w("INSERT INTO prestamo (fecha_inicio, fecha_devolucion, estado_id, usuario_id, ejemplar_id) VALUES")
prestamos_sql = []
ejemplares_prestados = []
for i in range(50, 60):
    titulo = book_titles_and_authors[i][0]
    ejemplares_prestados.append(titulo)
    user_email = random.choice(users)[1]
    fecha = f"2024-{random.randint(1,3):02d}-{random.randint(1,28):02d}"
    is_active = random.choice([True, False])
    if is_active:
        estado_prestamo = "Activo"
        fecha_dev = "NULL"
    else:
        estado_prestamo = "Devuelto"
        fecha_dev = f"'{fecha[:8]}28'" # just simple logic
        
    prestamos_sql.append(f"('{fecha}', {fecha_dev}, (SELECT id FROM estado_prestamo WHERE descripcion_estado_prestamo = '{estado_prestamo}'), (SELECT id FROM usuario WHERE email = '{user_email}'), (SELECT id FROM ejemplar INNER JOIN libro ON ejemplar.libro_id = libro.id WHERE libro.titulo = '{titulo}' LIMIT 1))")

w(",\n".join(prestamos_sql) + ";\n")

w("-- Actualizar estado de los ejemplares a 'Prestado' para los préstamos activos")
w("UPDATE ejemplar SET estado_id = (SELECT id FROM estado_libro WHERE descripcion_estado_libro = 'Prestado')")
w("WHERE id IN (SELECT ejemplar_id FROM prestamo WHERE estado_id = (SELECT id FROM estado_prestamo WHERE descripcion_estado_prestamo = 'Activo'));")

f.close()
print("SQL generated successfully!")
