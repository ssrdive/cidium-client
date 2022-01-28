import React, { useState } from 'react';
import qs from 'qs';
import { Row, Badge, Col, Form, FormGroup, Label } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import { FILE_INPUT_REQUIRED } from '../../constants/formValues';
import { FileInput } from '../form/FormInput';
import { getLoggedInUser } from '../../helpers/authUtils';

import SubmitComponent from '../form/SubmitComponent';

const ContractStateDocument = ({
    id,
    document_id,
    contract_state_id,
    source,
    s3region,
    s3bucket,
    document_name,
    compulsory,
    reloadDocuments,
}) => {
    const [downloadLoading, setDownloadLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [form, setForm] = useState({
        [document_id]: FILE_INPUT_REQUIRED,
    });

    const handleOnChange = e => {
        e.persist();
        setForm(prevForm => {
            const updatedForm = { ...prevForm, [e.target.name]: { ...prevForm[e.target.name] } };
            updatedForm[e.target.name].value = e.target.files[0];
            return updatedForm;
        });
    };
    const handleFormSubmit = e => {
        setDownloadLoading(prevLoading => true);
        e.persist();
        e.preventDefault();
        const data = new FormData();
        data.append('contract_state_id', contract_state_id);
        data.append('document_id', document_id);
        data.append('user_id', getLoggedInUser().id);
        data.append('source', form[document_id].value);
        apiAuth
            .post('/contract/document', data)
            .then(res => {
                setDownloadLoading(prevLoading => false);
                reloadDocuments();
            })
            .catch(err => {
                setDownloadLoading(prevLoading => false);
            });
    };
    const handleDownload = () => {
        setDownloadLoading(prevLoading => true);
        apiAuth
            .get(
                `/contract/document/download?source=${source.String}&region=${s3region.String}&bucket=${s3bucket.String}`,
                { responseType: 'arraybuffer' }
            )
            .then(res => {
                const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${source.String.substr(10)}`);
                document.body.appendChild(fileLink);

                fileLink.click();
                setDownloadLoading(prevLoading => false);
            })
            .catch(err => {
                setDownloadLoading(prevLoading => false);
                console.log(err);
            });
    };
    const handleDelete = () => {
        setDeleteLoading(prevLoading => true);
        apiAuth
            .post(`/contract/state/delete`, qs.stringify({ id: id.Int32, table: 'contract_state_document' }))
            .then(res => {
                setDeleteLoading(prevLoading => false);
                reloadDocuments();
            })
            .catch(err => {
                setDeleteLoading(prevLoading => false);
                console.log(err);
            });
    };

    return (
        <>
            {source.Valid === true ? (
                <Row>
                    <Col md={12}>
                        <Row>
                            <Col md={6}>
                                <Label for="question">{document_name}</Label>
                            </Col>
                            <Col md={2}>
                                <Badge color="success">
                                    {source.String.substr(source.String.lastIndexOf('.') + 1).toUpperCase()}
                                </Badge>
                            </Col>
                            <Col md={2}>
                                <SubmitComponent
                                    loading={downloadLoading}
                                    onClick={handleDownload}
                                    name="Download"
                                    color="primary"
                                />
                            </Col>
                            <Col md={2}>
                                <SubmitComponent
                                    loading={deleteLoading}
                                    onClick={handleDelete}
                                    name="Delete"
                                    color="danger"
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
                                            <Label for="document">
                                                {compulsory === 1 ? '*' : null} {document_name}
                                            </Label>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <FileInput
                                                {...form[document_id]}
                                                name={document_id}
                                                handleOnChange={handleOnChange}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={2}>
                                        <SubmitComponent
                                            onClick={() => {}}
                                            loading={downloadLoading}
                                            color="success"
                                            name="Add"
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

export default ContractStateDocument;