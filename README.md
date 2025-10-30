# ⚡ CPU Clicker ⚡

This is an incremental clicker game created for a game development course. The theme is "CPU Cycles." Click the central lightning bolt to manually generate cycles, and use those cycles to purchase upgrades that automate and increase your cycle production.

This project was built from scratch in TypeScript, starting with simple DOM manipulation and refactored into a data driven design.

### 1. Inspiration from: Frog Clicker

- **Project Link:** `https://github.com/mgembree/cmpm-121-f25-mattembree`

The "Frog Clicker" project had an exceptionally clean and polished, app-like feel.

- **Central Card Layout:** I was inspired to wrap my entire game's UI in a single `.game-container` div. This gives the project a focused, "card" layout with rounded corners and a box-shadow, just like the frog game.

- **Combined Stats Bar:** I copied their idea of a single, unified `.stats-bar` that displays both the "Frogs" and "Frogs Per Second." My version now shows "Cycles" and "Growth" in one combined element.

- **Emoji Use:** The frog game used emojis on its buttons. I adopted this by adding emojis (`📈`, `🧠`, etc.) to my `Item` interface and displaying them on the upgrade buttons.

### 2. Inspiration from: The Bee Empire

- **Project Link:** `https://github.com/AngelCasta34/cmpm-121-f25-d1-AngelCastaneda`

"The Bee Empire" had a very strong, consistent theme and a clear information hierarchy for its upgrades.

- **Large, Central Clicker:** I was inspired to change my small text-based button into a large, central, visually distinct clicker (`#click-button`), similar to their main bee image. This makes the primary action of the game much more obvious and inviting.

- **Clear Upgrade Hierarchy:** I refactored my upgrade list to follow their `Button` -> `Owned: X` -> `Description` structure. This is much cleaner and more user-friendly than my original layout.

- **Yellow Color Theme:** The final yellow-based color scheme for the background and buttons was directly inspired by their "Bee Empire" theme to create a more cohesive visual identity.
