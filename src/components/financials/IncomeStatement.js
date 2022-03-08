import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import { Card, Label, Row, Col, Form, Button, FormGroup, CardBody } from 'reactstrap';

import { getDate } from '../../helpers/date';

const JournalEntryAudit = ({ history }) => {
    const [form, setForm] = useState({
        start_date: { value: getDate('-') },
        to_date: { value: getDate('-') },
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
                <h4 className="header-title mt-0">Income Statement</h4>
                <Row>
                    <Col>
                        <>
                            <Row>
                                <Col md={12}>
                                    <Form>
                                        <FormGroup>
                                            <Label for="text">From</Label>
                                            <Flatpickr
                                                value={form.start_date.value}
                                                onChange={(e, date) => {
                                                    setDate(date, 'start_date');
                                                }}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="text">To</Label>
                                            <Flatpickr
                                                value={form.to_date.value}
                                                onChange={(e, date) => {
                                                    setDate(date, 'to_date');
                                                }}
                                                className="form-control"
                                            />
                                        </FormGroup>
                                        <Button
                                            color="info"
                                            onClick={() => {
                                                history.push(`/financials/incomestatement?startdate=${form.start_date.value}&enddate=${form.to_date.value}`);
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

export default JournalEntryAudit;