export class RequestInfo {

    public id:number;

    public incidentNumber: string;

    public username: string;

    public name: string;

    public requestedUsername: string;

    public requestedName: string;

    public responseMessage: string;

    public requestMessage: string;

    setId(id: number) {
        this.id = id;
    }
    getId(): number {
        return this.id;
    }

    setIncidentNumber(incidentNumber: string) {
        this.incidentNumber = incidentNumber;
    }
    getIncidentNumber(): string {
        return this.incidentNumber;
    }

    setUsername(username: string) {
        this.username = username;
    }
    getUsername(): string {
        return this.username;
    }

    setName(name: string) {
        this.name = name;
    }
    getName(): string {
        return this.name;
    }
    setRequestedUsername(requestUsername: string) {
        this.requestedUsername = requestUsername;
    }
    getRequestedUsername(): string {
        return this.requestedUsername;
    }

    setRequestedName(requestName: string) {
        this.requestedName = requestName;
    }
    getRequestedName(): string {
        return this.requestedName;
    }

    setResponseMessage(reponseMessage: string) {
        this.responseMessage = reponseMessage;
    }

    getResponseMessage(): string {
        return this.responseMessage;
    }

    setRequestMessage(requestMessage: string) {
        this.requestMessage = requestMessage;
    }

    getRequestMessage(): string {
        return this.requestMessage;
    }

}

