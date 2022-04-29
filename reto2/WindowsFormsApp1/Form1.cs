using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

using capa_entidad;
using capa_negocios;
namespace WindowsFormsApp1
{
    public partial class Form1 : Form
    {

        Classentidad objent = new Classentidad();
        Classnegocios objneg = new Classnegocios();
        public Form1()
        {
            InitializeComponent();
        }
        void mantenimiento(String accion)
        {
            objent.autor = txtautor.Text;
            objent.titulo = txtitulo.Text;
            objent.precio = Convert.ToInt32(txtprecio.Text);
            objent.editorial = txteditorial.Text;
            objent.cantidad = Convert.ToInt32(txtcantidad.Text);
            objent.accion = accion;
            string men = objneg.n_mantenimiento_libros(objent);
            MessageBox.Show(men, "Mesaje", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
        void limpiar()
        {
            txtitulo.Text = "";
            txtautor.Text = "";
            txtprecio.Text = "";
            txteditorial.Text = "";
            txtcantidad.Text = "";
            dataGridView1.DataSource = objneg.n_listas_libros();
        }
        private void From1_load(object sender, EventArgs e)
        {
            dataGridView1.DataSource = objneg.n_listas_libros();
        }

        private void nuevoToolStripMenuItem_Click(object sender, EventArgs e)
        {
            limpiar();
        }

        private void registrarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            
                if (MessageBox.Show("Deseas registrar a " + txtitulo.Text + "?", "Mensaje",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Information) == System.Windows.Forms.DialogResult.Yes)
                {
                    mantenimiento("1");
                    limpiar();
                }
            
        }

        private void modificarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if(objent.codigo != 0)
            {
                if (MessageBox.Show("Deseas modificar a " + txtitulo.Text + "?", "Mensaje",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Information )== System.Windows.Forms.DialogResult.Yes)
                {
                    mantenimiento("2");
                    limpiar();
                }
            }
        }

        private void eliminarToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (objent.codigo != 0)
            {
                if (MessageBox.Show("Deseas eliminar a " + txtitulo.Text + "?", "Mensaje",
                    MessageBoxButtons.YesNo, MessageBoxIcon.Information) == System.Windows.Forms.DialogResult.Yes)
                {
                    mantenimiento("3");
                    limpiar();
                }
            }
        }

        private void txt_bus_titulo_TextChanged(object sender, EventArgs e)
        {
            if (txt_bus_titulo.Text !="")
            {
                objent.autor = txt_bus_titulo.Text;
                DataTable dt = new DataTable();
                dt = objneg.N_buscar_libro(objent);
                dataGridView1.DataSource = dt; 
            }
            else
            {
                dataGridView1.DataSource = objneg.n_listas_libros();
            }
        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            int fila = dataGridView1.CurrentCell.RowIndex;

            txtitulo.Text = dataGridView1[0, fila].Value.ToString();
            txtautor.Text = dataGridView1[0, fila].Value.ToString();
            txteditorial.Text = dataGridView1[0, fila].Value.ToString();
            txtprecio.Text = dataGridView1[0, fila].Value.ToString();
            txtcantidad.Text = dataGridView1[0, fila].Value.ToString();
        }
    }
}
