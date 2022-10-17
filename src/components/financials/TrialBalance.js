import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Card, Label, Row, Col, Form, Button, FormGroup, CardBody } from 'reactstrap';

import { getDate } from '../../helpers/date';

const TrialBalance = ({ history }) => {
    const [form, setForm] = useState({
        posting_date: { value: getDate('-') },
    });

    const setDate = (value, field) => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [field]: { ...prevForm[field] } };
            updatedForm[field].value = value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Trial Balance</h4>
                <Row>
                    <Col>
                        <>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <FormGroup>
                                            <Label for="text">As at</Label>
                                            <Flatpickr
                                                value={form.posting_date.value}
                                                onChange={(e, date) => {
                                                    setDate(date, 'posting_date');
                                                }}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                history.push(`/financials/trial-balance?postingdate=${form.posting_date.value}`);
                                            }}>
                                            View
                                        </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default TrialBalance;