const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "⚡";
document.body.append(clickButton);

let counter: number = 0;
const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.textContent = `${counter} Cycles`;
document.body.append(counterDisplay);

const growthRateDisplay: HTMLDivElement = document.createElement("div");
document.body.append(growthRateDisplay);

const itemCountsDisplay: HTMLDivElement = document.createElement("div");
document.body.append(itemCountsDisplay);

clickButton.addEventListener("click", () => {
  counter++;
});

const priceIncreaseFactor = 1.15;

let costA = 10;
const rateA = 0.1;
let countA = 0;
const buttonA: HTMLButtonElement = document.createElement("button");
document.body.append(buttonA);
buttonA.addEventListener("click", () => {
  if (counter >= costA) {
    counter -= costA;
    countA++;
    costA *= priceIncreaseFactor;
  }
});

let costB = 100;
const rateB = 2.0;
let countB = 0;
const buttonB: HTMLButtonElement = document.createElement("button");
document.body.append(buttonB);
buttonB.addEventListener("click", () => {
  if (counter >= costB) {
    counter -= costB;
    countB++;
    costB *= priceIncreaseFactor;
  }
});

let costC = 1000;
const rateC = 50;
let countC = 0;
const buttonC: HTMLButtonElement = document.createElement("button");
document.body.append(buttonC);
buttonC.addEventListener("click", () => {
  if (counter >= costC) {
    counter -= costC;
    countC++;
    costC *= priceIncreaseFactor;
  }
});

let lastTimestamp: number = 0;
function gameLoop(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  const totalGrowthRate = (countA * rateA) + (countB * rateB) +
    (countC * rateC);
  counter += totalGrowthRate * deltaTime;

  counterDisplay.textContent = `${Math.floor(counter)} Cycles`;
  growthRateDisplay.textContent = `Growth: ${
    totalGrowthRate.toFixed(1)
  } Cycles/sec`;
  itemCountsDisplay.innerHTML = `
        <p>Overclockers: ${countA}</p>
        <p>Quantum Bits: ${countB}</p>
        <p>AI Cores: ${countC}</p>
    `;

  buttonA.textContent = `Buy Overclocker (Cost: ${Math.ceil(costA)})`;
  buttonA.disabled = counter < costA;
  buttonB.textContent = `Buy Quantum Bit (Cost: ${Math.ceil(costB)})`;
  buttonB.disabled = counter < costB;
  buttonC.textContent = `Buy AI Core (Cost: ${Math.ceil(costC)})`;
  buttonC.disabled = counter < costC;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
