import React, { useState } from 'react';
import qs from 'qs';
import { Form, Input, FormGroup } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import { apiAuth } from '../../cidium-api';
import { TEXTAREA_INPUT_REQUIRED, TEXT_INPUT_OPTIONAL } from '../../constants/formValues';

import SubmitComponent from '../form/SubmitComponent';
import { getLoggedInUser } from '../../helpers/authUtils';

export default ({ id, fetchCommitments }) => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        text: TEXTAREA_INPUT_REQUIRED,
        due_date: TEXT_INPUT_OPTIONAL,
    });

    const setInitDate = value => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, due_date: { ...prevForm.due_date } };
            updatedForm.due_date.value = value;
            return updatedForm;
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
    const addCommitment = e => {
        e.persist();
        e.preventDefault();
        setLoading(prevLoading => true);
        apiAuth
            .post(
                `/contract/commitment`,
                qs.stringify({
                    user_id: getLoggedInUser().id,
                    contract_id: id,
                    text: form.text.value,
                    due_date: form.due_date.value,
                })
            )
            .then(res => {
                setLoading(prevLoading => false);
                fetchCommitments();
                console.log(res);
            })
            .catch(err => {
                setLoading(prevLoading => false);
                console.log(err);
            });
    };

    return (
        <>
            <h4 className="header-title mt-0">Add Commitment</h4>

            <Form onSubmit={addCommitment}>
                <FormGroup>
                    <Input type="textarea" name="text" placeholder="Text" onChange={handleOnChange} required></Input>
                </FormGroup>
                <FormGroup>
                    <Flatpickr
                        value={form.due_date.value}
                        onChange={(e, date) => {
                            setInitDate(date);
                        }}
                        placeholder="Due Date"
                        className="form-control"
                    />
                </FormGroup>
                <SubmitComponent loading={loading} onClick={() => {}} name="Add" color="success" />
                &nbsp;
            </Form>
        </>
    );
};