const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "⚡";
document.body.append(clickButton);

let counter: number = 0;
const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.textContent = `${counter} Cycles`;
document.body.append(counterDisplay);

const growthRateDisplay: HTMLDivElement = document.createElement("div");
document.body.append(growthRateDisplay);

interface Item {
  name: string;
  description: string;
  baseCost: number;
  currentCost: number;
  rate: number;
  count: number;
  button: HTMLButtonElement;
  display: HTMLParagraphElement;
}

const availableItems: Item[] = [
  {
    name: "Overclocker",
    description: "Pushes your CPU a little harder.",
    baseCost: 10,
    rate: 0.1,
    count: 0,
    currentCost: 10,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
  {
    name: "Quantum Bit",
    description: "Harnesses spooky action at a distance.",
    baseCost: 100,
    rate: 2,
    count: 0,
    currentCost: 100,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
  {
    name: "AI Core",
    description: "A thinking machine to optimize cycle generation.",
    baseCost: 1000,
    rate: 50,
    count: 0,
    currentCost: 1000,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
  {
    name: "Neural Network",
    description: "Connects processors like a digital brain.",
    baseCost: 12000,
    rate: 250,
    count: 0,
    currentCost: 12000,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
  {
    name: "Singularity",
    description: "Transcends the limits of computation.",
    baseCost: 150000,
    rate: 1400,
    count: 0,
    currentCost: 150000,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
];

const priceIncreaseFactor = 1.15;

availableItems.forEach((item) => {
  document.body.append(item.button);
  const descriptionElement = document.createElement("small");
  descriptionElement.textContent = item.description;
  document.body.append(descriptionElement);
  document.body.append(item.display);

  item.button.addEventListener("click", () => {
    if (counter >= item.currentCost) {
      counter -= item.currentCost;
      item.count++;
      item.currentCost *= priceIncreaseFactor;
    }
  });
});

clickButton.addEventListener("click", () => {
  counter++;
});

let lastTimestamp: number = 0;
function gameLoop(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  let totalGrowthRate = 0;
  availableItems.forEach((item) => {
    totalGrowthRate += item.count * item.rate;
    item.button.textContent = `Buy ${item.name} (Cost: ${
      Math.ceil(item.currentCost)
    })`;
    item.button.disabled = counter < item.currentCost;
    item.display.textContent = `${item.name}s: ${item.count}`;
  });

  counter += totalGrowthRate * deltaTime;

  counterDisplay.textContent = `${Math.floor(counter)} Cycles`;
  growthRateDisplay.textContent = `Growth: ${
    totalGrowthRate.toFixed(1)
  } Cycles/sec`;

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
