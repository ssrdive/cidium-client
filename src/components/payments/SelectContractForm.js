import React, { useState } from 'react';
import { Card, Row, Col, Form, Button, FormGroup, CardBody } from 'reactstrap';

import FormInput from '../form/FormInput';
import { NUMBER_INPUT_REQUIRED } from '../../constants/formValues';

export default ({ setID }) => {
    const [form, setForm] = useState({
        id: NUMBER_INPUT_REQUIRED,
    });

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        setID(prevID => form.id.value);
    };
    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Contract ID</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput {...form['id']} name="id" placeholder="ID" handleOnChange={handleOnChange} />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Select
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};