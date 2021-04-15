import React, { useState } from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button,
    Row, Col, Container
  } from 'reactstrap';

function Item() {
    const [items, setItems] = useState([]);
    

    useState(() => {
        console.log('useEffect called.');
        setItems([
            {id: 1, item_name: "Sizzling Chicken Burger", price: 3.99, item_quantity: 1},
            {id: 2, item_name: "Sizzling Cheese Burger", price: 1.99, item_quantity: 1},
            {id: 3, item_name: "Sizzling Beef Burger", price: 5.99, item_quantity: 1},
        ]);
    }, []);

    const qtyMaxHandler = (id) => {
        const newItems = [...items];
        const foundItem = newItems.find(item => item.id === id);
        foundItem.item_quantity = foundItem.item_quantity + 1;
        foundItem.price = foundItem.price * foundItem.item_quantity;
        
        setItems(newItems);
    }

    const qtyMinHandler = (id) => {
        const newItems = [...items];
        const foundItem = newItems.find(item => item.id === id);
        foundItem.item_quantity = foundItem.item_quantity - 1;
        foundItem.price = foundItem.price * foundItem.item_quantity;
        setItems(newItems);
    }

    return (
        <Container>
            <Row>
                {items && items.map(({id, item_name, item_quantity, price}) => <Col sm="3">
                    <Card>
                        <CardImg top width="100%" src="https://via.placeholder.com/150" alt="Card image cap" />
                        <CardBody>
                            <CardTitle tag="h5">{item_name}</CardTitle>
                            <CardSubtitle tag="h6" className="mb-2 text-muted">{item_quantity} - ${price}</CardSubtitle>
                            <Button color="primary" onClick={() => qtyMaxHandler(id)}>Max</Button> {  }
                            <Button color="danger" onClick={() => qtyMinHandler(id)}>Min</Button>
                        </CardBody>
                    </Card>
                </Col>)}
            </Row>
        </Container>
    )
}

export default Item
