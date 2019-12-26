export interface ClientAppContract {
    id: number;
    title: string;
    organizationName: string;
    clientAppWebsiteUserId: string;
    identityServerClientId: string;
    createdOn: Date;
    description: string;
    status: number;
}