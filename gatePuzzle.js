import { LogicGates } from "./logicGates.js"; 
import { InputButton } from "./inputButton.js";
export class GatePuzzle {
    inputA;
    inputB;
    ledLight;
    gateDisplay;
    gateSymbol;
    gateSymbol2

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

    constructor() {
        this.inputA = new InputButton('input-a', 'A')
        this.inputB = new InputButton('input-b', 'B')
        this.ledLight = document.getElementById('led-light');
        this.gateDisplay = document.getElementById('gate-display');
        this.gateSymbol = document.getElementById('gate-symbol');
        this.gateSymbol2 = document.getElementById('gate-symbol-2');
        this.nextGateBtn = document.getElementById('next-gate-btn');
        this.scoreDisplay = document.getElementById('score-display');
        this.checkOuputButton = document.getElementById('check-output-btn');
        this.moveRemaining = document.getElementById('moves-remaining');
        this.tryAgainBtn = document.getElementById('tryagain-btn');
        this.nextStageBtn = document.getElementById('next-stage-btn');
        this.soundClick = new Audio('/audio/click.mp3');
        this.soundSuccess = new Audio('/audio/success.mp3');
        this.soundFail = new Audio('/audio/fail.mp3');
        this.soundStage = new Audio('/audio/stage.mp3');

        this.inputA.addEventListener('click', () => {
            this.inputA.toggle();
            this.playSound(this.soundClick);
        });

        this.inputB.addEventListener('click', () => {
            this.inputB.toggle();
            this.playSound(this.soundClick);
        });

        this.nextGateBtn.addEventListener('click', () => {
            if (this.currentStage == 1){
                this.setupNextGate();
            }
            else {
                this.setUpNextGate2();
            }
        });

        this.checkOuputButton.addEventListener('click', () => {
            this.checkLogic();
        });

        this.tryAgainBtn.addEventListener('click', () => {
            this.tryAgain();
        });

        this.nextStageBtn.addEventListener('click', () => {
            this.setUpStage2();
        });
    }

    checkLogic() {
        const valA = this.inputA.getValue();
        const valB = this.inputB.getValue();
        let gateFunction;

        if (this.currentStage === 1) {
            const currentGateName = LogicGates.GATE_NAMES[this.currentGateIndex];
            gateFunction = LogicGates.LOGIC_GATES[currentGateName];
        }
        else if (this.currentStage == 2) {
            const currentGateName = LogicGates.GATES_NAMES_2[this.currentGateIndex];
            gateFunction = LogicGates.GATES_STAGE2[currentGateName];
        }
        // Tính toán đầu ra
        const output = gateFunction(valA, valB);

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
            this.ledLight.classList.remove('on');
            this.ledLight.classList.add('off');
            this.nextGateBtn.style.display = 'none';
        }
        
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
        if (this.moves <= 0) {
            this.endGame();
        }
    }

    // 8. Phương thức Thiết lập Cổng Mới (Khởi tạo ban đầu)
    setupNewGate() {
        this.inputA.reset();
        this.inputB.reset();
        this.currentStage = 1;

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
        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        if (this.currentGateIndex < 8) {
            this.setupNewGate();
        }

        else {
            this.endGame();
        }
    }

    endGame() {
        if (this.currentGateIndex >= 8) {
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh phan huong dan.`;
            this.gateDisplay.style.color = 'green';
            this.nextStageBtn.style.display = 'block';
            this.playSound(this.soundStage);
        }
        else {
            this.tryAgainBtn.style.display = 'block';
            this.gateDisplay.textContent = `Lose! Ban da thua.`;
            this.gateDisplay.style.color = 'red';
        }
        this.inputA.element.style.display = 'none';
        this.inputB.element.style.display = 'none';
        this.gateSymbol.style.display = 'none';
        this.gateSymbol2.style.display = 'none';
        this.checkOuputButton.style.display = 'none';
        this.nextGateBtn.style.display = 'none';

        if (this.ledLight.parentElement) {
            this.ledLight.parentElement.style.display = 'none';
        }
    }

    tryAgain() {
        this.inputA.element.style.display = 'inline-block';
        this.inputB.element.style.display = 'inline-block';
        this.gateSymbol.style.display = '';
        this.gateDisplay.style.color = 'black';
        this.checkOuputButton.style.display = 'block';
        this.nextGateBtn.style.display = 'none';
        this.ledLight.parentElement.style.display = '';
        this.tryAgainBtn.style.display = 'none';
        if (this.currentStage == 1) {
            this.setupNewGate();
        }
        else {
            this.setUpNewStage();
        }
    }

    setUpNewStage() {
        this.inputA.reset();
        this.inputB.reset();

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
        this.currentGateIndex = 0;
        this.currentStage = 2;
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
        this.setUpNewStage();
    }

    setUpNextGate2() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        if (this.currentGateIndex < 4) {
            this.setUpNewStage();
        }
        else {
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh game.`;
            this.gateDisplay.style.color = 'green';
            this.nextStageBtn.style.display = 'block';
            this.inputA.element.style.display = 'none';
            this.inputB.element.style.display = 'none';
            this.gateSymbol.style.display = 'none';
            this.gateSymbol2.style.display = 'none';
            this.checkOuputButton.style.display = 'none';
            this.nextGateBtn.style.display = 'none';
            this.nextStageBtn.style.display = 'none';
            if (this.ledLight.parentElement) {
                this.ledLight.parentElement.style.display = 'none';
            }
        }
    }

    playSound(soundObject) {
        soundObject.currentTime = 0;
        soundObject.play();
    }

    // 10. Phương thức Khởi chạy Simulator
    init() {
        this.setupNewGate();
    }
}