import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuctionRounds, getIsOwner, getOwner, getVehicleData, submitAuction, withdrawAuctionRound } from '../contracts/VehicleContract'
import { AuctionRound, VehicleData } from '../utils/ParseUtils'
import { Carousel, Col, Row, Image, Container, ListGroup, InputGroup, Form, FloatingLabel, Button, Table } from 'react-bootstrap'
import { AuctionStatus, ScopeReference } from '../components/Utils'
import Web3, { Address } from 'web3'
import { exponent } from '../utils/Constants'
import { Web3Context } from '../App'
import { BsFillPersonVcardFill, BsCoin } from 'react-icons/bs'
import RegisterAuctionModal from '../components/RegisterAuctionModal'
import NotificationAlert from '../components/NotificationAlert'

const Detail = () => {
  const { web3, setWeb3 } = useContext(Web3Context);
  const { account, setAccount } = useContext(Web3Context);
  const { balance, setBalance } = useContext(Web3Context);

  const { address } = useParams()
  const [data, setData] = useState(null)
  const [auctionRounds, setAuctionRounds] = useState(null)
  const [owner, setOwner] = useState(null)
  const [isOwner, setIsOwner] = useState(true)

  useEffect(() => {
    if (balance) {
      const handleEffect = async () => {
        console.log(balance)
        const data = await getVehicleData(address)
        setData(data)

        const auctionRounds = await getAuctionRounds(address)
        console.log(auctionRounds)
        setAuctionRounds(auctionRounds)

        const owner = await getOwner(address)

        setOwner(owner)

        if (balance && balance != null) {
          console.log(account)
          const isOwner = await getIsOwner(address, account)
          setIsOwner(isOwner)
        }
      }
      handleEffect()
    }
  }, [balance])

  const renderImages = () => {
    const images = []
    data?.vehicleImages.forEach(element =>
      images.push(<Carousel.Item>
        <Image thumbnail src={element} />
      </Carousel.Item>))
    return images
  }

  const renderTable = () => {
    const rows = []
    auctionRounds?.forEach(element =>
      rows.push(
        <tr>
          <td> {element.index} </td>
          <td> <ScopeReference hexString={element.auctioneer} type='address' /> </td>
          <td> {Number(element.quantity) / exponent} KLAY </td>
          <td> {new Date(Number(element.auctionRoundDate)).toLocaleString()}</td>
          <td> {element.isWithdrawed ? 'Yes' : 'No'}</td>
        </tr>
      ))
    return rows
  }

  const notificationRef = useRef(null)
  const enableShow = (alert) => (notificationRef.current).setShow(alert)

  return (
    <div>
      <Container fluid>
        <NotificationAlert ref={notificationRef} />
        <Row>
          <Col xl={6}>
            <Carousel className='mb-3'>
              {renderImages()}
            </Carousel>

            <div>
              <p className='h5'>Auction Results</p>

              <div className='mb-2 d-flex align-items-center'>
                <BsCoin size={24} className='me-2' />  {Number(data?.startingPrice) / exponent} KLAY
              </div>
              <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Index</th>
                    <th>Auctioneer</th>
                    <th>Quantity</th>
                    <th>Time</th>
                    <th>Withdrawed</th>
                  </tr>
                </thead>

                {
                  auctionRounds?.length == 0 ?
                    <tbody>
                      <tr>
                        <td colSpan={5} className='text-center'> No matching records found </td>
                      </tr>
                    </tbody>
                    :
                    <tbody>
                      {renderTable()}
                    </tbody>
                }

              </Table>
              {!isOwner && data?.isStart ?
                <div className='d-flex float-end'>

                  <RegisterAuctionModal
                    contractAddress={address}
                    enableShow={enableShow}
                    auctionRounds={auctionRounds}
                    startingPrice={data.startingPrice}
                    setAuctionRounds={setAuctionRounds}
                    className='me-3' />

                  <Button variant='outline-danger'
                    onClick={async () => {
                      const receipt = await withdrawAuctionRound(
                        web3,
                        address,
                        account)

                      enableShow({
                        hasShow: true,
                        variant: 'success',
                        content: <div>A bid has been withdrawed. Transaction hash: {<ScopeReference
                          hexString={receipt.transactionHash}
                          type='transaction' />}</div>
                      })

                      const auctionRounds = await getAuctionRounds(address)
                      setAuctionRounds(auctionRounds)
                    }}
                    disabled={auctionRounds?.length == 0}>
                    Withdraw </Button>
                </div>
                : <div> </div>}
              {isOwner && data?.isStart ? <div className='d-flex float-end'>
                <Button variant='primary'
                  onClick={async () => {
                    const receipt = await submitAuction(
                      web3,
                      address,
                      account)

                    enableShow({
                      hasShow: true,
                      variant: 'outline-success',
                      content: <div>A bid has been submitted. Transaction hash: {<ScopeReference
                        hexString={receipt.transactionHash}
                        type='transaction' />}</div>
                    })

                    const data = await getVehicleData(address)
                    setData(data)

                    const owner = await getOwner(address)
                    setOwner(owner)

                    const auctionRounds = await getAuctionRounds(address)
                    setAuctionRounds(auctionRounds)
                  }
                  }
                > End Auction </Button>
              </div> : <div> </div>}

            </div>
          </Col>
          <Col xl={6}>
            <div className='mb-2'>
              <ScopeReference
                hexString={address}
                className='h4'
                type='address' />

            </div>

            <AuctionStatus className='mb-2' type={data?.isStart} />

            {
              owner != null ? <div className='mb-3 d-flex text-align-center'> <BsFillPersonVcardFill size={24} className='me-2' /> <ScopeReference
                hexString={owner}
                type='address' />
              </div> : <div> </div>
            }

            <ListGroup className='mb-3'>
              <ListGroup.Item><b>Owner Full Name: </b>{data?.props.ownerFullName}</ListGroup.Item>
              <ListGroup.Item><b>Owner Address: </b>{data?.props.ownerAddress}</ListGroup.Item>
              <ListGroup.Item><b>Brand: </b>{data?.props.brand}</ListGroup.Item>
              <ListGroup.Item><b>Vehicle Type: </b>{data?.props.vehicleType}</ListGroup.Item>
              <ListGroup.Item><b>Color: </b>{data?.props.color}</ListGroup.Item>
              <ListGroup.Item><b>Seat Capacity: </b>{data?.props.seatCapacity}</ListGroup.Item>
              <ListGroup.Item><b>Origin: </b>{data?.props.origin}</ListGroup.Item>
              <ListGroup.Item><b>License Plate: </b>{data?.props.licensePlate}</ListGroup.Item>
              <ListGroup.Item><b>Engine Number: </b>{data?.props.engineNumber}</ListGroup.Item>
              <ListGroup.Item><b>Chassis Number: </b>{data?.props.chassisNumber}</ListGroup.Item>
              <ListGroup.Item><b>Model Code: </b>{data?.props.modelCode}</ListGroup.Item>
              <ListGroup.Item><b>Capacity: </b>{data?.props.capacity}</ListGroup.Item>
              <ListGroup.Item><b>First Registration Date: </b>{new Date(Number(data?.props.firstRegistrationDate)).toLocaleDateString()}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Detail
