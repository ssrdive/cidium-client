import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'reactstrap';

import { apiAuth } from '../../cidium-api';

import logo from '../../assets/images/logo.png';

const PaymentVoucherDetailsPage = ({ match }) => {
    const id = match.params.id;

    const [details, setDetails] = useState({});

    const numbersToWords = {
        0: "zero",
        1: "one",
        2: "two",
        3: "three",
        4: "four",
        5: "five",
        6: "six",
        7: "seven",
        8: "eight",
        9: "nine",
        10: "ten",
        11: "eleven",
        12: "twelve",
        13: "thirteen",
        14: "fourteen",
        15: "fifteen",
        16: "sixteen",
        17: "seventeen",
        18: "eighteen",
        19: "nineteen",
        20: "twenty",
        30: "thirty",
        40: "forty",
        50: "fifty",
        60: "sixty",
        70: "seventy",
        80: "eighty",
        90: "ninety",
    };

    const convertNumberToWords = (number) => {
        //Validates the number input and makes it a string
        if (typeof number === 'string') {
            number = parseInt(number, 10);
        }
        if (typeof number === 'number' && isFinite(number)) {
            number = number.toString(10);
        } else {
            return 'This is not a valid number';
        }

        //Creates an array with the number's digits and
        //adds the necessary amount of 0 to make it fully
        //divisible by 3
        var digits = number.split('');
        while (digits.length % 3 !== 0) {
            digits.unshift('0');
        }

        //Groups the digits in groups of three
        var digitsGroup = [];
        var numberOfGroups = digits.length / 3;
        for (var i = 0; i < numberOfGroups; i++) {
            digitsGroup[i] = digits.splice(0, 3);
        }

        //Change the group's numerical values to text
        var digitsGroupLen = digitsGroup.length;
        var numTxt = [
            [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'], //hundreds
            [null, 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'], //tens
            [null, 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] //ones
        ];
        var tenthsDifferent = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];

        // j maps the groups in the digitsGroup
        // k maps the element's position in the group to the numTxt equivalent
        // k values: 0 = hundreds, 1 = tens, 2 = ones
        for (var j = 0; j < digitsGroupLen; j++) {
            for (var k = 0; k < 3; k++) {
                var currentValue = digitsGroup[j][k];
                digitsGroup[j][k] = numTxt[k][currentValue];
                if (k === 0 && currentValue !== '0') { // !==0 avoids creating a string "null hundred"
                    digitsGroup[j][k] += ' hundred ';
                } else if (k === 1 && currentValue === '1') { //Changes the value in the tens place and erases the value in the ones place
                    digitsGroup[j][k] = tenthsDifferent[digitsGroup[j][2]];
                    digitsGroup[j][2] = 0; //Sets to null. Because it sets the next k to be evaluated, setting this to null doesn't work.
                }
            }
        }

        //Adds '-' for gramar, cleans all null values, joins the group's elements into a string
        for (var l = 0; l < digitsGroupLen; l++) {
            if (digitsGroup[l][1] && digitsGroup[l][2]) {
                digitsGroup[l][1] += '-';
            }
            digitsGroup[l].filter(function (e) {return e !== null});
            digitsGroup[l] = digitsGroup[l].join('');
        }

        //Adds thousand, millions, billion and etc to the respective string.
        var posfix = [null, 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion'];
        if (digitsGroupLen > 1) {
            var posfixRange = posfix.splice(0, digitsGroupLen).reverse();
            for (var m = 0; m < digitsGroupLen - 1; m++) { //'-1' prevents adding a null posfix to the last group
                if (digitsGroup[m]) {
                    digitsGroup[m] += ' ' + posfixRange[m];
                }
            }
        }

        //Joins all the string into one and returns it
        return digitsGroup.join(' ');
    }

    useEffect(() => {
        const fetchDetails = () => {
            apiAuth
                .get(`/contract/microloandetails/${id}`)
                .then(res => {
                    if (res.data === null) setDetails(prevReceipts => []);
                    else setDetails(prevReceipts => {
                        let detailsDict = {}
                        for (let i = 0; i < res.data.length; ++i) {
                            detailsDict[res.data[i].question] = res.data[i].answer
                        }
                        return detailsDict
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        };
        fetchDetails();
    }, [id]);

    let total = 0;

    return (
        <React.Fragment>
            <Row>
                <Col md={12}><h3 style={{textAlign: "center"}}>LOAN AGREEMENT <b>{id}</b></h3></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        AGRIVEST (PRIVATE) LIMITED bearing Registration No. PV00218702 a company duly incorporated in Sri Lanka and having its registered office at No 67A, Sirisanbago Place, Polonnaruwa in the Democratic Socialist Republic of Sri Lanka (hereinafter called and referred as the Company which term or expression as-herein-used shall- where the context-so requires-or-admits-mean and include the said AGRIVEST (PRIVATE) LIMITED Its successors in office and assigns ) of the PART OF THE FIRST PART.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "center"}}>
                        AND
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        {details["Debtor Salutation"]}. <b>{details["Debtor Full Name"]}</b> (Holder of National Identity Card No <b>{details["Debtor NIC"]}</b>) of <b>{details["Debtor Address"]}</b> in the Democratic Socialist Republic of Sri Lanka. ( hereinafter called and referred to as the Debtor which term or expression as herein used shall where the context so requires or admits mean and include the said MR. <b>{details["Debtor Full Name"]}</b> his / her / its heirs executors, administrators, grantees as the PARTY OF THE SECOND PART.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "center"}}>
                        AND
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        {details["Joint Borrower Salutation"]}. <b>{details["Joint Borrower Full Name"]}</b> (Holder of National Identity Card No <b>{details["Joint Borrower NIC"]}</b>) of <b>{details["Joint Borrower Address"]}</b> in the Democratic Socialist Republic of Sri Lanka, ( hereinafter called and referred to as the Join Borrower. which term or expression as herein used shall where the context so requires or admits mean and include the said MR. <b>{details["Joint Borrower Full Name"]}</b> his / her / its heirs executors, administrators, grantees as the PARTY OF THE THIRD PART.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "center"}}>
                        AND
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        {details["First Guarantor Salutation"]}. <b>{details["First Guarantor Full Name"]}</b>, (Holder of National Identity Card No <b>{details["First Guarantor NIC"]}</b>) of <b>{details["First Guarantor Address"]}</b> in the Democratic Socialist Republic of Sri Lanka, (hereinafter called and referred to as the 1st Guarantor. which term or expression as herein used shall where the context so requires or admits mean and include the said MR. <b>{details["First Guarantor Full Name"]}</b> his / her heirs executors, administrators, grantees as the PARTY OF THE FORTH PART.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "center"}}>
                        AND
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        {details["Second Guarantor Salutation"]}. <b>{details["Second Guarantor Full Name"]}</b>, (Holder of National Identity Card No <b>{details["Second Guarantor NIC"]}</b>) of <b>{details["Second Guarantor Address"]}</b> in the Democratic Socialist Republic of Sri Lanka, (hereinafter called and referred to as the 2nd Guarantor. which term or expression as herein used shall where the context so requires or admits mean and include the said MR <b>{details["Second Guarantor Full Name"]}</b> his / her heirs executors. administrators, grantees as the PARTY OF THE FIFTH PART bind among themselves into a loan agreement on this <b>{details["Initiation Date"]}</b>
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        {details["Debtor Salutation"]}. <b>{details["Debtor Full Name"]}</b> being the Debtor has requested of Loan of <b>{convertNumberToWords(details["Capital"]).toUpperCase()}</b> rupees and zero cents from the Party of the First Part and the Party of the First Part which is the Company, has agreed to grant this request under the terms and conditions detained fully hereinafter and under the Guarantee detailed hereinafter.
                    </p>
                    <p>
                        Therefore the parties mentioned this agreement have mutually agreed on this, under the terms and condition mentioned below.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        01. The Company agrees to grant this loan of <b>{convertNumberToWords(details["Capital"]).toUpperCase()}</b> rupees and zero cents Rs <b>{parseFloat(details["Capital"]).toLocaleString()}.00</b> ) to the Debtor and under this legal document, the Debtor agrees to pay to the Company abovementioned capital amount and the accrued interest thereon as detailed below. (the receipt whereof the debtor doth hereby admit and acknowledge) par the schedule hereto.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        02. The Debtor agrees promises and accepts to repay the said loan and interest thereon in Weekly installments as per the Schedule hereof. The Debtor should pay to the Company the installments, every Weekly regularly commencing from <b>{details["Initiation Date"]}</b> on the day the center is held or on the previous day as per the schedule hereto.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        03. If the Debtor fails to pay the said Weekly installment during the period the agreement is operative, as per the schedule hereto a 5% per month of an additional interest should be paid to the Company as a default interest for default of installments.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        04. If there is any payment, such as Weekly installments, overdue interest or any other payment due to be paid by the Debtor, it should either be paid to the Head Office of the Company or to any other address as informed in writing. by the Company
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        05. The Debtor should undertake to pay all dues, such as registration fee, tax insurance premium, penalty payments etc to relevant local government institution, as levied by them.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        06. If the Debtor contravenes the terms and the conditions in the agreement, the Company will abrogate the agreement, after giving not less than seven (07) days written notice.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        07. After the abrogation of the agreement by the Company, that way, the Debtor should pay all payments due, inclusive of the interest, penalties etc, within 14 days from the date of abrogation of the agreement.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        08. The Debtor and the Guarantors have agreed to act in the following manner with regard to the said Loan.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 35mm"}}>
                        A. The said Debtor and his/her/their Guarantors should sign a promissory note promising and accepting to repay the amount, interest and the defaulted interest, if any and hand it over to the Company.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 35mm"}}>
                        B. In order to give effect to the guarantee hereby given the Guarantors hereby expressly declares and agrees with the Company :-
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 45mm"}}>
                        i. that the Company shall be at liberty either in one action to sue the debtor and the Guarantors jointly and severally or to proceed against the debtor in the First instance
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 45mm"}}>
                        ii. to renounce the rights to claim that-the Guarantors should be excused and the debtor should be proceeded against by action in the first instance.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 45mm"}}>
                        iii. that the Guarantors will be liable in all respects as principle debtor to the extent aforementioned including the liability to be sued before recourse is had against the debtor.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 45mm"}}>
                        iv. That the said guarantee shall not or become in any way prejudiced affected or unenforceable either wholly or any part by reason of any fact matter or circumstances concerning the debtor or any other person or concerning the account or conduct or any transaction of or with the debtor or any other person whether such fact matter or circumstances be known to or at any time come to the knowledge of the Company or not and whether or not the same be disclosed by the Company to the Guarantors
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 45mm"}}>
                        v. That the said guarantee shall be in addition and shall not in any way be prejudiced or affected by any collateral or other security then or thereafter held by the Company for all or any part of the monies herein mentioned.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        09.	If for any reason, the Debtor defaults the payments of one installment, and by reason of that fact, the agreement gets cancelled. Accordingly. on this agreement, the Company is entitled to take legal action for the recovery of capital amount, interest and defaulted amounts, if any, from the Debtor and / the or Guarantors.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        10.	The Guarantors binds themselves through this document, to ensure proper carrying out of the terms and conditions incorporated in this Legal Document.
                    </p>
                    <p style={{textAlign: "justify", textJustify: "inter-word", margin: "0mm 0mm 5mm 25mm"}}>
                        11.	The terms and conditions of this agreement are mandatory and the benefit shall be the protection of Company, its successors and assigns, Debtor, Guarantors, their heirs, executors, administrators and assigns.
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        IN WITNESS WHEREOF the Company Seal of Agrivest (Private) Limited has been placed hereto and all the parties signed at <b>{details["Agreement Signing Location"]}</b> on this <b>{details["Initiation Date"]}</b>
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h5 style={{textAlign: "center"}}>SCHEDULE ABOVE REFERRED TO</h5>
                    <p style={{textAlign: "center"}}>The installments payable and the period for payment of the said installments.</p>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>1. Loan Amount                                 :- <b>Rs {parseFloat(details["Capital"]).toLocaleString()}.00</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>2. Interest Rate (Monthly)                     :- <b>{(parseFloat(details["Interest Rate"]) / 12).toFixed(2)} %</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>3. Installment (Weekly)                        :- <b>Rs {parseFloat(details["Installment"]).toLocaleString()}.00</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>4. Repayment Period (Weeks)                    :- <b>{details["Installments"]}</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>5. Commencement of repayment of installments   :- <b>{details["First Installment Date"]}</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>6. Date completion of payment of installments  :- <b>{details["Last Installment Date"]}</b></pre>
                    <pre style={{margin: "0mm 55mm 3mm 55mm"}}>7. Default Interest (Monthly)                  :- <b>5 %</b></pre>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <p style={{textAlign: "center"}}>Signed after getting everything given above understood</p>
                </Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p style={{textAlign: "justify", textJustify: "inter-word"}}>
                        Signed after affixing the Stamp of Agrivest (Private) Limited in the presence of authorised officer of the above Company
                    </p>
                </Col>
                <Col md={1}></Col>
            </Row>

            <Row>
                <Col md={1}></Col>
                <Col md={10}>
                    <p>&nbsp;</p>
                    <p>Debtor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p><b>{details["Debtor Full Name"]}</b></p>
                    <p>&nbsp;</p>
                    <p>Joint Borrower &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p><b>{details["Joint Borrower Full Name"]}</b></p>
                    <p>&nbsp;</p>
                    <p>First Guarantor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p><b>{details["First Guarantor Full Name"]}</b></p>
                    <p>&nbsp;</p>
                    <p>Second Guarantor &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p><b>{details["Second Guarantor Full Name"]}</b></p>
                    <p>&nbsp;</p>
                    <p><b><u>Witnesses</u></b></p>
                    <p>1. Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p>&nbsp;&nbsp;&nbsp; Full Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- <b>{details["First Witness Full Name"]}</b></p>
                    <p>&nbsp;&nbsp;&nbsp; National Identity Card &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- <b>{details["First Witness NIC"]}</b></p>
                    <p>&nbsp;</p>
                    <p>2. Signature &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- ............................................................................................................</p>
                    <p>&nbsp;&nbsp;&nbsp; Full Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- <b>{details["Second Witness Full Name"]}</b></p>
                    <p>&nbsp;&nbsp;&nbsp; National Identity Card &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :- <b>{details["Second Witness NIC"]}</b></p>
                    <p></p>
                </Col>
                <Col md={1}></Col>
            </Row>

        </React.Fragment>
    );
};

export default PaymentVoucherDetailsPage;