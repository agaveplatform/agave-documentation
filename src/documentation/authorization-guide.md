<h2>Introduction</h2>

Most requests to the Agave REST APIs require authorization; that is, the user must have granted permission for an application to access the requested data. To prove that the user has granted permission, the request header sent by the application must include a valid access token.

Before you can begin the authorization process, you will need to <a title="Client Registration" href="/documentation/tutorials/client-registration/">register your client application</a>. That will give you a unique client key and secret key to use in the authorization flows.

<h2>Supported Authorization Flows</h2>

The Agave REST APIs currently supports four authorization flows:

<ol>
<li>The <a href="#authorization_code_flow">Authorization Code</a> flow first gets a code then exchanges it for an access token and a refresh token. Since the exchange uses your client secret key, you should make that request server-side to keep the integrity of the key. An advantage of this flow is that you can use refresh tokens to extend the validity of the access token.</p></li>
<li><p>The <a href="#implicit_grant_flow">Implicit Grant</a> flow is carried out client-side and does not involve secret keys. The access tokens that are issued are short-lived and there are no refresh tokens to extend them when they expire.</p></li>
<li><p><a href="#resource_owner_flow">Resource Owner Password Credentials</a> flow is suitable for native and mobile applications as well as web services, this flow allows client applications to obtain an access token for a user by directly providing the user credentials in an authentication request. This flow exposes the user's credentials to the client application and is primarily used in situations where the client application is highly trusted such as the command line.</p></li>
<li><p>The <a href="#client_credentials_flow">Client Credentials</a> flow enables users to interact with their own protected resources directly without requiring browser interaction. This is a critical addition for use at the command line, in scripts, and in offline programs. This flow assumes the person registering the client application and the user on whose behalf requests are made be the same person.</p></li>
</ol>

<p>[table id=6 /]

[notice]<b>Additional Help:</b> You can read our <a href="/tools/web-application-tutorial" title="Agave Web Application Tutorial">step-by-step tutorial</a> where we explain how to run an example application using these flows. In addition, we have a list of <a href="/tools/" title="Tools">handy wrappers and tools</a> for your language of choice.[/notice]

<h2><a id="authorization_code_flow"></a>Authorization Code</h2>

The method is suitable for long-running applications in which the user logs in once and the access token can be refreshed. Since the token exchange involves sending your secret key, this should happen on a secure location, like a backend service, not from a client like a browser or mobile apps. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>. This flow is also the authorization flow used in our REST API Tutorial.

<img src="/wp-content/uploads/2014/09/Authorization-Code-Flow.png" alt="Authorization Code Flow Diagram" style="width: 100%; height: auto;"/>

<h3>1. Your application requests authorization</h3>

The authorization process starts with your application sending a request to the Agave authorization service. (The reason your application sends this request can vary: it may be a step in the initialization of your application or in response to some user action, like a button click.) The request is sent to the /authorize endpoint of the Authorization service:

[code lang=bash]
GET https://agave.iplantc.org/authorize
[/code]

The request will include parameters in the query string:

[table id=17 /]

A typical request looks like this:

[code lang=bash]
GET https://agave.iplantc.org/authorize/?client_id=gTgp...SV8a&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&amp;scope=PRODUCTION&amp;state=866
[/code]

<h3>2. The user is asked to authorize access within the scopes</h3>

The Agave Authorization service presents details of the scopes for which access is being sought. If the user is not logged in, they are prompted to do so using their API username and password.

When the user is logged in, they are asked to authorize access to the actions and services defined in the scopes.

<h3>3. The user is redirected back to your specified URI</h3>

After the user accepts (or denies) your request, the Agave Authorization service redirects back to the redirect_uri. For our example, this would be the address:

[code lang=bash]
https://example.com/callback
[/code]

If the user has accepted your request, the response query string contains a <code>code</code> parameter with the access code you will use in the next step to retrieve an access token. For example:

[table id=18 /]

For example:

[code lang=bash]
https://example.com/callback?code=Pq3S..M4sY&amp;state=866
[/code]

If the user has denied access, there will be no access token and the final URL will have a query string containing the following parameters:

[table id=19 /]

For example:

[code lang=bash]
https://example.com/callback?error=access_denied&amp;state=867
[/code]

<h3>4. Your application requests refresh and access tokens</h3>

When the authorization code has been received, you will need to exchange it with an access token by making a POST request to the Agave Authorization service, this time to its <code>/token</code> endpoint:

[code lang=bash]
POST https://agave.iplantc.org/token
[/code]

The body of this POST request must contain the following parameters:

[table id=9 /]

<h3>5. The tokens are returned to your application</h3>

On success, the response from the Agave Authorization service has the status code 200 OK in the response header, and the following JSON data in the response body:

[table id=10 /]

An example cURL request and response from the token endpoint will look something like this:

[code lang=bash]
curl -X POST -d &quot;grant_type= authorization_code&quot; 
    -d &quot;code=Pq3S..M4sY&quot; 
    -d &quot;client_id=gTgp...SV8a&quot; 
    -d &quot;client_secret=hZ_z3f...BOD6&quot; 
    &quot;redirect_uri=https%3A%2F%2Fwww.foo.com%2Fauth&quot; https://agave.iplantc.org/token
[/code]

[code lang=javascript]
{
    &quot;access_token&quot;: &quot;a742...12d2&quot;,
    &quot;expires_in&quot;: 14400,
    &quot;refresh_token&quot;: &quot;d77c...Sacf&quot;,
    &quot;token_type&quot;: &quot;bearer&quot;
}
[/code]

<h3>6. Use the access token to access the Agave REST APIs</h3>

The access token allows you to make requests to the Agave REST APIs on a behalf of a user, for example:

[code lang=bash]
curl -H &quot;Authorization: Bearer a742...12d2&quot; https://agave.iplantc.org/profiles/v2/me?pretty=true
[/code]

[code lang=javascript]
{
    &quot;create_time&quot;: &quot;20140905072223Z&quot;,
    &quot;email&quot;: &quot;rjohnson@mlb.com&quot;,
    &quot;first_name&quot;: &quot;Randy&quot;,
    &quot;full_name&quot;: &quot;Randy Johnson&quot;,
    &quot;last_name&quot;: &quot;Johnson&quot;,
    &quot;mobile_phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;status&quot;: &quot;Active&quot;,
    &quot;uid&quot;: 0,
    &quot;username&quot;: &quot;rjohnson&quot;
}
[/code]

<h3>7. Requesting access token from refresh token</h3>

Access tokens are deliberately set to expire after a short time, usually 4 hours, after which new tokens may be granted by supplying the refresh token originally obtained during the authorization code exchange.

The request is sent to the token endpoint of the Agave Authorization service:

[code lang=bash]
POST https://agave.iplantc.org/token
[/code]

The body of this POST request must contain the following parameters:

[table id=11 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

For example:

[code lang=bash]
curl -sku &quot;Authorization: Basic Qt3c...Rm1y=&quot; 
    -d grant_type=refresh_token 
    -d refresh_token=d77c...Sacf https://agave.iplantc.org/token
[/code]

[code lang=javascript]
{
    &quot;access_token&quot;: &quot;61e6...Mc96&quot;,
    &quot;expires_in&quot;: 14400,
    &quot;token_type&quot;: &quot;bearer&quot;
}
[/code]

<h2><a id="implicit_grant_flow"></a>Implicit Grant</h2>

Implicit grant flow is for clients that are implemented entirely using JavaScript and running in resource owner's browser. You do not need any server side code to use it. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/wp-content/uploads/2014/09/Implicit-Flow.png" alt="Implicit Flow" style="width: 100%; height:auto"/>

<h3>1. Your application requests authorization</h3>

Redirect the user to the /authorize endpoint of the Accounts service:

[code lang=bash]
GET https://agave.iplantc.org/authorize
[/code]

The request will include parameters in the query string:

[table id=16 /]

For example you would redirect the user to

[code lang=bash]
https://agave.iplantc.org/authorize?client_id=gTgp...SV8a&amp;redirect_uri=http:%2F%2Fexample.com%2Fcallback&amp;scope=PRODUCTION&amp;response_type=token&amp;state=867
[/code]

<h3>2. The user is asked to authorize access within the scopes</h3>

The Agave Authorization service presents details of the scopes for which access is being sought. If the user is not logged in, they are prompted to do so using their API username and password.

When the user is logged in, they are asked to authorize access to the data sets defined in the scopes.

<h3>3. The user is redirected back to your specified URI</h3>

After the user grants (or denies) access, the Agave Authorization service redirects the user to the <code>redirect_uri</code>. For our example, this would be the address:

[code lang=bash]
https://example.com/callback
[/code]

If the user has granted access, the final URL will contain the following data parameters in the query string:

[table id=18 /]

For example:

[code lang=bash]
https://example.com/callback?access_token=Vr17...amUa&amp;token_type=bearer&amp;expires_in=14400&amp;state=867
[/code]

If the user has denied access, there will be no access token and the final URL will have a query string containing the following parameters:

[table id=19 /]

For example:

[code lang=bash]
https://example.com/callback?error=access_denied&amp;state=867
[/code]

<h2><a id="resource_owner_flow"></a>Resource Owner Password Credentials</h2>

The method is suitable for scenarios where there is a high degree of trust between the end-user and the client application. This could be a Desktop application, shell script, or server-to-server communication where user authorization is needed. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/wp-content/uploads/2014/09/Resource-Owner-Password-Flow.png" style="width:100%; height:auto;">

<h3>1. Your application requests authorization</h3>

The request is sent to the <code>/token</code> endpoint of the Agave Authentication service.

[code lang=bash]
POST https://agave.iplantc.org/token
[/code]

The request will include the following parameters in the request body:

[table id=14 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

For example:

[code lang=bash]
curl -sku &quot;Authorization: Basic Qt3c...Rm1y=&quot; 
    -d grant_type=password 
    -d username=rjohnson 
    -d password=password 
    -d scope=PRODUCTION https://agave.iplantc.org/token
[/code]

[code lang=javascript]
{
    &quot;access_token&quot;: &quot;3Dsr...pv21&quot;,
    &quot;expires_in&quot;: 14400,
    &quot;refresh_token&quot;: &quot;dyVa...MqR0&quot;,
    &quot;token_type&quot;: &quot;bearer&quot;
}
[/code]

[notice]It is not necessary for the username and password sent in the authorization request correspond to those of the client credentials owner, you can obtain an access token for any user provided you have their username and password. It is important to note that this flow should ***only*** be used in situations of high trust where no browser is available to handle the HTTP redirects required by the Authorization Code flow. Collecting and/or unnecessarily exposing user passwords is a violation of the <a href="/terms-of-service/" title="Terms of Service">Terms of Service</a> and subject to immediate account revocation.[/notice]

If the user has not accepted your request or an error has occurred, the response query string contains an error parameter indicating the error that occurred during login. For example:

[code lang=bash]
https://example.com/callback?error=access_denied
[/code]

<h3>2. Use the access token to access the Agave REST APIs</h3>

The access token allows you to make requests to any of the Agave REST APIs on behalf of the authenticated user.

[code lang=bash]
curl -H &quot;Authorization: Bearer 3Dsr...pv21&quot; https://agave.iplantc.org/profiles/v2/me?pretty=true
[/code]

[code lang=javascript]
{
    &quot;create_time&quot;: &quot;20140905072223Z&quot;,
    &quot;email&quot;: &quot;rjohnson@mlb.com&quot;,
    &quot;first_name&quot;: &quot;Randy&quot;,
    &quot;full_name&quot;: &quot;Randy Johnson&quot;,
    &quot;last_name&quot;: &quot;Johnson&quot;,
    &quot;mobile_phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;status&quot;: &quot;Active&quot;,
    &quot;uid&quot;: 0,
    &quot;username&quot;: &quot;rjohnson&quot;
}
[/code]

<h3>3. Requesting access token from refresh token</h3>

Access tokens are deliberately set to expire after a short time, usually 4 hours, after which new tokens may be granted by supplying the refresh token obtained during original request.

The request is sent to the token endpoint of the Agave Authorization service:

[code lang=bash]
POST https://agave.iplantc.org/token
[/code]

The body of this POST request must contain the following parameters:

[table id=15 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

For example:

[code lang=bash]
curl -sku &quot;Authorization: Basic Qt3c...Rm1y=&quot; 
    -d grant_type=refresh_token 
    -d refresh_token=dyVa...MqR0 
    -d scope=PRODUCTION https://agave.iplantc.org/token
[/code]

[code lang=javascript]
{
    &quot;access_token&quot;: &quot;8erF...NGly&quot;,
    &quot;expires_in&quot;: 14400,
    &quot;token_type&quot;: &quot;bearer&quot;
}
[/code]

<h2><a id="client_credentials_flow"></a>Client Credentials</h2>

The method is suitable for authenticating your requests to the Agave REST API. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/wp-content/uploads/2014/09/Client-Credentials-Flow.png" style="width:100%; height:auto;">

<h3>1. Your application requests authorization</h3>

The request is sent to the <code>/token</code> endpoint of the Agave Authentication service:

[code lang=bash]
POST https://agave.iplantc.org/token
[/code]

The request will include parameters in the request body:

[table id=13 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

For example:

[code lang=bash]
curl -sku &quot;Authorization: Basic Qt3c...Rm1y=&quot; 
    -d grant_type=client_credentials 
    -d scope=PRODUCTION https://agave.iplantc.org/token
[/code]

[code lang=javascript]
{
    &quot;access_token&quot;: &quot;61e6...Mc96&quot;,
    &quot;expires_in&quot;: 14400,
    &quot;token_type&quot;: &quot;bearer&quot;
}
[/code]

<h3>2. Use the access token to access the Agave REST APIs</h3>

Agave REST APIs that do not require user authorization or which are owned by user who registered the client application:

[code lang=bash]
curl -H &quot;Authorization: Bearer 61e6...Mc96&quot; https://agave.iplantc.org/profiles/v2/me?pretty=true
[/code]

[code lang=javascript]
{
    &quot;create_time&quot;: &quot;20140905072223Z&quot;,
    &quot;email&quot;: &quot;nryan@mlb.com&quot;,
    &quot;first_name&quot;: &quot;Nolan&quot;,
    &quot;full_name&quot;: &quot;Nolan Ryan&quot;,
    &quot;last_name&quot;: &quot;Ryan&quot;,
    &quot;mobile_phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;phone&quot;: &quot;(123) 456-7890&quot;,
    &quot;status&quot;: &quot;Active&quot;,
    &quot;uid&quot;: 0,
    &quot;username&quot;: &quot;nryan&quot;
}
[/code]