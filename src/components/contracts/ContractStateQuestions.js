import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';

import ContractStateQuestion from './ContractStateQuestion';

export default ({ questions, loadQuestions }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Questions</h4>
                {questions.map(question => (
                    <Row key={question.question_id}>
                        <Col key={question.question_id} md={12}>
                            <ContractStateQuestion
                                key={question.question_id}
                                {...question}
                                reloadQuestions={loadQuestions}
                            />
                            <br />
                        </Col>
                    </Row>
                ))}
            </CardBody>
        </Card>
    );
};