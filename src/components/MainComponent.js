
import React, { Component } from 'react';
import View from './ViewComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGraph} from "../redux/ActionCreators";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
        graph: state.graph
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchGraph: () => {dispatch(fetchGraph())},
});



class Main extends Component {

    componentDidMount() {
        this.props.fetchGraph();
    }

    render() {
        const ViewPage = () => {
            return(
                <View graph={this.props.graph}
                />
            );
        }

        return (
            <div>
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path="/view" component={ViewPage}/>
                            <Redirect to="/view"/>
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));