import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

export default ({ results, loading }) => {
    const daysElapsed = (date) => {
        if(date !== "N/A") {
            var msDiff = new Date().getTime() - new Date(date).getTime();
            return Math.floor(msDiff / (1000 * 60 * 60 * 24));
        } else {
            return "N/A";
        }
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Search Results</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Work</th>
                            <th>Details</th>
                            <th>Amount Pending</th>
                            <th>Od Index</th>
                            <th>Total Payable</th>
                            <th>Total Paid</th>
                            <th>Last Payment Date</th>
                            <th>Recovery Officer</th>
                            <th>State</th>
                            <th>Model</th>
                            <th>Batch</th>
                            <th>Chassis Number</th>
                            <th>Customer Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/contracts/work/${result.id}`}>{result.id}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/contracts/details/${result.id}`}>{result.id}</Link>
                                    </td>
                                    <td>
                                        {result.amount_pending > 0 ? (
                                            <Badge color="danger">{result.amount_pending.toLocaleString()}</Badge>
                                        ) : (
                                            <Badge color="success">{result.amount_pending.toLocaleString()}</Badge>
                                        )}
                                    </td>
                                    <td>{result.overdue_index === 0 ? <><Badge color="success">{result.overdue_index}</Badge></> : <>
                                        {result.overdue_index <= 1 ? <><Badge color="info">{result.overdue_index}</Badge></> : <>{result.overdue_index <= 3.0 ? <><Badge color="warning">{result.overdue_index}</Badge></> : <>{result.overdue_index === "N/A" ? <><Badge color="success">{result.overdue_index}</Badge></> : <><Badge color="danger">{result.overdue_index}</Badge></>}</>}</>}
                                    </>}</td>
                                    <td>
                                        <Link to={`/payments?id=${result.id}`}>
                                            {result.total_payable > 0 ? (
                                                <Badge color="warning">{result.total_payable.toLocaleString()}</Badge>
                                            ) : (
                                                <Badge color="success">{result.total_payable.toLocaleString()}</Badge>
                                            )}
                                        </Link>
                                    </td>
                                    <td>
                                        {result.total_paid > 0 ? (
                                            <Badge color="info">{result.total_paid.toLocaleString()}</Badge>
                                        ) : (
                                            <Badge color="danger">{result.total_paid.toLocaleString()}</Badge>
                                        )}
                                    </td>
                                    <td>{result.last_payment_date} &bull; {daysElapsed(result.last_payment_date) <= 30 ? <><Badge color="info">{daysElapsed(result.last_payment_date)}</Badge></> : <>{daysElapsed(result.last_payment_date) <= 60 ? <><Badge color="warning">{daysElapsed(result.last_payment_date)}</Badge></> : <>{daysElapsed(result.last_payment_date) === "N/A" ? <Badge color="danger">{daysElapsed(result.last_payment_date)}</Badge> : <Badge color="danger">{daysElapsed(result.last_payment_date)}</Badge>}</>}</>}</td>
                                    <td>{result.recovery_officer}</td>
                                    <td>{result.state}</td>
                                    <td>{result.model}</td>
                                    <td>{result.batch}</td>
                                    <td>{result.chassis_number}</td>
                                    <td>{result.customer_name}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};