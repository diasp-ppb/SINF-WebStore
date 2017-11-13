using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.Lib_Primavera.Model
{
    public class DocStock
    {
        public String Entidade { get; set;}

        public string Serie { get; set; }

        public List<Model.LinhaDocStock> LinhasDoc
        {
            get;
            set;
        }
    }

    
}