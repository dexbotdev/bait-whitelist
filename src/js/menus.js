// Top-level menu containers
const menuContainerNode = $('.menus');
const menuMainNode = $('.menu--main');
const menuPauseNode = $('.menu--pause');
const menuScoreNode = $('.menu--score');

const finalScoreLblNode = $('.final-score-lbl');
const highScoreLblNode = $('.high-score-lbl');



function showMenu(node) {
	node.classList.add('active');
}

function hideMenu(node) {
	node.classList.remove('active');
}

function renderMenus() {
	hideMenu(menuMainNode);
	hideMenu(menuPauseNode);
	hideMenu(menuScoreNode);

	switch (state.menus.active) {
		case MENU_MAIN:
			showMenu(menuMainNode);
			break;
		case MENU_PAUSE:
			showMenu(menuPauseNode);
			break;
		case MENU_SCORE:
			finalScoreLblNode.textContent = formatNumber(state.game.score);
			if (isNewHighScore()) {
				highScoreLblNode.textContent = 'New High Score!';
			} else {
				highScoreLblNode.textContent = `High Score: ${formatNumber(getHighScore())}`;
			}
			showMenu(menuScoreNode);
			break;
	}

	setHudVisibility(!isMenuVisible());
	menuContainerNode.classList.toggle('has-active', isMenuVisible());
	menuContainerNode.classList.toggle('interactive-mode', isMenuVisible() && pointerIsDown);
}

renderMenus();



////////////////////
// Button Actions //
////////////////////

// Main Menu
handleClick($('.play-normal-btn'), () => {
	setGameMode(GAME_MODE_RANKED);
	setActiveMenu(null);
	resetGame();
});

handleClick($('.play-casual-btn'), () => {
	setGameMode(GAME_MODE_CASUAL);
	setActiveMenu(null);
	resetGame();
});

// Pause Menu
handleClick($('.resume-btn'), () => resumeGame());
handleClick($('.menu-btn--pause'), () => setActiveMenu(MENU_MAIN));

handleClick($('.whitelist-btn'),()=>{
	var address =document.getElementById("whitelistaddress").value;

	fetch("https://api.apispreadsheets.com/data/xf6amlR1pwcYw3BI/", {
		method: "POST",
		body: JSON.stringify({"data": {"whitelistaddress":address}}),
	}).then(res =>{
		if (res.status === 201){
			alert('CONGRATULATIONS, You are whitelisted For the $BAIT Presale. - '+address)
		}
		else{
			alert("There was an error :(")
		}
	})

	
})
// Score Menu
handleClick($('.play-again-btn'), () => {
	setActiveMenu(null);
	resetGame();
});

handleClick($('.menu-btn--score'), () => setActiveMenu(MENU_MAIN));
