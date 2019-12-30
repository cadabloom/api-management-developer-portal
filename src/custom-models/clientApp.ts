import { ClientAppContract } from "../custom-contracts/clientApp";
import * as ko from "knockout";

export class ClientApp {
    public id: number;
    public title: string;
    public organizationName: string;
    public clientAppWebsiteUserId: string;
    public identityServerClientId: string;
    public createdOn: Date;
    public description: string;
    public status: string;
    public showApprove: ko.Observable<boolean>;
    public canApprove: ko.Computed<boolean>;
    public obsTitle: ko.Observable<string>;
    constructor(contract?: ClientAppContract) {
        this.id = contract.id;
        this.title = contract.title;
        this.organizationName = contract.organizationName;
        this.clientAppWebsiteUserId = contract.clientAppWebsiteUserId;
        this.identityServerClientId = contract.identityServerClientId;
        this.createdOn = contract.createdOn;
        this.description = contract.description;
        this.status = contract.status == 1 ? "Pending" : "Approved";
        this.showApprove = ko.observable(false);
        this.obsTitle = ko.observable(contract.title);
        this.canApprove = ko.computed(() => this.obsTitle().length > 0);
    }
}