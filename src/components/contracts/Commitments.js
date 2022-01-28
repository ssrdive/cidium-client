import React from 'react';
import { Card, CardBody } from 'reactstrap';

import DashboardCommitments from './DashboardCommitments';

const Commitments = () => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Commitments</h4>
                <DashboardCommitments />
            </CardBody>
        </Card>
    );
};

export default Commitments;