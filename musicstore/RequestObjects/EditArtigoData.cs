using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FirstREST.RequestObjects
{
    public class EditAtigoData
    {
        public String fieldIdToEdit
        {
            get;
            set;
        }
        public String idOfProduct
        {
            get;
            set;
        }

        public String valueToSet
        {
            get;
            set;
        }

    }
}