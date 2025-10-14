const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "🚀";
document.body.append(clickButton);

let counter: number = 0;
const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.textContent = `${counter} Thrust`;
document.body.append(counterDisplay);

clickButton.addEventListener("click", () => {
  counter++;
});

let growthRatePerSecond: number = 0;
const upgradeCost: number = 10;

const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.textContent = `Add Booster (Cost: ${upgradeCost})`;
document.body.append(upgradeButton);

upgradeButton.addEventListener("click", () => {
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    growthRatePerSecond++;
  }
});

let lastTimestamp: number = 0;

function gameLoop(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  counter += growthRatePerSecond * deltaTime;
  counterDisplay.textContent = `${Math.floor(counter)} Thrust`;

  upgradeButton.disabled = counter < upgradeCost;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
