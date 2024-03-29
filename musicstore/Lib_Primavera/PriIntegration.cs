﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Interop.ErpBS900;
using Interop.StdPlatBS900;
using Interop.StdBE900;
using Interop.GcpBE900;
using ADODB;

namespace FirstREST.Lib_Primavera
{
    public class PriIntegration
    {


        # region Cliente

        public static List<Model.Cliente> ListaClientes()
        {


            StdBELista objList;

            List<Model.Cliente> listClientes = new List<Model.Cliente>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();

                objList = PriEngine.Engine.Consulta("SELECT Cliente, Nome, Moeda, NumContrib as NumContribuinte, Fac_Mor AS campo_exemplo, CDU_Email as Email, Fac_Cp, Fac_Tel FROM  CLIENTES");


                while (!objList.NoFim())
                {
                    listClientes.Add(new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        NomeCliente = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        NumContribuinte = objList.Valor("NumContribuinte"),
                        Morada = objList.Valor("campo_exemplo"),
                        Email = objList.Valor("Email"),
                        Telefone = objList.Valor("Fac_Tel"),
                        CodPost = objList.Valor("Fac_Cp")
                    });
                    objList.Seguinte();
                }

                return listClientes;
            }
            else
                return null;
        }

        public static Lib_Primavera.Model.Cliente GetClienteFull(string codCliente)
        {

            StdBELista objList;

            Model.Cliente client = new Model.Cliente();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                //objList = PriEngine.Engine.Comercial.Clientes.LstClientes();
                string select = "SELECT Cliente, Nome, Moeda, NumContrib as NumContribuinte, Fac_Mor AS campo_exemplo, CDU_Email as Email, Fac_Cp, Fac_Tel FROM  CLIENTES ";
                string query = select + "WHERE Cliente = '" + codCliente + "'";
                objList = PriEngine.Engine.Consulta(query);


                while (!objList.NoFim())
                {
                    client = new Model.Cliente
                    {
                        CodCliente = objList.Valor("Cliente"),
                        NomeCliente = objList.Valor("Nome"),
                        Moeda = objList.Valor("Moeda"),
                        NumContribuinte = objList.Valor("NumContribuinte"),
                        Morada = objList.Valor("campo_exemplo"),
                        Email = objList.Valor("Email"),
                        Telefone = objList.Valor("Fac_Tel"),
                        CodPost = objList.Valor("Fac_Cp")
                    };
                    objList.Seguinte();
                }

                return client;
            }
            else
                return null;
        }

        public static Lib_Primavera.Model.Cliente GetCliente(string codCliente)
        {


            GcpBECliente objCli = new GcpBECliente();


            Model.Cliente myCli = new Model.Cliente();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == true)
                {

                    objCli = PriEngine.Engine.Comercial.Clientes.Edita(codCliente);
                    myCli.CodCliente = objCli.get_Cliente();
                    myCli.NomeCliente = objCli.get_Nome();
                    myCli.Moeda = objCli.get_Moeda();
                    myCli.NumContribuinte = objCli.get_NumContribuinte();
                    myCli.Morada = objCli.get_Morada();
                    myCli.Email = PriEngine.Engine.Comercial.Clientes.DaValorAtributo(codCliente, "CDU_Email");


                    return myCli;
                }
                else
                {
                    return null;
                }
            }
            else
                return null;
        }

        public static Lib_Primavera.Model.RespostaErro UpdCliente(Lib_Primavera.Model.Cliente cliente)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            GcpBECliente objCli = new GcpBECliente();

            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    if (PriEngine.Engine.Comercial.Clientes.Existe(cliente.CodCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        objCli = PriEngine.Engine.Comercial.Clientes.Edita(cliente.CodCliente);
                        objCli.set_EmModoEdicao(true);

                        objCli.set_Nome(cliente.NomeCliente);
                        objCli.set_NumContribuinte(cliente.NumContribuinte);
                        objCli.set_Moeda(cliente.Moeda);
                        objCli.set_Morada(cliente.Morada);

                        PriEngine.Engine.Comercial.Clientes.Actualiza(objCli);

                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;

                }

            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }


        public static Lib_Primavera.Model.RespostaErro DelCliente(string codCliente)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBECliente objCli = new GcpBECliente();


            try
            {

                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    if (PriEngine.Engine.Comercial.Clientes.Existe(codCliente) == false)
                    {
                        erro.Erro = 1;
                        erro.Descricao = "O cliente não existe";
                        return erro;
                    }
                    else
                    {

                        PriEngine.Engine.Comercial.Clientes.Remove(codCliente);
                        erro.Erro = 0;
                        erro.Descricao = "Sucesso";
                        return erro;
                    }
                }

                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir a empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }

        }



        public static Lib_Primavera.Model.RespostaErro InsereClienteObj(Model.Cliente cli)
        {

            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            GcpBECliente myCli = new GcpBECliente();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {

                    myCli.set_Cliente(cli.CodCliente);
                    myCli.set_Nome(cli.NomeCliente);
                    myCli.set_NumContribuinte(cli.NumContribuinte);
                    myCli.set_Moeda(cli.Moeda);
                    myCli.set_Morada(cli.Morada);

                    PriEngine.Engine.Comercial.Clientes.Actualiza(myCli);

                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;
                }
            }

            catch (Exception ex)
            {
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }


        }



        #endregion Cliente;   // -----------------------------  END   CLIENTE    -----------------------


        #region Artigo

        public static Lib_Primavera.Model.Artigo GetArtigo(string codArtigo)
        {

            GcpBEArtigo objArtigo = new GcpBEArtigo();
            Model.Artigo myArt = new Model.Artigo();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                if (PriEngine.Engine.Comercial.Artigos.Existe(codArtigo) == false)
                {
                    return null;
                }
                else
                {
                    objArtigo = PriEngine.Engine.Comercial.Artigos.Edita(codArtigo);
                    myArt.CodArtigo = objArtigo.get_Artigo();
                    myArt.DescArtigo = objArtigo.get_Descricao();
                    myArt.STKAtual = objArtigo.get_StkActual();

                    return myArt;
                }

            }
            else
            {
                return null;
            }

        }

        public static List<Model.Artigo> ListaArtigos()
        {

            StdBELista objList;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Comercial.Artigos.LstArtigos();

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = objList.Valor("artigo");
                    art.DescArtigo = objList.Valor("descricao");
                    //                  art.STKAtual = objList.Valor("stkatual");


                    listArts.Add(art);
                    objList.Seguinte();
                }

                return listArts;

            }
            else
            {
                return null;

            }

        }

        public static List<Model.Artigo> Pesquisa(String text)
        {
            StdBELista objList;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string select = "SELECT Artigo.Artigo, Artigo.Descricao, PVP1, Iva ";
                string from1 = "FROM (ARTIGO LEFT JOIN ARTIGOMOEDA ON Artigo.Artigo = ArtigoMoeda.Artigo)";
                string from2 = "LEFT JOIN FAMILIAS ON Artigo.Familia = Familias.Familia ";
                string from3 = "LEFT JOIN SUBFAMILIAS ON Artigo.Familia = SubFamilias.Familia AND Artigo.SubFamilia = SubFamilias.SubFamilia ";
                string whereS = "WHERE Artigo.Artigo LIKE '%" + text + "%' OR Artigo.Descricao LIKE '%" + text + "%' OR Familias.Descricao LIKE '%" + text + "%' OR SubFamilias.Descricao LIKE '%" + text + "%';";
                string queryS = select + from1 + from2 + from3 + whereS;

                objList = PriEngine.Engine.Consulta(queryS);

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = objList.Valor("artigo");
                    art.DescArtigo = objList.Valor("descricao");
                    art.PrecoFinal = Convert.ToDouble(objList.Valor("PVP1")) * (1 + Convert.ToDouble(objList.Valor("Iva")) * 0.01);

                    listArts.Add(art);
                    objList.Seguinte();
                }

                return listArts;

            }
            else
            {
                return null;

            }
        }

        public static Model.Artigo GetArtigoFull(string id)
        {

            StdBELista objList;

            Model.Artigo art = new Model.Artigo();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string select = "SELECT Artigo.Descricao, Artigo.Observacoes , Artigo.STKActual, Iva, PVP1, ArtigoArmazem.StkActual as StkLocal, Armazens.Localidade, Distritos.Descricao as Dist, Artigo.Familia, Artigo.SubFamilia, Familias.Descricao as nomeFamilia, SubFamilias.Descricao as nomeSubFamilia ";
                string from1 = "FROM ((( ARTIGO LEFT JOIN ARTIGOMOEDA ON Artigo.Artigo = ArtigoMoeda.Artigo) ";
                string from2 = "LEFT JOIN ARTIGOARMAZEM ON Artigo.Artigo = ArtigoArmazem.Artigo) ";
                string from3 = "LEFT JOIN ARMAZENS ON ArtigoArmazem.Armazem = Armazens.Armazem) ";
                string from4 = "LEFT JOIN DISTRITOS ON Armazens.Distrito = Distritos.Distrito ";
                string from5 = "LEFT JOIN FAMILIAS ON Artigo.Familia = Familias.Familia ";
                string from6 = "LEFT JOIN SUBFAMILIAS ON Artigo.Familia = SubFamilias.Familia AND Artigo.SubFamilia = SubFamilias.SubFamilia ";
                string whereS = "WHERE Artigo.Artigo = '" + id + "'";//TODO evitar sqlinjection maybe hmm
                string queryS = select + from1 + from2 + from3 + from4 + from5 + from6 + whereS;

                if (PriEngine.Engine.Comercial.Artigos.Existe(id) == false)
                {
                    return null;
                }

                objList = PriEngine.Engine.Consulta(queryS);
                bool inicio = true;

                while (!objList.NoFim())
                {
                    if (inicio)
                    {
                        art.Observacoes = objList.Valor("observacoes");
                        art.DescArtigo = objList.Valor("descricao");
                        art.STKAtual = objList.Valor("stkactual");
                        art.idFamilia = objList.Valor("Familia");
                        art.Familia = objList.Valor("nomeFamilia");
                        art.idSubFamilia = objList.Valor("SubFamilia");
                        art.SubFamilia = objList.Valor("nomeSubFamilia");
                        art.PrecoFinal = Convert.ToDouble(objList.Valor("PVP1")) * (1 + Convert.ToDouble(objList.Valor("Iva")) * 0.01);
                        art.Distritos = new List<string>();
                        art.Localidades = new List<string>();
                        art.STKArm = new List<dynamic>();
                        inicio = false;
                    }

                    art.Distritos.Add(objList.Valor("dist"));
                    art.Localidades.Add(objList.Valor("localidade"));
                    art.STKArm.Add(objList.Valor("stklocal"));

                    objList.Seguinte();
                }

                return art;

            }
            else
            {
                return null;

            }

        }

        public static bool EditArtigo(Model.AltArtigo data)
        {
            bool returnFlag = false;
            GcpBEArtigo art = new GcpBEArtigo();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                if (PriEngine.Engine.Comercial.Artigos.Existe(data.CodArtigo) == false)
                {
                    return false;
                }
                else
                {
                    //PriEngine.Engine.Consulta("UPDATE Artigo SET " + data.Campo + " = " + data.Conteudo + " WHERE Artigo.Artigo = '" + data.CodArtigo + "'");
                    art = PriEngine.Engine.Comercial.Artigos.Edita(data.CodArtigo);
                    art.set_EmModoEdicao(true);
                    switch (data.Campo)
                    {
                        case "Observacoes":
                            art.set_Observacoes(data.Conteudo);
                            break;
                        case "Descricao":
                            art.set_Descricao(data.Conteudo);
                            break;
                        case "SubFamilia":
                            art.set_SubFamilia(data.Conteudo);
                            break;
                        case "Iva":
                            art.set_IVA(data.Conteudo);
                            break;
                        case "Familia":
                            art.set_Familia(data.Conteudo);
                            break;
                        default:
                            break;
                    }
                    PriEngine.Engine.Comercial.Artigos.Actualiza(art);
                    returnFlag = true;
                }
            }

            return returnFlag;
        }


        public static List<Model.Artigo> ListaTopArtigos(int ranking)
        {

            StdBELista objList;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {

                objList = PriEngine.Engine.Consulta(" SELECT top 6 Artigo.Artigo, Descricao, PVP1, Iva, Artigo.STKActual FROM  Artigo INNER JOIN ArtigoMoeda ON Artigo.Artigo = ArtigoMoeda.Artigo GROUP BY Artigo.Artigo, Descricao, PVP1, Iva, Artigo.STKActual ORDER BY Artigo.STKActual DESC");

                while (!objList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = objList.Valor("artigo");
                    art.DescArtigo = objList.Valor("descricao");
                    art.PrecoFinal = Convert.ToDouble(objList.Valor("PVP1")) * (1 + Convert.ToDouble(objList.Valor("Iva")) * 0.01);

                    double test = (Convert.ToDouble(objList.Valor("Iva")) * 0.01);

                    listArts.Add(art);
                    objList.Seguinte();
                }

                return listArts;

            }
            else
            {
                return null;

            }

        }

        public static List<Model.Artigo> ListaRelacionados(String id, String genero, String subGenero)
        {
            StdBELista generoList, subGeneroList;

            Model.Artigo art = new Model.Artigo();
            List<Model.Artigo> listArts = new List<Model.Artigo>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                generoList = PriEngine.Engine.Consulta("SELECT Artigo.Artigo, Artigo.Descricao FROM Artigo WHERE Artigo.Familia = '" + genero + "' AND NOT Artigo.SubFamilia = '" + subGenero + "' AND NOT Artigo.Artigo = '" + id + "';");
                subGeneroList = PriEngine.Engine.Consulta("SELECT Artigo.Artigo, Artigo.Descricao FROM Artigo WHERE Artigo.Familia = '" + genero + "' AND Artigo.SubFamilia = '" + subGenero + "' AND NOT Artigo.Artigo = '" + id + "';");

                while (!subGeneroList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = subGeneroList.Valor("artigo");
                    art.DescArtigo = subGeneroList.Valor("descricao");

                    listArts.Add(art);
                    subGeneroList.Seguinte();
                }

                while (!generoList.NoFim())
                {
                    art = new Model.Artigo();
                    art.CodArtigo = generoList.Valor("artigo");
                    art.DescArtigo = generoList.Valor("descricao");

                    listArts.Add(art);
                    generoList.Seguinte();
                }

                return listArts;
            }
            else
            {
                return null;

            }

        }

        #endregion Artigo



        #region DocCompra


        public static List<Model.DocCompra> VGR_List()
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocCompra dc = new Model.DocCompra();
            List<Model.DocCompra> listdc = new List<Model.DocCompra>();
            Model.LinhaDocCompra lindc = new Model.LinhaDocCompra();
            List<Model.LinhaDocCompra> listlindc = new List<Model.LinhaDocCompra>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, NumDocExterno, Entidade, DataDoc, NumDoc, TotalMerc, Serie From CabecCompras where TipoDoc='VGR'");
                while (!objListCab.NoFim())
                {
                    dc = new Model.DocCompra();
                    dc.id = objListCab.Valor("id");
                    dc.NumDocExterno = objListCab.Valor("NumDocExterno");
                    dc.Entidade = objListCab.Valor("Entidade");
                    dc.NumDoc = objListCab.Valor("NumDoc");
                    dc.Data = objListCab.Valor("DataDoc");
                    dc.TotalMerc = objListCab.Valor("TotalMerc");
                    dc.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecCompras, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido, Armazem, Lote from LinhasCompras where IdCabecCompras='" + dc.id + "' order By NumLinha");
                    listlindc = new List<Model.LinhaDocCompra>();

                    while (!objListLin.NoFim())
                    {
                        lindc = new Model.LinhaDocCompra();
                        lindc.IdCabecDoc = objListLin.Valor("idCabecCompras");
                        lindc.CodArtigo = objListLin.Valor("Artigo");
                        lindc.DescArtigo = objListLin.Valor("Descricao");
                        lindc.Quantidade = objListLin.Valor("Quantidade");
                        lindc.Unidade = objListLin.Valor("Unidade");
                        lindc.Desconto = objListLin.Valor("Desconto1");
                        lindc.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindc.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindc.TotalLiquido = objListLin.Valor("PrecoLiquido");
                        lindc.Armazem = objListLin.Valor("Armazem");
                        lindc.Lote = objListLin.Valor("Lote");

                        listlindc.Add(lindc);
                        objListLin.Seguinte();
                    }

                    dc.LinhasDoc = listlindc;

                    listdc.Add(dc);
                    objListCab.Seguinte();
                }
            }
            return listdc;
        }


        public static Model.RespostaErro VGR_New(Model.DocCompra dc)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();


            GcpBEDocumentoCompra myGR = new GcpBEDocumentoCompra();
            GcpBELinhaDocumentoCompra myLin = new GcpBELinhaDocumentoCompra();
            GcpBELinhasDocumentoCompra myLinhas = new GcpBELinhasDocumentoCompra();

            PreencheRelacaoCompras rl = new PreencheRelacaoCompras();
            List<Model.LinhaDocCompra> lstlindv = new List<Model.LinhaDocCompra>();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myGR.set_Entidade(dc.Entidade);
                    myGR.set_NumDocExterno(dc.NumDocExterno);
                    myGR.set_Serie(dc.Serie);
                    myGR.set_Tipodoc("VGR");
                    myGR.set_TipoEntidade("F");
                    // Linhas do documento para a lista de linhas
                    lstlindv = dc.LinhasDoc;
                    //PriEngine.Engine.Comercial.Compras.PreencheDadosRelacionados(myGR,rl);
                    PriEngine.Engine.Comercial.Compras.PreencheDadosRelacionados(myGR);
                    foreach (Model.LinhaDocCompra lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Compras.AdicionaLinha(myGR, lin.CodArtigo, lin.Quantidade, lin.Armazem, "", lin.PrecoUnitario, lin.Desconto);
                    }


                    PriEngine.Engine.IniciaTransaccao();
                    PriEngine.Engine.Comercial.Compras.Actualiza(myGR, "Teste");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;

                }

            }
            catch (Exception ex)
            {
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }


        #endregion DocCompra


        #region DocsVenda

        public static Model.RespostaErro Encomendas_New(Model.DocVenda dv)
        {
            Lib_Primavera.Model.RespostaErro erro = new Model.RespostaErro();
            GcpBEDocumentoVenda myEnc = new GcpBEDocumentoVenda();

            GcpBELinhaDocumentoVenda myLin = new GcpBELinhaDocumentoVenda();

            GcpBELinhasDocumentoVenda myLinhas = new GcpBELinhasDocumentoVenda();

            PreencheRelacaoVendas rl = new PreencheRelacaoVendas();
            List<Model.LinhaDocVenda> lstlindv = new List<Model.LinhaDocVenda>();

            try
            {
                if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
                {
                    // Atribui valores ao cabecalho do doc
                    //myEnc.set_DataDoc(dv.Data);
                    myEnc.set_Entidade(dv.Entidade);
                    myEnc.set_Serie(dv.Serie);
                    myEnc.set_Tipodoc("ECL");
                    myEnc.set_TipoEntidade("C");
                    // Linhas do documento para a lista de linhas
                    lstlindv = dv.LinhasDoc;
                    //PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc, rl);
                    PriEngine.Engine.Comercial.Vendas.PreencheDadosRelacionados(myEnc);
                    foreach (Model.LinhaDocVenda lin in lstlindv)
                    {
                        PriEngine.Engine.Comercial.Vendas.AdicionaLinha(myEnc, lin.CodArtigo, lin.Quantidade, "", "", lin.PrecoUnitario, lin.Desconto);
                    }


                    // PriEngine.Engine.Comercial.Compras.TransformaDocumento(

                    PriEngine.Engine.IniciaTransaccao();
                    //PriEngine.Engine.Comercial.Vendas.Edita Actualiza(myEnc, "Teste");
                    PriEngine.Engine.Comercial.Vendas.Actualiza(myEnc, "ggg");
                    PriEngine.Engine.TerminaTransaccao();
                    erro.Erro = 0;
                    erro.Descricao = "Sucesso";
                    return erro;
                }
                else
                {
                    erro.Erro = 1;
                    erro.Descricao = "Erro ao abrir empresa";
                    return erro;

                }

            }
            catch (Exception ex)
            {
                PriEngine.Engine.DesfazTransaccao();
                erro.Erro = 1;
                erro.Descricao = ex.Message;
                return erro;
            }
        }



        public static List<Model.DocVenda> Encomendas_List()
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            List<Model.DocVenda> listdv = new List<Model.DocVenda>();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new
            List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL'");
                while (!objListCab.NoFim())
                {
                    dv = new Model.DocVenda();
                    dv.id = objListCab.Valor("id");
                    dv.Entidade = objListCab.Valor("Entidade");
                    dv.NumDoc = objListCab.Valor("NumDoc");
                    dv.Data = objListCab.Valor("Data");
                    dv.TotalMerc = objListCab.Valor("TotalMerc");
                    dv.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                    listlindv = new List<Model.LinhaDocVenda>();

                    while (!objListLin.NoFim())
                    {
                        lindv = new Model.LinhaDocVenda();
                        lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                        lindv.CodArtigo = objListLin.Valor("Artigo");
                        lindv.DescArtigo = objListLin.Valor("Descricao");
                        lindv.Quantidade = objListLin.Valor("Quantidade");
                        lindv.Unidade = objListLin.Valor("Unidade");
                        lindv.Desconto = objListLin.Valor("Desconto1");
                        lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");

                        listlindv.Add(lindv);
                        objListLin.Seguinte();
                    }

                    dv.LinhasDoc = listlindv;
                    listdv.Add(dv);
                    objListCab.Seguinte();
                }
            }
            return listdv;
        }

        public static List<Model.DocVenda> Encomendas_List_User(string codUser)
        {

            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            List<Model.DocVenda> listdv = new List<Model.DocVenda>();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new
            List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                objListCab = PriEngine.Engine.Consulta("SELECT id, Entidade, Data, DataCarga, DataDescarga, NumDoc, TotalMerc, TotalIva, TotalDesc, Serie From CabecDoc where TipoDoc='ECL' AND Entidade='" + codUser + "'");
                while (!objListCab.NoFim())
                {
                    dv = new Model.DocVenda();
                    dv.id = objListCab.Valor("id");
                    dv.Entidade = objListCab.Valor("Entidade");
                    dv.NumDoc = objListCab.Valor("NumDoc");
                    dv.Data = objListCab.Valor("Data");
                    dv.Estado = "Enviado";
                    string carga = objListCab.Valor("DataCarga");
                    string descarga = objListCab.Valor("DataDescarga");
                    if (carga == null || carga.Equals("")) dv.Estado = "Em Processamento";
                    else if (descarga == null || descarga.Equals("")) dv.Estado = "Em Envio";
                    dv.TotalMerc = Convert.ToDouble(objListCab.Valor("TotalMerc"));
                    dv.Serie = objListCab.Valor("Serie");
                    objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                    listlindv = new List<Model.LinhaDocVenda>();

                    while (!objListLin.NoFim())
                    {
                        lindv = new Model.LinhaDocVenda();
                        lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                        lindv.CodArtigo = objListLin.Valor("Artigo");
                        lindv.DescArtigo = objListLin.Valor("Descricao");
                        lindv.Quantidade = objListLin.Valor("Quantidade");
                        lindv.Unidade = objListLin.Valor("Unidade");
                        lindv.Desconto = objListLin.Valor("Desconto1");
                        lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                        lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                        lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");

                        listlindv.Add(lindv);
                        objListLin.Seguinte();
                    }

                    dv.LinhasDoc = listlindv;
                    listdv.Add(dv);
                    objListCab.Seguinte();
                }
            }
            return listdv;
        }

        public static Model.TotalFamilias Encomendas_List_Familias()
        {
            StdBELista objListaFam;

            Model.TotalFamilias art = new Model.TotalFamilias();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string select = "SELECT Familias.Descricao, COUNT(Familias.Descricao) AS Num FROM ((CabecDoc INNER JOIN LinhasDoc ON CabecDoc.id = LinhasDoc.IdCabecDoc) INNER JOIN Artigo ON Artigo.Artigo = LinhasDoc.Artigo) INNER JOIN Familias ON Familias.Familia = Artigo.Familia WHERE CabecDoc.TipoDoc = 'ECL' AND Quantidade > 0 GROUP BY Familias.Descricao ORDER BY COUNT(Familias.Descricao) DESC; ";

                objListaFam = PriEngine.Engine.Consulta(select);
                art.Tipos = new List<string>();
                art.Totais = new List<int>();

                while (!objListaFam.NoFim())
                {
                    art.Tipos.Add(objListaFam.Valor("Descricao"));
                    art.Totais.Add(objListaFam.Valor("Num"));

                    objListaFam.Seguinte();
                }

                return art;

            }
            else
            {
                return null;

            }
        }



        public static Model.DocVenda Encomenda_Get(string numdoc)
        {


            StdBELista objListCab;
            StdBELista objListLin;
            Model.DocVenda dv = new Model.DocVenda();
            Model.LinhaDocVenda lindv = new Model.LinhaDocVenda();
            List<Model.LinhaDocVenda> listlindv = new List<Model.LinhaDocVenda>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {


                string st = "SELECT id, Entidade, Data, NumDoc, TotalMerc, Serie From CabecDoc where TipoDoc='ECL' and NumDoc='" + numdoc + "'";
                objListCab = PriEngine.Engine.Consulta(st);
                dv = new Model.DocVenda();
                dv.id = objListCab.Valor("id");
                dv.Entidade = objListCab.Valor("Entidade");
                dv.NumDoc = objListCab.Valor("NumDoc");
                dv.Data = objListCab.Valor("Data");
                dv.TotalMerc = objListCab.Valor("TotalMerc");
                dv.Serie = objListCab.Valor("Serie");
                objListLin = PriEngine.Engine.Consulta("SELECT idCabecDoc, Artigo, Descricao, Quantidade, Unidade, PrecUnit, Desconto1, TotalILiquido, PrecoLiquido from LinhasDoc where IdCabecDoc='" + dv.id + "' order By NumLinha");
                listlindv = new List<Model.LinhaDocVenda>();

                while (!objListLin.NoFim())
                {
                    lindv = new Model.LinhaDocVenda();
                    lindv.IdCabecDoc = objListLin.Valor("idCabecDoc");
                    lindv.CodArtigo = objListLin.Valor("Artigo");
                    lindv.DescArtigo = objListLin.Valor("Descricao");
                    lindv.Quantidade = objListLin.Valor("Quantidade");
                    lindv.Unidade = objListLin.Valor("Unidade");
                    lindv.Desconto = objListLin.Valor("Desconto1");
                    lindv.PrecoUnitario = objListLin.Valor("PrecUnit");
                    lindv.TotalILiquido = objListLin.Valor("TotalILiquido");
                    lindv.TotalLiquido = objListLin.Valor("PrecoLiquido");
                    listlindv.Add(lindv);
                    objListLin.Seguinte();
                }

                dv.LinhasDoc = listlindv;
                return dv;
            }
            return null;
        }

        #endregion DocsVenda

        #region Armazem

        public static List<Model.Armazem> GetArmazensInfo()
        {

            StdBELista objList;

            List<Model.Armazem> armazens = new List<Model.Armazem>();

            if (PriEngine.InitializeCompany(FirstREST.Properties.Settings.Default.Company.Trim(), FirstREST.Properties.Settings.Default.User.Trim(), FirstREST.Properties.Settings.Default.Password.Trim()) == true)
            {
                string select = "SELECT Artigo.Artigo, Artigo.Descricao as ARTD, Iva, PVP1, SUM(ArtigoArmazem.StkActual) as StkLocal,Armazens.Descricao, Armazens.Armazem, Armazens.Localidade, Distritos.Descricao as Dist ";
                string from1 = "FROM ((( ARTIGO INNER JOIN ARTIGOMOEDA ON Artigo.Artigo = ArtigoMoeda.Artigo) ";
                string from2 = "INNER JOIN ARTIGOARMAZEM ON Artigo.Artigo = ArtigoArmazem.Artigo) ";
                string from3 = "INNER JOIN ARMAZENS ON ArtigoArmazem.Armazem = Armazens.Armazem) ";
                string from4 = "LEFT JOIN DISTRITOS ON Armazens.Distrito = Distritos.Distrito ";
                string from5 = "GROUP BY Artigo.Artigo, Artigo.Descricao, Iva, PVP1,Armazens.Descricao, Armazens.Armazem, Armazens.Localidade, Distritos.Descricao ORDER BY Armazens.Armazem";
                string queryS = select + from1 + from2 + from3 + from4 + from5;

                objList = PriEngine.Engine.Consulta(queryS);

                bool change = false;
                string armazem = "";
                Model.Armazem cur = null;
                bool inicio = true;

                while (!objList.NoFim())
                {
                    change = !armazem.Equals(objList.Valor("Armazem"));
                    armazem = objList.Valor("Armazem");
                    if(change)
                    {
                        if (!inicio)
                        {
                            armazens.Add(cur);
                        }
                        else
                        {
                            inicio = false;
                        }
                        Model.Armazem arm = new Model.Armazem();
                        arm.ArmazemId = objList.Valor("Armazem");
                        arm.Descricao = objList.Valor("Descricao");
                        arm.Localidade = objList.Valor("Localidade");
                        arm.Distrito = objList.Valor("Dist");
                        arm.Artigos = new List<Model.Artigo>();
                        cur = arm;
                    }

                    Model.Artigo art = new Model.Artigo();
                    art.CodArtigo = objList.Valor("Artigo");
                    art.Observacoes = objList.Valor("ARTD");
                    art.STKAtual = objList.Valor("StkLocal");
                    art.PrecoFinal = Convert.ToDouble(objList.Valor("PVP1")) * (1 + Convert.ToDouble(objList.Valor("Iva")) * 0.01);
                    cur.Artigos.Add(art);
                    
                    objList.Seguinte();
                }

                return armazens;

            }
            else
            {
                return null;

            }

        }
        #endregion Armazem
    }
}   