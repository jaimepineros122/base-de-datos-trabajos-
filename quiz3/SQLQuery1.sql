

create view v_ventas_extrangeras  
AS select Nombre, Plataforma,A�o,Genero,Editorial, region, ventas 
from (select Nombre, Plataforma,A�o,Genero,Editorial,[Ventas NA] as Norteamerica, [Ventas EU] as Europa, [Ventas JP] as Japon, [Ventas Otros] as Otros 
from ['Ventas Videojuegos$']) vent
unpivot(ventas 
for region in (Norteamerica, Europa, Japon, Otros))
as p ;

select * from v_ventas_extrangeras