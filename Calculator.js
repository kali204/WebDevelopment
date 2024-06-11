import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '=') {
      try {
        // Safely evaluate the expression
        const evaluatedResult = eval(expression); // Not recommended for production, replace with a proper parser in production
        setResult(evaluatedResult);
        setExpression(evaluatedResult.toString());
      } catch (e) {
        setResult('Error');
      }
    } else {
      // Prevent invalid operator sequences
      if (/[\+\-\*\/]$/.test(expression) && /[\+\-\*\/]/.test(value)) {
        return;
      }
      setExpression(expression + value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick('=');
    } else if (e.key === 'Escape') {
      handleClick('C');
    } else {
      // Handle valid key presses for numbers and operators
      if (/[\d\+\-\*\/]/.test(e.key)) {
        handleClick(e.key);
      }
    }
  };

  console.log('Expression:', expression);
  console.log('Result:', result);

  return (
    <div className="calculator">
      <div className="result">{result}</div>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        onKeyDown={handleKeyPress}
        autoFocus
      />
      <div className="keypad">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>
        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>
        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>
        <button onClick={() => handleClick('C')}>C</button>
        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('=')}>=</button>
        <button onClick={() => handleClick('/')}>/</button>
      </div>
    </div>
  );
};

export default Calculator;
