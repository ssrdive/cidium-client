import React from 'react';
import { Card, Button, CardBody } from 'reactstrap';

export default ({ history }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Account Transaction</h4>
                <Button
                    color="info"
                    onClick={() => {
                        history.push('/financials/journal-entry');
                    }}>
                    Journal Entry
                </Button>
                <br />
                <br />
                <Button
                    color="info"
                    onClick={() => {
                        history.push('/financials/payment-voucher');
                    }}>
                    Payment Voucher
                </Button>
                <br />
                <br />
                <Button
                    color="info"
                    onClick={() => {
                        history.push('/financials/deposit');
                    }}>
                    Deposit
                </Button>
            </CardBody>
        </Card>
    );
};
