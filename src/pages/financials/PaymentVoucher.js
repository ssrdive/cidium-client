import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Row, Col, Card, CardBody, Button, Label, FormGroup, Spinner, UncontrolledAlert } from 'reactstrap';
import Flatpickr from 'react-flatpickr';

import FormInput from '../../components/form/FormInput';

import PageTitle from '../../components/PageTitle';
import Entry from '../../components/financials/PaymentVoucherItem';
import { getLoggedInUser } from '../../helpers/authUtils';
import { getDate } from '../../helpers/date';
import {
    TEXTAREA_INPUT_REQUIRED,
    DROPDOWN_DEFAULT,
    NUMBER_INPUT_REQUIRED,
    TEXT_INPUT_OPTIONAL,
    TEXT_INPUT_REQUIRED,
} from '../../constants/formValues';
import { apiAuth } from '../../cidium-api';
import { loadDropdownAccountGeneric } from '../../helpers/form';

export default props => {
    const [loading, setLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({ status: null, message: '' });
    const [form, setForm] = useState({
        from_account: DROPDOWN_DEFAULT,
        amount: NUMBER_INPUT_REQUIRED,
        remarks: TEXTAREA_INPUT_REQUIRED,
        posting_date: { value: getDate('-') },
        due_date: TEXT_INPUT_OPTIONAL,
        check_number: TEXT_INPUT_OPTIONAL,
        payee: TEXT_INPUT_REQUIRED,
    });
    const blankEntry = { account: 0, amount: '' };
    const [entriesState, setEntriesState] = useState([blankEntry]);

    useEffect(() => {
        loadDropdownAccountGeneric('account', 'from_account', 1, 1, setForm);
    }, []);

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.value;
            return updatedForm;
        });
    };
    const handleItemChange = e => {
        const updatedEntries = [...entriesState];
        updatedEntries[e.target.dataset.idx][e.target.name] = e.target.value;
        setEntriesState(updatedEntries);
    };
    const handleItemDelete = (e, idx) => {
        e.preventDefault();
        const updatedEntries = [...entriesState];
        updatedEntries.splice(idx, 1);
        setEntriesState(updatedEntries);
    };
    const setAccount = (idx, account) => {
        const updatedEntries = [...entriesState];
        updatedEntries[idx].account = account;
        setEntriesState(updatedEntries);
    };
    const addEntry = () => {
        setEntriesState([...entriesState, { ...blankEntry }]);
    };
    const setDueDate = value => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, due_date: { ...prevForm.posting_date } };
            updatedForm.due_date.value = value;
            return updatedForm;
        });
    };
    const setPostingDate = value => {
        setForm(prevForm => {
            const updatedForm = { ...prevForm, posting_date: { ...prevForm.posting_date } };
            updatedForm.posting_date.value = value;
            return updatedForm;
        });
    };
    const submitFormHandler = e => {
        e.persist();
        e.preventDefault();
        setLoading(prevLoading => true);
        setSubmitStatus({ status: null, message: '' });
        if (!form.amount.value || !form.remarks.value) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Form validation errors' });
            return;
        }
        let amounts = 0;
        let formIsValid = true;
        entriesState.forEach(entry => {
            if (entry.amount) amounts = amounts + parseFloat(entry.amount);
            else formIsValid = false;
        });
        if (amounts !== parseFloat(form.amount.value) || !formIsValid || amounts === 0) {
            setLoading(prevLoading => false);
            setSubmitStatus({ status: 'failure', message: 'Form validation errors' });
            return;
        }
        apiAuth
            .post(
                '/account/paymentvoucher',
                qs.stringify({
                    remark: form.remarks.value,
                    entries: JSON.stringify(entriesState),
                    from_account_id: form.from_account.value,
                    amount: form.amount.value,
                    posting_date: form.posting_date.value,
                    due_date: form.due_date.value,
                    check_number: form.check_number.value,
                    payee: form.payee.value,
                    user_id: getLoggedInUser().id,
                })
            )
            .then(response => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'success', message: `Entries issued` });
            })
            .catch(err => {
                setLoading(prevLoading => false);
                setSubmitStatus({ status: 'failure', message: 'Something went wrong' });
            });
    };
    const SubmitComponent = () => {
        return (
            <>
                {submitStatus.status !== null ? (
                    submitStatus.status === 'success' ? (
                        <UncontrolledAlert color="success">{submitStatus.message}</UncontrolledAlert>
                    ) : (
                        <UncontrolledAlert color="warning">{submitStatus.message}</UncontrolledAlert>
                    )
                ) : null}
                {loading ? (
                    <Spinner className="m-2" type="grow" color="success" />
                ) : (
                    <Button color="success" type="submit" onClick={submitFormHandler}>
                        Add Entries
                    </Button>
                )}
            </>
        );
    };

    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Financials', path: '/financials' },
                            { label: 'Payment Voucher', path: '#', active: true },
                        ]}
                        title={'Payment Voucher'}
                    />
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card>
                        <CardBody>
                            <h4 className="header-title mt-0">Payment Voucher</h4>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="text">From Account</Label>
                                        <FormInput
                                            {...form['from_account']}
                                            name="from_account"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Posting Date</Label>
                                        <Flatpickr
                                            value={form.posting_date.value}
                                            onChange={(e, date) => {
                                                setPostingDate(date);
                                            }}
                                            className="form-control"
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Due Date</Label>
                                        <Flatpickr
                                            placeholder="Due Date"
                                            onChange={(e, date) => {
                                                setDueDate(date);
                                            }}
                                            className="form-control"
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="text">Check Number</Label>
                                        <FormInput
                                            {...form['check_number']}
                                            name="check_number"
                                            placeholder="Check Number"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Payee</Label>
                                        <FormInput
                                            {...form['payee']}
                                            name="payee"
                                            placeholder="Payee"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="text">Amount</Label>
                                        <FormInput
                                            {...form['amount']}
                                            name="amount"
                                            placeholder="Amount"
                                            handleOnChange={handleOnChange}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>

                            <Button color="info" onClick={addEntry}>
                                Add
                            </Button>
                            <br />
                            <br />
                            {entriesState.map((val, idx) => {
                                return (
                                    <div key={idx} xs={12} sm={12} md={12}>
                                        <Entry
                                            idx={idx}
                                            entriesState={entriesState}
                                            handleItemChange={handleItemChange}
                                            handleItemDelete={e => handleItemDelete(e, idx)}
                                            setAccount={setAccount}
                                        />
                                    </div>
                                );
                            })}
                            <br />
                            <FormGroup>
                                <FormInput
                                    {...form['remarks']}
                                    name="remarks"
                                    placeholder="Remarks"
                                    handleOnChange={handleOnChange}
                                />
                            </FormGroup>
                            <SubmitComponent />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};
