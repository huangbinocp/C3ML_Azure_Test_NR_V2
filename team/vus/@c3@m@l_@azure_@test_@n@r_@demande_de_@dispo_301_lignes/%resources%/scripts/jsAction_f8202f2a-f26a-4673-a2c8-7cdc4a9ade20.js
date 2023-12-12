var myClient = context.variableManager.getValue("ListeClientProduit_NR_Demande_de_Dispo_301_lignes.client");
if (myClient==null) {
       context.fail(" Client not found, check input file");
}
else
{

        context.variableManager.setValue("Extracted_Client_Id",myClient);
        
        var myOrder = context.variableManager.getValue("ListeClientProduit_NR_Demande_de_Dispo_301_lignes.product_quantity");
        if (myOrder==null) {
               context.fail(" Order not found, check input file");
        }
        else
        {

                var myType = context.variableManager.getValue("ListeClientProduit_NR_Demande_de_Dispo_301_lignes.type");
                if (myType==null) {
                       context.fail(" Message type  not found, check input file");
                }
                
                var myAttendu = context.variableManager.getValue("ListeClientProduit_NR_Demande_de_Dispo_301_lignes.attendu_requete");
                if (myAttendu==null) {
                       context.fail(" Message attendu  not found, check input file");                   
                }
                                 
                 context.variableManager.setValue("Resultat_attendu",myAttendu);
                                
                var myAttendu_ihm = context.variableManager.getValue("ListeClientProduit_NR_Demande_de_Dispo_301_lignes.attendu_IHM");
                if (myAttendu==null) {
                       context.fail(" Message attendu IHM  not found, check input file");                   
                }
                                
                 context.variableManager.setValue("Resultat_attendu_IHM",myAttendu_ihm);
                
                logger.info("Message Resultat_attendu_IHM est "+myAttendu_ihm);
                               
                var myRef = context.variableManager.getValue("reference_string");
                
                 var orderarray = new Array();
                // This will return an array with strings "1", "2", etc.
                orderarray = myOrder.split(";");
                
                //Number of products
                var  productNUmber = orderarray.length/2;
                
                var Body = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+"\n";
                Body = Body + "<CSRP_ENVELOPPE xmlns=\"urn:x-csrp:fr.csrp.protocole:enveloppe\"  Version_Protocole=\"1.0.0.0\" Nature_Action=\"REQ_EMISSION\" Id_Logiciel=\"COREF_X4\" Version_Logiciel=\"1.2.3.4\" Usage=\"P\">"+"\n";
                Body = Body + " <ENTETE>"+"\n";
                Body = Body + " <EMETTEUR Nature=\"OF\" Code=\"00\" Id=\""+myClient+"\" Adresse=\"Rue de la gare\"/>"+"\n";
                Body = Body + " <RECEPTEUR Nature=\"RE\" Code=\"20\" Id=\"OCP\" Adresse=\"2, Rue Galien 93587 Saint-Ouen\"/>"+"\n";
                Body = Body + "  <REF_MESSAGE>RF_MES_"+myRef+"</REF_MESSAGE>"+"\n";
                Body = Body + " </ENTETE><CORPS>"+"\n";
                Body = Body + "  <MESSAGE_OFFICINE xmlns=\"urn:x-csrp:fr.csrp.protocole:message\"  >"+"\n";
                Body = Body + " <ENTETE>"+"\n";
                Body = Body + " <EMETTEUR Nature_Partenaire=\"OF\" Id_Client=\""+myClient+"\"/>"+"\n";
                Body = Body + " <DESTINATAIRE Nature_Partenaire=\"RE\" Code_Societe=\"20\" Id_Societe=\"OCP\"/>"+"\n";
                Body = Body + " </ENTETE>"+"\n";
                
                if (myType == "order"){
                        Body = Body + " <CORPS><COMMANDE Ref_Cde_Client=\"RF_CDE_"+myRef+"\">"+"\n";
                }
               if (myType == "request"){
                         Body = Body + "<CORPS><REQ_INFO_PRODUIT Ref_Req_Info_Produit=\"RF_REQ_"+myRef+"\">"+"\n";
               }
               
               //No NORMALE node for request
                if (myType == "order"){
                             Body = Body + "  <NORMALE>"+"\n";
                }
                
                //logger.debug("priceNumberLoop = "+priceNumberLoop);  
                var line_num;
                for (var i = 0; i < productNUmber ; i++){
                    line_num = i+1;
                    if (myType == "order"){
                             Body = Body+ "  <LIGNE_N Num_Ligne=\""+line_num +"\" Type_Codification= \"CIP39\" Code_Produit=\""+orderarray[i*2]+"\" Quantite=\""+orderarray[i*2+1]+"\" Partielle=\"true\" Reliquat=\"false\" Equivalent=\"false\"></LIGNE_N>"+"\n";
                      }
                    if (myType == "request"){
                             Body = Body+ "  <LIGNE Num_Ligne=\""+line_num +"\" Type_Codification= \"CIP39\" Code_Produit=\""+orderarray[i*2]+"\" Quantite=\""+orderarray[i*2+1]+"\"/>"+"\n";                      }
                }
                
                
               //No NORMALE node for request
                if (myType == "order"){
                        Body = Body + " </NORMALE>"+"\n";
                }
                
                if (myType == "order"){
                         Body = Body + " </COMMANDE>"+"\n";
                }
                
                if (myType == "request"){
                        Body = Body + " </REQ_INFO_PRODUIT>"+"\n";
                }
                
                Body = Body + "  </CORPS>"+"\n";
                Body = Body + "  </MESSAGE_OFFICINE></CORPS></CSRP_ENVELOPPE>"+"\n";

                context.variableManager.setValue("Request_content",Body);
                
                logger.info("Message type  read ="+myType);
                logger.info("Client  read ="+myClient);
                logger.info("Product  number read ="+productNUmber);
                logger.info("Message to be sent:\n"+Body);
                
                context.variableManager.setValue("myType",myType);
                
                // Inject the computed value in a runtime variable
               // context.variableManager.setValue("Request_content",ReadContent);
        
        }
}