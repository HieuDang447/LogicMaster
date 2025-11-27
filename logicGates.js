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
        '(NOT A) OR B': (a, b) => (!a || b) ? 1 : 0,
        '(A AND B) OR A': (a, b) => ((a && b) || a) ? 1 : 0,
        '(A OR B) AND A': (a, b) => ((a || b) && a) ? 1 : 0,
        '(A AND B) OR (A OR B)': (a, b) => ((a && b) || (a || b)) ? 1 : 0,
        '(A AND B) AND (A OR B)': (a, b) => ((a && b) && (a || b)) ? 1 : 0,
        '(A OR B) AND (NOT A)': (a, b) => ((a ||b) && !a) ? 1 : 0,
        '(A NAND B) OR A': (a, b) => ((!(a && b)) || a) ? 1 : 0,
        '(A NOR B) OR B': (a, b) => (!(a || b) || b) ? 1 : 0,
        '(A XOR B) AND (A OR B)': (a, b) => ((a != b) && (a || b)) ? 1 : 0,
        '(A XNOR B) OR (A AND B)': (a, b) => (!(a != b) || (a && b)) ? 1 : 0,
    }

    static GATES_STAGE3 = {
        'A AND B AND C': (a, b, c) => (a && b && c) ? 1 : 0,
        'A OR (B AND C)': (a, b, c) => (a || (b && c)) ? 1 : 0,
        'A OR B OR (NOT C)': (a, b, c) => (a || b || !c) ? 1 : 0,
        '(NOT A) OR (B AND C)': (a, b, c) => (!a || (b && c)) ? 1 : 0,
        'A XOR B XOR C': (a, b , c) => ((a != b) != c) ? 1 : 0,
        'DECISION C (ONLY C)': (a, b, c) => (!a && !b && c) ? 1 : 0,
        'MUX 2-TO-1 (SELECT B)': (a, b, c) => {return (!c && a) || (c && b) ? 1 : 0;},
    }

    static GATES_NAMES_3 = Object.keys(LogicGates.GATES_STAGE3);
    static GATES_NAMES_2 = Object.keys(LogicGates.GATES_STAGE2);
    static GATE_NAMES = Object.keys(LogicGates.LOGIC_GATES);
}
