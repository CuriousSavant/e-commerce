class Main {
    private hostName = "";
    private userName = "";
    private password = "";
    private port = 7101;
    private url = "";
    private http = false;
    private https = false

    constructor() {
        this.hostName = "localhost";
        this.userName = "admin";
        this.password = "local-password/123";
        this.url = `mysql://${this.userName}:${this.password}@${this.hostName}:${this.port}/products`;
        this.http = true;
        this.https = false;
    }
}