import { useEffect, useState } from 'react'
import Cell from './components/Cell'

function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
  const [go, setGo] = useState("circle")
  const [winningMessage, setWinningMessage] = useState(null)
  const message = "It is now " + go + "'s turn"

  useEffect(() => {
    checkScore();
  }, [cells])

  function checkTie() {
    return cells.every((cell) => cell !== "")
  }

  function checkScore() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6],
      [3, 5, 7] // Add diagonal combination [3, 5, 7]
    ]

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        setWinningMessage(`${cells[a].toUpperCase()} Wins!! Refresh to Play Again!`);
        return;
      }
    }

    if (checkTie()) {
      setWinningMessage("It's a Tie! Refresh to Play Again!");
      return;
    }
  }

  function handleCellClick(index) {
    if (cells[index] === "" && !winningMessage) {
      const newCells = [...cells];
      newCells[index] = go;
      setCells(newCells);
      setGo(go === "circle" ? "cross" : "circle"); // Toggle between 'circle' and 'cross'
    }
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe!</h1>
      <div className='gameboard'>
        {cells.map((cell, index) => {
          return (
            <Cell
              key={index}
              id={index}
              cell={cell}
              setCells={setCells}
              go={go}
              setGo={setGo}
              cells={cells}
              winningMessage={winningMessage}
              onClick={() => handleCellClick(index)} // Add click handler
            />
          );
        })}
      </div>
      <p>{winningMessage || message}</p>
    </div>
  )
}

export default App
