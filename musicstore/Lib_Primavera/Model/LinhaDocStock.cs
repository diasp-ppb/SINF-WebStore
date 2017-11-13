using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class LinhaDocStock
    {
        public string CodArtigo
        {
            get;
            set;
        }


        public double Quantidade
        {
            get;
            set;
        }

        public string Unidade
        {
            get;
            set;
        }

        public String Armazem
        {
            get;
            set;
        }

        public String Entrada
        {
            get;
            set;
        }

        public double PrecoUnitario
        {
            get;
            set;
        }

        public double Desconto
        {
            get;
            set;
        }


        public string Lote { get; set; }

        public string Localizacao { get; set; }
    }
}