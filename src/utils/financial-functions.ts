// tslint:disable
/**
 * The function calculates the interest payment, during a specific period of a loan or investment that is paid in constant periodic payments, with a constant interest rate.
 * @param rate - The interest rate, per period.
 * @param per -	The period for which the interest payment is to be calculated (must be an integer between 1 and nper).
 * @param nper - The number of periods over which the loan or investment is to be paid.
 * @param pv - The present value of the loan/investment.
 */
export function IPMT(rate: number, per: number, nper: number, pv: number) {

    const value = pv * rate * (Math.pow(rate + 1, nper + 1) - Math.pow(rate + 1, per)) / ((rate + 1) * (Math.pow(rate + 1, nper) - 1));
    return Math.round(value * 100) / 100;
}

/**
 * The function calculates a loan payment 
 * @param rate - The interest rate per month
 * @param nper - The number of periods (months)
 * @param pv - The present value
 * @param fv - The future value (residual value)
 */
export function PMT(rate: number, nper: number, pv: number, fv: number = 0, type: number = 0) {

    const value = rate * (fv + pv * Math.pow(1 + rate, nper)) / ((1 + rate * type) * (1 - Math.pow(1 + rate, nper)));
    return Math.round(value * 100) / 100;
}
// tslint:enable
