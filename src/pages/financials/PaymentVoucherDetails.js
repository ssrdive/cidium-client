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
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col md={6}>
                    <img alt="Agrivest Logo" src={logo} style={{ width: '80px' }} />
                </Col>
                <Col md={6}>
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
                                    <td>Payment Mode :</td>
                                    <td><b>{receipts.due_date.Valid ? 'Check' : 'Cash'}</b></td>
                                </tr>
                                <tr>
                                    <td>Check Number :</td>
                                    <td><b>{receipts.due_date.Valid ? receipts.check_number.String : 'N/A'}</b></td>
                                </tr>
                                <tr>
                                    <td>Due Date :</td>
                                    <td><b>{receipts.due_date.Valid ? receipts.due_date.String : 'N/A'}</b></td>
                                </tr>
                            </table>
                        </>
                    ) : null}
                    <Table>
                        <thead>
                            <tr>
                                <th>Account ID</th>
                                <th>Account Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts !== null ? (
                                <>
                                    {receipts.payment_voucher_details.map((voucher, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{voucher.account_id}</td>
                                                <td>{voucher.account_name}</td>
                                                <td>LKR {voucher.amount.toLocaleString()}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : null}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </React.Fragment>
    );
};
