import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
// import { DISHES } from "../shared/dishes";
// import { COMMENTS } from "../shared/comments";
// import { LEADERS } from "../shared/leaders";
// import { PROMOTIONS } from "../shared/promotions";
import Header from "./HeaderComponent";
import Footer from "../components/FooterComponent";
import Home from "./HomeComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  // maps redux store state to props and make it available for use.
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //   dishes: DISHES,
      //   comments: COMMENTS,
      //   promotions: PROMOTIONS,
      //   leaders: LEADERS,
    };
  }

  render() {
    const HomePage = (props) => {
      return (
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.props.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };
    return (
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route
            exact
            path="/menu"
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route
            path="/aboutus"
            component={() => <About leaders={this.props.leaders} />}
          />
          <Route exact path="/contactus" component={Contact} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}
// if we are using the React Router, then in order to connect the component to the React Router, we need to surround it with the withRouter.
export default withRouter(connect(mapStateToProps)(Main));
