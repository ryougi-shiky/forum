import React, { Component } from 'react';

class AccountForm extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username: "",
            password: "",
        };
        this.enterUsername = this.enterUsername.bind(this);
        this.enterPassword = this.enterPassword.bind(this);
        this.submit = this.submit.bind(this);
    }
    
    enterUsername(event){
        this.setState({username: event.target.value});
    }

    enterPassword(event){
        this.setState({password: event.target.value});
    }

    submit(event){
        console.log("username: ", this.state.username, "     password: ", this.state.password);
        alert("username: " + this.state.username + "     password: " + this.state.password);
    }

    render() { 
        return (
            <React.Fragment>
                <h1>AniAni Forum ^_^</h1>
                <h2>Register</h2>
                <form onSubmit={this.submit}>
                    <label>Username</label><br></br>
                    <input id='reg_username' type="text" onChange={this.enterUsername}></input><br></br>
                    <label>Password</label><br></br>
                    <input id="reg_password" type="text" onChange={this.enterPassword}></input><br></br>
                    <input type="submit" value="Register"></input>
                </form>

                <h2>Login</h2>
                <form onSubmit={this.submit}>
                    <label for="login_username" id="login_username">Username</label><br></br>
                    <input type="text" onChange={this.enterUsername}></input><br></br>
                    <label for="login_password" id="login_password">Password</label><br></br>
                    <input type="text" onChange={this.enterPassword}></input><br></br>
                    <input type="submit" value="Login"></input>
                </form>
            </React.Fragment>
        );
    }
}
 
export default AccountForm;
/*
var clickNum = 0;

class Square extends Component {
    constructor(props){
        super(props);
        this.state = {  
            value: null
        };
    }
    
    

    render() { 
        return (
            <button className='square' onClick={() => this.setState({value: this.XorO})}>
                {this.state.value}
            </button>
        );
    }
}
 
class Board extends Component {
    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }
    
    XorO(){
        clickNum += 1;
        if (clickNum % 2 === 0){
            console.log("X turn");
            return 'X';
        } else {
            console.log("O turn");
            return 'O';
        }
    }

    renderSquare(i){
        return <Square value={this.state.squares[i]} onClick={() => this.XorO}/>
    }

    render() { 
        var nextPlayer = this.XorO;

        return (
            <React.Fragment>
                <div>
                    Next player is {nextPlayer}
                </div>

                <div>
                    {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
                </div>
                <div>
                    {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
                </div>
                <div>
                    {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
                </div>
            </React.Fragment>
        );
    }
}

class Game extends Component {
    render() { 
        return (
            <div><Board/></div>
        );
    }
}
 
export default Game;
*/