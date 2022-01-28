import React, { useState, useEffect } from 'react';
import { Button, Input, Form } from 'reactstrap';
import { apiAuth } from '../../cidium-api';

import FormInput from '../form/FormInput';

const JournalEntryItem = ({ idx, entriesState, handleItemChange, handleItemDelete, setAccount }) => {
    const [models, setModels] = useState([]);

    useEffect(() => {
        apiAuth
            .get('/dropdown/condition/accounts/account/1/1')
            .then(response => {
                setModels(prevModels => {
                    return response.data;
                });
                if (response.data.length > 0) setAccount(idx, response.data[0].id);
            })
            .catch(err => {
                console.log(err);
            });
        // eslint-disable-next-line
    }, []);

    return (
        <Form key={idx} inline>
            <FormInput idx={idx} name="account" type="select" options={models} handleOnChange={handleItemChange} />
            &nbsp;&nbsp;&nbsp;
            <Input
                type="number"
                data-idx={idx}
                name="debit"
                placeholder="Debit"
                value={entriesState[idx].debit}
                onChange={handleItemChange}
            />
            &nbsp;&nbsp;&nbsp;
            <Input
                type="number"
                data-idx={idx}
                name="credit"
                placeholder="Credit"
                value={entriesState[idx].credit}
                onChange={handleItemChange}
            />
            &nbsp;&nbsp;&nbsp;
            <Button color="warning" onClick={handleItemDelete}>
                X
            </Button>
            <br />
            <br />
        </Form>
    );
};

export default JournalEntryItem;