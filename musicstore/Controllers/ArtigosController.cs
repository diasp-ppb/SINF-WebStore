using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FirstREST.Lib_Primavera.Model;


namespace FirstREST.Controllers
{
    public class ArtigosController : ApiController
    {
        //
        // GET: /Artigos/
        public IEnumerable<Lib_Primavera.Model.Artigo> Get()
        {
            return Lib_Primavera.PriIntegration.ListaArtigos();
        }

        
        public IEnumerable<Lib_Primavera.Model.Artigo> GetTop(int ranking)
        {
            return Lib_Primavera.PriIntegration.ListaTopArtigos(ranking);
        }

        public IEnumerable<Lib_Primavera.Model.Artigo> GetRelated(String id, String genero, String subgenero)
        {
            return Lib_Primavera.PriIntegration.ListaRelacionados(id, genero, subgenero);
        }
        
        public HttpResponseMessage Get(string CodArtigo, string Campo, string Conteudo)
        {
            Lib_Primavera.Model.AltArtigo data = new Lib_Primavera.Model.AltArtigo();
            data.CodArtigo = CodArtigo;
            data.Campo = Campo;
            data.Conteudo = Conteudo;
            if (data == null || !Lib_Primavera.PriIntegration.EditArtigo(data))
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            return Request.CreateResponse(HttpStatusCode.Accepted, new { changed = "true" });

        }

        // GET api/artigo/5    
        public Artigo Get(string id)
        {
            Lib_Primavera.Model.Artigo artigo = Lib_Primavera.PriIntegration.GetArtigoFull(id);
            return artigo;
        }

    }
}

