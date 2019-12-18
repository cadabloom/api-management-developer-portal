import { Utils } from "../utils";
import { ApplicationContract, ApplicationPasswordCredentialContract } from "../custom-contracts/application";
import moment = require("moment");

export class Application {
    public id: string;
    public appId: string;
    public displayName: string;
    public passwordCredentials: Array<PasswordCredential>;
    constructor(contract?: ApplicationContract) {
        this.id = contract.id;
        this.appId = contract.appId;
        this.displayName = contract.displayName;
        this.passwordCredentials = Array<PasswordCredential>(...contract.passwordCredentials.map(p => new PasswordCredential(p)));
    }
}

export class PasswordCredential {
    public customKeyIdentifier: string;
    public displayName: string;
    public endDateTime: Date;
    public hint: string
    public keyId: string;
    public secretText: string;
    public startDateTime: Date;
    constructor(contract?: ApplicationPasswordCredentialContract) {
        this.customKeyIdentifier = contract.customKeyIdentifier;
        this.displayName = contract.displayName;
        this.endDateTime = contract.endDateTime;
        this.hint = contract.hint;
        this.keyId = contract.keyId;
        this.secretText = contract.secretText;
        this.startDateTime = contract.startDateTime;
    }

    public get formattedEndDate(): string {
        return this.endDateTime ? moment(this.endDateTime).format("MM/DD/YYYY") : "";
    }

    public get diplayValue(): string {
        return this.hint ? `${this.hint}*****` : "";
    }
}