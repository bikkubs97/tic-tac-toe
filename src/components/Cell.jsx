import React from "react";

export default function Cell({ cells, id, cell, setCells, go , setGo, winningMessage}) {
  function handleClick(e) {
    const taken = e.target.firstChild.classList.contains("circle") || e.target.firstChild.classList.contains("cross");
    if (!taken) {
      if (go === "circle") {
        e.target.firstChild.classList.add("circle");
        handleCellChange("circle")
        setGo("cross")
      }
      if (go === "cross") {
        e.target.firstChild.classList.add("cross");
        handleCellChange("cross")
        setGo("circle")
      }
    }
  }

  function handleCellChange(className){
   const nextCells = cells.map((cell, index)=>{
      if (index==id){
        return className
      }else{
        return cell
      }
    })
    setCells(nextCells)
  }

  return (
    <div className="square" id={id} onClick={!winningMessage&&handleClick}>
      <div className={cell}></div>
    </div>
  );
}
