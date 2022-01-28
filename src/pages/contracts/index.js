import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import Commitments from '../../components/contracts/Commitments';
import GoToContract from '../../components/contracts/GoToContract';
import ContractSearch from '../../components/contracts/ContractSearch';
import NewContract from '../../components/contracts/NewContract';
import ContractAnswerSearch from '../../components/contracts/ContractAnswerSearch';
import ContractPerformanceReview from '../../components/contracts/ContractPerformanceReview';

const ContractsPage = (props) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Contracts', path: '/contracts', active: true }]}
                        title={'Contracts'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <GoToContract {...props} />
                    <ContractSearch {...props} />
                    <ContractPerformanceReview {...props} />
                    <ContractAnswerSearch {...props} />
                </Col>
                <Col md={8}>
                    <Commitments />
                </Col>
            </Row>

            <Row>
                <Col>
                    <NewContract history={props.history} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ContractsPage;