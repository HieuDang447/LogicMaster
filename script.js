class GateSimulator {
    // 1. Dữ liệu và Cấu hình Cổng Logic
    static LOGIC_GATES = {
        'AND': (a, b) => a && b,
        'OR': (a, b) => a || b,
        'NOT': (a, b) => !a // Lưu ý: Hàm NOT chỉ cần đối số 'a'
    };
    static GATE_NAMES = Object.keys(GateSimulator.LOGIC_GATES);

    constructor() {
        // 2. Tham chiếu các phần tử DOM (Thuộc tính đối tượng)
        this.inputA = document.getElementById('input-a');
        this.inputB = document.getElementById('input-b');
        this.ledLight = document.getElementById('led-light');
        this.gateDisplay = document.getElementById('gate-display');
        this.gateSymbol = document.getElementById('gate-symbol');
        this.nextGateBtn = document.getElementById('next-gate-btn');

        // 3. Trạng thái (State) của Simulator
        this.currentGateIndex = 0;

        // 4. Thiết lập Event Listeners
        this.inputA.addEventListener('click', this.toggleInput.bind(this));
        this.inputB.addEventListener('click', this.toggleInput.bind(this));
        this.nextGateBtn.addEventListener('click', this.setupNextGate.bind(this));
    }

    // 5. Phương thức Đặt lại Input (Tái sử dụng)
    resetInputs() {
        this.inputA.dataset.value = 0;
        this.inputB.dataset.value = 0;
        this.inputA.textContent = 'A: 0';
        this.inputB.textContent = 'B: 0';
        this.inputA.classList.remove('on'); this.inputA.classList.add('off');
        this.inputB.classList.remove('on'); this.inputB.classList.add('off');
    }

    // 6. Phương thức Chính: Kiểm tra Logic và Cập nhật Output
    checkLogic() {
        const valA = parseInt(this.inputA.dataset.value);
        const valB = parseInt(this.inputB.dataset.value);
        const currentGateName = GateSimulator.GATE_NAMES[this.currentGateIndex];
        const gateFunction = GateSimulator.LOGIC_GATES[currentGateName];

        // Tính toán đầu ra
        const output = gateFunction(valA, valB);

        // Cập nhật LED
        this.ledLight.classList.toggle('on', !!output);
        this.ledLight.classList.toggle('off', !output);

        // Ẩn/hiện Input B cho cổng NOT
        if (currentGateName === 'NOT') {
            this.inputB.style.display = 'none';
        } else {
            this.inputB.style.display = 'inline-block';
        }
    }

    // 7. Phương thức Chuyển đổi trạng thái Input A/B
    toggleInput(event) {
        const btn = event.currentTarget; // Dùng currentTarget để đảm bảo lấy đúng nút
        let currentValue = parseInt(btn.dataset.value);

        const newValue = 1 - currentValue;
        const label = btn.id === 'input-a' ? 'A' : 'B';

        btn.dataset.value = newValue;
        btn.textContent = `${label}: ${newValue}`;

        btn.classList.toggle('on', newValue === 1);
        btn.classList.toggle('off', newValue === 0);

        this.checkLogic();
    }

    // 8. Phương thức Thiết lập Cổng Mới (Khởi tạo ban đầu)
    setupNewGate() {
        this.resetInputs();
        const currentGateName = GateSimulator.GATE_NAMES[this.currentGateIndex];
        this.gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;
        this.gateSymbol.textContent = currentGateName;
        
        this.checkLogic();
    }

    // 9. Phương thức Chuyển sang Cổng Kế tiếp
    setupNextGate() {
        // Tăng Index và quay lại 0 khi hết mảng (vòng lặp)
        this.currentGateIndex = (this.currentGateIndex + 1) % GateSimulator.GATE_NAMES.length;
        
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