
import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 0,
    tags: ["tag1", "tag2", "tag3"]
  };

  render() {
    return (
      <form className = "form">
      <div>
        <span className = {this.getBadgeClasses()}>{this.formatCount()}</span>
        <button onClick={this.handleIncrement} >Increment</button>
        <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
      </div>
      </form>
    );
  }
  
  handleIncrement = () => {
    console.log("Increment clicked", this);
    this.setState({count: this.state.count + 1});
  }
  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += (this.state.count === 0) ? "warning" : "primary";
    return classes;
  }

  formatCount() {
    const {count} = this.state;
    return count === 0 ? 'Zero' : count;
  }
}



export default Counter;
