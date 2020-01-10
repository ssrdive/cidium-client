import React, { useState } from 'react';
import qs from 'qs';
import { Row, Col, Form, FormGroup, Label } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { TEXT_INPUT_REQUIRED } from '../../constants/formValues';
import FormInput from '../form/FormInput';
import { getLoggedInUser } from '../../helpers/authUtils';

import SubmitComponent from '../form/SubmitComponent';

export default ({ id, question_id, contract_state_id, answer, question, compulsory, reloadQuestions }) => {
    const [addLoading, setAddLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
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
        setAddLoading(prevLoading => true);
        e.persist();
        e.preventDefault();
        apiAuth
            .post(
                '/contract/answer',
                qs.stringify({
                    contract_state_id: contract_state_id,
                    question_id: question_id,
                    user_id: getLoggedInUser().id,
                    answer: form[question_id].value,
                })
            )
            .then(res => {
                setAddLoading(prevLoading => false);
                reloadQuestions();
            })
            .catch(err => {
                setAddLoading(prevLoading => false);
            });
    };
    const handleDelete = () => {
        setDeleteLoading(prevLoading => true);
        apiAuth
            .post(`/contract/state/delete`, qs.stringify({ id: id.Int32, table: 'contract_state_question_answer' }))
            .then(res => {
                setDeleteLoading(prevLoading => false);
                reloadQuestions();
            })
            .catch(err => {
                setDeleteLoading(prevLoading => false);
                console.log(err);
            });
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
                            <Col md={6}>
                                <b>{answer.String}</b>
                            </Col>
                            <Col md={2}>
                                <SubmitComponent
                                    color="danger"
                                    name="Delete"
                                    loading={deleteLoading}
                                    onClick={handleDelete}
                                />
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
                                    <Col md={4}>
                                        <FormGroup>
                                            <Label for="question">
                                                {compulsory === 1 ? '*' : null} {question}
                                            </Label>
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
                                        <SubmitComponent
                                            color="success"
                                            name="Add"
                                            loading={addLoading}
                                            onClick={handleFormSubmit}
                                        />
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
