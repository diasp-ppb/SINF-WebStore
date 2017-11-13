using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class AltArtigo
    {
        public String CodArtigo { get; set; }
        public String Campo { get; set; }
        public String Conteudo { get; set; }

        public override string ToString()
        {
            return "CodArtigo: " + CodArtigo + " \n Campo: " + Campo + " \n Conteudo: " + Conteudo + " ";
        }
    }
}