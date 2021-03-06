import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import PageTitle from '../../components/PageTitle';
import ContractDetails from '../../components/contracts/ContractDetails';
import ChargesDebitNote from '../../components/payments/ChargesDebitNote';
import ReceiptForm from '../../components/payments/ReceiptForm';
import SelectContractForm from '../../components/payments/SelectContractForm';

export default ({ location }) => {
    const params = new URLSearchParams(location.search);
    const urlID = params.get('id');
    const [id, setID] = useState(urlID);
    const [valid, setValid] = useState(false);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (id === 0) return;
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/details/${id}`)
                .then(res => {
                    setDetails(prevDetails => res.data);
                    setValid(true);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Payments', path: '/payments', active: true }]}
                        title={'Payments'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <ContractDetails id={id} />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <SelectContractForm setID={setID} />
                </Col>
                <Col md={4}>
                    <ReceiptForm id={id} valid={valid} />
                </Col>
                <Col md={4}>
                <ChargesDebitNote id={id} valid={valid} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
