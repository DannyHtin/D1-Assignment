import "./style.css";

// --- Credit Comment ---
// Inspired by "Frog Clicker" https://github.com/mgembree/cmpm-121-f25-mattembree
// for the central container and stats bar layout.
const gameContainer = document.createElement("div");
gameContainer.classList.add("game-container");
document.body.append(gameContainer);

const appTitle: HTMLHeadingElement = document.createElement("h1");
appTitle.textContent = "⚡ CPU Clicker ⚡";
gameContainer.append(appTitle);

const statsBar = document.createElement("div");
statsBar.classList.add("stats-bar");
gameContainer.append(statsBar);
// --- End Credit ---

// --- DOM Elements ---
const counterDisplay: HTMLDivElement = document.createElement("div");
statsBar.append(counterDisplay);

const growthRateDisplay: HTMLDivElement = document.createElement("div");
statsBar.append(growthRateDisplay);

// --- Credit Comment ---
// Inspired by "The Bee Empire" https://github.com/AngelCasta34/cmpm-121-f25-d1-AngelCastaneda
// for a large, central, visual click button.
const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "⚡";
clickButton.id = "click-button"; // ID for special styling
gameContainer.append(clickButton);
// --- End Credit ---

// --- Game State ---
let cycleCount: number = 0;
let lastTimestamp: number = 0;
const priceIncreaseFactor = 1.15;

// Initialize display
counterDisplay.textContent = `${cycleCount} Cycles`;
growthRateDisplay.textContent = "Growth: 0.0 Cycles/sec";

// --- Item Definitions ---
interface Item {
  name: string;
  emoji: string; // Added for visuals, inspired by Frog Clicker
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
    emoji: "📈",
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
    emoji: "⚛️",
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
    emoji: "🧠",
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
    emoji: "🕸️",
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
    emoji: "🌀",
    description: "Transcends the limits of computation.",
    baseCost: 150000,
    rate: 1400,
    count: 0,
    currentCost: 150000,
    button: document.createElement("button"),
    display: document.createElement("p"),
  },
];

// --- Helper Functions ---
const formatCost = (cost: number): number => {
  return Math.ceil(cost);
};

// --- Initialization & Event Listeners ---
upgradeItems.forEach((item) => {
  // --- Credit Comment ---
  // Inspired by "The Bee Empire" https://github.com/AngelCasta34/cmpm-121-f25-d1-AngelCastaneda
  // for the clear "Button -> Owned -> Description" layout.
  const upgradeContainer = document.createElement("div");
  upgradeContainer.classList.add("upgrade-container");

  const descriptionElement = document.createElement("small");
  descriptionElement.textContent = item.description;

  item.display.textContent = `Owned: 0`;

  upgradeContainer.append(item.button, item.display, descriptionElement);
  gameContainer.append(upgradeContainer);
  // --- End Credit ---

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

// --- Game Loop ---
function gameLoop(timestamp: number) {
  if (lastTimestamp === 0) {
    lastTimestamp = timestamp;
  }
  const deltaTime = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;

  let totalGrowthRate = 0;
  upgradeItems.forEach((item) => {
    totalGrowthRate += item.count * item.rate;
    item.button.textContent = `Buy ${item.emoji} ${item.name} (Cost: ${
      formatCost(item.currentCost)
    })`;
    item.button.disabled = cycleCount < item.currentCost;
    item.display.textContent = `Owned: ${item.count}`;
  });

  cycleCount += totalGrowthRate * deltaTime;

  counterDisplay.textContent = `${Math.floor(cycleCount)} Cycles`;
  growthRateDisplay.textContent = `Growth: ${
    totalGrowthRate.toFixed(1)
  } Cycles/sec`;

  requestAnimationFrame(gameLoop);
}

// --- Game Start ---
requestAnimationFrame(gameLoop);
