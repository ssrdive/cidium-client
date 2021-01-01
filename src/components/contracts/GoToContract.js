import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button } from 'reactstrap';
import FormInput from '../form/FormInput';

import { NUMBER_INPUT_REQUIRED } from '../../constants/formValues';

export default ({ history }) => {
    const [form, setForm] = useState({
        contract: NUMBER_INPUT_REQUIRED,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/contracts/details/${form.contract.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Go to Contract</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput
                                    {...form['contract']}
                                    name="contract"
                                    placeholder="Contract"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Go
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}