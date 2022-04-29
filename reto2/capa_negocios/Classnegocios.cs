using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data;
using capa_datos;
using capa_entidad;

namespace capa_negocios
{
    public class Classnegocios
    {
        Classdatos objd = new Classdatos();
        public DataTable n_listas_libros()
        {
            return objd.D_lista_libros();
        }
        public DataTable N_buscar_libro(Classentidad obje)
        {
            return objd.D_buscar_libro(obje);
        }
        public string n_mantenimiento_libros(Classentidad obje)
        {
            return objd.D_mantenimiento_libros(obje);
        }
    }
}