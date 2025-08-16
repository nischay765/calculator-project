const btn = document.querySelectorAll('.btn');
const input = document.querySelector('#input');

const clac = document.querySelector('#calculate');
const reset = document.querySelector('#reset');

const operators = ['+', '-', '*', '/'];

btn.forEach(btns => {
  btns.addEventListener('click', () => {
    const value = btns.textContent.trim();

    if (value === '=' || value.toLowerCase() === 'c') return;

    const lastChar = input.value.slice(-1);

    // Prevent multiple operators
    if (operators.includes(value)) {
      if (operators.includes(lastChar)) {
        input.value = input.value.slice(0, -1) + value;
        return;
      } else if (input.value === '') {
        if (value !== '-') return; // only minus allowed at start
      }
    }

    input.value += value;
  });
});

clac.addEventListener('click', () => {
  try {
    let expr = input.value;

    // agar last char operator hai to hata do
    while (operators.includes(expr.slice(-1)) || expr.slice(-1) === '.') {
      expr = expr.slice(0, -1);
    }

    if (expr.trim() === '') return;

    // safe evaluation
    input.value = Function(`"use strict"; return (${expr})`)();
  } catch (err) {
    input.value = 'Error';
    console.error('Calculation Error:', err);
  }
});

reset.addEventListener('click', () => {
  input.value = '';
});
