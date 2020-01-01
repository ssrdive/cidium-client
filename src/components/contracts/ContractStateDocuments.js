import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import ContractStateDocument from './ContractStateDocument';

export default ({ documents, loadDocuments }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Documents</h4>
                {documents.map(document => (
                    <Row key={document.document_id}>
                        <Col key={document.document_id} md={12}>
                            <ContractStateDocument
                                key={document.document_id}
                                {...document}
                                reloadDocuments={loadDocuments}
                            />
                            <br />
                        </Col>
                    </Row>
                ))}
            </CardBody>
        </Card>
    );
};