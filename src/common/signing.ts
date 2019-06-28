import { showMainSpinner, hideMainSpinner } from "./helpers";
import { IPromissoryNote } from "./models/promissory-note.model";
import { IPNSignature, ISigningComplete } from "../interfaces/i-signing";
import { selectors, signatureSigneeType } from "./constants";

let _signingResponseContainer: JQuery<HTMLElement>;
let _mainApplicantLinkContainer: JQuery<HTMLElement>;
let _coApplicantLinkContainer: JQuery<HTMLElement>;
let _otherSigningLinkContainer: JQuery<HTMLElement>;
let _allSigninigTargetsContainer: JQuery<HTMLElement>;
let _signers: IPromissoryNote[];
let _signer: IPromissoryNote;

export function startSign(signers: IPromissoryNote[], options?: Partial<IPNSignature>) {

    _signers = signers;

    _signers.forEach(signer => {

        const button = $("<img/>")
            .attr("src", signer.signingButton)
            .on("click", (e) => {

                e.preventDefault();
                createSignerContainer(signer, options);
            });

        getSignerLinkContainer(signer.type)
            .append(button);
    })
}

export function createSignerContainer(signer: IPromissoryNote, options?: Partial<IPNSignature>) {

    options && Object.assign(_signature, options);

    _signer = signer;
    _signingResponseContainer = $(_signature.signingResponseSelector);
    _mainApplicantLinkContainer = $(_signature.mainApplicantLinkSelector);
    _coApplicantLinkContainer = $(_signature.coApplicantLinkSelector);
    _otherSigningLinkContainer = $(_signature.otherSigningLinkSelector);
    _allSigninigTargetsContainer = $(_signature.allSigninigTargets);

    showMainSpinner();

    const popup = _signature.signingWindow = window.open(
        _signer.signUri,
        "eSignature",
        `scrollbars=1, directories=0, resizable=0, menubar=0, toolbar=0, status=1, width=${_signature.popupWith}, height=${$(window).height() - 50}`
    );

    if (popup !== null) {

        _signature.checkWindowInterval = window.setInterval(_signature.checkWindow, 500);

        try {

            const w = $(window);
            const p = $(popup);
            popup.moveTo((w.width() / 2) - (p.width() / 2), (w.height() / 2) - (p.height() / 2));

        } catch (e) {
            //Util.logDebug("Could not move PN window to center of screen. Exception: " + e.message);
        }

        $(options.overlaySelector).fadeIn();
        _signature.isActive = true;

    } else {

        _signature.isActive = false;
        //Util.logError('[PN] E-signature popup was blocked by browser ("' + type + '")');
    }

}

const _signature: IPNSignature = {

    popupWith: 580,
    signingContainerSelector: selectors.signingContainer,
    signingResponseSelector: selectors.signingResponse,
    mainApplicantLinkSelector: `${selectors.mainApplicant} a`,
    coApplicantLinkSelector: `${selectors.coApplicant} a`,
    otherSigningLinkSelector: "",
    allSigninigTargets: selectors.allSigninigTargets,
    signingWindow: null,
    isActive: false,
    lockScreenSelector: "",
    checkWindowInterval: 0,
    _coApplicantHeaderText: "",
    _cancelling: false,
    _mainApplicantHeaderText: "",

    complete: function (status: string, reason: string, htmlMessage: string, type: string) {

        if (_signature.isActive) {
            _signature.isActive = false;

            _signature.signingWindow.close();
            $(_signature.lockScreenSelector).fadeOut();

            _signature._cancelling = false;
            clearInterval(_signature.checkWindowInterval);
            _signature.checkWindowInterval = 0;
        }

        htmlMessage = String(htmlMessage) === "null" ? "" : htmlMessage;

        let header = getHeader(type, htmlMessage);     

        if (type === signatureSigneeType.all) {

            _signingResponseContainer.html(htmlMessage);
            _allSigninigTargetsContainer.fadeOut();
            _mainApplicantLinkContainer.fadeOut();
            _coApplicantLinkContainer.fadeOut();
            _otherSigningLinkContainer.fadeOut();

        } else {

            let updateTarget = getSignerContentContainer(type);
            updateTarget = updateTarget.length ? updateTarget : _signingResponseContainer;
            updateTarget.html(`${header}${htmlMessage}`);
            
            let currentLink = type === signatureSigneeType.coApplicant
                ? _coApplicantLinkContainer
                : _mainApplicantLinkContainer;

            if (status !== "Retry") {

                currentLink.fadeOut();
                _otherSigningLinkContainer.fadeOut();

            } else {

                currentLink.fadeIn();
            }
        }

        // Tell the caller that we are finished!
        _signature.completedCallback({ status, type, message: reason });
        hideMainSpinner();
    },

    completedCallback: function (data: ISigningComplete) { },

    checkWindow: async function () {

        if (_signature._cancelling) {
            return;
        }

        if (_signature.isActive) {

            const popup = _signature.signingWindow;

            if (popup.closed) {

                _signature._cancelling = true;

                try {

                    const response = await fetch(_signer.cancelSignUri);
                    const data = await response.json();

                    if (_signature.isActive) {

                        _signature.complete(data.status, 'Window closed', data.message, data.type);
                    }

                } catch (error) {

                    hideMainSpinner();
                    alert("internal server error");
                }
            }
        }
    },

    keepAlive: function () { }
};

function getSignerContentContainer(type: string) {

    return $(`#signing-container > div.${type}.${_signers.length}-applicant > span`)
}

function getSignerLinkContainer(type: string) {

    return $(`#signing-container > div.${type}.${_signers.length}-applicant > a`)
}

function getHeader(type: string, htmlMessage: string) {

    if (type === signatureSigneeType.mainApplicant && _signature._mainApplicantHeaderText.length > 0 && htmlMessage.length > 7) {
        return `<h4>${_signature._mainApplicantHeaderText}</h4>`;
    }

    if (type === signatureSigneeType.coApplicant && _signature._coApplicantHeaderText.length > 0 && htmlMessage.length > 7) {
        return `<h4>${_signature._coApplicantHeaderText}</h4>`;
    }

    return "";
}