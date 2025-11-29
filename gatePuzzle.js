import { LogicGates } from "./logicGates.js"; 
import { InputButton } from "./inputButton.js";
export class GatePuzzle {
    inputA;
    inputB;
    inputC;
    ledLight;
    gateDisplay;
    gateSymbol;
    gateSymbol2
    gateSymbol3

    nextGateBtn;
    scoreDisplay;
    checkOuputButton;

    moves;
    moveRemaining;

    tryAgainBtn;
    nextStageBtn;

    currentGateIndex = 0;
    score = 0;
    currentStage;

    soundClick;
    soundSuccess;
    soundFail;
    soundStage;
    soundNextLevel;

    resetGameBtn;

    constructor() {
        this.inputA = new InputButton('input-a', 'A')
        this.inputB = new InputButton('input-b', 'B')
        this.inputC = new InputButton('input-c', 'C')
        this.ledLight = document.getElementById('led-light');
        this.gateDisplay = document.getElementById('gate-display');
        this.gateSymbol = document.getElementById('gate-symbol');
        this.gateSymbol2 = document.getElementById('gate-symbol-2');
        this.gateSymbol3 = document.getElementById('gate-symbol-3');
        this.nextGateBtn = document.getElementById('next-gate-btn');
        this.scoreDisplay = document.getElementById('score-display');
        this.checkOuputButton = document.getElementById('check-output-btn');
        this.moveRemaining = document.getElementById('moves-remaining');
        this.tryAgainBtn = document.getElementById('tryagain-btn');
        this.nextStageBtn = document.getElementById('next-stage-btn');
        this.soundClick = new Audio('/audio/click.m4a');
        this.soundSuccess = new Audio('/audio/success.m4a');
        this.soundFail = new Audio('/audio/fail.m4a');
        this.soundStage = new Audio('/audio/stage.mp3');
        this.soundNextLevel = new Audio('/audio/next-level.m4a');
        this.resetGameBtn = document.getElementById('reset-game-btn');

        this.inputA.addEventListener('click', () => {
            this.inputA.toggle();
            this.playSound(this.soundClick);
        });

        this.inputB.addEventListener('click', () => {
            this.inputB.toggle();
            this.playSound(this.soundClick);
        });

        this.inputC.addEventListener('click', () => {
            this.inputC.toggle();
            this.playSound(this.soundClick);
        });

        this.nextGateBtn.addEventListener('click', () => {
            this.playSound(this.soundNextLevel);
            if (this.currentStage == 1){
                this.setupNextGate();
            }
            else if (this.currentStage == 2) {
                this.setUpNextGate2();
            }
            else {
                this.setUpNextGate3();
            }
        });

        this.checkOuputButton.addEventListener('click', () => {
            this.checkLogic();
        });

        this.tryAgainBtn.addEventListener('click', () => {
            this.tryAgain();
        });

        this.nextStageBtn.addEventListener('click', () => {
            if (this.currentStage == 2) {
                this.setUpStage2();
            }
            else if (this.currentStage == 3) {
                this.setUpStage3();
            }
        });

        this.resetGameBtn.addEventListener('click', () => {
            if(confirm("Bạn có muốn xóa toàn bộ tiến trình và chơi lại?")) {
                this.resetGameData();
            }
        });
    }

    checkLogic() {
        const valA = this.inputA.getValue();
        const valB = this.inputB.getValue();
        const valC = this.inputC.getValue();
        let gateFunction;

        if (this.currentStage === 1) {
            const currentGateName = LogicGates.GATE_NAMES[this.currentGateIndex];
            gateFunction = LogicGates.LOGIC_GATES[currentGateName];
        }
        else if (this.currentStage == 2) {
            const currentGateName = LogicGates.GATES_NAMES_2[this.currentGateIndex];
            gateFunction = LogicGates.GATES_STAGE2[currentGateName];
        }
        else if (this.currentStage == 3) {
            const currentGateName = LogicGates.GATES_NAMES_3[this.currentGateIndex];
            gateFunction = LogicGates.GATES_STAGE3[currentGateName];
        }
        // Tính toán đầu ra
        const output = gateFunction(valA, valB, valC);

        // Cập nhật LED
        if (output) {
            this.ledLight.classList.remove('off');
            this.ledLight.classList.add('on');
            this.nextGateBtn.style.display = 'block';
            this.checkOuputButton.disabled = true;
            this.playSound(this.soundSuccess);
        } else {
            this.moves -= 1;
            this.playSound(this.soundFail);

            this.ledLight.classList.add('red-light');
            setTimeout(() => { this.ledLight.classList.remove('red-light'); }, 500);

            this.moveRemaining.classList.add('red-moves');
            setTimeout(() => { this.moveRemaining.classList.remove('red-moves'); }, 500);

            this.ledLight.classList.remove('on');
            this.ledLight.classList.add('off');
            this.nextGateBtn.style.display = 'none';
        }
        
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
        if (this.moves <= 0) {
            this.endLevel();
        }
    }

    // 8. Phương thức Thiết lập Cổng Mới (Khởi tạo ban đầu)
    setupNewGate() {
        this.inputA.reset();
        this.inputB.reset();
        this.inputC.element.style.display = 'none';
        this.currentStage = 1;

        this.gateSymbol2.style.display = 'none';
        this.gateSymbol3.style.display = 'none';

        const currentGateName = LogicGates.GATE_NAMES[this.currentGateIndex];
        this.gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;

        const gateImageName = currentGateName.toLowerCase();
        this.gateSymbol.src = `images/${gateImageName}.svg`;
        this.gateSymbol.alt = `${currentGateName} Gate Symbol`;
        
        this.ledLight.classList.remove('on');
        this.ledLight.classList.add('off');
        // Ẩn/hiện Input B cho cổng NOT
        if (currentGateName === 'NOT' || currentGateName === 'Buffer') {
            this.inputB.element.style.display = 'none';
        } else {
            this.inputB.element.style.display = 'inline-block';
        }
        this.nextGateBtn.style.display = 'none';

        if (currentGateName === 'Buffer' || currentGateName === 'AND' || currentGateName === 'OR') {
            this.moves = 1;
        }
        else {
            this.moves = 3;
        }
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
    }

    // 9. Phương thức Chuyển sang Cổng Kế tiếp
    setupNextGate() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.scoreDisplay.classList.add('pop');
        setTimeout(() => {this.scoreDisplay.classList.remove('pop');}, 300);

        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        this.saveGame();

        if (this.currentGateIndex < LogicGates.GATE_NAMES.length) {
            this.setupNewGate();
        }

        else {
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh phan huong dan.`;
            this.gateDisplay.style.color = 'green';
            this.nextStageBtn.style.display = 'block';
            this.inputA.element.style.display = 'none';
            this.inputB.element.style.display = 'none';
            this.inputC.element.style.display = 'none';
            this.gateSymbol.style.display = 'none';
            this.gateSymbol2.style.display = 'none';
            this.gateSymbol3.style.display = 'none';
            this.checkOuputButton.style.display = 'none';
            this.nextGateBtn.style.display = 'none';

        if (this.ledLight.parentElement) {
            this.ledLight.parentElement.style.display = 'none';
        }
            this.currentStage = 2;
            this.playSound(this.soundStage);
        }
    }

    endLevel() {
        this.tryAgainBtn.style.display = 'block';
        this.gateDisplay.textContent = `Lose! Ban da thua.`;
        this.gateDisplay.style.color = 'red';
        this.inputA.element.style.display = 'none';
        this.inputB.element.style.display = 'none';
        this.inputC.element.style.display = 'none';
        this.gateSymbol.style.display = 'none';
        this.gateSymbol2.style.display = 'none';
        this.gateSymbol3.style.display = 'none';
        this.checkOuputButton.style.display = 'none';
        this.nextGateBtn.style.display = 'none';

        if (this.ledLight.parentElement) {
            this.ledLight.parentElement.style.display = 'none';
        }
    }

    tryAgain() {
        this.inputA.element.style.display = 'inline-block';
        this.inputB.element.style.display = 'inline-block';
        this.inputC.element.style.display = 'inline-block';
        this.gateSymbol.style.display = '';
        this.gateSymbol2.style.display = '';
        this.gateSymbol3.style.display = '';
        this.gateDisplay.style.color = 'black';
        this.checkOuputButton.style.display = 'block';
        this.nextGateBtn.style.display = 'none';
        this.ledLight.parentElement.style.display = '';
        this.tryAgainBtn.style.display = 'none';
        if (this.currentStage == 1) {
            this.setupNewGate();
        }
        else if (this.currentStage == 2) {
            this.setUpNewGate2();
        }
        else {
            this.setUpNewGate3();
        }
    }

    setUpNewGate2() {
        this.inputA.reset();
        this.inputB.reset();
        this.inputC.element.style.display = 'none';

        this.gateSymbol.style.display = 'none';
        this.gateSymbol3.style.display = 'none';

        this.nextGateBtn.style.display = 'none';

        const currentGateName = LogicGates.GATES_NAMES_2[this.currentGateIndex];
        this.gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;

        const gateImageName = currentGateName.toLowerCase();
        this.gateSymbol2.src = `images/${gateImageName}.svg`;
        this.gateSymbol2.alt = `${currentGateName} Gate Symbol`;
        
        this.ledLight.classList.remove('on');
        this.ledLight.classList.add('off');
        this.moves = 3;
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
    }

    setUpStage2() {
        this.currentStage = 2;
        this.currentGateIndex = 0;

        this.saveGame();
        
        this.inputA.element.style.display = 'inline-block';
        this.inputB.element.style.display = 'inline-block';
        this.gateSymbol.style.display = 'none';
        this.gateSymbol2.style.display = 'block';
        this.gateDisplay.style.color = 'black';
        this.checkOuputButton.style.display = 'block';
        this.nextGateBtn.style.display = 'none';
        this.ledLight.parentElement.style.display = '';
        this.tryAgainBtn.style.display = 'none';
        this.nextStageBtn.style.display = 'none';
        this.setUpNewGate2();
    }

    setUpNextGate2() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.scoreDisplay.classList.add('pop');
        setTimeout(() => {this.scoreDisplay.classList.remove('pop');}, 300);

        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        this.saveGame();

        if (this.currentGateIndex < LogicGates.GATES_NAMES_2.length) {
            this.setUpNewGate2();
        }
        else {
            this.currentStage = 3;
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh giai doan 2.`;
            this.gateDisplay.style.color = 'green';
            this.nextStageBtn.style.display = 'block';
            this.nextStageBtn.textContent = `GIAI ĐOẠN 3`;
            this.inputA.element.style.display = 'none';
            this.inputB.element.style.display = 'none';
            this.gateSymbol.style.display = 'none';
            this.gateSymbol2.style.display = 'none';
            this.checkOuputButton.style.display = 'none';
            this.nextGateBtn.style.display = 'none';
            if (this.ledLight.parentElement) {
                this.ledLight.parentElement.style.display = 'none';
            }
            this.playSound(this.soundStage);
        }
    }

    setUpStage3() {
        this.currentStage = 3;
        this.currentGateIndex = 0;

        this.saveGame();

        this.inputA.element.style.display = 'inline-block';
        this.inputB.element.style.display = 'inline-block';
        this.inputC.element.style.display = 'inline-block';
        this.gateSymbol.style.display = 'none';
        this.gateSymbol2.style.display = 'none';
        this.gateSymbol3.style.display = 'block';
        this.gateDisplay.style.color = 'black';
        this.checkOuputButton.style.display = 'block';
        this.nextGateBtn.style.display = 'none';
        this.ledLight.parentElement.style.display = '';
        this.tryAgainBtn.style.display = 'none';
        this.nextStageBtn.style.display = 'none';
        this.setUpNewGate3();
    }

    setUpNewGate3() {
        this.currentStage = 3;

        this.inputA.reset();
        this.inputB.reset();
        this.inputC.reset();

        this.gateSymbol.style.display = 'none';
        this.gateSymbol2.style.display = 'none';

        this.nextGateBtn.style.display = 'none';

        const currentGateName = LogicGates.GATES_NAMES_3[this.currentGateIndex];
        this.gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;

        const gateImageName = currentGateName.toLowerCase();
        this.gateSymbol3.src = `images/${gateImageName}.svg`;
        this.gateSymbol3.alt = `${currentGateName} Gate Symbol`;
        
        this.ledLight.classList.remove('on');
        this.ledLight.classList.add('off');
        this.moves = 3;
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
    }

    setUpNextGate3() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.scoreDisplay.classList.add('pop');
        setTimeout(() => {this.scoreDisplay.classList.remove('pop');}, 300);

        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        this.saveGame();

        if (this.currentGateIndex < LogicGates.GATES_NAMES_3.length) {
            this.setUpNewGate3();
        }
        else {
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh game.`;
            this.gateDisplay.style.color = 'green';
            this.nextStageBtn.style.display = 'none';
            this.inputA.element.style.display = 'none';
            this.inputB.element.style.display = 'none';
            this.inputC.element.style.display = 'none';
            this.gateSymbol.style.display = 'none';
            this.gateSymbol2.style.display = 'none';
            this.gateSymbol3.style.display = 'none';
            this.checkOuputButton.style.display = 'none';
            this.nextGateBtn.style.display = 'none';
            if (this.ledLight.parentElement) {
                this.ledLight.parentElement.style.display = 'none';
            }
            this.playSound(this.soundStage);
        }
    }

    playSound(soundObject) {
        soundObject.currentTime = 0;
        soundObject.play();
    }

    //Luu du lieu vao trinh duyet
    saveGame() {
        const gameData = {
            stage: this.currentStage,
            gateIndex: this.currentGateIndex,
            score: this.score
        };

        localStorage.setItem('LogicGateSaveData', JSON.stringify(gameData));
        console.log("Game saved:", gameData);
    }

    //Tai du lieu tu trinh duyet
    loadGame() {
        const savedData = localStorage.getItem('LogicGateSaveData');

        if (savedData) {
            const gameData = JSON.parse(savedData);

            this.currentStage = gameData.stage;
            this.currentGateIndex = gameData.gateIndex;
            this.score = gameData.score;

            console.log("Game Loaded:", gameData);
            return true;
        }
        return false;
    }

    resetGameData() {
        localStorage.removeItem('LogicGateSaveData');
        location.reload();
    }

    // 10. Phương thức Khởi chạy Simulator
    init() {
        const hasSaveFile = this.loadGame();

        if (hasSaveFile) {
            this.scoreDisplay.textContent = `Điểm: ${this.score}`;

            if (this.currentStage === 1) {
                this.setupNewGate();
            } else if (this.currentStage === 2) {
                this.setUpNewGate2();
                this.gateSymbol.style.display = 'none';
                this.gateSymbol2.style.display = 'block';
            } else if (this.currentStage === 3) {
                this.setUpNewGate3();
                this.gateSymbol.style.display = 'none';
                this.gateSymbol2.style.display = 'none';
                this.gateSymbol3.style.display = 'block';
                this.inputC.element.style.display = 'inline-block'; 
            }
        } else {
            this.setupNewGate();
        }
    }
}