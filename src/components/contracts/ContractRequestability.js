import React, { useState } from 'react';
import { Alert, Col, Card, CardBody, Form, FormGroup, Row } from 'reactstrap';

import FormInput from '../form/FormInput';
import { TEXT_INPUT_OPTIONAL, DROPDOWN_DEFAULT } from '../../constants/formValues';

import SubmitComponent from '../form/SubmitComponent';

export default ({ requestability }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        state_id: DROPDOWN_DEFAULT,
        remarks: TEXT_INPUT_OPTIONAL
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const handleFormSubmit = (e) => {
        e.persist();
        e.preventDefault();
        setLoading(true);
    }

    const RequestForm = requestability.transitionalble !== null ? (
        requestability.transitionalble === true ? (
            <>
                <Row>
                    <Col md={12}>
                        <Alert color="success">All required answers and documents are complete</Alert>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput
                                    {...form['state_id']}
                                    name="state_id"
                                    options={requestability.states}
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormInput
                                    {...form['remarks']}
                                    name="remarks"
                                    placeholder="Remarks"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <SubmitComponent loading={loading} name="Request" color="success" />
                        </Form>
                    </Col>
                </Row>
            </>
        ) : (
                <Alert color="warning">Required answers and documents are not complete</Alert>
            )
    ) : (null);
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Requestability</h4>

                {RequestForm}
            </CardBody>
        </Card>
    );
}