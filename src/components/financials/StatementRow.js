import React from "react";

const StatementRow = ({accountCategory, value, bold}) => {
    let debitAccounts = ['Assets', 'Expenses', 'Cost of Sales'];

    return (
        <>
            {debitAccounts.includes(accountCategory) ? <>
                <td style={{textAlign: "right"}}>
                    {bold ? <>
                        <b>{parseFloat(value.toFixed(2))
                            .toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                    </> : <>
                        {parseFloat(value.toFixed(2))
                            .toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </>}
                </td>
            </> : <>
                <td style={{textAlign: "right"}}>
                    {bold ? <>
                        <b>{parseFloat((value * -1).toFixed(2))
                            .toLocaleString(undefined, {minimumFractionDigits: 2})}</b>
                    </> : <>
                        {parseFloat((value * -1).toFixed(2))
                            .toLocaleString(undefined, {minimumFractionDigits: 2})}
                    </>}
                </td>
            </>}
        </>
    );
}

export default StatementRow;