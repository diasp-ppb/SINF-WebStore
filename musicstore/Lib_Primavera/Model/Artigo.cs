using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class Artigo
    {
        public string CodArtigo
        {
            get;
            set;
        }

        public string DescArtigo
        {
            get;
            set;
        }

        public double STKAtual
        {
            get;
            set;
        }

        public double PrecoFinal
        {
            get;
            set;
        }

        //TODO to be implemented
        public int Score
        {
            get;
            set;
        }

        public List<string> Localidades
        {
            get;
            set;
        }

        public List<string> Distritos
        {
            get;
            set;
        }
        
        public List<dynamic> STKArm
        {
            get;
            set;
        }

        public string idFamilia
        {
            get;
            set;
        }

        public string idSubFamilia
        {
            get;
            set;
        }

        public string Familia
        {
            get;
            set;
        }

        public string SubFamilia
        {
            get;
            set;
        }
       
        public string Autor
        {
            get;
            set;
        }

        public string ImgURL
        {
            get;
            set;
        } 

        // TODO acho que podemos usar a cena das observações como descrição 
        public string Observacoes
        {
            get;
            set;
        }
    }
}