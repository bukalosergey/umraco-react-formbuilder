export interface IPNSignature {
    popupWith: number;
    signingWindow: Window;
    lockScreenSelector: string;
    signingResponseSelector: string;
    signingContainerSelector: string;
    mainApplicantLinkSelector: string;
    coApplicantLinkSelector: string;
    otherSigningLinkSelector: string;
    allSigninigTargets: string;
    isActive: boolean;
    checkWindowInterval: number;
    completedCallback(data: ISigningComplete): void;
    [key: string]: any;
}

export interface ISigningComplete {
    message: string;
    status: string;
    type: string;
}