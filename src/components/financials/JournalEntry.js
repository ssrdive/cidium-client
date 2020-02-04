import React from 'react';
import { Card, Button, CardBody } from 'reactstrap';

export default ({ history }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Journal Entry</h4>
                <Button
                    color="info"
                    onClick={() => {
                        history.push('/financials/journal-entry');
                    }}>
                    Enter Journal Entry
                </Button>
            </CardBody>
        </Card>
    );
};
