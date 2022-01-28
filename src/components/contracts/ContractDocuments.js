import React, { useState, useEffect } from 'react';
import { Card, CardBody, Table, Spinner } from 'reactstrap';

import { apiAuth } from '../../cidium-api';
import SubmitComponent from '../form/SubmitComponent';

const ContractDocuments = ({ id }) => {
    const [documents, setDocuments] = useState(null);

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/documents/${id}`)
                .then(res => {
                    if (res.data === null) setDocuments(prevDocuments => []);
                    else setDocuments(prevDocuments => res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Documents</h4>

                {documents !== null ? (
                    <Table>
                        <thead>
                            <tr>
                                <th>Document</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((document, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{document.document}</td>
                                        <td>
                                            <DownloadDocumet
                                                source={document.source}
                                                s3region={document.s3region}
                                                s3bucket={document.s3bucket}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <Spinner type="grow" color="primary" />
                )}
            </CardBody>
        </Card>
    );
};

const DownloadDocumet = ({ source, s3region, s3bucket }) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = () => {
        setLoading(prevLoading => true);
        apiAuth
            .get(`/contract/document/download?source=${source}&region=${s3region}&bucket=${s3bucket}`, {
                responseType: 'arraybuffer',
            })
            .then(res => {
                const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', `${source.substr(10)}`);
                document.body.appendChild(fileLink);

                fileLink.click();
                setLoading(prevLoading => false);
            })
            .catch(err => {
                console.log(err);
                setLoading(prevLoading => false);
            });
    };

    return <SubmitComponent loading={loading} onClick={handleDownload} name="Download" color="primary" />;
};

export default ContractDocuments;