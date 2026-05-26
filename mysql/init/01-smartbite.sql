CREATE DATABASE IF NOT EXISTS smartbite_db;
USE smartbite_db;

-- Tabla de usuarios (equivalente a 'contactos' en jakarta, adaptada a SmartBite)
CREATE TABLE IF NOT EXISTS usuarios (
    ide_usu INT NOT NULL AUTO_INCREMENT,
    nom_usu VARCHAR(120) NOT NULL,
    ape_usu VARCHAR(120) NOT NULL,
    email_usu VARCHAR(200) NOT NULL UNIQUE,
    pass_usu VARCHAR(255) NOT NULL,
    PRIMARY KEY (ide_usu)
);

-- Tabla de recetas
CREATE TABLE IF NOT EXISTS recetas (
    ide_rec INT NOT NULL AUTO_INCREMENT,
    nom_rec VARCHAR(200) NOT NULL,
    tiempo_rec VARCHAR(20) NOT NULL DEFAULT '20 min',
    dificultad_rec VARCHAR(50) NOT NULL DEFAULT 'Fácil',
    imagen_rec VARCHAR(500) DEFAULT NULL,
    PRIMARY KEY (ide_rec)
);

-- Tabla de ingredientes detectados (resultados de cámara)
CREATE TABLE IF NOT EXISTS ingredientes (
    ide_ing INT NOT NULL AUTO_INCREMENT,
    nom_ing VARCHAR(120) NOT NULL,
    color_ing VARCHAR(50) NOT NULL DEFAULT 'bg-green-500',
    PRIMARY KEY (ide_ing)
);

-- Datos de ejemplo: usuarios
INSERT INTO usuarios (nom_usu, ape_usu, email_usu, pass_usu) VALUES
('Maria', 'García', 'maria@smartbite.com', 'pass123'),
('Carlos', 'López', 'carlos@smartbite.com', 'pass123'),
('Ana', 'Martínez', 'ana@smartbite.com', 'pass123');

-- Datos de ejemplo: recetas
INSERT INTO recetas (nom_rec, tiempo_rec, dificultad_rec, imagen_rec) VALUES
('Ensalada de pollo', '20 min', 'Fácil', 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop'),
('Pasta con verduras salteadas', '25 min', 'Fácil', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300&h=200&fit=crop'),
('Tortilla de espinacas', '15 min', 'Fácil', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=200&fit=crop'),
('Bowl de yogur con frutas', '10 min', 'Muy fácil', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=200&fit=crop');

-- Datos de ejemplo: ingredientes detectables
INSERT INTO ingredientes (nom_ing, color_ing) VALUES
('Lechuga', 'bg-green-500'),
('Tomate', 'bg-red-500'),
('Pechuga de pollo', 'bg-amber-600'),
('Zanahoria', 'bg-orange-500'),
('Huevos', 'bg-amber-300'),
('Yogur natural', 'bg-gray-300'),
('Pimiento rojo', 'bg-red-600');
