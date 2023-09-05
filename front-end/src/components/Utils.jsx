import React from 'react'
import { Alert } from 'react-bootstrap'
import { BsFillPatchCheckFill, BsFillPatchExclamationFill } from 'react-icons/bs'

export const ScopeReference = (props) => {
    const url = props.type === 'address'
        ? `https://baobab.scope.klaytn.com/address/${props.hexString}`
        : `https://baobab.scope.klaytn.com/tx/${props.hexString}`

    return (
        <Alert.Link href={url} className={props.className} target="_blank">
            {props.hexString.slice(0, 4)}...{props.hexString.slice(-4)}
        </Alert.Link>
    )
}

export const AuctionStatus = (props) => {
    return (
        <div style={{ color: props.type ? 'green' : 'red' }} className={props.className + ' d-flex align-items-center'}>
            {props.type ? <BsFillPatchCheckFill className='me-2' size={24} /> : <BsFillPatchExclamationFill className='me-2' size={24} />}
            {props.type ? 'Auctioned' : 'Not auctioned'}
        </div>
    )
}