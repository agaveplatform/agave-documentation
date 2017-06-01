## Authorization
```json
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

Before you can begin the authorization process, you will need to <a title="Client Registration" href="#client-registration/">register your client application</a>. That will give you a unique client key and secret key to use in the authorization flows.
