import React, { useState } from 'react';
import { Row, Form, Label, FormGroup, Col, Card, CardBody } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import FormInput from '../form/FormInput';
import SubmitComponent from '../form/SubmitComponent';
import {
    NUMBER_INPUT_REQUIRED,
} from '../../constants/formValues';
import { getDate } from '../../helpers/date';
import { apiAuth } from '../../cidium-api';

export default ({ setSchedule }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        capital: NUMBER_INPUT_REQUIRED,
        rate: NUMBER_INPUT_REQUIRED,
        installments: NUMBER_INPUT_REQUIRED,
        installment_interval: { value: '6', type: 'select', options: [{ id: '6', name: '6 - Biannual' }, { id: '1', name: '1 - Monthly' }] },
        method: { value: 'R2', type: 'select', options: [{ id: 'R2', name: 'R2 - IRR Reducing' }, { id: 'IRR', name: 'IRR - IRR Straight Line' }, { id: 'R', name: 'R - Reducing [LEGACY - DO NOT USE]' }, { id: 'S', name: 'S - Straight Line [LEGACY - DO NOT USE]' }] },
        initiation_date: { value: getDate('-') },
        structured_monthly_rental: { value: 0, type: 'number', required: true },
    });

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        setLoading(prevLoading => true);
        apiAuth
            .get(
                `/contract/calculation/${form.capital.value}/${form.rate.value}/${form.installments.value}/${form.installment_interval.value}/${form.initiation_date.value}/${form.method.value}/${form.structured_monthly_rental.value}`
            )
            .then(res => {
                setLoading(prevLoading => false);
                setSchedule(prevSchedule => res.data);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    };
    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const setInitDate = value => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, initiation_date: { ...prevForm.initiation_date } };
            updatedForm.initiation_date.value = value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Loan Details</h4>
                <Row>
                    <Col lg={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <Row>
                                <Col lg={4}>
                                    <Label for="text">Capital</Label>
                                    <FormGroup>
                                        <FormInput
                                            {...form['capital']}
                                            name="capital"
                                            placeholder="Capital"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Label for="text">Installment Interval</Label>
                                    <FormGroup>
                                        <FormInput
                                            {...form['installment_interval']}
                                            name="installment_interval"
                                            placeholder="Installment Interval"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <Label for="text">Rate</Label>
                                        <FormInput
                                            {...form['rate']}
                                            name="rate"
                                            placeholder="Rate"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <Label for="text">Initiation Date</Label>
                                    <Flatpickr
                                        value={form.initiation_date.value}
                                        onChange={(e, date) => {
                                            setInitDate(date);
                                        }}
                                        className="form-control"
                                    />
                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <Label for="text">Installments</Label>
                                        <FormInput
                                            {...form['installments']}
                                            name="installments"
                                            placeholder="Installments"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Interest Method</Label>
                                        <FormInput
                                            {...form['method']}
                                            name="method"
                                            placeholder="Interest Method"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>

                                </Col>
                                <Col lg={4}>
                                    <FormGroup>
                                        <Label for="text">Structured Monthly Rental</Label>
                                        <FormInput
                                            {...form['structured_monthly_rental']}
                                            name="structured_monthly_rental"
                                            placeholder="Structured Monthly Rental"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <SubmitComponent
                                        loading={loading}
                                        name="Calculate"
                                        color="success"
                                        onChange={() => { }}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};