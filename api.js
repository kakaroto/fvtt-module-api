class APIModule {
    constructor() {
        this.sessionId = null;
        this.socket = null;
        // Get the userId if logged in
        for (let cookie of document.cookie.split('; ')) {
            const [name, value] = cookie.split("=");
            if (name === 'session') {
                this.sessionId = decodeURIComponent(value);
                break;
            }
        }
        // Connect to the game socket, passing the userId as an initial data packet
        this.socket = io.connect(window.location.origin, {
            'reconnection': false,
            query: { session: this.sessionId }
        });
    }

    error(message) {
        this.reply({success: false, error: message});
    }
    reply(result) {
        const body = document.getElementsByTagName("body")[0];
        body.textContent = JSON.stringify(result);
        this.socket.close();
    }

    processRequest() {
        if (!this.sessionId)
            return this.error("User not logged in")
        let params = {}
        try {
            let search = window.location.search;
            if (search[0] === '?')
                search = search.slice(1);
            for (let query of search.split("&")) {
                let [key, value] = query.split("=");
                value = decodeURIComponent(value);
                try {
                    params[key] = JSON.parse(value);
                } catch (err) {
                    params[key] = value;
                }
            }
        } catch (err) {
            return this.error("Error parsing query string")
        }

        if (params.name === undefined)
            return this.error("API use requires query string 'name'")
        let args = [];
        for (let i = 0; i < 10; i++ ) {
            if (params[`arg${i}`] !== undefined)
                args.push(params[`arg${i}`]);
            else
                break;
        }
        console.log("Got request with params : ", params, args)
        this.socket.emit(params.name, ...args, (...args) => {
            return this.reply({query: params, result: args, success: true})
        });
    }
}

api = new APIModule();
window.addEventListener("DOMContentLoaded", () => api.processRequest());