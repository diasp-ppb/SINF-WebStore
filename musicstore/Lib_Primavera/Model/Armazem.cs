using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Armazem
    {
        public string ArmazemId
        {
            get;
            set;
        }
        public string Descricao
        {
            get;
            set;
        }
        public string Localidade
        {
            get;
            set;
        }

        public string Distrito
        {
            get;
            set;
        }

        public List<Artigo> Artigos
        {
            get;
            set;
        }
    }
}