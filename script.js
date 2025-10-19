const inputA = document.getElementById('input-a');
const inputB = document.getElementById('input-b');
const ledLight = document.getElementById('led-light');
const gateDisplay = document.getElementById('gate-display');
const gateSymbol = document.getElementById('gate-symbol');
const nextGate = document.getElementById('next-gate-btn')

const logicGates = {
    'AND': (a,b) => a && b,
    'OR': (a,b) => a || b,
    'NOT': (a,b) => !a
};

const gateNames = Object.keys(logicGates);
let currentGateIndex = 0;

function checkLogic() {
    const valA = parseInt(inputA.dataset.value);
    const valB = parseInt(inputB.dataset.value);

    const currentGateName = gateNames[currentGateIndex];
    const gateFunction = logicGates[currentGateName];

    const output = gateFunction(valA, valB);

    if (output){
        ledLight.classList.remove('off');
        ledLight.classList.add('on');
    } else {
        ledLight.classList.remove('on');
        ledLight.classList.add('off');
    } 

    if (currentGateName === 'NOT') {
        inputB.style.display = 'none';
    } else {
        inputB.style.display = 'inline-block';
    }
}
 //AND Gate
function toggleInput(event) {
    const btn = event.target;
    let currentValue = parseInt(btn.dataset.value);

    const newValue = 1 - currentValue;
    const label = btn.id === 'input-a' ? 'A' : 'B';

    btn.dataset.value = newValue;
    btn.textContent = `${label}: ${newValue}`;

    btn.classList.toggle('on',newValue === 1);
    btn.classList.toggle('off',newValue === 0);

    checkLogic();
}



function setupNewGate() {
    const currentGateName = gateNames[currentGateIndex];
    gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;

    inputA.dataset.value = 0;
    inputB.dataset.value = 0;
    inputA.textContent ='A: 0';
    inputB.textContent = 'B: 0';
    inputA.classList.remove('on'); inputA.classList.add('off');
    inputB.classList.remove('on'); inputB.classList.add('off');

    if (currentGateName === 'NOT') {
        inputB.style.display = 'none';
    } else {
        inputB.style.display = 'inline-block';
    }

    checkLogic();   
}

function setupNextGate() {
    currentGateIndex = (currentGateIndex +1) % gateNames.length;
    const currentGateName = gateNames[currentGateIndex];
    gateDisplay.textContent = `Cổng Logic: ${currentGateName}`;
    gateSymbol.textContent = `${currentGateName}`

    inputA.dataset.value = 0;
    inputB.dataset.value = 0;
    inputA.textContent ='A: 0';
    inputB.textContent = 'B: 0';
    inputA.classList.remove('on'); inputA.classList.add('off');
    inputB.classList.remove('on'); inputB.classList.add('off');

    if (currentGateName === 'NOT') {
        inputB.style.display = 'none';
    } else {
        inputB.style.display = 'inline-block';
    }

    checkLogic();   
}

inputA.addEventListener('click', toggleInput);
inputB.addEventListener('click', toggleInput);  
nextGate.addEventListener('click', setupNextGate);

setupNewGate();
