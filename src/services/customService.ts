import { HttpClient, HttpResponse, HttpRequest, HttpMethod } from "@paperbits/common/http";
import { ISettingsProvider } from "@paperbits/common/configuration";
import { Router } from "@paperbits/common/routing";
import { RouteHelper } from "../routing/routeHelper";
import { SettingNames } from "../constants";
import { IAuthenticator } from "../authentication";

export class CustomService {
    private customGraphApiUrl: string;
    private customGraphApiUrlSubscriptionkey: string;
    constructor(
        private readonly httpClient: HttpClient,
        private readonly settingsProvider: ISettingsProvider,
        private readonly router: Router,
        private readonly routeHelper: RouteHelper,
        private readonly authenticator: IAuthenticator
    ) { }

    public async initialize(): Promise<void> {
        const settings = await this.settingsProvider.getSettings();
        console.log("TEST");
        const token = this.authenticator.getAccessToken();
        console.log(settings, token);
    }

    public async getApplication(id: string): Promise<any> {
        let response: HttpResponse<any>;
        let customGraphApiUrlSubscriptionkey:string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        const httpRequest: HttpRequest = {
            method: HttpMethod.get,
            url: await this.getUrl(`/echo/applications/${id}`),
            headers: [{ name: "Ocp-Apim-Subscription-Key", value: customGraphApiUrlSubscriptionkey }]
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }

        return this.handleResponse(response);
    }

    public async createAppRegistrationForUser(): Promise<any> {
        const sasToken: string = this.authenticator.getAccessToken();
        let customGraphApiUrlSubscriptionkey: string = await this.settingsProvider.getSetting<string>(SettingNames.customGraphApiUrlSubscriptionkey);
        let response: HttpResponse<any>;
        const httpRequest: HttpRequest = {
            method: HttpMethod.post,
            url: await this.getUrl(`/echo/applications`),
            headers: [{ name: "Ocp-Apim-Subscription-Key", value: customGraphApiUrlSubscriptionkey }]
        }

        try {
            response = await this.httpClient.send<any>(httpRequest);
        } catch (error) {
            throw new Error(`Unable to complete request. Error: ${error.message}`);
        }
    }

    //public async getCaptchaParams(): Promise<CaptchaParams> {
    //    let response: HttpResponse<CaptchaParams>;
    //    const httpRequest: HttpRequest = {
    //        method: HttpMethod.get,
    //        url: await this.getUrl("/captcha")
    //    }

    //    try {
    //        response = await this.httpClient.send<any>(httpRequest);
    //    }
    //    catch (error) {
    //        throw new Error(`Unable to complete request. Error: ${error.message}`);
    //    }

    //    return this.handleResponse(response);
    //}

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