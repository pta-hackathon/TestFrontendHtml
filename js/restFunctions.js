
/**
	Übersicht über die verschickten REST-Anfragen:
	Typ/Pfad, ausführende Funktion und ErgebnisCallback
GET
POST
*/

let user = "user"

function getRestURL(restQuery) {
	return "http://172.17.28.33:8080"+"/"+restQuery;
}

/**	
 * Anmeldung 
*/
function restCall_anmeldung()
{
	// Das Dropdown-Element auswählen
	var dropdown = document.getElementById("cboNamenswahl");
	// Den ausgewählten Index abrufen
	var selectedIndex = dropdown.selectedIndex;
	// Den ausgewählten Wert abrufen
	var username_local = dropdown.options[selectedIndex].value;
	var params = "?user="+ username_local;
	username = username_local;
	console.log(username);
	
	$.ajax({
	    url: getRestURL("anmelden") + params,
	    type: "POST",
       crossDomain: true,	    
	    success: restResponseLogin,
	    error: restResponseMessageOnly
	});	
} 

function restResponseLogin(data, status) 
{
	console.log(data);
	zeigeMessage("Willkommen "+ username);
	zeigeDivZuStage('warte_skill');
	restCall_getAllTickets();
}

/**	
 * Abmeldung 
*/
function restCall_abmeldung()
{
	var params = "?user="+ username;
	console.log(params);
	
	$.ajax({
	    url: getRestURL("abmelden") + params,
	    type: "POST",
       crossDomain: true,	    
	    success: restResponseLogout,
	    error: restResponseMessageOnly
	});	
}

function restResponseLogout(data, status) 
{
	zeigeMessage("Willkommen ");
	zeigeDivZuStage('warte_login');
} 

/**	
 * Kompetenz 
*/
function restCall_skillwaehlen()
{
	// Das Dropdown-Element auswählen
	var dropdown = document.getElementById("cboSkilllevel");
	// Den ausgewählten Index abrufen
	var selectedIndex = dropdown.selectedIndex;
	// Den ausgewählten Wert abrufen
	var kompetenz_local = dropdown.options[selectedIndex].value;
	var params = "?user="+ username + "&kompetenz=" + kompetenz_local;
	kompetenz = kompetenz_local;
	console.log(params);
	
	$.ajax({
	    url: getRestURL("kompetenz") + params,
	    type: "POST",
       crossDomain: true,	    
	    success: restResponseSkill,
	    error: restResponseMessageOnly
	});	
}

function restResponseSkill(data, status) 
{
	zeigeMessage("Willkommen "+ username);
	zeigeDivZuStage('brainstorming');	
} 

/**	
 * Brainstorming 
*/
function restCall_brainstorming()
{
	// Das Dropdown-Element auswählen
	var textArea = document.getElementById("textBrainstorming");
	var brainstoming_local = textArea.value;
	var params = "?user="+ username + "&kompetenz=" + kompetenz_local;
	kompetenz = kompetenz_local;
	console.log(params);
	
	$.ajax({
	    url: getRestURL("brainstorming") + params,
	    type: "POST",
       crossDomain: true,	    
	    success: restResponseBrainstorming,
	    error: restResponseMessageOnly
	});	
}

function restResponseBrainstorming(data, status) 
{
	zeigeMessage("Willkommen "+ username);
	zeigeDivZuStage('schaetzungen');	
} 

/**	
 * Userliste 
*/
function restCall_userliste()
{
	usernamenliste = ["waldemar","kyrillos","thomas","josias"];
}

/**	
 * Stage
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
			'<td>' + data.schaetzungen[x].minwrt + " - " + data.schaetzungen[x].maxwrt + '</td>' +
			
			'<td>' + getSelectListUsernamen() + '</td>' ;
		// usernamenliste als Auswahlliste dahinter

      tbody.appendChild(tr);
   }
   zeigeMessage(data.message);
}

function restCall_meineschaetzung()
{
}

function restCall_getAllTickets()
{
	console.log("get tickets");
	
	$.ajax({
	    url: getRestURL("tickets"),
	    type: "GET",
       crossDomain: true,	    
	    success: restResponseGetAllTickets,
	    error: restResponseMessageOnly
	});	
}

function restResponseGetAllTickets(data)
{
	console.log(data[0].text);
	console.log("get all tickets");
	ticketname = data[0].text;
	setTicketnameInUI();
}

function setTicketnameInUI()
{
	var textsForTickets = document.getElementsByClassName("Ticketbeschreibung");
	for (var i = 0; i < textsForTickets.length; i++)
	{
		console.log("ticketname");
		console.log(ticketname);
		textsForTickets[i].textContent = ticketname;
	}
}

/* Generische Response-CallBack: zeigt nur einen Infotext 
*/
function restResponseMessageOnly(data, status) 
{
	zeigeMessage(data.msg+" ["+status+"]");
}