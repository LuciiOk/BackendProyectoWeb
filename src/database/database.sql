drop table if exists informacionesmedicas cascade;
create table informacionesmedicas (
	id serial primary key,
	estatura decimal not null,
	enfCardiaca varchar(60),
	enfRespiratorias varchar(60),
	cirugia varchar(50),
	alergia varchar(50),
	enfDegenerativa varchar(50)
);

drop table if exists gustos cascade;
create table gustos (
	id_gustos serial primary key,
	futbol varchar(5),
	basket varchar(5),
	voley varchar (5),
	salsa varchar(5),
	folklor varchar(5),
	zumba varchar(5)
);

drop table if exists usuarios cascade;
create table usuarios (
	id bigserial primary key,
	nombre varchar(50) not null,
	email varchar(50) not null,
	password varchar(100) not null,
	genero varchar(50),
	fechaNacimiento date not null,
	informacionmedica int unique,
	gustos int,
	
	foreign key (informacionmedica) references informacionesmedicas(id) on update cascade on delete set null,
	foreign key (gustos) references gustos(id_gustos) on update cascade on delete set null
);

drop table if exists amigos cascade;
create table amigos (
	id_amigo serial primary key,
	id_usuario int,
	nombre varchar(40),
	genero varchar(10),
	
	foreign key (id_usuario) references usuarios(id)
);

alter table informacionesmedicas add peso int;