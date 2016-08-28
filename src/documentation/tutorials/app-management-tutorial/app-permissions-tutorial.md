<h2>Introduction</h2>

Apps have fine grained permissions similar to those found in the <a title="Job Management" href="/documentation/tutorials/job-management-tutorial/">Jobs</a> and <a title="File Management" href="/documentation/tutorials/data-management-tutorial/">Files</a> services. Using these, you can share your app other Agave users. App permissions are private by default, so when you first POST your app to the Apps service, you are the only one who can see it. You may share your app with other users by granting them varying degrees of permissions. The full list of app permission values are listed in the following table.

[table id=65 /]

App permissions are distinct from all other roles and permissions and do not have implications outside the Apps service. This means that if you want to allow someone to run a job using your app, it is not sufficient to grant them READ_EXECUTE permissions on your app. They must also have an appropriate user role on the execution system on which the app will run. Similarly, if you do not have the right to publish on the <code>executionSystem</code> or access the <code>deploymentPath</code> on the <code>deploymentSystem</code> in your app description, you will not be able to publish your app.

<h3>Listing permissions</h3>

App permissions are managed through a set of URLs consistent with the permission operations elsewhere in the API. To query for a user's permission for an app, perform a GET on the user's unique app permissions url.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/$USERNAME
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-list -v -u $USERNAME $APP_ID
```
[/tab][/tabgroup]

The response from the service will be a JSON object representing the user permission. If the user does not have a permission for that app, the permission value will be NONE. By default, only you have permission to your private apps. Public apps will return a single permission for the <em>public</em> meta user rather than return a permissions for every user.

[code lang=javascript]
{
    &quot;_links&quot;: {
        &quot;app&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID&quot;
        },
        &quot;profile&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/profiles/$API_VERSION/systest&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/systest&quot;
        }
    },
    &quot;permission&quot;: {
        &quot;execute&quot;: true,
        &quot;read&quot;: true,
        &quot;write&quot;: true
    },
    &quot;username&quot;: &quot;systest&quot;
}
[/code]

You can also query for all permissions granted on a specific app by making a GET request on the app's permission collection.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-list -v $APP_ID
```
[/tab][/tabgroup]

This time the service will respond with a JSON array of permission objects.

[code lang=javascript]
[  
   {  
      &quot;_links&quot;:{  
         &quot;app&quot;:{  
            &quot;href&quot;:&quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID&quot;
         },
         &quot;profile&quot;:{  
            &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/systest&quot;
         },
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/systest&quot;
         }
      },
      &quot;permission&quot;:{  
         &quot;execute&quot;:true,
         &quot;read&quot;:true,
         &quot;write&quot;:true
      },
      &quot;username&quot;:&quot;systest&quot;
   }
]
[/code]

<h3>Adding and updating permissions</h3>

Setting permissions is done by posting a JSON object containing a permission and username. Alternatively, you can POST just the permission and append the username to the URL.

[tabgroup]
[tab title="Curl"]
Grant permission to a single user
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;username=bgibson&amp;permission=READ&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems
```
Abbreviated POST data to grant permission to a single user
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;permission=READ&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/bgibson
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-update -v -u bgibson -p READ $APP_ID
```
[/tab]
[/tabgroup]

The response will contain a JSON object representing the permission that was just created.

[code lang=javascript]
{
    &quot;_links&quot;: {
        &quot;app&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID&quot;
        },
        &quot;profile&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/profiles/$API_VERSION/bgibson&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/bgibson&quot;
        }
    },
    &quot;permission&quot;: {
        &quot;execute&quot;: false,
        &quot;read&quot;: true,
        &quot;write&quot;: false
    },
    &quot;username&quot;: &quot;bgibson&quot;
}
[/code]

<h3>Deleting permissions</h3>

Permissions can be deleted on a user-by-user basis, or all at once. To delete an individual user permission, make a DELETE request on the user's app permission URL.

[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/bgibson
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-delete -u bgibson $APP_ID
```
[/tab]
[/tabgroup]

The response will be an empty result object.

You can accomplish the same thing by updating the user permission to an empty value or <em>NONE</em>.

[tabgroup]
[tab title="Curl"]
Delete permission for a single user by updating with a permission of NONE
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;username=bgibson&amp;permission=NONE&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems
```
Delete permission for a single user by updating with an empty permission value
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;permission=&quot; https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/bgibson
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-update -v -u bgibson $APP_ID
```
[/tab][/tabgroup]

Since this is an update operation, the resulting JSON permission object will be returned showing the user has no permissions to the app anymore.

[code lang=javascript]
{
    &quot;_links&quot;: {
        &quot;app&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID&quot;
        },
        &quot;profile&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/profiles/$API_VERSION/bgibson&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://$API_BASE_URL/apps/$API_VERSION/$APP_ID/pems/bgibson&quot;
        }
    },
    &quot;permission&quot;: {
        &quot;execute&quot;: false,
        &quot;read&quot;: false,
        &quot;write&quot;: false
    },
    &quot;username&quot;: &quot;bgibson&quot;
}
[/code]

To delete all permissions for an app, make a DELETE request on the app's permissions collection.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/apps/$API_VERSION/$APP_ID
```
[/tab]
[tab title="CLI"]
```bash
apps-pems-delete $APP_ID
```
[/tab]
[/tabgroup]

The response will be an empty result object.