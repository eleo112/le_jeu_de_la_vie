import React from 'react';
import './Game.css';

// number of rows and columns for the board grid
const ROWS = 20;
const COLUMNS = 20;



class Gamed extends React.Component { 
    constructor(props) {
        super(props);

        this.state = {
            isGameRunning: false,
            cells: [],
            
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
        let board = "";

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
    handleClick = () => {
    //     const elemOffset = this.getElementOffset();
    //     const offsetX = event.clientX - elemOffset.x;
    //     const offsetY = event.clientY - elemOffset.y;
        
    //     const x = Math.floor(offsetX / COLUMNS);
    //     const y = Math.floor(offsetY / ROWS);

    //     if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
    //         this.board[y][x] = !this.board[y][x];
    //     }

    //     this.setState({ 
    //         cells: this.makeCells() });
    // }

    // getElementOffset() {
    //     const rect = this.boardRef.getBoundingClientRect();
    //     const doc = document.documentElement;

    //     return {
    //         x: (rect.left + window.pageXOffset) - doc.clientLeft,
    //         y: (rect.top + window.pageYOffset) - doc.clientTop,
    //     };
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

export default Gamed;