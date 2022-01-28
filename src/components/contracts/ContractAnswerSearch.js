import React, { useState, useEffect } from 'react';
import { Row, Form, Button, FormGroup, Col, Card, CardBody, Label } from 'reactstrap';

import FormInput from '../form/FormInput';
import {
    TEXT_INPUT_OPTIONAL,
    DROPDOWN_DEFAULT
} from '../../constants/formValues';
import { loadDropdownGeneric } from '../../helpers/form';

const ContractAnswerSearch = ({ history }) => {
    const [form, setForm] = useState({
        question_id: DROPDOWN_DEFAULT,
        empty_only: { value: 0, type: 'select', options: [{ id: 0, name: 'No' }, { id: 1, name: 'Yes' }] },
        keyword: TEXT_INPUT_OPTIONAL,
    });

    useEffect(() => {
        loadDropdownGeneric('question', 'question_id', setForm);
    }, []);

    const handleFormSubmit = e => {
        e.persist();
        e.preventDefault();
        history.push(`/contracts/csqasearch?question=${form.question_id.value}&empty=${form.empty_only.value}&search=${form.keyword.value}`)
    }

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
                <h4 className="header-title mt-0">CSQA Search</h4>

                <Row>
                    <Col md={12}>
                        <Form onSubmit={handleFormSubmit}>
                            <FormGroup>
                                <FormInput
                                    {...form['question_id']}
                                    name="question_id"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <Label>Empty Only</Label>
                            <FormGroup>
                                <FormInput
                                    {...form['empty_only']}
                                    name="empty_only"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormInput
                                    {...form['keyword']}
                                    name="keyword"
                                    placeholder="Search"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <Button color="primary" type="submit">
                                Search
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </CardBody>
        </Card>
    );
};

export default ContractAnswerSearch;