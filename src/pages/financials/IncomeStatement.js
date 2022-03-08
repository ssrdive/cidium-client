import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import IncomeStatementDetails from '../../components/financials/IncomeStatementDetails';

const IncomeStatementPage = ({ location }) => {
    const params = new URLSearchParams(location.search);
    const startdate = params.get('startdate');
    const enddate = params.get('enddate');

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Income Statement', path: '#', active: true },
                        ]}
                        title={'Income Statement'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <IncomeStatementDetails startdate={startdate} enddate={enddate} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default IncomeStatementPage;