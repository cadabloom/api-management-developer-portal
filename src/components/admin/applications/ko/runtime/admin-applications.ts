import * as ko from "knockout";
import * as moment from "moment";
import template from "./admin-applications.html";
import { Component, RuntimeComponent, OnMounted } from "@paperbits/common/ko/decorators";
import { Router } from "@paperbits/common/routing/router";
import { CustomService } from "../../../../../services/customService";
import { UsersService } from "../../../../../services";
import { Application } from "../../../../../custom-models/application";
import { ClientAppContract } from "../../../../../custom-contracts/clientApp";
import { ClientApp } from "../../../../../custom-models/clientApp";

@RuntimeComponent({ selector: "admin-applications" })
@Component({
    selector: "admin-applications",
    template: template,
    injectable: "applications"
})
export class Applications {
    public readonly pendingApplications: ko.ObservableArray<ClientApp>;
    public readonly approvedApplications: ko.ObservableArray<ClientApp>;
    public isLoading: ko.Observable<boolean>;
    constructor(
        private readonly customService: CustomService,
        private readonly usersService: UsersService,
        private readonly router: Router) {
        this.pendingApplications = ko.observableArray();
        this.approvedApplications = ko.observableArray();
        this.isLoading = ko.observable();
    }

    @OnMounted()
    public async loadUser(): Promise<void> {
        this.init();
    }

    public async init(): Promise<void> {
        this.isLoading(true);

        let clientAppContracts: Array<ClientAppContract> = await this.customService.getClientApplications();

        let clientApps: Array<ClientApp> = new Array<ClientApp>(...clientAppContracts.map(i => new ClientApp(i)));

        this.pendingApplications(clientApps.filter(i => i.status.toLowerCase() === 'pending'));
        this.approvedApplications(clientApps.filter(i => i.status.toLowerCase() === 'approved'));

        this.isLoading(false);
    }

    public async approve(clientApp: ClientApp): Promise<void> {
        console.log(clientApp);
        let response = await this.customService.approveClientApp(clientApp.id, clientApp.obsTitle());
        if (response.statusCode == 200) {
            this.init();
        }
    }

    public async showApproveSection(clientApp: ClientApp): Promise<void> {
        console.log(clientApp);
        clientApp.showApprove(true);
    }
}