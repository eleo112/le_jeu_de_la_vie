import React from 'react';
import './Game.css';

// number of rows and columns for the board grid
const ROWS = 20;
const COLUMNS = 20;



class Game extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            isGameRunning: false,
            board: this.makeNewBoard(),
            
        }
        this.handleStartClick = this.handleStartClick.bind(this);
        this.handleStopClick = this.handleStopClick.bind(this);
    }

    // methods for running the game
    handleStartClick() {
        this.setState({
            isGameRunning: true
        });
    }

    handleStopClick() {
        this.setState({
            isGameRunning: false
        });
    }

    // methods for the board
    makeNewBoard() {
        let board = [];

        for (let i = 0; i < ROWS; i++) {
            board[i] = [];
            for (let j = 0; j < COLUMNS; j++) {
                board[i][j] = false;

                
            }
        }
        return board;
    }

    makeCells() {
        let cells = [];
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j < COLUMNS; j++) {
                if (this.board[i][j]) {
                    cells.push({ j, i });
                }
            }
        }
        return cells;
    }

    // clicking on the board
    handleClick = (cellId) => {
        this.setState(
        {
            board: this.state.board.map(row =>
            row.map(
                cell =>
                cell.id === cellId ? { ...cell, alive: !cell.alive } : cell
            )
            )
        });
    }

    generateCells(x, y, board) {
        var newcells = [];
        for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            if (
            i >= 0 &&
            j >= 0 &&
            (i < board.length && j < board.length) &&
            (i !== x || j !== y)
            ) {
            newcells.push({ x: i, y: j });
            }
        }
        }
        return newcells;
    }

    neighborsAlive(x, y, board) {
        let neighborsCounter = 0;
        this.generateCells(x, y, board).map(neighbor => {
        board[neighbor.x][neighbor.y].alive && neighborsCounter++;
        });
        return neighborsCounter;
    }

    isAlive() {
        var boardCopy = this.state.board.map(row => {
            return row.map(cell => {
                return { ...cell };
            });
        });

        let row = [];
        let neighbors = 0;
        let anyAlive = false;

        for (let i = 0; i < this.state.board.length; i++) {
            row = boardCopy[i];
            for (let j = 0; j < row.length; j++) {
                neighbors = this.neighborsAlive(i, j, this.state.board);
                if (boardCopy[i][j].alive === true) {
                }
                if (neighbors < 2 || neighbors > 3) {
                    boardCopy[i][j].alive = false;
                } else if (neighbors === 3) {
                    boardCopy[i][j].alive = true;
                }
                if (anyAlive !== true && boardCopy[i][j].alive === true) {
                    anyAlive = true;
                }
            }
        }
    }

    inSelected = () => {
        this.props.inSelected(ROWS, COLUMNS);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <h1>Le Jeu De La Vie</h1>  
                </div>

                <div className="row">
                    <div className="col">
                    <button 
                        className="btn btn-success" 
                        onClick={this.handleStartClick}>
                            Start
                    </button>
                    <button 
                        className="btn btn-danger" 
                        onClick={this.handleStopClick}>
                            Stop
                    </button>
                    </div>  {/* .col button */}
                </div>

                <div
                    className="board col"
                    style={{
                        width: 500,
                        height: 500,
                        backgroundSize: `${ROWS}px ${COLUMNS}px`
                    }}
                    inSelected={this.props.inSelected}
                    onClick={this.handleClick}>

                </div>
                
            </div>    
        );  
    }
}

export default Game;