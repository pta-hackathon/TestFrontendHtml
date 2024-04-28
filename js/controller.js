

var stage="";
var username="";
var userid=-1;

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
	sessionTournamentName="";
	sessionTournamentId=-1;
	sessionTokenReceived="";
	sessionErgebnisseRunde=0;	
}

