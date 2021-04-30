"use strict";
//import Game from "/alone/src/game.js";

import PopUp from "/alone/src/popUp.js";
import { Reason, GameBuilder } from "/alone/src/game.js";
import * as sound from "/alone/src/sound.js";

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .withGameDuration(3)
  .withCarrotCount(2)
  .withBugCount(2)
  .build();

game.setGameStopListener((reason) => {
  console.log(reason);
  let messagae;
  switch (reason) {
    case Reason.cancel:
      messagae = "REPLAY❓";
      sound.playAlert();
      break;
    case Reason.win:
      messagae = "YOU WON 🎉";
      sound.playWin();
      break;
    case Reason.lose:
      messagae = "YOU LOST💩";
      sound.playBug();
      break;
    default:
      throw new Error("not valid reason");
  }
  gameFinishBanner.showWithText(messagae);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
