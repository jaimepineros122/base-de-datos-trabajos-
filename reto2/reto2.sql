create database DBret
go

use DBret
go

create table libros(
   codigo int identity,
   titulo varchar(40),
   autor varchar(30),
   editorial varchar(20),
   precio int,
   cantidad smallint,
   primary key(codigo)
  ) 
go
Drop  table libros;
create proc sp_libros
as
select * from libros order by codigo 
go
drop proc sp_libros;
drop proc sp_buscar_libro;
create proc sp_buscar_libro
@titulo varchar(40),
@autor varchar(30),
@editorial varchar(20)
as
select codigo,titulo,autor,editorial,precio,cantidad from libros where titulo like @titulo + '%'  
go
drop proc sp_grabar_libro;
create proc sp_grabar_libro
@codigo int,  
@titulo varchar(40),
@autor varchar(30),
@editorial varchar(20),
@precio int,
@cantidad smallint,
@accion varchar(50) output
as
if (@accion='1')
begin 
   insert into libros(codigo,titulo,autor,editorial,precio,cantidad)
   values (@codigo,@titulo,@autor,@editorial,@precio,@cantidad)
   set @accion= 'Se guardo el libro:' + @codigo
end
else if (@accion='2')
begin 
   update libros set titulo=@titulo, autor=@autor, editorial=@editorial, precio=@precio, cantidad=@cantidad where codigo=@codigo
   set @accion='Se modifico el codigo: ' +@codigo
end
else if (@accion='3')
begin 
   delete from libros where codigo=@codigo
   set @accion='Se borro el libro de la base de datos' +@codigo + 'del libro' +@titulo
end 
go