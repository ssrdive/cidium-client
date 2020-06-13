import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default ({ id }) => {
    const [receipts, setReceipts] = useState(null);
    const [floatReceipts, setFloatReceipts] = useState(null);

    useEffect(() => {
        const fetchReceiptDetails = () => {
            apiAuth
                .get(`/contract/receiptsv2/${id}`)
                .then(res => {
                    if (res.data === null) setReceipts(prevReceipts => []);
                    else setReceipts(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        const fetchFloatReceiptDetails = () => {
            apiAuth
                .get(`/contract/receipts/float/${id}`)
                .then(res => {
                    if (res.data === null) setFloatReceipts(prevReceipts => []);
                    else setFloatReceipts(prevReceipts => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchReceiptDetails();
        fetchFloatReceiptDetails();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Receipts</h4>

                {receipts !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {receipts.map((receipt, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{receipt.id}</td>
                                        <td>{receipt.date}</td>
                                        <td>{receipt.type}</td>
                                        <td>{receipt.amount}</td>
                                        <td>{receipt.notes.String}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                        <Spinner type="grow" color="primary" />
                    )}

                <br></br>
                <h4 className="header-title mt-0">Float</h4>

                {floatReceipts !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {floatReceipts.map((floatReceipt, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{floatReceipt.id}</td>
                                        <td>{floatReceipt.datetime}</td>
                                        <td>{floatReceipt.amount}</td>
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
