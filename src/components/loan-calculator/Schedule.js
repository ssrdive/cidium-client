import React from 'react';
import { Table, Card, CardBody } from 'reactstrap';

export default ({ schedule }) => {
    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0">Schedule</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Capital</th>
                            <th>Interest</th>
                            <th>Installment</th>
                            <th>Due Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedule.map((installment, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{installment.capital}</td>
                                <td>{installment.interest}</td>
                                <td>{parseFloat(installment.capital) + parseFloat(installment.interest)}</td>
                                <td>{installment.due_date}</td>
                            </tr>;
                        })}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};