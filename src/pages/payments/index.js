import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import ContractDetails from '../../components/contracts/ContractDetails';
import ChargesDebitNote from '../../components/payments/ChargesDebitNote';
import ReceiptForm from '../../components/payments/ReceiptForm';
import SelectContractForm from '../../components/payments/SelectContractForm';

const PaymentsPage = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const urlID = params.get('id');
    const [id, setID] = useState(urlID);
    const [valid, setValid] = useState(false);

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
                    <ContractDetails id={id} setValid={setValid} />
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

export default PaymentsPage;