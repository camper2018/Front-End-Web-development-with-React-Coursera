import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish(dish) {
  if (dish != null) {
    return (
      <Card key={dish.id}>
        <CardImg top src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}
function RenderComments(commentsArray) {
  let dishComments = commentsArray.map((comment) => {
    return (
      <div key={comment.id}>
        <li>{comment.comment}</li>
        <br></br>
        <li>
          -- {comment.author},{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(Date.parse(comment.date)))}
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
const DishdetailComponent = (props) => {
  let dishComments = null;
  if (props.dish) {
    dishComments = RenderComments(props.dish.comments);
  } else {
    dishComments = <div></div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">{RenderDish(props.dish)}</div>
        <div className="col-12 col-md-5 m-1">
          <div>{dishComments}</div>
        </div>
      </div>
    </div>
  );
};

export default DishdetailComponent;
