// Global constants
const alfabet = 'abcdefghijklmnopqrstuvwxyz';
const woordenboek = [
	'zwaardvis', 'narwal', 'walvishaai', 'koraalduivel', 'piraat',
	'zeemeermin', 'kathaai', 'zeepaardje', 'zonnevis', 'kaaimansnoek',
	'golven', 'storm', 'kapseizen', 'kielhalen', 'kapitein', 'matroos'
]
// Als de pagina geladen is:
window.addEventListener("load", function() {
	const schavot = document.getElementById('schavot');
	const woord = document.getElementById('woord');
	const aantal = document.getElementById('aantal');
	let nr = Math.floor(Math.random() * woordenboek.length);
	let gekozenWoord = woordenboek[nr];
	let controleArray = [];
	let beurt = 1;
	let hint = '';
	let letter;
	// gekozen woord in -'s omzetten
	for (var wl = 0; wl < gekozenWoord.length; wl++) {
		hint += '-';
	}
	// start klaarmaken
	woord.innerHTML = hint;
	aantal.innerHTML = gekozenWoord.length+' letterwoord';
	schavot.src = 'images/galg_0.png';
	// interactieve alfabetknoppen aanmaken
	for (var i = 0; i < alfabet.length; i++) {
		const button = document.createElement('button');
		button.innerHTML = alfabet[i];
		button.id = alfabet[i];
		button.style.backgroundColor = '#A0522D';
		button.style.width = '30px';
		document.getElementById('alphabet').appendChild(button);
		button.onclick = function() {
			letterGekozen(event.target.innerHTML);
		}
	}
	// toetsenbord interactief maken
	window.addEventListener('keyup', function() {
		// alleen kleine letters zijn toegestaan
		let letter = event.key.toLowerCase();
		// als het een lettertoets is controlleer de letter
		if (alfabet.includes(letter)) {
			letterGekozen(letter);
		}
	});
	// gekozen letter controleren
	function letterGekozen(letter) {
		const uitslag = document.getElementById('uitslag');
		const woord = document.getElementById('woord');
		const spelerKeuze = document.getElementById('spelerKeuze');
		let letterKnop = document.getElementById(letter);
		// letter al gekozen of niet?
		if (controleArray.includes(letter)) {
			alert('Deze letter is al gekozen');
		} else {
			controleArray.push(letter);
			if (!gekozenWoord.includes(letter)) {
				// als de letter NIET in het woord zit
				letterKnop.style.backgroundColor = 'red';
				schavot.src = 'images/galg_'+beurt+'.png';
				beurt++;
			} else {
				// als de letter WEL in het woord zit
				let refresh = '';
				for (var n = 0; n < gekozenWoord.length; n++) {
					if (gekozenWoord[n] === letter) {
						refresh += letter;
					} else {
						refresh += hint[n];
					}
				}
				hint = refresh;
				woord.innerHTML = hint;
				letterKnop.style.backgroundColor = 'green';
			}
			// einde van het spel
			if (hint === gekozenWoord || beurt === 8) {
				spelerKeuze.style.display = 'none';
				if (hint === gekozenWoord) {
					uitslag.innerHTML = 'Gefeliciteerd!!!';
					woord.style.backgroundColor = 'green';
				} else {
					uitslag.innerHTML = 'Helaas je hebt verloren&hellip;';
					woord.innerHTML = gekozenWoord;
					woord.style.backgroundColor = 'red';
				}
			}	
		}
	}
/*
 *	console.log(gekozenWoord);
 */
});
