import React, { useContext, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { exponent } from '../utils/Constants'
import { setStart } from '../contracts/VehicleContract'
import { Web3Context } from "../App";
import { useNavigate } from 'react-router-dom'
import { ScopeReference } from './Utils'
import { AuctionStatus } from '../components/Utils'

const AllVehicleCard = (props) => {

    const { web3, setWeb3 } = useContext(Web3Context);
    const { account, setAccount } = useContext(Web3Context);
    const { balance, setBalance } = useContext(Web3Context);

    const navigate = useNavigate()

    return (
        <Card className=''>
            <Card.Img style={{ height: 200 }} variant="top" src={props.data.vehicleImages[0]} />
            <Card.Body>
                <Card.Title> <ScopeReference hexString={props.data.address} type='address' /></Card.Title>
                <Card.Text>
                    <div className='d-flex'>
                        <div className='me-2'>Auction Status:</div>
                        <AuctionStatus className='mb-2' type={props.data.isStart} />
                    </div>
                    <div>Starting Price: {Number(props.data.startingPrice) / exponent} KLAY</div>
                </Card.Text>
                <Button onClick={() => navigate(`/detail/${props.data.address}`)} variant="outline-success" className="float-end">Detail</Button>
            </Card.Body>
        </Card>
    )
}

export default AllVehicleCard