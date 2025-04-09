class CasinoGame {
    constructor() {
        this.balance = 1000;
        this.luck = 0;
        this.creditDebt = 0;
        this.luckCost = 1000;
        this.range = 'None';
        this.bonus = 0;
        this.guaranteedWin = false;
        this.updateUI();
    }

    spin() {
        if (this.balance < 100) {
            this.showMessage("Not enough balance to spin.");
            return;
        }
        this.balance -= 100;
        const winChance = Math.random() * (1 + this.luck / 100);
        if (winChance > 0.5 || this.guaranteedWin) {
            const winnings = Math.floor(Math.random() * 901) + 100 + this.bonus;
            this.balance += winnings;
            this.showMessage(`You won $${winnings}!`);
        } else {
            this.showMessage("You lost this spin.");
        }
        this.updateUI();
    }

    buyLuck() {
        if (this.balance < this.luckCost) {
            this.showMessage("Not enough balance to buy luck.");
            return;
        }
        this.balance -= this.luckCost;
        this.luck += 1;
        this.luckCost *= 2;
        this.showMessage(`Luck increased! New luck: ${this.luck}%`);
        this.updateUI();
    }

    takeCredit() {
        const amount = parseInt(prompt("Enter credit amount (100 - 10000):"), 10);
        if (isNaN(amount) || amount < 100 || amount > 10000) {
            this.showMessage("Invalid credit amount.");
            return;
        }
        this.balance += amount;
        this.creditDebt += amount * 3;
        this.showMessage(`Credit taken: $${amount}. You owe: $${this.creditDebt}`);
        this.updateUI();
    }

    repayCredit() {
        const amount = parseInt(prompt("Enter amount to repay:"), 10);
        if (isNaN(amount) || this.balance < amount) {
            this.showMessage("Invalid repayment amount.");
            return;
        }
        this.balance -= amount;
        this.creditDebt -= amount;
        this.showMessage(`Credit repaid: $${amount}. Remaining debt: $${this.creditDebt}`);
        this.updateUI();
    }

    buyItem(item) {
        const items = {
            car: { price: 5000, range: 'Small Rich', bonus: 200 },
            jewelry: { price: 50000, range: 'Big Rich', bonus: 2000 },
            house: { price: 1000000, range: 'Millionaire', bonus: 25000 }
        };
        if (!items[item]) {
            this.showMessage("Invalid item.");
            return;
        }
        if (this.balance < items[item].price) {
            this.showMessage("Not enough balance to buy item.");
            return;
        }
        this.balance -= items[item].price;
        this.range = items[item].range;
        this.bonus = items[item].bonus;
        this.showMessage(`You bought a ${item} for $${items[item].price}.`);
        this.updateUI();
    }

    playRoulette() {
        const chips = parseInt(prompt("Enter number of chips to bet (1 - 5):"), 10);
        if (isNaN(chips) || chips < 1 || chips > 5) {
            this.showMessage("Invalid number of chips.");
            return;
        }
        const cost = chips * 1000;
        if (this.balance < cost) {
            this.showMessage("Not enough balance to play roulette.");
            return;
        }
        this.balance -= cost;
        const winningNumber = Math.floor(Math.random() * 37);
        const betNumber = parseInt(prompt("Enter number to bet on (0 - 36):"), 10);
        if (isNaN(betNumber) || betNumber < 0 || betNumber > 36) {
            this.showMessage("Invalid bet number.");
            return;
        }
        if (betNumber === winningNumber || this.guaranteedWin) {
            const winnings = Math.floor(Math.random() * 2500000) + 20;
            this.balance += winnings;
            this.showMessage(`You won $${winnings} on roulette!`);
        } else {
            this.showMessage("You lost the roulette bet.");
        }
        this.updateUI();
    }

    saveGame() {
        const gameState = {
            balance: this.balance,
            luck: this.luck,
            creditDebt: this.creditDebt,
            luckCost: this.luckCost,
            range: this.range,
            bonus: this.bonus,
            guaranteedWin: this.guaranteedWin
        };
        localStorage.setItem('casinoGameState', JSON.stringify(gameState));
        this.showMessage("Game saved.");
    }

    loadGame() {
        const gameState = JSON.parse(localStorage.getItem('casinoGameState'));
        if (gameState) {
            this.balance = gameState.balance;
            this.luck = gameState.luck;
            this.creditDebt = gameState.creditDebt;
            this.luckCost = gameState.luckCost;
            this.range = gameState.range;
            this.bonus = gameState.bonus;
            this.guaranteedWin = gameState.guaranteedWin;
            this.showMessage("Game loaded.");
            this.updateUI();
        } else {
            this.showMessage("No saved game found.");
        }
    }

    showModMenuPrompt() {
        const code = prompt("Enter the mod menu code:");
        if (code === '7432') {
            document.getElementById('mod-menu').style.display = 'block';
            this.showMessage("Mod menu unlocked.");
        } else {
            this.showMessage("Incorrect code.");
        }
    }

    addBalance(amount) {
        this.balance += amount;
        this.showMessage(`Added $${amount} to balance.`);
        this.updateUI();
    }

    addLuck(amount) {
        this.luck += amount;
        this.showMessage(`Added ${amount}% luck.`);
        this.updateUI();
    }

    setGuaranteedWin() {
        this.guaranteedWin = true;
        this.showMessage("Guaranteed win set.");
    }

    updateUI() {
        document.getElementById("balance").innerText = `Balance: $${this.balance}`;
        document.getElementById("debt").innerText = `Debt: $${this.creditDebt}`;
        document.getElementById("luck-cost").innerText = `Luck Cost: $${this.luckCost}`;
        document.getElementById("luck-cost-display").innerText = `$${this.luckCost}`;
        document.getElementById("range").innerText = `Range: ${this.range}`;
    }

    showMessage(message) {
        const messageDiv = document.getElementById("message");
        messageDiv.innerText = message;
        setTimeout(() => {
            messageDiv.innerText = "";
        }, 3000);
    }
}

const game = new CasinoGame();

function spin() {
    game.spin();
}

function buyLuck() {
    game.buyLuck();
}

function takeCredit() {
    game.takeCredit();
}

function repayCredit() {
    game.repayCredit();
}

function buyItem(item) {
    game.buyItem(item);
}

function playRoulette() {
    game.playRoulette();
}

function saveGame() {
    game.saveGame();
}

function loadGame() {
    game.loadGame();
}

function showModMenuPrompt() {
    game.showModMenuPrompt();
}

function addBalance(amount) {
    game.addBalance(amount);
}

function addLuck(amount) {
    game.addLuck(amount);
}

function setGuaranteedWin() {
    game.setGuaranteedWin();
}
