import * as ko from "knockout";
import * as moment from "moment";
import template from "./user-clientapp.html";
import { Component, RuntimeComponent, OnMounted } from "@paperbits/common/ko/decorators";
import { UsersService } from "../../../../../services/usersService";
import { Router } from "@paperbits/common/routing/router";
import { CustomService } from "../../../../../services/customService";
import { Application } from "../../../../../custom-models/application";
import { ApplicationContract } from "../../../../../custom-contracts/application";
import { ClientAppContract } from "../../../../../custom-contracts/clientApp";
import { ClientApp } from "../../../../../custom-models/clientApp";

@RuntimeComponent({ selector: "user-clientapp" })
@Component({
    selector: "user-clientapp",
    template: template,
    injectable: "userClientApp"
})
export class UserClientApp {
    public application: ko.Observable<Application>;
    public organization: ko.Observable<string>;
    public hasClientApp: ko.Observable<boolean>;
    public canRequest: ko.Computed<boolean>;
    public isLoading: ko.Observable<boolean>;
    public userId: string;
    constructor(
        private readonly customService: CustomService,
        private readonly usersService: UsersService,
        private readonly router: Router) {
        this.application = ko.observable(null);
        this.organization = ko.observable();
        this.hasClientApp = ko.observable();
        this.canRequest = ko.computed(() => this.organization() && this.organization().length > 0);
        this.isLoading = ko.observable();
    }

    @OnMounted()
    public async init(): Promise<void> {
        this.isLoading(true);

        console.log("user-client-app widget loaded");

        //ensure user is logged in
        const resourceId = await this.usersService.ensureSignedIn();
        //get logged in user id of logged in user
        this.userId = resourceId.split('/')[2];

        const clientAppContract: ClientAppContract = await this.customService.getUserClientApplication(this.userId);
        
        if (clientAppContract) {
            this.hasClientApp(true);
            const clientApp: ClientApp = new ClientApp(clientAppContract);

            //check if client app request has been approved
            if (clientApp.status.toLowerCase() === 'approved') {
                this.loadApplicationInfo(clientApp);
            }
            
        } else {
            this.hasClientApp(false);
        }

        this.isLoading(false);
    }

    public async loadApplicationInfo(clientApp: ClientApp): Promise<void> {
        const appContract: ApplicationContract = await this.customService.getApplication(clientApp.identityServerClientId);
        const appModel: Application = new Application(appContract);

        if (appModel) {
            this.application(appModel);
        }

        console.log(appModel);
    }

    public async requestClientApp(): Promise<void> {
        console.log(this.userId, this.organization());
        const repsonse = await this.customService.createClientApp(this.userId, this.organization());
        if (repsonse.statusCode == 200) {
            this.init();
            //send email?
        }
        //display error message on error
    }
}