import React, { useState } from 'react';
import qs from 'qs';
import { Row, Col, Form, FormGroup, Label, Spinner, Button } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { TEXT_INPUT_REQUIRED } from '../../constants/formValues';
import FormInput from '../form/FormInput';

export default ({ question_id, contract_state_id, answer, question, compulsory, reloadQuestions }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        [question_id]: TEXT_INPUT_REQUIRED,
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
        setLoading(prevLoading => true);
        e.persist();
        e.preventDefault();
        apiAuth
            .post(
                '/contract/answer',
                qs.stringify({
                    contract_state_id: contract_state_id,
                    question_id: question_id,
                    answer: form[question_id].value,
                })
            )
            .then(res => {
                setLoading(prevLoading => false);
                reloadQuestions();
            })
            .catch(err => {
                setLoading(prevLoading => false);
            });
    };

    const SubmitComponent = () => {
        return (
            <>
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                        <Button size="sm" color="success" type="submit">
                            Add
                    </Button>
                    )}
            </>
        );
    };

    return (
        <>
            {answer.Valid === true ? (
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={4}>
                                <Label for="question">{question}</Label>
                            </Col>
                            <Col md={8}>
                                <b>{answer.String}</b>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            ) : (
                    <>
                        <Row>
                            <Col md={12}>
                                <Form onSubmit={handleFormSubmit}>
                                    <Row>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="question">{compulsory === 1 ? "*" : null} {question}</Label>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <FormInput
                                                    {...form[question_id]}
                                                    name={question_id}
                                                    handleOnChange={handleOnChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={2}>
                                            <SubmitComponent />
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </>
                )}
        </>
    );
};