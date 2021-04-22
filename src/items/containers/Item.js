import React, { useState } from 'react'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button,
    Row, Col, Container
  } from 'reactstrap';
import TwoColumnLayout from "../../layout/TwoColumnLayout";
import NavBar from '../../page/NavBar';
import axios from "axios";


function Item() {
    const [items, setItems] = useState([]);
    
    useState(async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/items/listing/1`);
            console.log(response.data);
            setItems(response.data.data);
          } catch (error) {
            console.error(error);
        }
    }, [items]);

    const qtyMaxHandler = (id) => {
        const newItems = [...items];
        const foundItem = newItems.find(item => item.id === id);
        foundItem.item_quantity = Number( foundItem.item_quantity ) + 1;
        foundItem.total = foundItem.price * foundItem.item_quantity;
        
        setItems(newItems);
    }

    const qtyMinHandler = (id) => {
        const newItems = [...items];
        const foundItem = newItems.find(item => item.id === id);
        foundItem.item_quantity = foundItem.item_quantity - 1;
        foundItem.total = foundItem.price * foundItem.item_quantity;
        setItems(newItems);
    }

    return (
        <TwoColumnLayout>
            <NavBar />
            <Container className="mt-3">
                <Row>
                    {items && items.map(({item_id, item_name, item_quantity, item_image, item_price,  total}) => <Col sm="3">
                        <Card>
                            <CardImg top width="100%" src={process.env.REACT_APP_API_FOOD_ITEMS_IMAGE_PATH + item_image} alt="Card image cap" />
                            <CardBody>
                                <CardTitle tag="h5">{item_name}</CardTitle>
                                <CardSubtitle tag="h6" className="mb-2 text-muted">{item_quantity} - ${Number(item_price).toFixed(2)}</CardSubtitle>
                                <Button color="primary" onClick={() => qtyMaxHandler(item_id)}>Max</Button> {  }
                                <Button color="danger" onClick={() => qtyMinHandler(item_id)}>Min</Button>
                            </CardBody>
                        </Card>
                    </Col>)}
                </Row>
            </Container>
        </TwoColumnLayout>
    )
}

export default Item
