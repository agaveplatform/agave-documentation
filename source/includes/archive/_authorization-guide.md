# Authorization Guide
```always
  /$$$$$$   /$$$$$$              /$$     /$$      
 /$$__  $$ /$$__  $$            | $$    | $$      
| $$  \ $$| $$  \ $$ /$$   /$$ /$$$$$$  | $$$$$$$ 
| $$  | $$| $$$$$$$$| $$  | $$|_  $$_/  | $$__  $$
| $$  | $$| $$__  $$| $$  | $$  | $$    | $$  \ $$
| $$  | $$| $$  | $$| $$  | $$  | $$ /$$| $$  | $$
|  $$$$$$/| $$  | $$|  $$$$$$/  |  $$$$/| $$  | $$
 \______/ |__/  |__/ \______/    \___/  |__/  |__/                                                          
                             
```

Most requests to the Agave REST APIs require authorization; that is, the user must have granted permission for an application to access the requested data. To prove that the user has granted permission, the request header sent by the application must include a valid access token.

Before you can begin the authorization process, you will need to <a title="Client Registration" href="/documentation/tutorials/client-registration/">register your client application</a>. That will give you a unique client key and secret key to use in the authorization flows.

## Supported Authorization Flows  

The Agave REST APIs currently supports four authorization flows:

1. The <a href="#authorization_code_flow">Authorization Code</a> flow first gets a code then exchanges it for an access token and a refresh token. Since the exchange uses your client secret key, you should make that request server-side to keep the integrity of the key. An advantage of this flow is that you can use refresh tokens to extend the validity of the access token.
2. The <a href="#implicit_grant_flow">Implicit Grant</a> flow is carried out client-side and does not involve secret keys. The access tokens that are issued are short-lived and there are no refresh tokens to extend them when they expire.
3. <a href="#resource_owner_flow">Resource Owner Password Credentials</a> flow is suitable for native and mobile applications as well as web services, this flow allows client applications to obtain an access token for a user by directly providing the user credentials in an authentication request. This flow exposes the user's credentials to the client application and is primarily used in situations where the client application is highly trusted such as the command line.
4. The <a href="#client_credentials_flow">Client Credentials</a> flow enables users to interact with their own protected resources directly without requiring browser interaction. This is a critical addition for use at the command line, in scripts, and in offline programs. This flow assumes the person registering the client application and the user on whose behalf requests are made be the same person.

[table id=6 /]

<aside class="notice"><b>Additional Help:</b> You can read our <a href="/tools/web-application-tutorial" title="Agave Web Application Tutorial">step-by-step tutorial</a> where we explain how to run an example application using these flows. In addition, we have a list of <a href="/tools/" title="Tools">handy wrappers and tools</a> for your language of choice.</aside>

### Token lifetimes

There are two kinds of tokens you will obtained: access and refresh. Access token lifetimes are configured by the organization operating each tenant and vary based on the flow used to obtain them. By default, access tokens are valid for 4 hours. 

Authorization Flow | Access Token Lifetime | Refresh Token Lifetime
----------|----------|------------
Authorization | 4 hours | infinite 
Implicit | 1 hour | n/a 
User Credential Password | 4 hours | infinite 
Client Credentials | 4 hours | n/a  
 

## Authorization Code

The method is suitable for long-running applications in which the user logs in once and the access token can be refreshed. Since the token exchange involves sending your secret key, this should happen on a secure location, like a backend service, not from a client like a browser or mobile apps. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>. This flow is also the authorization flow used in our REST API Tutorial.

<img src="/images/2014/09/Authorization-Code-Flow.png" alt="Authorization Code Flow Diagram" style="width: 100%; height: auto;"/>

### 1. Your application requests authorization  

```always
# A typical request will look something like this
GET https://public.tenants.agaveapi.co/authorize/?client_id=gTgp...SV8a&amp;response_type=code&amp;redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&amp;scope=PRODUCTION&amp;state=866
```

The authorization process starts with your application sending a request to the Agave authorization service. (The reason your application sends this request can vary: it may be a step in the initialization of your application or in response to some user action, like a button click.) The request is sent to the /authorize endpoint of the Authorization service:

The request will include parameters in the query string:

[table id=17 /]

### 2. The user is asked to authorize access within the scopes  

The Agave Authorization service presents details of the scopes for which access is being sought. If the user is not logged in, they are prompted to do so using their API username and password.

When the user is logged in, they are asked to authorize access to the actions and services defined in the scopes.

### 3. The user is redirected back to your specified URI  

```always
# Let's assume you provided the following callback URL
https://example.com/callback
```

After the user accepts (or denies) your request, the Agave Authorization service redirects back to the redirect_uri. If the user has accepted your request, the response query string contains a `code` parameter with the access code you will use in the next step to retrieve an access token. 

```always
# Sample success redirect back from the server
https://example.com/callback?code=Pq3S..M4sY&amp;state=866
```

[table id=18 /]

If the user has denied access, there will be no access token and the final URL will have a query string containing the following parameters:

```always
# Sample denial redirect back from the server 
https://example.com/callback?error=access_denied&amp;state=867
```

[table id=19 /]


### 4. Your application requests refresh and access tokens  

```always
POST https://public.tenants.agaveapi.co/token
```

When the authorization code has been received, you will need to exchange it with an access token by making a POST request to the Agave Authorization service, this time to its `/token` endpoint. The body of this POST request must contain the following parameters:

[table id=9 /]

### 5. The tokens are returned to your application  

```always
# An example cURL request 
curl -X POST -d "grant_type= authorization_code"
    -d "code=Pq3S..M4sY"
    -d "client_id=gTgp...SV8a"
    -d "client_secret=hZ_z3f...BOD6"
    "redirect_uri=https%3A%2F%2Fwww.foo.com%2Fauth" https://public.tenants.agaveapi.co/token
```  
```json
{
    "access_token": "a742...12d2",
    "expires_in": 14400,
    "refresh_token": "d77c...Sacf",
    "token_type": "bearer"
}
```

On success, the response from the Agave Authorization service has the status code 200 OK in the response header, and a JSON object with the fields in the following table in the response body:

[table id=10 /]


### 6. Use the access token to access the Agave REST APIs  

```always
# Request a refresh token
curl -H "Authorization: Bearer a742...12d2" https://public.tenants.agaveapi.co/profiles/v2/me?pretty=true&naked=true
```  
```json
{
    "create_time": "20140905072223Z",
    "email": "rjohnson@mlb.com",
    "first_name": "Randy",
    "full_name": "Randy Johnson",
    "last_name": "Johnson",
    "mobile_phone": "(123) 456-7890",
    "phone": "(123) 456-7890",
    "status": "Active",
    "uid": 0,
    "username": "rjohnson"
}
```

Once you have a valid access token, you can include it in `Authorization` header for all subsequent requests to APIs in the Platform.

### 7. Requesting access token from refresh token  

```always
curl -sku "Authorization: Basic Qt3c...Rm1y="
    -d grant_type=refresh_token
    -d refresh_token=d77c...Sacf https://public.tenants.agaveapi.co/token
``` 

> The response would look something like this.  

```json
{
    "access_token": "61e6...Mc96",
    "expires_in": 14400,
    "token_type": "bearer"
}
```

Access tokens are deliberately set to expire after a short time, usually 4 hours, after which new tokens may be granted by supplying the refresh token originally obtained during the authorization code exchange.

The request is sent to the token endpoint of the Agave Authorization service:

```
POST https://public.tenants.agaveapi.co/token
```

The body of this POST request must contain the following parameters:

[table id=11 /]

The header of this POST request must contain the following parameter:

[table id=12 /]


## Implicit Grant

Implicit grant flow is for clients that are implemented entirely using JavaScript and running in resource owner's browser. You do not need any server side code to use it. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/images/2014/09/Implicit-Flow.png" alt="Implicit Flow" style="width: 100%; height:auto"/>

### 1. Your application requests authorization  

```always
https://public.tenants.agaveapi.co/authorize?client_id=gTgp...SV8a&amp;redirect_uri=http:%2F%2Fexample.com%2Fcallback&amp;scope=PRODUCTION&amp;response_type=token&amp;state=867
```

The flow starts off with your application redirecting the user to the `/authorize` endpoint of the Authorization service. The request will include parameters in the query string:

[table id=16 /]


### 2. The user is asked to authorize access within the scopes  

The Agave Authorization service presents details of the scopes for which access is being sought. If the user is not logged in, they are prompted to do so using their API username and password.

When the user is logged in, they are asked to authorize access to the services defined in the scopes. By default all of the Core Science APIs fall under a single scope called, `PRODUCTION`.

### 3. The user is redirected back to your specified URI  

```always
# Let's assume we specified the following callback address 
https://example.com/callback

# A valid success response would be 
https://example.com/callback?access_token=Vr17...amUa&amp;token_type=bearer&amp;expires_in=3600&amp;state=867
```

After the user grants (or denies) access, the Agave Authorization service redirects the user to the `redirect_uri`. If the user has granted access, the final URL will contain the following data parameters in the query string.

[table id=18 /]

If the user has denied access, there will be no access token and the final URL will have a query string containing the following parameters:

```always
# Failed response
https://example.com/callback?error=access_denied&amp;state=867
```
[table id=19 /]

### 4. Use the access token to access the Agave REST APIs

```always
curl -H "Authorization: Bearer 61e6...Mc96" https://public.tenants.agaveapi.co/profiles/v2/me?pretty=true
``` 
```json
{
    "create_time": "20140905072223Z",
    "email": "nryan@mlb.com",
    "first_name": "Nolan",
    "full_name": "Nolan Ryan",
    "last_name": "Ryan",
    "mobile_phone": "(123) 456-7890",
    "phone": "(123) 456-7890",
    "status": "Active",
    "uid": 0,
    "username": "nryan"
}
```

The access token allows you to make requests to any of the Agave REST APIs on behalf of the authenticated user.


## Resource Owner Password Credentials

The method is suitable for scenarios where there is a high degree of trust between the end-user and the client application. This could be a Desktop application, shell script, or server-to-server communication where user authorization is needed. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/images/2014/09/Resource-Owner-Password-Flow.png" style="width:100%; height:auto;">

### 1. Your application requests authorization  

```always
curl -sku "Authorization: Basic Qt3c...Rm1y="
    -d grant_type=password
    -d username=rjohnson
    -d password=password
    -d scope=PRODUCTION https://public.tenants.agaveapi.co/token
``` 
```json    
{
    "access_token": "3Dsr...pv21",
    "expires_in": 14400,
    "refresh_token": "dyVa...MqR0",
    "token_type": "bearer"
}
```

The request is sent to the `/token` endpoint of the Agave Authentication service. The request will include the following parameters in the request body:

[table id=14 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

<aside class="notice">It is not necessary for the username and password sent in the authorization request correspond to those of the client credentials owner, you can obtain an access token for any user provided you have their username and password. It is important to note that this flow should ***only*** be used in situations of high trust where no browser is available to handle the HTTP redirects required by the Authorization Code flow. Collecting and/or unnecessarily exposing user passwords is a violation of the <a href="/terms-of-service/" title="Terms of Service">Terms of Service</a> and subject to immediate account revocation.</aside>

```always
https://example.com/callback?error=access_denied
```

If the user has not accepted your request or an error has occurred, the response query string contains an error parameter indicating the error that occurred during login. For example:

### 2. Use the access token to access the Agave REST APIs  

```always
curl -H "Authorization: Bearer 3Dsr...pv21" https://public.tenants.agaveapi.co/profiles/v2/me?pretty=true
```
```json
{
    "create_time": "20140905072223Z",
    "email": "rjohnson@mlb.com",
    "first_name": "Randy",
    "full_name": "Randy Johnson",
    "last_name": "Johnson",
    "mobile_phone": "(123) 456-7890",
    "phone": "(123) 456-7890",
    "status": "Active",
    "uid": 0,
    "username": "rjohnson"
}
```

The access token allows you to make requests to any of the Agave REST APIs on behalf of the authenticated user.

### 3. Requesting access token from refresh token  

```always
curl -sku "Authorization: Basic Qt3c...Rm1y="
    -d grant_type=refresh_token
    -d refresh_token=dyVa...MqR0
    -d scope=PRODUCTION https://public.tenants.agaveapi.co/token
```
```json
{
    "access_token": "8erF...NGly",
    "expires_in": 14400,
    "token_type": "bearer"
}
```

Access tokens are deliberately set to expire after a short time, usually 4 hours, after which new tokens may be granted by supplying the refresh token obtained during original request.

The request is sent to the token endpoint of the Agave Authorization service. The body of this POST request must contain the following parameters:

[table id=15 /]

The header of this POST request must contain the following parameter:

[table id=12 /]

## Client Credentials  

The method is suitable for authenticating your requests to the Agave REST API. This flow is described in <a href="http://tools.ietf.org/html/rfc6749#section-4.4" title="RFC-6749">RFC-6749</a>.

<img src="/images/2014/09/Client-Credentials-Flow.png" style="width:100%; height:auto;">

### 1. Your application requests authorization  

```always
curl -sku "Authorization: Basic Qt3c...Rm1y="
    -d grant_type=client_credentials
    -d scope=PRODUCTION https://public.tenants.agaveapi.co/token
```
```json
{
    "access_token": "61e6...Mc96",
    "expires_in": 14400,
    "token_type": "bearer"
}
```

The request is sent to the `/token` endpoint of the Agave Authentication service. The request must include the following parameters in the request body:

[table id=13 /]

The header of this POST request must contain the following parameter:

[table id=12 /]


### 2. Use the access token to access the Agave REST APIs  

```always
curl -H "Authorization: Bearer 61e6...Mc96" https://public.tenants.agaveapi.co/profiles/v2/me?pretty=true
``` 
```json
{
    "email": "nryan@mlb.com",
    "firstName" : "Nolan",
    "lastName" : "Ryan",
    "position" : "null",
    "institution" : "Houston Astros",
    "phone": "(123) 456-7890",
    "fax" : null,
    "researchArea" : null,
    "department" : null,
    "city" : "Houston",
    "state" : "TX",
    "country" : "USA",
    "gender" : "M",
    "_links" : {
      "self" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/nryan"
      },
      "users" : {
        "href" : "https://public.tenants.agaveapi.co/profiles/v2/nryan/users"
      }
    }
}
```

The access token allows you to make requests to any of the Agave REST APIs on behalf of the authenticated user.
