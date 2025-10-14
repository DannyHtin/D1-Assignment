const clickButton: HTMLButtonElement = document.createElement("button");
clickButton.textContent = "🚀";
document.body.append(clickButton);

let counter: number = 0;
const counterDisplay: HTMLDivElement = document.createElement("div");
counterDisplay.textContent = `${counter} Thrust`;
document.body.append(counterDisplay);

clickButton.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} Thrust`;
});
