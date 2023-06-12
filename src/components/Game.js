import React, { useState } from 'react';
import '../style/Game.css'; // Your CSS file

function GameBoard() {
  // Create grid
  let grid = [];
  for (let i = 0; i < 225; i++) {
    grid.push('empty');
  }

  const [squares, setSquares] = useState(grid);
  const [results, setResults] = useState(0);
  const [currentShooterIndex, setCurrentShooterIndex] = useState(202);
  const [direction, setDirection] = useState(1);
  const [invadersId, setInvadersId] = useState(null);
  const [goingRight, setGoingRight] = useState(true);
  const [aliensRemoved, setAliensRemoved] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [message, setMessage] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  let width = 15;

  const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
  ];

  // Similar implementation to your draw function
  const draw = () => {
    let newSquares = new Array(225).fill('empty');
    for (let i = 0; i < alienInvaders.length; i++) {
      if(!aliensRemoved.includes(i)) {
        newSquares[alienInvaders[i]] = 'invader';
      }
    }
    newSquares[currentShooterIndex] = 'shooter';
    setSquares(newSquares);
  };

  // Similar implementation to your moveShooter function
  const moveShooter = (direction) => {
    if (direction === 'left' && currentShooterIndex % width !== 0) {
      setCurrentShooterIndex(prev => prev - 1);
    } else if (direction === 'right' && currentShooterIndex % width < width -1 ) {
      setCurrentShooterIndex(prev => prev + 1);
    }
    draw();
  };

  // Similar implementation to your moveInvaders function
  // Note: This function should be triggered by a button click or some other event to start the game
  const moveInvaders = () => {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge = alienInvaders[alienInvaders.length -1] % width === width -1;
    setDirection(goingRight ? -1 : 1);
    setGoingRight(!goingRight);

    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += direction;
    }

    draw();

    if (squares[currentShooterIndex] === 'invader') {
      setGameOver(true);
      setMessage('GAME OVER');
      clearInterval(invadersId);
    }

    for (let i = 0; i < alienInvaders.length; i++) {
      if (alienInvaders[i] > (squares.length)) {
        setGameOver(true);
        setMessage('GAME OVER');
        clearInterval(invadersId);
      }
    }

    if (aliensRemoved.length === alienInvaders.length) {
      setVictory(true);
      setMessage('YOU WIN');
      clearInterval(invadersId);
    }
  };

  // Similar implementation to your shoot function
  const shoot = () => {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    const moveLaser = () => {
      if (squares[currentLaserIndex] === 'invader') {
        let newSquares = [...squares];
        newSquares[currentLaserIndex] = 'boom';
        setSquares(newSquares);

        const alienRemoved = alienInvaders.indexOf(currentLaserIndex);
        aliensRemoved.push(alienRemoved);
        setResults(prev => prev + 1);

        setTimeout(() => {
          newSquares[currentLaserIndex] = 'empty';
          setSquares(newSquares);
        }, 300);
        clearInterval(laserId);
      }

      currentLaserIndex -= width;
      if (currentLaserIndex >= 0) {
        let newSquares = [...squares];
        newSquares[currentLaserIndex] = 'laser';
        setSquares(newSquares);
      } else {
        clearInterval(laserId);
      }
    };

    laserId = setInterval(moveLaser, 100);
  };

  // Start button handler
  const startGame = () => {
    setGameStarted(true);
    draw();
    const intervalId = setInterval(moveInvaders, 500);
    setInvadersId(intervalId);
  };

  return (
    <div className="gameContainer">
      <div className="leftbuttons">
        <button onClick={() => moveShooter('left')} className="moveLeft">Left</button>
        <button onClick={shoot} className="fire">Fire</button>
      </div>
      <h1 className="results">{results}</h1>
      <div className="grid">
        {squares.map((square, i) => (
          <div key={i} className={`grid-item ${square}`}></div>
        ))}
      </div>
      <div className="rightbuttons">
        <button onClick={() => moveShooter('right')} className="moveRight">Right</button>
        <button onClick={shoot} className="fire">Fire</button>
      </div>
      <button onClick={startGame} disabled={gameStarted}>Start</button>
      {gameOver && <h2>{message}</h2>}
      {victory && <h2>{message}</h2>}
    </div>
  );
}

export default GameBoard;
