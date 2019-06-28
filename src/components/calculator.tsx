import React from "react";
import { ICalculatorProps } from "../interfaces/i-calculator-props";
import { PMT } from "../utils/financial-functions";

// import "../public/Content/Shared/Styles/Menu.css";
// import "../public/Content/Shared/Styles/CalculatorBlurb.css";
// import "../public/Content/Shared/Styles/ActionBlurb.css";
// import "../public/Content/Shared/Styles/AccordionBlurb.css";
// import "../public/Content/Shared/Styles/Forms.css";
// import "../public/Content/Shared/Styles/rangeslider.css";
// import "../public/Content/Shared/Styles/Colors.css";
// import "../public/Content/Shared/Styles/CreditCard.css";
// import "../public/Content/Shared/Styles/HeroMenuBlurb.css";

// import "../public/Content/TFBank/Styles/Validation.css";
// import "../public/Content/TFBank/Styles/Menu.css";
// import "../public/Content/TFBank/Styles/Common.css";
// import "../public/Content/TFBank/Styles/CalculatorBlurb.css";
// import "../public/Content/TFBank/Styles/ActionBlurb.css";
// import "../public/Content/TFBank/Styles/AccordionBlurb.css";
// import "../public/Content/TFBank/Styles/HeroBlurb.css";
// import "../public/Content/TFBank/Styles/ContentBlurb.css";
// import "../public/Content/TFBank/Styles/MiniBlurb.css";
// import "../public/Content/TFBank/Styles/ContactFormBlurb.css";
// import "../public/Content/TFBank/Styles/LoanApplication.css";
// import "../public/Content/TFBank/Styles/Blog.css";
// import "../public/Content/TFBank/Styles/Dropdown.css";
// import "../public/Content/TFBank/Styles/InsuranceDocumentSigningBlurb.css";
// import "../public/Content/TFBank/Styles/Deposit.css";
// import "../public/Content/TFBank/Styles/BlurbForm.css";
// import "../public/Content/TFBank/Styles/FetchAgreementBlurb.css";
// import "../public/Content/TFBank/Styles/OverlayBlurb.css";
// import "../public/Content/TFBank/Styles/Form.css";


interface ICalculatorSliderOption {
    amount: number;
    isActive?: boolean;
    period: number;
}

interface ICalculatorState {
    averageInstallment: number;
    loanAmount: number;
    loanAmountTemp: number;
    repaymentTime: number;
    repaymentTimeTemp: number;
    repayments: ICalculatorSliderOption[];
    coApplicantEnabled: boolean;
    insuranceEnabled: boolean;
}

export class Calculator extends React.Component<ICalculatorProps, ICalculatorState> {

    public state: ICalculatorState = {
        averageInstallment: this.getAmountData(this.props.defaultAmount, this.props.defaultPeriod),
        coApplicantEnabled: false,
        insuranceEnabled: false,
        loanAmount: this.props.defaultAmount,
        loanAmountTemp: this.props.defaultAmount,
        repaymentTime: Number(this.props.defaultPeriod),
        repaymentTimeTemp: Number(this.props.defaultPeriod),
        repayments: ((start, end) => {

            const sliderOptions: ICalculatorSliderOption[] = [];

            while (start <= end) {
                const period = start * 12;
                sliderOptions.push({
                    amount: this.getAmountData(this.props.defaultAmount, period),
                    isActive: period === this.props.defaultPeriod,
                    period,
                });
                start++;
            }

            return sliderOptions;

        })(
            Math.floor(this.props.minimumPeriod / 12),
            Math.floor((this.props.maximumPeriod - this.props.minimumPeriod) / 12 + 1),
        )
    }

    public render() {

        return (
            <div className="row">
                {this.props.isOnLoanPage ?
                    <div className="col-md-12 calculator-sliders step1">
                        <div className="col-md-6 calculator-sliders step1 nonloan">

                            <div className="visible-xs visible-sm">
                                {this.props.includeDebt && <CalculatorDebt
                                    amountText={this.props.amountText}
                                    value={this.props.defaultAmount}
                                    onCalculatorDebtChanged={this.onCalculatorDebtChanged} />
                                }
                            </div>

                            {this.calculatorLoanAmount()}
                            {this.calculatorLoanPeriod()}

                            <div className="visible-xs visible-sm">
                                {this.props.includeDebt && this.calculatorTotalDebt()}
                                {this.calculatorSummary()}
                            </div>

                            {this.calculatorOptions()}
                        </div>
                        <div className="col-md-6 hidden-xs hidden-sm">
                            {this.props.includeDebt && <>
                                <CalculatorDebt
                                    amountText={this.props.amountText}
                                    value={this.props.defaultAmount}
                                    onCalculatorDebtChanged={this.onCalculatorDebtChanged} />
                                {this.calculatorTotalDebt()}
                            </>}
                            {this.calculatorSummary()}
                        </div>
                    </div>
                    : <>
                        <div className="col-md-6 calculator-sliders step1 nonloan">
                            {this.calculatorLoanAmount()}

                            {this.calculatorLoanPeriod()}

                            <div className="visible-xs visible-sm">
                                {this.calculatorSummary()}
                            </div>

                            {this.calculatorOptions()}
                        </div>
                    </>
                }
            </div>);
    }

    private calculatorLoanAmount() {

        return (
            <div className="loan-amount-container" data-amount={this.state.loanAmount}>

                <div className="row">
                    <div className="col-md-12">
                        <h3>
                            {this.props.amountText}
                            {this.props.amountCoApplicantText && this.props.coApplicantEnabled &&
                                <span className="co-applicant">{this.props.amountCoApplicantText}</span>
                            }
                        </h3>
                    </div>
                </div>

                {this.props.amountEnabled ?
                    <>
                        <div className="row">
                            <div className="col-xs-12 amount-input visible-xs visible-sm">
                                <div className="input">
                                    <input
                                        className="loan-amount-input"
                                        type="text"
                                        name="loan-amount"
                                        onChange={this.onLoanAmountTempChange}
                                        onBlur={this.onLoanAmountBlur}
                                        onKeyPress={this.onLoanAmountKeyPress}
                                        value={this.state.loanAmountTemp}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row amount-slider">
                            <div className="col-md-12 amount-input hidden-xs hidden-sm">
                                <div className="input">
                                    <input
                                        className="loan-amount-input"
                                        type="text"
                                        name="loan-amount"
                                        onChange={this.onLoanAmountTempChange}
                                        onBlur={this.onLoanAmountBlur}
                                        onKeyPress={this.onLoanAmountKeyPress}
                                        value={this.state.loanAmountTemp}
                                    />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-12">
                                        <span className="range-parent">
                                            <input
                                                type="range"
                                                max={this.props.maximumAmount}
                                                min={this.props.minimumAmount}
                                                step={this.props.amountStep}
                                                value={this.state.loanAmount}
                                                onChange={this.onSliderChange}
                                                onMouseUp={this.onCalculatorChanged}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="values">
                                    <div className="min">{this.props.minimumAmount}</div>
                                    <div className="max">{this.props.maximumAmount}</div>
                                </div>
                            </div>
                        </div>
                    </>
                    : <div className="row">
                        <div className="col-xs-12">
                            <span className="loan-amount-static">{this.state.loanAmount}</span>
                        </div>
                    </div>
                }
            </div>
        )
    }

    private calculatorTotalDebt() {

        return (
            <div className="total-debt-container">
                <div className="total-debt-summary apply col-md-12">
                    <div>
                        {this.props.totalDebtHeading &&
                            <div className="total-debt-text">
                                {this.props.totalDebtHeading}
                            </div>
                        }
                        <div className="installmentDescriptionCell sum">
                            <div>
                                <span className="installmentDescriptionCellBig averageInstallment"></span>
                            </div>
                        </div>

                    </div>
                    {this.props.totalDebtInfo &&
                        <div className="total-debt-details">
                            {this.props.totalDebtInfo}
                        </div>
                    }
                </div>
            </div>
        );
    }

    private calculatorLoanPeriod() {
        return (
            <div className="loan-period-container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>{this.props.periodText}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 period-input visible-xs visible-sm">
                        <div className="input">
                            <input type="hidden" name="repayment-period" value="" />
                            <input
                                type="text"
                                className="repayment-period-input"
                                name="repayment-period-visible"
                                value={this.state.repaymentTimeTemp}
                                onBlur={this.repaymentInputBlur}
                                onChange={this.repaymentTempChanged}
                                onKeyPress={this.onRepaymentKeyPress}
                            />
                        </div>
                    </div>
                </div>
                <div className="row period-slider">
                    <div className="col-md-12 period-input hidden-xs hidden-sm">
                        <div className="input">
                            <input type="hidden" name="repayment-period" value="" />
                            <input
                                type="text"
                                className="repayment-period-input"
                                name="repayment-period-visible"
                                value={this.state.repaymentTimeTemp}
                                onBlur={this.repaymentInputBlur}
                                onChange={this.repaymentTempChanged}
                                onKeyPress={this.onRepaymentKeyPress}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-12">
                                <span className="range-parent">
                                    <input
                                        type="range"
                                        max={this.props.maximumPeriod}
                                        min={this.props.minimumPeriod}
                                        step={this.props.periodStep}
                                        value={this.state.repaymentTime}
                                        onChange={this.repaymentChanged}
                                        onMouseUp={this.onCalculatorChanged}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="values">
                            <div className="min">{this.props.minimumPeriod / (this.props.periodDisplayInYears ? 12 : 1)}</div>
                            <div className="max">{this.props.maximumPeriod / (this.props.periodDisplayInYears ? 12 : 1)}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private calculatorOptions() {

        return (
            <div className="row calculator-options">
                {this.props.coApplicantEnabled &&
                    <div className="col-md-12">
                        <div className={`co-applicant ${this.props.insuranceEnabled ? "border" : ""}`}>
                            <input type="checkbox"
                                name="coApplicantEnabled"
                                onChange={this.onInputChanged}
                                checked={this.state.coApplicantEnabled}
                                value="true"
                                id="coApplicantEnabled"
                            />
                            <label htmlFor="coApplicantEnabled" className="cursor-pointer">
                                <span/>
                                <div>
                                    <p>
                                        {this.props.coApplicantText}
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                }

                {this.props.insuranceEnabled &&
                    <div className="col-md-12 insurance">
                        <input
                            type="checkbox"
                            name="insuranceEnabled"
                            onChange={this.onInputChanged}
                            checked={this.state.insuranceEnabled}
                            value="true"
                            id="insuranceEnabled"
                        />
                        <label htmlFor="insuranceEnabled" className="cursor-pointer">
                            <span/>
                            <div>
                                <p>
                                    {this.props.insuranceText}
                                </p>
                            </div>
                        </label>
                        <span className="details without-ppi">{this.props.insuranceDescription}</span>
                        {this.props.insuranceDescriptionWithPpi &&
                            <span className="details with-ppi">{this.props.insuranceDescriptionWithPpi}</span>
                        }
                    </div>
                }

                {this.props.footerText &&
                    <div className="col-md-12 insurance-footer hidden-xs">
                        {this.props.footerText}
                    </div>
                }
            </div>

        );
    }

    private calculatorSummary() {

        const costText = this.props.costText && (
            <div className="calculator-cost-text">
                {this.props.costText}
            </div>
        );

        const highRepaymentText = this.props.highRepaymentText && (
            <div className="calculator-high-repayment">
                {this.props.highRepaymentText}
            </div>
        );

        const applyButtonText = !this.props.isOnLoanPage &&
            <div className="apply-group">
                <button type="submit">{this.props.applyButtonText}</button>
            </div>;

        return (
            <div className="calculator-summary-container">
                <div className="calculator-summary apply col-md-12">
                    <div>
                        {costText}
                        <div className="installmentDescriptionCell sum">
                            <div>
                                <span className="calculator-cost-error-text">
                                    {this.props.maximumInstallmentExceededMessage}
                                </span>
                            </div>
                            <div>
                                <span className="installmentDescriptionCellBig averageInstallment">
                                    {this.state.averageInstallment}
                                </span>
                            </div>
                        </div>

                        {highRepaymentText}
                        {applyButtonText}

                        {this.props.lowInterestText &&
                            <div className="col-md-4">
                                <strong className="installmentDescriptionCellBig lowInstallment"></strong>
                                <span className="installmentDescriptionHeader lowInstallmentDescription">{this.props.lowInterestText}</span>
                            </div>
                        }

                        {this.props.highInterestText &&
                            <div className="col-md-4">
                                <strong className="installmentDescriptionCell highInstallment"></strong>
                                <span className="installmentDescriptionHeader highInstallmentDescription" data-template={this.props.highInterestText}></span>
                            </div>
                        }
                    </div>

                    {this.props.details &&
                        <div className="details">
                            {this.props.details}
                        </div>
                    }

                    <span className="details hidden-xs">
                        {this.props.informationText}
                    </span>
                </div>
            </div>
        );
    }

    private onCalculatorChanged = () => this.props.onCalculatorChanged && this.props.onCalculatorChanged.call(this);

    public componentDidMount() {
        // set defaul values to the form
        this.onCalculatorChanged();
    }

    private getAmountData(amount: number, period: number) {

        const repayment = this.calculateSingleInstallment(amount, period);
        return this.roundToDecimal(repayment, this.props.decimals || 0);
    }

    private onInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { checked, name } = e.target;
        this.setState(
            { [name]: checked } as Pick<ICalculatorState, "coApplicantEnabled" | "insuranceEnabled">,
            this.onCalculatorChanged
        );     
    } 

    private onSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const loanAmount = Number(e.target.value);
        const averageInstallment = this.getAmountData(loanAmount, this.state.repaymentTime);

        const repayments = this.state.repayments.map((repayment) => ({
            amount: this.getAmountData(loanAmount, repayment.period),
            isActive: repayment.isActive,
            period: repayment.period,
        }), this);

        this.setState({
            averageInstallment,
            loanAmount,
            loanAmountTemp: loanAmount,
            repayments,
        });
    }

    private repaymentStateChanged = (value: number) => this.setState(
        {
            repaymentTime: value,
            repaymentTimeTemp: value,
            averageInstallment: this.getAmountData(this.state.loanAmount, value)
        },
        this.onCalculatorChanged
    );

    private repaymentChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.repaymentStateChanged(Number(e.target.value));

    private repaymentTempChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({ repaymentTimeTemp: Number(e.target.value) });

    private repaymentInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {

        const repayment = this.getClosestRepayment(Number(e.target.value));

        if (this.state.repaymentTime !== repayment) {
            this.repaymentStateChanged(repayment);
        }
    }

    private onRepaymentKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.which === 13) {
            const repayment = this.getClosestRepayment(Number((e.target as HTMLInputElement).value));
            this.repaymentStateChanged(repayment);
        }
    }

    private getClosestRepayment(repayment: number): number {

        if (repayment > this.props.maximumPeriod) {

            return this.props.maximumPeriod;

        } else if (repayment < this.props.minimumPeriod) {

            return this.props.minimumPeriod;

        }

        const stepFrom = repayment - this.props.minimumPeriod;
        const nearest = stepFrom - (stepFrom % this.props.periodStep);
        return nearest + this.props.minimumPeriod;
    }

    private calculateSingleInstallment(amount: number, period: number) {

        const v = this.calculateInstallment(
            amount,
            period,
            this.props.baseInterest,
            this.props.startFee,
            this.props.fixedStartFee,
            Number(this.props.ppi),
            this.props.monthlyPaymentPercentage 
                ? amount * this.props.monthlyPaymentPercentage
                : this.props.monthlyPayment,
            this.props.minimumMonthlyInsurance,
            0
        );

        return v;
    }

    private roundToDecimal(number: number, decimals: number) {
        const multiplier = Math.pow(10, decimals);
        return Math.ceil(number * multiplier) / multiplier;
    }

    private calculateInstallment(
        loanAmount: number,
        o: number,
        rate: number,
        prow: number,
        fixedProw: number,
        ppi: number,
        monthlyPayment: number,
        minMonthlyInsurance: number,
        decimals: number,
    ) {

        const tempBalance = loanAmount * prow;
        const balance = tempBalance < 100.0 ? loanAmount : loanAmount + tempBalance;
        const cpmt = PMT(rate / 12, o, balance, 0, 0);
        const installment = -cpmt + monthlyPayment;

        return installment;
    }

    private onLoanAmountTempChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({
            loanAmountTemp: Number(e.target.value),
        });

    private onLoanAmountBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        const closest = this.getClosestAmount(Number(e.target.value));

        if (this.state.loanAmount !== closest) {
            this.onLoanAmountStateChanged(closest);
        }
    }

    private onLoanAmountKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.which === 13) {
            const closest = this.getClosestAmount(Number((e.target as HTMLInputElement).value));
            this.onLoanAmountStateChanged(closest);
        }
    }

    private onLoanAmountStateChanged = (loanAmount: number) => this.setState(
        {
            averageInstallment: this.getAmountData(loanAmount, this.state.repaymentTime),
            loanAmount: loanAmount,
            loanAmountTemp: loanAmount,
        },
        this.onCalculatorChanged
    );

    private getClosestAmount(amount: number): number {

        if (amount > this.props.maximumAmount) {

            return this.props.maximumAmount;

        } else if (amount < this.props.minimumAmount) {

            return this.props.minimumAmount;

        }

        const stepFrom = amount - this.props.minimumAmount;
        const nearest = stepFrom - (stepFrom % this.props.amountStep);
        return nearest + this.props.minimumAmount;
    }

    public onCalculatorDebtChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    }

}


function CalculatorDebt(props: {
    amountText: string,
    value: any,
    onCalculatorDebtChanged: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

    const { amountText, value, onCalculatorDebtChanged } = props;

    return (
        <div className="debt-amount-container">
            <div className="row">
                <div className="col-md-12">
                    <h3>
                        {amountText}
                    </h3>
                </div>

            </div>
            <div className="debt-amount-input">
                <div className="input">
                    <input
                        type="text"
                        name="debt-amount"
                        id="debt-amount"
                        value={value}
                        onChange={onCalculatorDebtChanged}
                    />
                </div>
            </div>
        </div>
    )

}
