DROP TABLE IF exists Usuarios;
CREATE TABLE Usuarios (
    mail varchar(100) primary key,
    nom_usuario varchar(30),
    contraseña varchar(30),
    esadmin boolean
    
);

INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin)
Values ( "famiano@gmail.com", "famiano", "433", true);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin)
Values ( "Ichu@gmail.com", "Ichu", "899", false);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin)
Values ( "Pico@gmail.com", "Matip", "8552", false);
;
INSERT INTO Usuarios (mail, nom_usuario, contraseña, esadmin)
Values ( "MartinRivas@gmail.com", "Rivas", "963", true);
;
select * 
From Usuarios
;