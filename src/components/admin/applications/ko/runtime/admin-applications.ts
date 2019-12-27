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

    constructor(
        private readonly customService: CustomService,
        private readonly usersService: UsersService,
        private readonly router: Router) {
        this.pendingApplications = ko.observableArray();
        this.approvedApplications = ko.observableArray();
    }

    @OnMounted()
    public async loadUser(): Promise<void> {
        console.log("KABOOM");

        let clientAppContracts: Array<ClientAppContract> = await this.customService.getClientApplications();

        let clientApps: Array<ClientApp> = new Array<ClientApp>(...clientAppContracts.map(i => new ClientApp(i)));

        this.pendingApplications(clientApps.filter(i => i.status.toLowerCase() === 'pending'));
        this.approvedApplications(clientApps.filter(i => i.status.toLowerCase() === 'approved'));
        //await this.usersService.ensureSignedIn();

        //const model: User = await this.usersService.getCurrentUser();

        //this.setUser(model);

        //const appContract: ApplicationContract = await this.customService.getApplication("53444826-ce90-4116-8345-2e7232e53db6");

        //const appModel: Application = new Application(appContract);

        //console.log(appModel);

        //if (appModel) {
        //    this.application(appModel);
        //}
    }

    public async approve(clientApp: ClientApp): Promise<void> {
        console.log(clientApp);
    }
}