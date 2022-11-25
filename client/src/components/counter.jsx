import React, { Component } from "react";

class Counter extends Component {
  state = {
    count : 0,
    imgUrl: 'https://picsum.photos/200',
    tags: ['tag1', 'tag2', 'tag3']
  };

  styles = {
    fontSize: "100px",
    fontWeight: "bold"
  };

  renderTags(){
    if (this.state.tags.length === 0){
      return <p>No tags</p>
    } else {
      return <ul>{ this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }</ul>;
    }

  }

  clickInc = () => {
    console.log("button clicked ", this);
    this.setState({count: this.state.count + 1});
  }

  render() {
    let classes = "badge m-2 badge-";
    classes += (this.state.count === 0) ? "warning" : "primary";

    return (
      <React.Fragment>
        <img src="this.state.imgUrl" alt=""></img>
        <span className={classes}>
          { this.state.count }
        </span>
        <button onClick={this.clickInc} className="btn btn-secondary btn-sm">Increment</button>
        {this.renderTags()};
      </React.Fragment>
      
    );
  }
}

export default Counter;
