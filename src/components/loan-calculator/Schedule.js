import React from 'react';
import { Table, Card, CardBody } from 'reactstrap';

const Schedule = ({ schedule }) => {

    let capitalTotal = 0;
    let interestTotal = 0;
    let agreedValue = 0;

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
                            capitalTotal = capitalTotal + installment.capital;
                            interestTotal = interestTotal + installment.interest;
                            agreedValue = agreedValue + installment.capital + installment.interest;
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{parseFloat(installment.capital.toFixed(2)).toLocaleString()}</td>
                                <td>{parseFloat(installment.interest.toFixed(2)).toLocaleString()}</td>
                                <td>{parseFloat((parseFloat(installment.capital) + parseFloat(installment.interest)).toFixed(2)).toLocaleString()}</td>
                                <td>{installment.due_date}</td>
                            </tr>;
                        })}
                        <tr>
                            <td><b>Total</b></td>
                            <td><b>{capitalTotal.toLocaleString()}</b></td>
                            <td><b>{interestTotal.toLocaleString()}</b></td>
                            <td><b>{agreedValue.toLocaleString()}</b></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    );
};

export default Schedule;