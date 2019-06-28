export interface ILoanResponse {
    Status: number;
    IsExistingCustomer: string;
    ApplicationId: string;
    MainApplicant: any;
    CoApplicant: any;
    TopUpInformation: string;
    MonthlyCost: number;
    ApprovedAmount: number;
    RequestedAmount: number;
    RepaymentTime: number;
    ApprovedInterestRate: number;
    ResponseMessage: string;
    CustomerHasPPI: boolean;
     AgreementCode: string;
    RejectReasonCode: string;
    Signers: any[];
    ApprovedRepaymentPeriod: number;
    InsuranceCost: number;
    MonthlyFee: number;
    StartFee: number;
    EffectiveInterestRate: number;
    VeriffIdentifirationUrl: string;
    TrackingScript: string;
    PromissoryNotes: any[];
    Content: string;
}