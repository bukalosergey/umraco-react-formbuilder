export interface IPromissoryNote {
    signUri: string;
    cancelSignUri: string;
    requestOtherMethodUri: string;
    type: string;
    signingButton: string;
}

export function getPromissoryNote(obj: any): IPromissoryNote {

    return {
        signUri: obj.SignUri,
        cancelSignUri: obj.CancelSignUri,
        requestOtherMethodUri: obj.RequestOtherMethodUri,
        type: obj.Type,
        signingButton: obj.SigningButton
    }
}