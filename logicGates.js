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
        'XNOR': (a, b) => !(a != b) ? 1 : 0
    };
    static GATE_NAMES = Object.keys(LogicGates.LOGIC_GATES);
}
