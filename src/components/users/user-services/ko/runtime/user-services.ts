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
}