import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default ({ id }) => {
    const [receipts, setReceipts] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/receipts/${id}`)
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
                                        <td>{receipt.amount}</td>
                                        <td>{receipt.notes}</td>
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
