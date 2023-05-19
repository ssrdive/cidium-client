import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Badge, Col, Card, CardBody, Spinner, CustomInput } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

const ContractDetails = ({ id, setValid }) => {
    const [details, setDetails] = useState(null);
    const [financials, setFinancials] = useState(null);
    const [displayFinancials, setDisplayFinancials] = useState("none");

    useEffect(() => {
        const fetchDetails = () => {
            if (id === 0) return;
            apiAuth
                .get(`/contract/details/${id}`)
                .then(res => {
                    setValid(true);
                    setDetails(prevDetails => res.data);
                })
                .catch(err => {
                    setValid(false);
                    setDetails(prevDetails => false);
                    console.log(err);
                });
        };
        const fetchFinancials = () => {
            if (id === 0) return;
            apiAuth
                .get(`/contract/detailfinancial/${id}`)
                .then(res => {
                    setFinancials(prevDetails => res.data);
                })
                .catch(err => {
                    setFinancials(prevDetails => false);
                    console.log(err);
                });
        };
        fetchDetails();
        fetchFinancials();
    }, [id, setValid]);

    return (
        // eslint-disable-next-line
        <Card style={{backgroundColor: (details !== null && details !== false && details.amount_pending == details.total_payable && details.amount_pending !== 0 && parseFloat(details.overdue_index) !== 0) ? '#f7aba6' : ''}}>
            <CardBody>
                <h4 className="header-title mt-0">Financials</h4>
                <CustomInput type="checkbox" id="exampleCustomCheckbox" label="Hide" defaultChecked="true" onChange={e => {
                    setDisplayFinancials(prevVal => prevVal === "none" ? "block" : "none")
                }} />
                <br></br>
                <div style={{ display: displayFinancials }}>
                    {financials !== null ? (
                        financials !== false ? (<>
                            <>
                            {financials.lkas_17 ? (
                                <>
                                    <Row>
                                        <Col>
                                            Active{' '}
                                            <h4>
                                                {/* eslint-disable-next-line */}
                                                {financials.active == 1 ? (<Badge color="success">Yes</Badge>) : (<><Badge color="warning">No</Badge></>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            Recovery Status{' '}
                                            <h4>
                                                {/* eslint-disable-next-line */}
                                                {financials.recovery_status == "Active" ? (<Badge color="success">{financials.recovery_status}</Badge>) : (<><Badge color="danger">{financials.recovery_status}</Badge></>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            Doubtful{' '}
                                            <h4>
                                                {/* eslint-disable-next-line */}
                                                {financials.doubtful == 1 ? (<Badge color="danger">Yes</Badge>) : (<><Badge color="success">No</Badge></>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            IRR Payment{' '}
                                            <h4>
                                                {financials.payment.toLocaleString()}
                                            </h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            Contract Arrears{' '}
                                            <h4>
                                                {financials.contract_arrears > 0 ? (<Badge color="danger">{financials.contract_arrears.toLocaleString()}</Badge>) : (<Badge color="success">{financials.contract_arrears.toLocaleString()}</Badge>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            Charges / Debits Arrears{' '}
                                            <h4>
                                                {financials.charges_debits_arrears > 0 ? (<Badge color="danger">{financials.charges_debits_arrears.toLocaleString()}</Badge>) : (<Badge color="success">{financials.charges_debits_arrears.toLocaleString()}</Badge>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            Overdue Index{' '}
                                            <h4>
                                                {financials.overdue_index > 0 ? (<Badge color="danger">{financials.overdue_index}</Badge>) : (<Badge color="success">{financials.overdue_index}</Badge>)}
                                            </h4>
                                        </Col>
                                        <Col>
                                            Capital Provisioned{' '}
                                            <h4>
                                                {financials.capital_provisioned > 0 ? (<Badge color="danger">{financials.capital_provisioned.toLocaleString()}</Badge>) : (<Badge color="success">{financials.capital_provisioned.toLocaleString()}</Badge>)}
                                            </h4>
                                        </Col>
                                    </Row>
                                </>
                            ) : (<p>This contract is not LKAS 17 compliant</p>)}
                        </>
                        </>) : (<><p>Contract not found</p></>)
                    ) : (
                            <Spinner type="grow" color="primary" />
                        )}
                    <hr color="#a3b8cf" />
                </div>
                <h4 className="header-title mt-0">Contract Details</h4>

                {details !== null ? (
                    details !== false ? (<>
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
                                    <Col md={6}>
                                        <h4>{details.model_name} (<b>{details.contract_batch}</b>)</h4>
                                    </Col>
                                    {/*<Col md={3}>*/}
                                    {/*    <h4>}</h4>*/}
                                    {/*</Col>*/}
                                </Row>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    <Col>
                                        Amount Pending{' '}
                                        <h4>
                                            {details.amount_pending > 0 ? (
                                                <Badge color="danger">{details.amount_pending.toLocaleString()}</Badge>
                                            ) : (
                                                    <Badge color="success">{details.amount_pending.toLocaleString()}</Badge>
                                                )}
                                        </h4>
                                    </Col>
                                    <Col>
                                        Hold Default
                                        <h4>
                                            {details.hold_default == 1 ? (
                                                <Badge color="danger">YES</Badge>
                                            ) : (
                                                <>{'NO'}</>
                                            )}
                                        </h4>
                                    </Col>
                                    <Col>
                                        Default Charges
                                        <h4>
                                            {details.default_charges > 0 ? (
                                                <Badge color="danger">{details.default_charges.toLocaleString()}</Badge>
                                            ) : (
                                                <Badge color="success">{details.default_charges.toLocaleString()}</Badge>
                                            )}
                                        </h4>
                                    </Col>
                                    <Col>
                                        Od Index{' '}
                                        <h4>
                                            {details.overdue_index === 0 ? <><Badge color="success">{details.overdue_index}</Badge></> : <>
                                                {details.overdue_index <= 1 ? <><Badge color="info">{details.overdue_index}</Badge></> : <>{details.overdue_index <= 3.0 ? <><Badge color="warning">{details.overdue_index}</Badge></> : <>{details.overdue_index === "N/A" ? <><Badge color="success">{details.overdue_index}</Badge></> : <><Badge color="danger">{details.overdue_index}</Badge></>}</>}</>}
                                            </>}
                                        </h4>
                                    </Col>
                                    <Col>
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
                                    <Col>
                                        Total Paid{' '}
                                        <h4>
                                            {details.total_paid > 0 ? (
                                                <Badge color="info">{details.total_paid.toLocaleString()}</Badge>
                                            ) : (
                                                    <Badge color="danger">{details.total_paid.toLocaleString()}</Badge>
                                                )}
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
                                <Badge color="primary">Introducing Officer</Badge> {details.introducing_officer}
                            </Col>
                            <Col>
                                <Badge color="primary">Credit Officer</Badge> {details.credit_officer}
                            </Col>
                            <Col>
                                <Badge color="primary">Recovery Officer</Badge> {details.recovery_officer}
                            </Col>
                            <Col>
                                <Badge color="primary">Price</Badge> {details.price}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Badge color="primary">Liaison Name</Badge> {details.liaison_name.String}
                            </Col>
                            <Col>
                                <Badge color="primary">Liaison Contact</Badge> {details.liaison_contact.String}
                            </Col>
                            <Col>
                                <Badge color="primary">Downpayment</Badge> {details.downpayment.Int32}
                            </Col>
                            <Col>
                            
                            </Col>
                        </Row>
                    </>
                    </>) : (<p>Contract not found</p>)
                ) : (
                        <Spinner type="grow" color="primary" />
                    )}
            </CardBody>
        </Card>
    );
};

export default ContractDetails;