export class LogicGates {
    // 1. Dữ liệu và Cấu hình Cổng Logic
    static LOGIC_GATES = {
        'Buffer': (a, b) => a,
        'AND': (a, b) => (a && b) ? 1: 0,
        'OR': (a, b) => (a || b) ? 1 : 0,
        'NOT': (a, b) => !a ? 1 : 0, 
        'NAND': (a, b) => !(a && b) ? 1: 0,
        'NOR': (a, b) => !(a || b) ? 1 : 0,
        'XOR': (a, b) => (a != b) ? 1 : 0,
        'XNOR': (a, b) => !(a != b) ? 1 : 0,
    }

    static GATES_STAGE2 = {
        'A AND (NOT B)': (a, b) => (a && !b) ? 1 : 0,
        '(NOT A) AND B': (a, b) => ((!a) && b) ? 1 : 0,
        'A OR (NOT B)': (a, b) => (a || !b) ? 1 : 0,
        '(NOT A) OR B': (a, b) => (!a || b) ? 1 : 0
    }

    static GATES_NAMES_2 = Object.keys(LogicGates.GATES_STAGE2);
    static GATE_NAMES = Object.keys(LogicGates.LOGIC_GATES);
}
