import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAuctionRounds, getIsOwner, getOwner, getVehicleData, submitAuction, withdrawAuctionRound, approveVehicle, getIsApproved } from '../contracts/VehicleContract'
import { Carousel, Col, Row, Image, Container, ListGroup, Button, Table } from 'react-bootstrap'
import { AuctionStatus, ApprovalStatus, ScopeReference } from '../components/Utils'
import { exponent } from '../utils/Constants'
import { Web3Context } from '../App'
import { BsFillPersonVcardFill, BsCoin } from 'react-icons/bs'
import RegisterAuctionModal from '../components/RegisterAuctionModal'
import NotificationAlert from '../components/NotificationAlert'

const Detail = () => {
  const { web3 } = useContext(Web3Context);
  const { account } = useContext(Web3Context);

  const { address } = useParams()
  const [data, setData] = useState(null)
  const [auctionRounds, setAuctionRounds] = useState(null)
  const [owner, setOwner] = useState(null)
  const [approved, setApproved] = useState(null)
  const [isOwner, setIsOwner] = useState(true)

  useEffect(() => {
    if (account) {
      const handleEffect = async () => {
        const data = await getVehicleData(address)
        setData(data)

        const auctionRounds = await getAuctionRounds(address)
        setAuctionRounds(auctionRounds)

        const owner = await getOwner(address)
        setOwner(owner)

        const approved = await getIsApproved(address)
        setApproved(approved);

        if (account && account != null) {
          const isOwner = await getIsOwner(address, account)
          setIsOwner(isOwner)
        }
      }
      handleEffect()
    }
  }, [])

  const renderImages = () => {
    const images = []
    data?.vehicleImages.forEach(element =>
      images.push(<Carousel.Item>
        <Image thumbnail src={element} style={{ width: '100%', height: '400px' }} />
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
          <td> {element.quantity / exponent} KLAY </td>
          <td> {new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(element.auctionRoundDate)}</td>
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
                <BsCoin size={24} className='me-2' />  {data?.startingPrice / exponent} KLAY
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
              {account != "0x39c4fBD15e23dFc8e4d3920fb3Ff2d28DA21215D" && !isOwner && data?.isStart ?
                <div className='d-flex float-end'>

                  <RegisterAuctionModal
                    contractAddress={address}
                    enableShow={enableShow}
                    auctionRounds={auctionRounds}
                    startingPrice={data.startingPrice}
                    setAuctionRounds={setAuctionRounds}
                    className='me-3' />

                  <Button variant='outline-danger' disabled={auctionRounds?.length == 0}
                    onClick={async () => {
                      const receipt = await withdrawAuctionRound(
                        web3,
                        address,
                        account)
                      try {
                        enableShow({
                          hasShow: true,
                          variant: 'success',
                          content: <div>A bid has been withdrawed. Transaction hash: {<ScopeReference
                            hexString={receipt.transactionHash}
                            type='transaction' />}</div>
                        })
                      } catch (e) {
                        console.log(e)
                      }
                      const auctionRounds = await getAuctionRounds(address)
                      setAuctionRounds(auctionRounds)
                    }}>
                    Withdraw </Button>
                </div>
                : <div> </div>}
              {account != "0x39c4fBD15e23dFc8e4d3920fb3Ff2d28DA21215D" && isOwner && data?.isStart ? <div className='d-flex float-end'>
                <Button variant='primary'
                  onClick={async () => {
                    const receipt = await submitAuction(
                      web3,
                      address,
                      account)
                    try {
                      enableShow({
                        hasShow: true,
                        variant: 'outline-success',
                        content: <div>A bid has been submitted. Transaction hash: {<ScopeReference
                          hexString={receipt.transactionHash}
                          type='transaction' />}</div>
                      })
                    } catch (e) {
                      console.log(e)
                    }

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
              {account == "0x39c4fBD15e23dFc8e4d3920fb3Ff2d28DA21215D" && !approved ?
                <div className='d-flex float-end'>
                  <Button variant='success'
                    onClick={async () => {
                      const receipt = await approveVehicle(
                        web3,
                        address,
                        account);
                      try {
                        enableShow({
                          hasShow: true,
                          variant: 'outline-success',
                          content: <div>This car has been approved by admin. Transaction hash: {<ScopeReference
                            hexString={receipt.transactionHash}
                            type='transaction' />}</div>
                        })
                      } catch (e) {
                        console.log(e)
                      }
                    }
                    }> Approve </Button>
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

            <ApprovalStatus className='mb-2' type={approved} />
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
              <ListGroup.Item><b>First Registration Date: </b>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(data?.props.firstRegistrationDate)}</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default Detail
