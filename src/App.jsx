import { useState } from "react";
const Square = ({ value, onSquareClick, pos, pos2 }) => {
  return (
    <button
      className={`p-5 ${pos === "l" ? " " : "border-r-4"} ${
        pos2 === "b" ? " " : "border-b-4"
      } border-white text-7xl`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};

function Board({ squares, onPlay, xIsNext, setXIsNext }) {
  

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    setXIsNext(!xIsNext);
    onPlay(nextSquares);
  }

  return (
    <div className=" flex flex-col items-center">
     
      <div className="grid grid-cols-3 mt-2 w-[500px] h-[500px] font-extrabold">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} pos="l" />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} pos="l" />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} pos2="b" />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} pos2="b" />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} pos="l" pos2="b" />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Game() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [nbXwin,setnbXwin] = useState(0);
  const [nbOwin,setnbOwin] = useState(0);
  const [toe,setToe] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function restart(winner) {
    setBoard(Array(9).fill(null));
    if (winner === "X") {
      setnbXwin(nbXwin+1);
    } else if (winner === "O") {
      setnbOwin(nbOwin+1);
    } else {
      setToe(toe+1);
    }
  }

  const winner = calculateWinner(board);
  let nbgame = 0;
  let status;

  if (winner) {
    status = winner + " win";
  } else if (!board.includes(null)) {
    status = "Toe";
    nbgame += 1;
  } else {
    status = "Next : " + (xIsNext ? "player 1 (X)" : "player 2 (O)"); ;
  }



  return (
    <div className="relative flex gap-2 items-center justify-center pt-8 bg-green-950 text-white h-screen">
      <Board squares={board} onPlay={setBoard}  xIsNext={xIsNext} setXIsNext={setXIsNext} />
      <div className="h-[40%] flex flex-col gap-3 absolute right-0 justify-start items-center pt-8 bg-green-900 rounded-l-3xl w-[15%]">
        <button onClick={() => restart(winner)} className="w-[85%] bg-green-800 rounded-full p-2 font-bold">Restart</button>
        <div className="w-[85%] bg-green-800 rounded-xl p-2 font-bold">
          <h1>Player 1 (X) : {nbXwin} win</h1>
          <h1>Player 2 (O) : {nbOwin} win</h1>
          <h1>Toe : {toe} !</h1>
        </div>
        <h1 className="w-[85%] bg-green-800 rounded-xl p-2 font-bold">{status}</h1>
      </div>
    </div>
  );


}
