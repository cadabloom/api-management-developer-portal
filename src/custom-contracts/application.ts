export interface ApplicationContract {
    id: string;
    appId: string;
    displayName: string;
    passwordCredentials: Array<ApplicationPasswordCredentialContract>;
}

export interface ApplicationPasswordCredentialContract {
    customKeyIdentifier: string;
    displayName: string;
    endDateTime: Date;
    hint: string
    keyId: string;
    secretText: string;
    startDateTime: Date;
}