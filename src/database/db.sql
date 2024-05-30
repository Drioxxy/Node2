-- crear la database
create database crudnodejsmysql;

use crudnodejsmysql;

CREATE TABLE TBL_USUARIOS
(
id INT(15) UNSIGNED  AUTO_INCREMENT PRIMARY KEY,
placa VARCHAR (50) NOT NULL,
tipovehiculo VARCHAR (50) NOT NULL,
telefono VARCHAR(50) NOT NULL
);

SHOW TABLES;

DESCRIBE tbl_usuarios;
SELECT * FROM tbl_usuarios;

INSERT INTO tbl_usuarios (placa, tipovehiculo, telefono)
VALUES ('prueba', 'carro', '6565');
