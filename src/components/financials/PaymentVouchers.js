import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default () => {
    const [receipts, setReceipts] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/paymentvouchers`)
                .then(res => {
                    if (res.data === null) setReceipts(prevReceipts => []);
                    else setReceipts(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    });

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Payment Vouchers</h4>

                {receipts !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Datetime</th>
                                <th>Posting Date</th>
                                <th>From Account</th>
                                <th>User</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((voucher, index) => {
                                return (
                                    <tr key={index}>
                                        <td><Link to={'/financials/payment-voucher/' + voucher.id}>{voucher.id}</Link></td>
                                        <td>{voucher.date_time}</td>
                                        <td>{voucher.posting_date}</td>
                                        <td>{voucher.from_account}</td>
                                        <td>{voucher.user}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};
