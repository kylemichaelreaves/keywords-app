import * as React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

interface Props {
    variant: string;
    content: string;
};


const ToDoListItem = ({variant, content}: Props) => (
    <ListGroup.Item variant={variant}>{content}</ListGroup.Item>
);

const ToDoList = (data: Props[]) => (
    <ListGroup>
        {data.map(item => (
            <ToDoListItem key={item.content} variant={item.variant} content={item.content}/>
        ))}
    </ListGroup>
);

export default ToDoList;
