create database triviasalud;

create table informacionesmedicas (
	id serial primary key,
	estatura decimal,
	enfermedad varchar(60),
	enfermedadRespiratoria varchar(60),
	cirugia varchar(50),
	alergia varchar(50),
	enfermedadDegenerativa varchar(50)
);

create table usuarios (
	id bigserial primary key,
	nombre varchar(50) not null,
	email varchar(50) not null,
	password varchar(100) not null,
	genero varchar(50),
	fechaNacimiento date not null,
	informacionmedica int unique,
	
	foreign key (informacionmedica) references informacionesmedicas(id)
);

create table amigos (
	id_usuario int,
	nombre varchar(40),
	
	foreign key (id_usuario) references usuarios(id)
);

SELECT * FROM USUARIOs;