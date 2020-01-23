import * as ko from "knockout";
import * as moment from "moment";
import template from "./user-services.html";
import { Component, RuntimeComponent, OnMounted } from "@paperbits/common/ko/decorators";
import { UsersService } from "../../../../../services/usersService";
import { Router } from "@paperbits/common/routing/router";
import { CustomService } from "../../../../../services/customService";


@RuntimeComponent({ selector: "user-services" })
@Component({
    selector: "user-services",
    template: template,
    injectable: "userServices"
})
export class UserServices {
    public showForm: ko.Observable<boolean>;

    constructor(
        private readonly customService: CustomService,
        private readonly usersService: UsersService,
        private readonly router: Router) {
        this.showForm = ko.observable(false);
    }

    public async addNew(): Promise<void> {
        this.showForm(true);
    }

    public async save(): Promise<void> {
        this.showForm(false);
    }
}