import { LogicGates } from "./logicGates.js"; 
import { InputButton } from "./inputButton.js";
export class GatePuzzle {
    inputA;
    inputB;
    ledLight;
    gateDisplay;
    gateSymbol;
    nextGateBtn;
    scoreDisplay;
    checkOuputButton;
    currentGateIndex = 0;
    score = 0;
    moves;

    constructor() {
        this.inputA = new InputButton('input-a', 'A')
        this.inputB = new InputButton('input-b', 'B')
        this.ledLight = document.getElementById('led-light');
        this.gateDisplay = document.getElementById('gate-display');
        this.gateSymbol = document.getElementById('gate-symbol');
        this.nextGateBtn = document.getElementById('next-gate-btn');
        this.scoreDisplay = document.getElementById('score-display');
        this.checkOuputButton = document.getElementById('check-output-btn');
        this.moveRemaining = document.getElementById('moves-remaining');

        this.inputA.addEventListener('click', () => {
            this.inputA.toggle();

        });
        this.inputB.addEventListener('click', () => {
            this.inputB.toggle();

        });
        this.nextGateBtn.addEventListener('click', this.setupNextGate.bind(this));
        this.checkOuputButton.addEventListener('click', () => {
            this.checkLogic();
        });
    }

    checkLogic() {
        const valA = this.inputA.getValue();
        const valB = this.inputB.getValue();

        const currentGateName = LogicGates.GATE_NAMES[this.currentGateIndex];
        const gateFunction = LogicGates.LOGIC_GATES[currentGateName];

        // Tính toán đầu ra
        const output = gateFunction(valA, valB);

        // Cập nhật LED
        if (output) {
            this.ledLight.classList.remove('off');
            this.ledLight.classList.add('on');
            this.nextGateBtn.style.display = 'block';
            this.checkOuputButton.disabled = true;
        } else {
            this.moves -= 1;
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
            this.moves = 2;
        }
        else if (currentGateName === 'NOT' || currentGateName === 'NAND' || currentGateName === 'NOR') {
            this.moves = 4;
        }
        else {
            this.moves = 5;
        }
        this.moveRemaining.textContent = `Số lượt thử: ${this.moves}`;
    }

    // 9. Phương thức Chuyển sang Cổng Kế tiếp
    setupNextGate() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        this.checkOuputButton.disabled = false;

        this.currentGateIndex = this.currentGateIndex + 1;

        if (this.currentGateIndex < LogicGates.GATE_NAMES.length) {
            this.setupNewGate();
        }

        else {
            this.endGame();
        }
    }

    endGame() {
        if (this.currentGateIndex >= LogicGates.GATE_NAMES.length) {
            this.gateDisplay.textContent = `Congratulation! Ban da hoan thanh.`;
            this.gateDisplay.style.color = 'green';
        }
        else {
            this.gateDisplay.textContent = `Lose! Ban da thua.`;
            this.gateDisplay.style.color = 'red';
        }
        this.inputA.element.style.display = 'none';
        this.inputB.element.style.display = 'none';
        this.gateSymbol.style.display = 'none';
        this.checkOuputButton.style.display = 'none';
        this.nextGateBtn.style.display = 'none';

        if (this.ledLight.parentElement) {
            this.ledLight.parentElement.style.display = 'none';
        }
    }

    // 10. Phương thức Khởi chạy Simulator
    init() {
        this.setupNewGate();
    }
}