

/* Start der Seite: Initialisierungen
*/
function initializePage() {
	var vrsn = document.getElementById("footerVersionFeld");
	restCall_userliste(); 
	zeigeDivZuStage("warte_login");
	fuelleSelectMitUsernamen('cboNamenswahl');
}

function zeigeDivZuStage(stage) {
	var div2Show="divNameWaehlen";

	if (stage=="warte_login") {
		div2Show="divNameWaehlen";
	} else if (stage=="warte_skill") {
		div2Show="divSkillWaehlen";
	} else if (stage=="brainstorming") {
			div2Show="divBrainstorming";
	} else if (stage=="schaetzungen") {
		div2Show="divSchaetzungen";
	} else if (stage=="tabellenstand") {
		div2Show="divTabellenstand";
	}
	zeigeDivArea(div2Show);
}

// Zeigt die angegebene div-area an
//
function zeigeDivArea(areaname) {
	// "Tabulator"- div- areas ändern
	for (elem of document.getElementsByClassName("divTabulatorArea")) {
		if (elem.id==areaname) {
			modifyClass(elem,"divVisible","divHidden");
		} else {
			modifyClass(elem,"divHidden","divVisible");
		}
	} 
}

/* Zeigt eine Meldung in pMessageAnzeige an.
*/
function zeigeMessage(msg) {
	var pm=document.getElementById('pMessageAnzeige');
	pm.innerHTML=msg;
}

function abfrageStage() {
}

// füllt eine <select> mit der Liste der Usernamen
function fuelleSelectMitUsernamen(idSelect) {

	var slct=document.getElementById(idSelect);
	for (elem of usernamenliste) {

		var optn = document.createElement('option');
		optn.value = elem;
	   optn.innerHTML=elem;
	   slct.appendChild(optn);
	}
}

function getSelectListUsernamen() {
	var html="<select>";
	for (elem of usernamenliste) {
	   html=html+"<option value='"+elem+"' label='"+elem+"'>"+elem+"</option>";
	}
	html=html+"</select>";
	return html;
}

/* Ändert das className - Attribut am übergebenen DOM-Element:

	toAdd wird angehängt, wenn es noch nicht da ist;
	toRemove wird entfernt, falls vorhanden.
*/
function modifyClass(domElement, toAdd, toRemove) {
	var txt=domElement.className;
	if (domElement.className.includes(toRemove)) {
		domElement.className = domElement.className.replace(toRemove, "").trim();
	}		
	if (domElement.className.includes(toAdd)==false) {
		domElement.className = domElement.className+" "+toAdd;
	}		
}
