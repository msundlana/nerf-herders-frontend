import React from 'react';
import { Card,CardBody,CardTitle,CardSubtitle, Button} from 'reactstrap';
import { Loading } from "./LoadingComponent";
import { FadeTransform } from 'react-animation-components';

function alertFunction(message) {
    alert(message.name + '\n\n'+ message.description);
}

function RenderTree({graph}){
    return(graph.map((value,key) => {
        let nodeMap = value.children?value.children.map((child,key2) => {
            if(child.parent){
                return (<RenderTree graph={value.children}/>)
            }
            return (<li key={key2}>
                <Button className="tf-nc" onClick={()=>alertFunction(child)}>{child.name}</Button>
            </li>)
        }): null;
        return( <ul key={key} className="list-unstyled">
            <li>
                {value.parent && <Button className="tf-nc" onClick={()=>alertFunction(value.parent)}>{value.parent?value.parent.name:null}</Button>}
                <ul>{nodeMap}</ul>
            </li>
        </ul>)
    }) )
}

function RenderCard({items}) {
    if(items.isLoading){
        return(
            <Loading/>
        );
    }else if(items.errMess){
        return(
            <h4>{items.errMess}</h4>
        );
    }else {
        const graph = items.graph;
        return(
            <FadeTransform in
                           transfromProps={{
                               exitTransform: 'scale(0.5) translate()-50%'
                           }}>
                <Card>
                    <CardBody className="tf-tree text-center">
                        <CardTitle>Coding Challenge</CardTitle>
                        <CardSubtitle>Visualize a small graph data</CardSubtitle>
                        <br/>
                        <RenderTree  graph={graph}/>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    }

}

function View(props) {
    return(
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard items={props.graph}/>
                </div>
            </div>
        </div>
    );

}

export default View;

