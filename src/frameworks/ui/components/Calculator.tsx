import React, { useState } from 'react';

/**
 * 계산기 컴포넌트
 * 
 * 사용자 인터페이스를 담당하는 프레임워크 계층의 컴포넌트입니다.
 * 표현식 입력, 계산 결과 표시, 계산 기록 관리 기능을 제공합니다.
 */
const Calculator: React.FC = () => {
  // 상태 관리
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [history, setHistory] = useState<Array<{ expression: string; result: string }>>([]);

  // 키 입력 처리
  const handleKeyPress = (key: string) => {
    switch (key) {
      case 'C':
        // 모든 입력 초기화
        setExpression('');
        setResult('0');
        break;
      case '=':
        // 계산 실행 (추후 usecase 연결)
        try {
          // 임시 계산 로직 (추후 math.js 라이브러리로 대체)
          const calculatedResult = eval(expression).toString();
          setResult(calculatedResult);
          
          // 계산 기록 저장
          setHistory([
            { expression, result: calculatedResult },
            ...history.slice(0, 9), // 최근 10개 기록만 유지
          ]);
          
          // 새로운 계산을 위해 표현식 초기화
          setExpression('');
        } catch {
          setResult('Error');
        }
        break;
      case '←':
        // 마지막 문자 삭제
        setExpression(expression.slice(0, -1));
        break;
      default:
        // 표현식에 키 추가
        setExpression(expression + key);
        break;
    }
  };

  // 키패드 배열 정의
  const keypad = [
    ['(', ')', '^', 'C'],
    ['7', '8', '9', '/'],
    ['4', '5', '6', '*'],
    ['1', '2', '3', '-'],
    ['0', '.', '=', '+'],
  ];

  return (
    <div className="calculator">
      <div className="calculator-display">
        <div className="calculator-expression">{expression}</div>
        <div className="calculator-result">{result}</div>
      </div>
      
      <div className="calculator-keypad">
        {keypad.flat().map((key) => (
          <button
            key={key}
            className={`calculator-key ${
              ['/', '*', '-', '+', '^'].includes(key) ? 'operator' : ''
            } ${key === '=' ? 'equals' : ''} ${key === 'C' ? 'clear' : ''}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
      </div>
      
      {history.length > 0 && (
        <div className="calculator-history">
          <h3>계산 기록</h3>
          {history.map((item, index) => (
            <div key={index} className="history-item">
              <div className="history-expression">{item.expression}</div>
              <div className="history-result">{item.result}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calculator;
