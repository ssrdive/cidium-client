import React, { useState } from 'react';
import { Row, Col, Card, CardBody, Form, FormGroup, Button } from 'reactstrap';
import FormInput from '../form/FormInput';

import { NUMBER_INPUT_REQUIRED } from '../../constants/formValues';

const GoToContract = ({ history }) => {
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

    const goToContract = (type) => {
        history.push(`/contracts/${type}/${form.contract.value}`)
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Go to Contract</h4>

                <Row>
                    <Col md={12}>
                        <Form>
                            <FormGroup>
                                <FormInput
                                    {...form['contract']}
                                    name="contract"
                                    placeholder="Contract"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <Button color="success" type="submit" onClick={() => {goToContract("work")}}>
                                Work
                            </Button>&nbsp;&nbsp;
                            <Button color="info" type="submit" onClick={() => {goToContract("details")}}>
                                Details
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
}

export default GoToContract;