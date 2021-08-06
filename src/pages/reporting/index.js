import React from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import AchievementSummary from '../../components/reporting/AchievementSummary';
import ReceiptSearch from '../../components/reporting/ReceiptSearch';
import ArrearsAnalysis from '../../components/reporting/ArrearsAnalysis';

export default ({ history }) => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Reporting', path: '/reporting', active: true }]}
                        title={'Reporting'}
                    />
                </Col>
            </Row>

            <Row>
                {/* <Col md={4}></Col> */}
                <Col md={12}>
                    <ArrearsAnalysis />
                </Col>
            </Row>

            <Row>
                <Col md={4}>
                    <Row>
                        <Col md={12}>
                            <ReceiptSearch history={history} />
                        </Col>
                    </Row>
                </Col>

                <Col md={8}>
                    <AchievementSummary />
                </Col>
            </Row>

        </React.Fragment>
    );
};
