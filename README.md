# API

This modules makes the Foudry VTT API accessible via HTTP.

This is still a proof of concept

# Format

You can access the API page through your game URL with the path `/modules/api/api.html` and you can specify what API to emit with the query string `name` and you can pass optional arguments to it through the parameters `arg0`, `arg1`, `arg2`, etc.. up to `arg9`.

Arguments can be in a url encoded JSON string, or a literal string.

The response you receive will be a json object with a boolean `success` field to indicate if the call was successful or not. If an error occured, a `error` field will contain the error message. Otherwise, a `result` field will contain the response from the server.

For the API to work, you must be already logged in with the same browser, and all API calls will be sent as that user.

# Installation
In the setup page of FVTT, Install the module by entering the following URL : `https://raw.githubusercontent.com/kakaroto/fvtt-module-api/master/module.json`

Once installed, the API will be available, regardless on whether or not the module is enabled for the world.

# License
This Foundry VTT module, writen by KaKaRoTo, is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

This work is licensed under Foundry Virtual Tabletop [EULA - Limited License Agreement for module development v 0.1.6](http://foundryvtt.com/pages/license.html).
