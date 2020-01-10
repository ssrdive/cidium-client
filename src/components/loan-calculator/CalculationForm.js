import React, { useState } from 'react';
import { Row, Form, Label, FormGroup, Col, Card, CardBody } from 'reactstrap';
import Flatpickr from 'react-flatpickr';


import FormInput from '../../components/form/FormInput';
import SubmitComponent from '../../components/form/SubmitComponent';
import {
    TEXT_INPUT_REQUIRED,
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
        installment_interval: NUMBER_INPUT_REQUIRED,
        method: TEXT_INPUT_REQUIRED,
        initiation_date: { value: getDate('-') },
    });

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        setLoading(prevLoading => true);
        apiAuth
            .get(
                `/contract/calculation/${form.capital.value}/${form.rate.value}/${form.installments.value}/${form.installment_interval.value}/${form.initiation_date.value}/${form.method.value}`
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
                                    <SubmitComponent
                                        loading={loading}
                                        name="Calculate"
                                        color="success"
                                        onChange={() => {}}
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