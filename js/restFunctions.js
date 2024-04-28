
/**
	Übersicht über die verschickten REST-Anfragen:
	Typ/Pfad, ausführende Funktion und ErgebnisCallback

GET
POST

*/



function getRestURL(restQuery) {
	return "http://localhost:8080"+"/"+restQuery;
}


/**	Anmeldung 
*/
function restCall_anmeldung()
{
	var username=document.getElementById('cboNamenswahl'); // cboValueName
	var params = "&username="+username;
	
	$.ajax({
	    url: getRestURL("login")+params,
	    type: "POST",
       crossDomain: true,	    
	    success: restResponseLogin,
	    error: restResponseMessageOnly
	});	
} 

function restResponseLogin(data, status) 
{
	sessionTournamentId = data.idUser;
	sessionTokenReceived = data.idName;
	zeigeMessage("Willkommen "+username+ " ["+userId+"]");		
}




function restCall_skillwaehlen()
{
}


function restCall_userliste()
{
	usernamenliste = ["waldemar","kyrillos","thomas","josias"];
}




/**	Anmeldung 
*/
function restCall_abfragestage()
{
	$.ajax({
	    url: getRestURL("stage"),
	    type: "GET",
       crossDomain: true,	    
	    success: restResponseMessageOnly,
	    error: restResponseMessageOnly
	});	
} 






function restCall_holeschaetzungen()
{
}

function restReponse_holeschaetzungen(data, status) 
{
	var hdr=document.getElementById('pTextUeberschriftZwischenstand');
	hdr.innerHTML = data.ueberschrift;

   var tbody = document.getElementById('tabSchaetzungen');
   tbody.innerHTML="";
   for (x=0; x<data.schaetzungen.length; x++) {
      var tr = document.createElement('tr');
		tr.innerHTML = 
			'<td>' + data.schaetzungen[x].minwrt + " - "+data.schaetzungen[x].maxwrt +'</td>' +
			
			'<td>' + getSelectListUsernamen() +'</td>' ;
		// usernamenliste als Auswahlliste dahinter

      tbody.appendChild(tr);
   }
   zeigeMessage(data.message);
}



function restCall_meineschaetzung()
{
}




/* Generische Response-CallBack: zeigt nur einen Infotext 
*/
function restResponseMessageOnly(data, status) 
{
	zeigeMessage(data.msg+" ["+status+"]");
}
