// DOM Elements
const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "⚡";
document.body.append(clickButton);

const counterDisplay: HTMLDivElement = document.createElement("div");
document.body.append(counterDisplay);

const growthRateDisplay: HTMLDivElement = document.createElement("div");
document.body.append(growthRateDisplay);

// Game State
let cycleCount: number = 0;
let lastTimestamp: number = 0;
const priceIncreaseFactor = 1.15;

// Initialize display
counterDisplay.textContent = `${cycleCount} Cycles`;

//  Item Definitions
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

const upgradeItems: Item[] = [
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

// Helper Functions
const formatCost = (cost: number): number => {
  return Math.ceil(cost);
};

// Initialization & Event Listeners
upgradeItems.forEach((item) => {
  document.body.append(item.button);
  const descriptionElement = document.createElement("small");
  descriptionElement.textContent = item.description;
  document.body.append(descriptionElement);
  document.body.append(item.display);

  item.button.addEventListener("click", () => {
    if (cycleCount >= item.currentCost) {
      cycleCount -= item.currentCost;
      item.count++;
      item.currentCost *= priceIncreaseFactor;
    }
  });
});

clickButton.addEventListener("click", () => {
  cycleCount++;
});

// Game Loop
function gameLoop(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  let totalGrowthRate = 0;
  upgradeItems.forEach((item) => {
    totalGrowthRate += item.count * item.rate;
    item.button.textContent = `Buy ${item.name} (Cost: ${
      formatCost(item.currentCost)
    })`;
    item.button.disabled = cycleCount < item.currentCost;
    item.display.textContent = `${item.name}s: ${item.count}`;
  });

  cycleCount += totalGrowthRate * deltaTime;

  counterDisplay.textContent = `${Math.floor(cycleCount)} Cycles`;
  growthRateDisplay.textContent = `Growth: ${
    totalGrowthRate.toFixed(1)
  } Cycles/sec`;

  requestAnimationFrame(gameLoop);
}

// Game Start
requestAnimationFrame(gameLoop);
