const display = document.getElementById('display');
const buttons = document.getElementById('buttons');
const historyEntries = document.getElementById('history-entries');

// Обработка кликов по кнопкам
buttons.addEventListener('click', function (e) {
  if (e.target.tagName === 'BUTTON') {
    const value = e.target.textContent;

    if (value === 'C') {
      clearDisplay();
    } else if (value === '=') {
      calculate();
    } else {
      appendValue(value);
    }
  }
});

// Обработка ввода с клавиатуры
document.addEventListener('keydown', function (e) {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.', '%'].includes(key)) {
    appendValue(key);
  } else if (key === 'Enter') {
    calculate();
  } else if (key === 'Backspace') {
    display.value = display.value.slice(0, -1) || '0';
  } else if (key === 'Escape') {
    clearDisplay();
  }
});

function appendValue(value) {
  if (display.value === '0' && value !== '.') {
    display.value = value;
  } else if (display.value === 'Ошибка') {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = '0';
}

function calculate() {
  try {
    const expression = display.value;
    const result = eval(expression.replace(/÷/g, '/').replace(/×/g, '*'));

    // Добавляем в историю
    addHistoryEntry(`${expression} = ${result}`);

    // Обновляем дисплей
    display.value = result;
  } catch (e) {
    display.value = 'Ошибка';
  }
}

function addHistoryEntry(entry) {
  const entryDiv = document.createElement('div');
  entryDiv.textContent = entry;

  // Добавляем в начало
  historyEntries.insertBefore(entryDiv, historyEntries.firstChild);

  // Ограничиваем количество записей
  if (historyEntries.children.length > 5) {
    historyEntries.removeChild(historyEntries.lastChild);
  }
}