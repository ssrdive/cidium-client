import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

import logo from '../../assets/images/logo.png';

export default ({ match }) => {
    const id = match.params.id;

    const [receipts, setReceipts] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/paymentvoucher/${id}`)
                .then(res => {
                    if (res.data === null) setReceipts(prevReceipts => []);
                    else setReceipts(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    let total = 0;

    return (
        <React.Fragment>
            <Row>
                <Col md={4}>
                    <img alt="Agrivest Logo" src={logo} style={{ width: '80px' }} />
                </Col>
                <Col md={4}></Col>
                <Col md={4}>
                    <h3 style={{ paddingBottom: '0', marginBottom: '0' }}>Agrivest Private Limited</h3>
                    <p style={{ padding: '0', margin: '0' }}>Hospital Junction Polonnaruwa</p>
                    <p style={{ padding: '0', margin: '0' }}>info@agrivest.lk &nbsp;&nbsp; 9427 222 22 79</p>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h4>Payment Voucher &mdash; {id}</h4>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    {receipts !== null ? (
                        <>
                            <table>
                                <tr>
                                    <td>Payee :</td>
                                    <td>
                                        <b>M/S {receipts.payee.String}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Payer :</td>
                                    <td>
                                        <b>{receipts.account.String}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Payment Mode :</td>
                                    <td>
                                        <b>{receipts.due_date.Valid ? 'Check' : 'Cash'}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Check Number :</td>
                                    <td>
                                        <b>{receipts.due_date.Valid ? receipts.check_number.String : 'N/A'}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Due Date :</td>
                                    <td>
                                        <b>{receipts.due_date.Valid ? receipts.due_date.String : 'N/A'}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Issued on :</td>
                                    <td>
                                        <b>{receipts.datetime.Valid ? receipts.datetime.String : 'N/A'}</b>
                                    </td>
                                </tr>
                            </table>
                        </>
                    ) : null}
                    <Table>
                        <thead>
                            <tr>
                                <th>Account ID</th>
                                <th>Account Name</th>
                                <th>Posting Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts !== null ? (
                                <>
                                    {receipts.payment_voucher_details.map((voucher, index) => {
                                        total = total + voucher.amount;
                                        return (
                                            <tr key={index}>
                                                <td>{voucher.account_id}</td>
                                                <td>{voucher.account_name}</td>
                                                <td>{voucher.posting_date}</td>
                                                <td>LKR {voucher.amount.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : null}
                            <tr>
                                <td><b>Total</b></td>
                                <td></td>
                                <td></td>
                                <td><b>LKR {total.toLocaleString()}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                    {receipts !== null ? (
                        <>
                            <table>
                                <tr>
                                    <td>Remarks :</td>
                                    <td>
                                        <b>{receipts.remark.String}</b>
                                    </td>
                                </tr>
                            </table>
                        </>
                    ) : null}
                    <Row>
                        <Col md={6}>
                            <br />
                            <br />
                            <br />
                            <p style={{ padding: 0, margin: 0 }}>...................................................</p>
                            <p>Authorized Signature</p>
                        </Col>
                        <Col md={6}>
                            <br />
                            <br />
                            <br />
                            <p style={{ padding: 0, margin: 0 }}>...................................................</p>
                            <p>Received Signature</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    );
};
