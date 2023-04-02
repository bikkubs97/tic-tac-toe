import { useEffect, useState } from 'react'
import Cell from './components/Cell'


function App() {
  const [cells, setCells] = useState(["", "", "", "", "", "", "", "", ""])
  const [go, setGo] = useState("circle")
  const [winningMessage, setWinningMessage] = useState(null)
  const message = "It is now " + go + "'s turn"
  useEffect(()=>{checkScore(), [cells]})

  function checkTie() {
    return cells.every((cell) => cell !== "");
  }
  
  function checkScore(){
    let isTie = checkTie();
    if (isTie) {
      setWinningMessage("It's a Tie! Refresh to Play Again!");
      return;
    }
    const winningCombos = [
      [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8]
    ]
    winningCombos.forEach(array=>{
      let cricleWins = array.every(cell=>cells[cell]==="circle")
      if(cricleWins){
        setWinningMessage("Cirlce Wins!! Refresh to Play Again!")
        return
      }
    })
    winningCombos.forEach(array=>{
      let crossWins = array.every(cell=>cells[cell]==="cross")
      if(crossWins){
        setWinningMessage("Cross Wins!! Refresh to Play Again!")
        return
      }
    })
    
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe!</h1>
      <div className='gameboard'>
        {cells.map((cell, index) => {
          return <Cell key={index} id={index} cell={cell} setCells={setCells} go={go} setGo={setGo} cells={cells}
          winningMessage={winningMessage} />
        })}
      </div>
      <p>{winningMessage||message}</p>
    </div>
  )
}

export default App
