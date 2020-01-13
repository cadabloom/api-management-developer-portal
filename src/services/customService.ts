import { HttpClient, HttpResponse, HttpRequest, HttpMethod, HttpHeader } from "@paperbits/common/http";
import { ISettingsProvider, Settings } from "@paperbits/common/configuration";
import { Router } from "@paperbits/common/routing";
import { RouteHelper } from "../routing/routeHelper";
import { SettingNames } from "../constants";
import { IAuthenticator } from "../authentication";
import { GroupValueContract } from "../custom-contracts/group";
import { UsersService } from ".";
import { User } from "../models/user";
import { Group } from "../custom-models/group";
import { ClientAppContract } from "../custom-contracts/clientApp";
import { ClientApp } from "../custom-models/clientApp";
import { ClientAppRequest } from "../custom-contracts/clientAppRrequest";
import { Application } from "../custom-models/application";
import { ApproveAppRequest } from "../custom-contracts/approveAppRequest";
import { ApplicationContract, ApplicationPasswordCredentialContract } from "../custom-contracts/application";
import { CreateApplicationRequest } from "../custom-contracts/createApplicationRequest";
import { RemoveApplicationPasswordRequest } from "../custom-contracts/removeApplicationPasswordRequest";

export class CustomService {
    private customGraphApiUrl: string;
    private customGraphApiUrlSubscriptionkey: string;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly settingsProvider: ISettingsProvider,
        private readonly router: Router,
        private readonly routeHelper: RouteHelper,
        private readonly authenticator: IAuthenticator,
        private readonly usersService: UsersService,
    ) { }

    public async initialize(): Promise<void> {
        //const settings = await this.settingsProvider.getSettings();
        //console.log("TEST");
        //const token = await this.authenticator.getAccessToken();
        //console.log(settings, token);
        //if (await this.usersService.isUserSignedIn()) {
        //    let user: User = await this.usersService.getCurrentUser();
        //    console.log(user);
        //    let response = await this.getUserGroups(user.id);
        //    console.log(response);
        //    let isAdmin: boolean = await this.isUserPortalAdmin(user.id);
        //    console.log(isAdmin);
        //} else {
        //    console.log("user not signed in");
        //}
        
    }

    public async getApplication(id: string): Promise<any> {
        let response: HttpResponse<any>;
        let customGraphApiUrlSubscriptionkey:string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        const httpRequest: HttpRequest = {
            method: HttpMethod.get,
            url: await this.getUrl(`/applications/${id}`),
            headers: [{ name: SettingNames.subscriptionKeyHeaderName, value: customGraphApiUrlSubscriptionkey }]
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return this.handleResponse(response);
    }

    public async createAppRegistrationForUser(displayName: string): Promise<any> {
        const sasToken: string = await this.authenticator.getAccessToken();
        const payload: CreateApplicationRequest = { title: displayName };
        let response: HttpResponse<any>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.post,
            url: await this.getUrl(`/applications`),
            headers: await this.initHeaders(),
            body: JSON.stringify(payload)
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return this.handleResponse(response);
    }

    public async createClientApp(userId: string, organizationName: string): Promise<HttpResponse<any>> {
        const clientApp: ClientAppRequest = { clientAppWebsiteUserId: userId, organizationName: organizationName, description: '' };

        let response: HttpResponse<any>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.post,
            url: await this.getUrl(`/clientapps`),
            headers: await this.initHeaders(),
            body: JSON.stringify(clientApp)
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return response;
    }

    public async createAppSecret(id: string, passwordDisplayName: string): Promise<ApplicationPasswordCredentialContract> {
        const addSecretRequest = {
            passwordCredential: { displayName: passwordDisplayName }
        };

        let response: HttpResponse<ApplicationPasswordCredentialContract>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.post,
            url: await this.getUrl(`/applications/${id}/addPassword`),
            headers: await this.initHeaders(),
            body: JSON.stringify(addSecretRequest)
        }

        try {
            response = await this.httpClient.send<ApplicationPasswordCredentialContract>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return (response.statusCode == 200 || response.statusCode == 201) ? this.handleResponse(response) : null;
    }

    public async removeAppSecret(id: string, keyId: string): Promise<HttpResponse<any>> {
        const removeSecretRequest: RemoveApplicationPasswordRequest = { keyId: keyId };

        let response: HttpResponse<any>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.post,
            url: await this.getUrl(`/applications/${id}/removePassword`),
            headers: await this.initHeaders(),
            body: JSON.stringify(removeSecretRequest)
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return response;
    }

    public async approveClientApp(id: number, title: string): Promise<HttpResponse<any>> {
        let pubShareAppTitle: string = `PubShareClientApp-${title}`;
        const appRegistration: ApplicationContract = await this.createAppRegistrationForUser(pubShareAppTitle);

        const approveAppRequest: ApproveAppRequest = { description: '', title: pubShareAppTitle, identityServerClientId: appRegistration.id, id: id };

        let response: HttpResponse<any>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.put,
            url: await this.getUrl(`/clientapps`),
            headers: await this.initHeaders(),
            body: JSON.stringify(approveAppRequest)
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return response;

    }

    public async getUserGroups(userId: string): Promise<GroupValueContract> {
        //users/${userId}/groups?api-version=2019-01-01
        let response: HttpResponse<GroupValueContract>;
        let customGraphApiUrlSubscriptionkey: string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        const httpRequest: HttpRequest = {
            method: HttpMethod.get,
            url: await this.getUrl(`${userId}/groups?api-version=2019-01-01`),
            headers: [{ name: SettingNames.subscriptionKeyHeaderName, value: customGraphApiUrlSubscriptionkey }, { name: "Authorization", value: await this.authenticator.getAccessToken() }]
        }

        try {
            response = await this.httpClient.send<GroupValueContract>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return this.handleResponse(response);
    }

    public async getClientApplications(): Promise<Array<ClientAppContract>> {
        let response: HttpResponse<Array<ClientAppContract>>;
        let customGraphApiUrlSubscriptionkey: string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);

        const httpRequest: HttpRequest = {
            method: HttpMethod.get,
            url: await this.getUrl(`/clientapps`),
            headers: [{ name: SettingNames.subscriptionKeyHeaderName, value: customGraphApiUrlSubscriptionkey }, { name: "Authorization", value: await this.authenticator.getAccessToken() }]
        }

        try {
            response = await this.httpClient.send<Array<ClientAppContract>>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return this.handleResponse(response);
    }

    public async getUserClientApplication(userId: string): Promise<ClientAppContract> {
        let response: HttpResponse<ClientAppContract>;

        const httpRequest: HttpRequest = {
            method: HttpMethod.get,
            url: await this.getUrl(`/appwebsiteusers/${userId}`),
            headers: await this.initHeaders()
        }

        try {
            response = await this.httpClient.send<ClientAppContract>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }
        console.log(response);
        return response.statusCode == 200 ? this.handleResponse(response) : null;
    }

    public async isUserPortalAdmin(userId: string): Promise<boolean> {
        let userGroupResponse = await this.getUserGroups(userId);
        let userGroups: Array<Group> = new Array<Group>(...userGroupResponse.value.map(i => new Group(i)));
        let portalAdminGroup: Group = userGroups.find(i => i.name === "portal-admin");
        let isAdmin: boolean = false;

        if (portalAdminGroup) {
            isAdmin = true;
        }

        return isAdmin;
    }

    private async initHeaders(): Promise<HttpHeader[]> {
        let customGraphApiUrlSubscriptionkey: string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        return [{ name: SettingNames.subscriptionKeyHeaderName, value: customGraphApiUrlSubscriptionkey }, { name: "Content-Type", value: "application/json" }];
    }

    private async initHeadersWithAuthorization(): Promise<HttpHeader[]> {
        let customGraphApiUrlSubscriptionkey: string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        return [{ name: SettingNames.subscriptionKeyHeaderName, value: customGraphApiUrlSubscriptionkey }, { name: "Content-Type", value: "application/json" }, { name: "Authorization", value: await this.authenticator.getAccessToken() }];
    }

    //public async sendSignupRequest(signupRequest: SignupRequest): Promise<void> {
    //    const response = await this.httpClient.send(
    //        {
    //            url: await this.getUrl("/signup"),
    //            method: HttpMethod.post,
    //            headers: [{ name: "Content-Type", value: "application/json" }],
    //            body: JSON.stringify(signupRequest)
    //        });
    //    if (response.statusCode !== 200) {
    //        if (response.statusCode === 400) {
    //            const responseObj = <any>response.toObject();
    //            throw responseObj.error;
    //        } else {
    //            throw Error(response.toText());
    //        }
    //    }
    //}

    private async getUrl(path: string): Promise<string> {
        if (!this.customGraphApiUrl) {
            this.customGraphApiUrl = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrl) || "";
        }
        return `${this.customGraphApiUrl}${path}`;
    }

    private handleResponse(response: HttpResponse<any>): any {
        if (response.statusCode === 200) {
            return response.toObject();
        }
        else {
            throw Error(response.toText());
        }
    }
}