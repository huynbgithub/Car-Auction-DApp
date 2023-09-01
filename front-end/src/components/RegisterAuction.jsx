import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Web3Context } from '../App.js';
import { createAuctionRound } from "../utils/contracts/VehicleContract.js";
import { useFormik } from 'formik';


function Example(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const [amount, setAmount] = useState(false);


       const { web3 } = useContext(Web3Context);
    const formik = useFormik({

        initialValues: {
            quantity: 1,
        },
        onSubmit: values => {
            console.log("this function load")
            createAuctionRound(values.quantity, Math.floor(new Date().getTime() / 1000), props.carAddress,web3 );
            handleClose();
        },
    });

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Register Auction
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={formik.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>BID AMOUNT</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup className="mb-3">
                            <InputGroup.Text>KLAY</InputGroup.Text>
                            <Form.Control type="number"
                                name="quantity"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.quantity} />
                            <InputGroup.Text>.00</InputGroup.Text>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" >
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>


            </Modal>
        </>
    );
}

export default Example;