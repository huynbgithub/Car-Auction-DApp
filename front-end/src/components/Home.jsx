import React from "react";
import "./style.css";
import { useEffect, useState } from "react";
import Web3 from "web3";
import {
    tokenContractInstance,
    votingContractInstance,
} from "../service/service";

export default function Home() {
    const [web3, setWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [tokenContract, setTokenContract] = useState(null);
    const [votingContract, setVotingContract] = useState(null);
    const [addressBalance, setAddressBalance] = useState(null);
    const [balance, setBalance] = useState(null);

    const [amountDeposit, setAmountDeposit] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [description, setDescription] = useState(null);
    const [countProposal, setCount] = useState(null);

    const updateAddressBalance = (e) => {
        setAddressBalance(e.target.value);
    };

    const updateAmountDeposit = (e) => {
        setAmountDeposit(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleConnectWallet = async () => {
        if (
            typeof window !== "undefined" &&
            typeof window.ethereum !== "undefined"
        ) {
            try {
                await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                const accounts = await web3Instance.eth.getAccounts();
                setAddress(accounts[0]);

                // const tokenContractInst = tokenContractInstance(web3Instance);
                // setTokenContract(tokenContractInst);
                // const votingContractInst = votingContractInstance(web3Instance);
                // setVotingContract(votingContractInst);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Not install Metamask! Please install wallet");
        }
    };

    const handleGetBalance = async () => {
        console.log(tokenContract);

        const balance = await tokenContract.methods
            .balanceOf(addressBalance)
            .call();
        console.log(
            "🚀 ~ file: index.js:60 ~ handleGetBalance ~ balance:",
            balance
        );
        setBalance(web3.utils.fromWei(balance, "ether"));
    };

    const handleDeposit = async () => {
        try {
            await tokenContract.methods.deposit().send({
                from: address,
                value: Number(amountDeposit) * 10 ** 18,
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleSumbitProposal = async () => {
        try {
            const allowance = await tokenContract.methods
                .allowance(address, votingContract._address)
                .call();
            console.log(Number(web3.utils.fromWei(allowance, "ether")) < 20);
            if (Number(web3.utils.fromWei(allowance, "ether")) < 20) {
                console.log(1);
                await tokenContract.methods
                    .approve(votingContract._address)
                    .send({
                        from: address,
                    });
            }
            console.log(2);
            await votingContract.methods.createProposal(description).send({
                from: address,
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         if (votingContract) {
    //             const proposalCount = await votingContract.methods
    //                 .proposalCount()
    //                 .call();
    //             console.log(
    //                 "🚀 ~ file: index.js:116 ~ fetchData ~ proposalCount:",
    //                 proposalCount
    //             );
    //             setCount(Number(proposalCount));
    //         }
    //     }
    //     const interval = setInterval(() => {
    //         fetchData();
    //     }, 10000);

    //     return () => clearInterval(interval);
    // });

    return (
        <div className="index">
            <div className="div">
                <div className="header">
                    <div className="header-2">
                        <div className="div-header-logo">
                            <img
                                className="link-logo-dau-gia"
                                alt="Link logo dau gia"
                                src=""
                            />
                        </div>
                        <div className="list">
                            <div className="item-margin">
                                <div className="text-wrapper">Giới thiệu</div>
                            </div>
                            <div className="item-link-li-n-h-wrapper">
                                <div className="text-wrapper">Liên hệ</div>
                            </div>
                            <div className="item-wrapper">
                                <div className="item">
                                    <div className="text-wrapper-2">Tài sản đấu giá</div>
                                    <img
                                        className="icon"
                                        alt="Icon"
                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/icon.svg"
                                    />
                                </div>
                            </div>
                            <div className="div-wrapper">
                                <div className="item-2">
                                    <div className="text-wrapper-2">Cuộc đấu giá</div>
                                    <img
                                        className="img"
                                        alt="Icon"
                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/icon-1.svg"
                                    />
                                </div>
                            </div>
                            <div className="item-margin-2">
                                <div className="item-3">
                                    <div className="text-wrapper-2">Tin tức</div>
                                    <img
                                        className="icon-2"
                                        alt="Icon"
                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/icon-2.svg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="div-nav-right">
                            <img
                                className="div-search-btn"
                                alt="Div search btn"
                                src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-search-btn-margin.svg"
                            />
                            <div className="div-login">
                                <div className="pseudo" />
                                <div className="pseudo-2" />
                                <div className="text-wrapper-3">
                                    <button
                                        onClick={handleConnectWallet}
                                    >
                                        Connect Wallet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div-banner-new">
                    <div className="heading-danh-m-c-t">                            Current account: {address}
                    </div>
                    {/* <div className="heading-danh-m-c-t">Danh mục tài sản</div> */}
                    <div className="div-link-redirect">
                        <p className="link-trang-ch">
                            <span className="span">Trang chủ / </span>
                            <span className="text-wrapper-4">Xe</span>
                        </p>
                    </div>
                </div>
                <footer className="footer">
                    <div className="div-row">
                        <div className="div-col-xl-margin">
                            <div className="div-footer-item">
                                <div className="heading">
                                    <p className="c-ng-ty-u-gi-h-p">
                                        Công ty đấu giá
                                        <br />
                                        FutureV
                                    </p>
                                </div>
                                <div className="list-2">
                                    <div className="item-m-s-thu">Mã số thuế: </div>
                                    <div className="i-di-n-b-th-h-ng-h-wrapper">
                                        <p className="p">
                                            Đại diện:  - Chức vụ:
                                            <br />

                                        </p>
                                    </div>
                                    <div className="s-gi-y-ng-k-ho-t-ng-wrapper">
                                        <p className="p">
                                            Số giấy đăng ký hoạt động:
                                            <br />
                                            do Cấp ngày
                                            <br />

                                        </p>
                                    </div>
                                    <div className="item-4">
                                        <div className="text-wrapper-5">Địa chỉ:</div>
                                        <div className="link">
                                            <p className="text-wrapper-6">Số </p>
                                            <p className="text-wrapper-7">quận </p>
                                        </div>
                                    </div>
                                    <div className="i-n-tho-i-wrapper">
                                        <p className="div-2">
                                            <span className="text-wrapper-8">Điện thoại: </span>
                                            <span className="text-wrapper-9">0</span>
                                        </p>
                                    </div>
                                    <div className="email-info-wrapper">
                                        <p className="div-2">
                                            <span className="text-wrapper-8">Email: </span>
                                            <span className="text-wrapper-9">info@futureV.vn</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="div-footer-item-wrapper">
                            <div className="div-footer-item-2">
                                <div className="text-wrapper-10">Về chúng tôi</div>
                                <div className="list-3">
                                    <div className="text-wrapper-5">Giới thiệu</div>
                                    <div className="text-wrapper-11">Quy chế hoạt động</div>
                                    <p className="text-wrapper-11">Cơ chế giải quyết tranh chấp</p>
                                    <div className="text-wrapper-11">Hướng dẫn sử dụng</div>
                                </div>
                            </div>
                        </div>
                        <div className="div-col-xl-margin-2">
                            <div className="div-footer-item-2">
                                <div className="text-wrapper-10">Chính sách</div>
                                <div className="list-4">
                                    <div className="text-wrapper-5">Câu hỏi thường gặp</div>
                                    <p className="text-wrapper-11">Cho thuê tổ chức đấu giá trực tuyến</p>
                                    <div className="text-wrapper-11">Văn bản pháp quy</div>
                                    <p className="text-wrapper-11">Chính sách bảo mật thông tin</p>
                                </div>
                            </div>
                        </div>
                        <div className="div-col-xl-margin-3">
                            <div className="div-footer-item-3">
                                <div className="heading-tham-gia">Tham gia nhận tin</div>
                                <p className="text-wrapper-12">Đăng ký nhận tin mới qua email</p>
                                <div className="form">
                                    <div className="input">
                                        <div className="div-placeholder">
                                            <div className="text-wrapper-13">Nhập Email</div>
                                        </div>
                                    </div>
                                    <div className="button">
                                        <div className="text-wrapper-3">Đăng ký</div>
                                    </div>
                                </div>
                                <img
                                    className="link-logoccdv-png"
                                    alt="Link logoccdv png"
                                    src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/link---logoccdv-png@2x.png"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="div-footer-bottom">
                        <div className="copyright-c-ng-wrapper">
                            <p className="div-3">
                                <span className="text-wrapper-14">Copyright 2023 © </span>
                                <span className="text-wrapper-15">Công ty đấu giá FutureV</span>
                            </p>
                        </div>
                    </div>
                </footer>
                <div className="div-live-auction">
                    <img
                        className="section-bg-png"
                        alt="Section bg png"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/section-bg-png.png"
                    />
                    <img
                        className="section-bg-png-2"
                        alt="Section bg png"
                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/section-bg-png-1.png"
                    />
                    <div className="div-row-2">
                        <div className="div-col-lg">
                            <div className="div-search-area-wrapper">
                                <div className="div-search-area">
                                    <div className="div-sidebar-widget">
                                        <div className="text-wrapper-16">Tìm kiếm</div>
                                        <div className="span-hight-light">
                                            <div className="pseudo-3" />
                                            <div className="pseudo-4" />
                                        </div>
                                    </div>
                                    <div className="form-2">
                                        <div className="div-placeholder-wrapper">
                                            <div className="div-placeholder-2">
                                                <div className="text-wrapper-17">Nhập từ khóa...</div>
                                            </div>
                                        </div>
                                        <div className="div-filter-date">
                                            <div className="div-filter-date-body">
                                                <div className="div-4">
                                                    <div className="text-wrapper-18">Từ ngày</div>
                                                    <div className="div-5">
                                                        <img
                                                            className="img-2"
                                                            alt="Span input group"
                                                            src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/span-input-group-addon.svg"
                                                        />
                                                        <div className="input-2" />
                                                    </div>
                                                </div>
                                                <div className="div-4">
                                                    <div className="text-wrapper-18">Đến ngày</div>
                                                    <div className="div-5">
                                                        <img
                                                            className="img-2"
                                                            alt="Span input group"
                                                            src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/span-input-group-addon-1.svg"
                                                        />
                                                        <div className="input-2" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="l-c-wrapper">
                                                <div className="l-c">LỌC</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="aside">
                                <div className="div-search-area">
                                    <div className="div-sidebar-widget">
                                        <div className="text-wrapper-16">Trạng thái tài sản</div>
                                        <div className="span-hight-light">
                                            <div className="pseudo-3" />
                                            <div className="pseudo-4" />
                                        </div>
                                    </div>
                                    <div className="form-3">
                                        <div className="label">
                                            <div className="text-wrapper-19">Tất cả</div>
                                            <div className="span-checkmark" />
                                        </div>
                                        <div className="label">
                                            <div className="text-wrapper-19">Sắp diễn ra</div>
                                            <div className="pseudo-wrapper">
                                                <div className="pseudo-5" />
                                            </div>
                                        </div>
                                        <div className="label">
                                            <div className="text-wrapper-19">Đang diễn ra</div>
                                            <div className="span-checkmark" />
                                        </div>
                                        <div className="label">
                                            <div className="text-wrapper-19">Đã kết thúc</div>
                                            <div className="span-checkmark" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="div-search-area-wrapper">
                                <div className="div-search-area">
                                    <div className="div-sidebar-widget">
                                        <div className="text-wrapper-16">Tài sản mới</div>
                                        <div className="span-hight-light">
                                            <div className="pseudo-3" />
                                            <div className="pseudo-4" />
                                        </div>
                                    </div>
                                    <div className="form-list">
                                        <div className="item-margin-3">
                                            <div className="overlap-group-wrapper">
                                                <div className="overlap-group">
                                                    <div className="text-wrapper-20">Giá khởi điểm:</div>
                                                    <div className="text-wrapper-21">63.000.000</div>
                                                    <div className="text-wrapper-22">VNĐ</div>
                                                    <div className="link-2">
                                                        <img
                                                            className="istockphoto"
                                                            alt="Istockphoto"
                                                            src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/istockphoto-931643150-612x612-jpg@2x.png"
                                                        />
                                                        <div className="span-ellipsis">
                                                            <p className="text-wrapper-23">
                                                                Cung cấp dịch vụ kinh
                                                                <br />
                                                                doanh các thiết bị đồ…
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-margin-3">
                                            <div className="overlap-group-wrapper">
                                                <div className="overlap-group">
                                                    <div className="text-wrapper-20">Giá khởi điểm:</div>
                                                    <div className="text-wrapper-21">100.800.000</div>
                                                    <div className="text-wrapper-22">VNĐ</div>
                                                    <div className="link-2">
                                                        <img
                                                            className="istockphoto"
                                                            alt="Istockphoto"
                                                            src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/istockphoto-931643150-612x612-jpg@2x.png"
                                                        />
                                                        <div className="span-ellipsis">
                                                            <p className="text-wrapper-23">
                                                                Cung cấp dịch vụ trông
                                                                <br />
                                                                giữ xe tại trường THPT…
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="item-margin-3">
                                            <div className="overlap-group-wrapper">
                                                <div className="overlap-group">
                                                    <div className="text-wrapper-20">Giá khởi điểm:</div>
                                                    <div className="text-wrapper-21">148.500.000</div>
                                                    <div className="text-wrapper-22">VNĐ</div>
                                                    <div className="link-2">
                                                        <img
                                                            className="istockphoto"
                                                            alt="Istockphoto"
                                                            src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/istockphoto-931643150-612x612-jpg@2x.png"
                                                        />
                                                        <div className="span-ellipsis">
                                                            <p className="text-wrapper-23">
                                                                Cho thuê phục vụ hoạt
                                                                <br />
                                                                động phụ trợ: Cung cấp…
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="div-col-lg-2">
                            <div className="overlap">
                                <div className="div-view-list">
                                    <div className="options">
                                        <div className="div-6">
                                            <div className="text-wrapper-24">Mới → Cũ</div>
                                        </div>
                                    </div>
                                    <img
                                        className="img-2"
                                        alt="Div view mode"
                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-view-mode.svg"
                                    />
                                </div>
                                <div className="div-row-3">
                                    <div className="div-col-lg-margin">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img">
                                                <div className="link-z" />
                                                <div className="div-auction-timer">
                                                    <div className="heading-2">31/08/2023 10:00:00</div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô 7 chỗ hiệu Mitsubishi
                                                        <br />
                                                        Pajero, BKS 29A-008.23 của Ban
                                                        <br />
                                                        quản lý đường 3
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">33,400,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-eg-card-wrapper">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img">
                                                <div className="link-4" />
                                                <div className="div-auction-timer">
                                                    <div className="heading-2">25/08/2023 10:00:00</div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        01 (một) xe ô tô nhãn hiệu KIA
                                                        <br />
                                                        MORNING màu xanh, đã qua sử
                                                        <br />
                                                        dụng biển kiểm soát 34A-253.97
                                                        <br />
                                                        (lần bán 07)
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">79,184,709</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-1.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-2">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-2">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Daihatsu 500kg
                                                        <br />
                                                        BKS: 80B-1905 của Văn phòng
                                                        <br />
                                                        Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">15,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-2.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-3">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-3">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Toyota HIACE 2.0
                                                        <br />
                                                        BKS: 80B-2030 của Văn phòng
                                                        <br />
                                                        Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">30,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-3.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-4">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-4">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Toyota Hiace 2.2
                                                        <br />
                                                        BKS: 80B-4020 của Văn phòng
                                                        <br />
                                                        Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">30,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-4.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-5">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-5">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Toyota Hiace
                                                        <br />
                                                        2.2BKS: 80B-4021 của Văn
                                                        <br />
                                                        phòng Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">30,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-5.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-6">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-6">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Hiace 2.5BKS: 80B-
                                                        <br />
                                                        2348 của Văn phòng Trung
                                                        <br />
                                                        ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">30,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-6.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-7">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-7">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Toyota HIACE 2.0
                                                        <br />
                                                        BKS: 80B-4426 của Văn phòng
                                                        <br />
                                                        Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">30,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-7.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="div-col-lg-margin-8">
                                        <div className="div-eg-card">
                                            <div className="div-auction-img-2">
                                                <div className="overlap-group-8">
                                                    <div className="div-auction-timer">
                                                        <div className="heading-2">25/08/2023 09:00:00</div>
                                                    </div>
                                                    <div className="div-author-emo">
                                                        <div className="LOGO-lvauction-png" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="div-auction-content">
                                                <div className="heading-link">
                                                    <p className="text-wrapper-25">
                                                        Xe ô tô hiệu Mitsubishi Pajero
                                                        <br />
                                                        2.5 BKS: 80B - 1894 của Văn
                                                        <br />
                                                        phòng Trung ương Đảng
                                                    </p>
                                                </div>
                                                <div className="gi-kh-i-i-m-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Giá khởi điểm : </span>
                                                        <span className="text-wrapper-27">40,000,000</span>
                                                        <span className="text-wrapper-28"> VNĐ</span>
                                                    </p>
                                                </div>
                                                <div className="tr-ng-th-i-ch-a-u-gi-wrapper">
                                                    <p className="div-3">
                                                        <span className="text-wrapper-26">Trạng thái : </span>
                                                        <span className="text-wrapper-29">Chưa đấu giá</span>
                                                    </p>
                                                </div>
                                                <div className="div-auction-card">
                                                    <div className="link-3">
                                                        <div className="pseudo-6" />
                                                        <div className="pseudo-6" />
                                                        <div className="text-wrapper-3">Chi Tiết</div>
                                                    </div>
                                                    <img
                                                        className="div-share-area"
                                                        alt="Div share area"
                                                        src="https://anima-uploads.s3.amazonaws.com/projects/64e7255b7adc33d128a35726/releases/64e72ae1e1c2a81b98b3cd5d/img/div-share-area-8.svg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="nav-list">
                                <div className="item-link">
                                    <div className="text-wrapper-30">Trước</div>
                                </div>
                                <div className="link-wrapper">
                                    <div className="link-5">
                                        <div className="text-wrapper-31">1</div>
                                    </div>
                                </div>
                                <div className="item-link-2">
                                    <div className="text-wrapper-32">2</div>
                                </div>
                                <div className="item-link-3">
                                    <div className="text-wrapper-32">Tiếp</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
