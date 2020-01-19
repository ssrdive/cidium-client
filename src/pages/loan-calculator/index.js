import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';

import PageTitle from '../../components/PageTitle';
import CalculationForm from '../../components/loan-calculator/CalculationForm';
import Schedule from '../../components/loan-calculator/Schedule';

export default () => {
    const [schedule, setSchedule] = useState([]);
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[{ label: 'Loan Calculator', path: '/loan-calculator', active: true }]}
                        title={'Loan Calculator'}
                    />
                </Col>
            </Row>

            <Row>
                <Col>
                    <CalculationForm setSchedule={setSchedule} />
                </Col>
            </Row>

            <Row>
                <Col>
                    <Schedule schedule={schedule} />
                </Col>
            </Row>
        </React.Fragment>
    );
};
