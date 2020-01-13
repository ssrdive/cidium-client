import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Badge, Col, Card, CardBody, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

export default ({ id }) => {
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            if (id === 0) return;
            apiAuth
                .get(`/contract/details/${id}`)
                .then(res => {
                    setDetails(prevDetails => res.data);
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
                <h4 className="header-title mt-0">Contract Details</h4>

                {details !== null ? (
                    <>
                        <Row>
                            <Col md={12}>
                                <Row>
                                    <Col md={1}>
                                        <h4>
                                            <Link to={`/contracts/details/${details.id}`}>
                                                <b>{details.id}</b>
                                            </Link>
                                        </h4>
                                    </Col>
                                    <Col md={5}>
                                        <h4>{details.customer_name}</h4>
                                    </Col>
                                    <Col md={3}>
                                        <h4>{details.model_name}</h4>
                                    </Col>
                                    <Col md={3}>
                                        <h4>{details.contract_batch}</h4>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    <Col md={6}>
                                        Amount Pending{' '}
                                        <h4>
                                            {details.amount_pending > 0 ? (
                                                <Badge color="danger">{details.amount_pending.toLocaleString()}</Badge>
                                            ) : (
                                                <Badge color="success">{details.amount_pending.toLocaleString()}</Badge>
                                            )}
                                        </h4>
                                    </Col>
                                    <Col md={6}>
                                        Total Payable{' '}
                                        <h4>
                                            <Link to={`/payments?id=${details.id}`}>
                                                {details.total_payable > 0 ? (
                                                    <Badge color="warning">
                                                        {details.total_payable.toLocaleString()}
                                                    </Badge>
                                                ) : (
                                                    <Badge color="success">
                                                        {details.total_payable.toLocaleString()}
                                                    </Badge>
                                                )}
                                            </Link>
                                        </h4>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                State{' '}
                                <h4>
                                    <Link to={`/contracts/work/${details.id}`}>
                                        <Badge color="info">{details.contract_state}</Badge>
                                    </Link>
                                </h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color="primary">Chassis Number</Badge> {details.chassis_number}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer NIC</Badge> {details.customer_nic}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer Address</Badge> {details.customer_address}
                            </Col>
                            <Col>
                                <Badge color="primary">Customer Contact</Badge> {details.customer_contact}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color="primary">Recovery Officer</Badge> {details.recovery_officer}
                            </Col>
                            <Col>
                                <Badge color="primary">Price</Badge> {details.price}
                            </Col>
                        </Row>
                    </>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};
