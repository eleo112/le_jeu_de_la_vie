import React from "react";
// import Cell from "./Cell";
import "./style.css";

class Gamed extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            board: this.newBoard(),
            isGameRunning: false,
        };
    }

    newBoard() {
        let rows = 20;
        let columns = 20;
        let board = [];
        let counter = 0;
        for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < columns; j++) {
            row.push({ id: counter++, alive: false });
        }
        board.push(row);
        }
        return board;
    }

    cellReact(cellId) {
        this.setState(
        {
            board: this.state.board.map(row =>
            row.map(
                cell =>
                cell.id === cellId ? { ...cell, alive: !cell.alive } : cell
            )
            )
        },
        () => {
            this.timeout = setTimeout(() => {
            this.lifeMiracle();
            }, 1000);
        }
        );
    }

    generateIndexes(x, y, board) {
        // function to generate a matrix to indentify what indexes can be verified
        var indexes = [];
        for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            if (
            i >= 0 &&
            j >= 0 &&
            (i < board.length && j < board.length) &&
            (i !== x || j !== y)
            ) {
            indexes.push({ x: i, y: j });
            }
        }
        }
        return indexes;
    }

    countNeighborsAlive(x, y, board) {
        let neighborsCounter = 0;
        this.generateIndexes(x, y, board).map(neighbor => {
        board[neighbor.x][neighbor.y].alive && neighborsCounter++;
        });
        return neighborsCounter;
    }

    lifeMiracle() {
        var boardCopy = this.state.board.map(row => {
        return row.map(cell => {
            return { ...cell };
        });
        });
        let row = [];
        let neighbors = 0;
        let anyAlive = false;
        let cellOriginalState = false;
        for (let i = 0; i < this.state.board.length; i++) {
        row = boardCopy[i];
        for (let j = 0; j < row.length; j++) {
            neighbors = this.countNeighborsAlive(i, j, this.state.board);
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
        this.setState({ board: boardCopy }, () => {
        if (anyAlive) {
            this.timeout = setTimeout(() => this.lifeMiracle(), 200);
        }
        });
    }

    render() {
        var i = 0;
        return this.state.board.map(row => (
        <div key={i++} className="row">
            {row.map(cell => (
            <span
                className="cell"
                style={{
                backgroundColor: cell.alive && "green"
                }}
                onClick={() => {
                clearTimeout(this.timeout);
                this.cellReact(cell.id);
                }}
                key={cell.id}
            />
            // <Cell
            //   key={cell.id}
            //   alive={cell.alive}
            //   onClick={() => {
            //     clearTimeout(this.timeout);
            //     this.cellReact(cell.id);
            //   }}
            // />
            ))}
        </div>
        ));
    }
    }

export default Gamed;