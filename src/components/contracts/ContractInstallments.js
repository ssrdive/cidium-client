import React, { useState, useEffect } from 'react';
import { Card, Badge, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ContractInstallments = ({ id }) => {
    const [installments, setInstallments] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/installments/${id}`)
                .then(res => {
                    if (res.data === null) setInstallments(prevInstallments => []);
                    else setInstallments(prevInstallments => res.data);
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
                <h4 className="header-title mt-0">Installments</h4>

                {installments !== null ? (
                    <Table className="mb-0" responsive={true} striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Installment</th>
                                <th>Installment Paid</th>
                                <th>Due Date</th>
                                <th>Due In</th>
                            </tr>
                        </thead>
                        <tbody>
                            {installments.map((installment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{installment.id}</td>
                                        <td>{installment.installment_type}</td>
                                        <td>
                                            {installment.installment > installment.installment_paid &&
                                            installment.due_in <= 0 ? (
                                                <Badge color="danger">{installment.installment.toLocaleString()}</Badge>
                                            ) : (
                                                <Badge color="success">
                                                    {installment.installment.toLocaleString()}
                                                </Badge>
                                            )}
                                        </td>
                                        <td>
                                            {installment.installment === installment.installment_paid ? (
                                                <Badge color="success">
                                                    {installment.installment_paid.toLocaleString()}
                                                </Badge>
                                            ) : (
                                                <Badge color="warning">
                                                    {installment.installment_paid.toLocaleString()}
                                                </Badge>
                                            )}
                                        </td>
                                        <td>{installment.due_date}</td>
                                        <td>{installment.due_in}</td>
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

export default ContractInstallments;