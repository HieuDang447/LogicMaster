class LogicGates {
    // 1. Dữ liệu và Cấu hình Cổng Logic
    static LOGIC_GATES = {
        'Buffer': (a, b) => a,
        'AND': (a, b) => (a && b) ? 1: 0,
        'OR': (a, b) => (a || b) ? 1 : 0,
        'NOT': (a, b) => !a ? 1 : 0, // Lưu ý: Hàm NOT chỉ cần đối số 'a'
        'NAND': (a, b) => 1 - (a && b),
        'NOR': (a, b) => 1 - (a || b),
        'XOR': (a, b) => (a != b) ? 1 : 0,
        'XNOR': (a, b) => !(a != b) ? 1 : 0
    };
    static GATE_NAMES = Object.keys(LogicGates.LOGIC_GATES);
}

class InputButton {
    constructor(elementId, label) {
        this.element = document.getElementById(elementId);
        this.label = label;
        this.reset();
    }

    getValue() {
        return parseInt(this.element.dataset.value);
    }

    reset() {
        this.element.dataset.value = 0;
        this.element.textContent = `${this.label}: 0`;
        this.updateUI(0);
    }

    toggle() {
        const currentValue = this.getValue();
        const newValue = 1 - currentValue;

        this.element.dataset.value = newValue;
        this.element.textContent = `${this.label}: ${newValue}`;

        this.updateUI(newValue);
    }

    updateUI(value) {
        this.element.classList.toggle('on', value === 1);
        this.element.classList.toggle('off', value === 0);
    }

    addEventListener(eventType, handler) {
        this.element.addEventListener(eventType, handler);
    }
}

class GateSimulator {
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

    constructor() {
        this.inputA = new InputButton('input-a', 'A')
        this.inputB = new InputButton('input-b', 'B')
        this.ledLight = document.getElementById('led-light');
        this.gateDisplay = document.getElementById('gate-display');
        this.gateSymbol = document.getElementById('gate-symbol');
        this.nextGateBtn = document.getElementById('next-gate-btn');
        this.scoreDisplay = document.getElementById('score-display');
        this.checkOuputButton = document.getElementById('check-output-btn')

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
            this.ledLight.classList.remove('on');
            this.ledLight.classList.add('off');
            this.nextGateBtn.style.display = 'none';
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
        
        if (currentGateName === 'NOT' || currentGateName === 'Buffer') {
            this.gateSymbol.textContent = '';
        } else {
            this.gateSymbol.textContent = currentGateName;
        }
        this.ledLight.classList.remove('on');
        this.ledLight.classList.add('off');
        // Ẩn/hiện Input B cho cổng NOT
        if (currentGateName === 'NOT' || currentGateName === 'Buffer') {
            this.inputB.element.style.display = 'none';
        } else {
            this.inputB.element.style.display = 'inline-block';
        }
        this.nextGateBtn.style.display = 'none';
    }

    // 9. Phương thức Chuyển sang Cổng Kế tiếp
    setupNextGate() {
        this.score += 10;
        this.scoreDisplay.textContent = `Điểm: ${this.score}`;
        // Tăng Index và quay lại 0 khi hết mảng (vòng lặp)
        this.currentGateIndex = (this.currentGateIndex + 1) % LogicGates.GATE_NAMES.length;
        this.checkOuputButton.disabled = false;
        this.setupNewGate(); // Dùng lại hàm setupNewGate để cập nhật UI và Logic
    }

    // 10. Phương thức Khởi chạy Simulator
    init() {
        this.setupNewGate();
    }
}

// KHỞI CHẠY CHƯƠNG TRÌNH
const simulator = new GateSimulator();
simulator.init();