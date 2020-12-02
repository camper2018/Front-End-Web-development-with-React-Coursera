import React, { Component } from "react";

class DishdetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(commentsArray) {
    let dishComments = commentsArray.map((comment) => {
      let date = new Date(comment.date);
      date = date.toDateString();
      date = date.split(" ");
      let month = date[1];
      let day = date[2];
      let year = date[3];
      return (
        <div key={comment.id}>
          <li>{comment.comment}</li>
          <br></br>
          <li>
            -- {comment.author}, {month} {day}, {year}
          </li>
          <br></br>
        </div>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{dishComments}</ul>
      </div>
    );
  }
  render() {
    let dishComments = null;
    if (this.props.selectedDish) {
      dishComments = this.renderComments(this.props.selectedDish.comments);
    } else {
      dishComments = <div></div>;
    }

    return (
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          {this.props.renderDish(this.props.selectedDish)}
        </div>
        <div className="col-12 col-md-5 m-1">
          <div>{dishComments}</div>
        </div>
      </div>
    );
  }
}

export default DishdetailComponent;
