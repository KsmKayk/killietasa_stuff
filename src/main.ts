const MOD_NAME = "killiettasa_stuff";

export function main(): void {
  // Instantiate a new mod object, which grants the ability to add callback functions that
  // correspond to in-game events
  const mod = RegisterMod(MOD_NAME, 1);

  // Set a callback function that corresponds to when a new run is started
  mod.AddCallback(ModCallbacks.MC_POST_GAME_STARTED, postGameStarted);
  mod.AddCallback(ModCallbacks.MC_EVALUATE_CACHE, evaluateCache);

  // Print an initialization message to the "log.txt" file
  Isaac.DebugString(`${MOD_NAME} initialized.`);
}

const STEAM_SALE = Isaac.GetItemIdByName("Steam Sale");
const THE_MIND = Isaac.GetItemIdByName("The Mind");
const BLACK_CANDLE = Isaac.GetItemIdByName("Black Candle");

function postGameStarted() {
  if (Game().IsGreedMode() && Game().GetLevel().GetStage() === 1) {
    const player = Isaac.GetPlayer(0);
    player.AddCoins(20);
    player.AddCollectible(STEAM_SALE);
  }

  if (!Game().IsGreedMode() && Game().GetLevel().GetStage() === 1) {
    const player = Isaac.GetPlayer(0);
    player.AddCollectible(THE_MIND);
    player.AddCollectible(BLACK_CANDLE);
  }
}

function evaluateCache() {
  if (Game().GetLevel().GetStage() === 1) {
    const player = Isaac.GetPlayer(0);
    player.Luck = 15;
  }
}
