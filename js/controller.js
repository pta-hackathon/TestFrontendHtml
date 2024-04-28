

var stage="";
var username="";
var kompetenz="";
var ticketname="";
var userid=-1;
var ticketid=-1;

var usernamenliste="";

function execLogin() {
	
	if (sessionTournamentName!="" || sessionTournamentId>-1) {
		zeigeMessage("Bitte erst abmelden!!");
		return;
	}	
	
	restCallLogin();
}

function execLogout() {
	showTabHome();
	zeigeMessage("Abmeldung...");
	restCallLogout();
}

