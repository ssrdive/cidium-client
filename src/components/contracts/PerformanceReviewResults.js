import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, Table, Spinner } from 'reactstrap';

const PerformanceReviewResults = ({ results, loading }) => {
    const daysElapsed = (date) => {
        if (date !== "N/A") {
            var msDiff = new Date().getTime() - new Date(date).getTime();
            return Math.floor(msDiff / (1000 * 60 * 60 * 24));
        } else {
            return "N/A";
        }
    }

    return (
        <Card>
            <CardBody>
                <h4 className="header-title mt-0 mb-1">Performance Review</h4>
                <Table className="mb-0" responsive={true} striped>
                    <thead>
                        <tr>
                            <th>Work</th>
                            <th>Details</th>
                            <th>Amount Pending</th>
                            <th>Start Od Index</th>
                            <th>End Od Index</th>
                            <th>Od Index Variation</th>
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
                            let od_index_variance;
                            if (result.start_overdue_index === "N/A" || result.end_overdue_index === "N/A") {
                                od_index_variance = "N/A";
                            } else {
                                od_index_variance = parseFloat(result.end_overdue_index) - parseFloat(result.start_overdue_index);
                                od_index_variance = od_index_variance.toFixed(2);
                            }
                            // eslint-disable-next-line
                            if (od_index_variance !== "N/A" && od_index_variance != 0) {
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
                                        <td>{result.start_overdue_index === 0 ? <><Badge color="success">{result.start_overdue_index}</Badge></> : <>
                                            {result.start_overdue_index <= 1 ? <><Badge color="info">{result.start_overdue_index}</Badge></> : <>{result.start_overdue_index <= 3.0 ? <><Badge color="warning">{result.start_overdue_index}</Badge></> : <>{result.start_overdue_index === "N/A" ? <><Badge color="success">{result.start_overdue_index}</Badge></> : <><Badge color="danger">{result.start_overdue_index}</Badge></>}</>}</>}
                                        </>}</td>
                                        <td>{result.end_overdue_index === 0 ? <><Badge color="success">{result.end_overdue_index}</Badge></> : <>
                                            {result.end_overdue_index <= 1 ? <><Badge color="info">{result.end_overdue_index}</Badge></> : <>{result.end_overdue_index <= 3.0 ? <><Badge color="warning">{result.end_overdue_index}</Badge></> : <>{result.end_overdue_index === "N/A" ? <><Badge color="success">{result.end_overdue_index}</Badge></> : <><Badge color="danger">{result.end_overdue_index}</Badge></>}</>}</>}
                                        </>}</td>
                                        {/* eslint-disable-next-line */}
                                        <td>{od_index_variance == 0 ? <><font color="blue">{od_index_variance}</font></> : <>{od_index_variance > 0 ? <><font color="red">{'+'}{od_index_variance}</font></> : <>{od_index_variance === "N/A" ? <><font color="green">{od_index_variance}</font></> : <><font color="green">{od_index_variance}</font></>}</>}</>}</td>
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
                            }
                            return null;
                        })}
                    </tbody>
                </Table>
                {loading ? <Spinner color="primary" type="grow" /> : null}
            </CardBody>
        </Card>
    );
};

export default PerformanceReviewResults;