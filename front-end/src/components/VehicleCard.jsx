import React, { useContext, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { exponent } from '../utils/Constants'
import { setStart } from '../contracts/VehicleContract'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'

const VehicleCard = (props) => {

    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const [isChecked, setIsChecked] = useState(props.data.isStart)

    const navigate = useNavigate()

    const handleChecked = async (event) => {
        const newValue = event.target.checked
        try {
            await setStart(web3, props.data.address, account, newValue)
            setIsChecked(newValue)
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card className=''>
            <Card.Img variant="top" src={props.data.vehicleImages[0]} />
            <Card.Body>
                <Card.Title> <ScopeReference hexString={props.data.address} type='address' /></Card.Title>
                <Card.Text>
                    <div className='d-flex'>
                        <div className='me-2'> Start Auction: </div> <Form.Check // prettier-ignore
                            checked={isChecked}
                            type="switch"
                            id="custom-switch"
                            label=""
                            onChange={event => handleChecked(event)}
                        />
                    </div>
                    <div>Brand: {props.data.brand}</div>
                    <div>License Plate: {props.data.licensePlate}</div>
                    <div>Starting Price: {Number(props.data.startingPrice) / exponent} KLAY</div>
                </Card.Text>
                <Button onClick={() => navigate(`/detail/${props.data.address}`)} variant="primary" className="float-end"> Detail </Button>
            </Card.Body>
        </Card>
    )
}

export default VehicleCard