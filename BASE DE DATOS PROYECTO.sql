DROP TABLE IF exists Usuarios;
CREATE TABLE Usuarios (
    mail varchar(100) primary key,
    nom_usuario varchar(30),
    contraseña varchar(30),
    esadmin boolean,
    puntaje int
);

INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin, puntaje)
Values ( "famiano@gmail.com", "famiano", "433", true, 0);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin, puntaje)
Values ( "Ichu@gmail.com", "Ichu", "899", false, 0);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin, puntaje)
Values ( "Pico@gmail.com", "Matip", "8552", false, 0);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin, puntaje)
Values ( "MartinRivas@gmail.com", "Rivas", "963", true, 0);
;
select * 
From Usuarios
;