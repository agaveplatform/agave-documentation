<h2>Introduction</h2>

Agave provides a service for searching and viewing profile information about users associated with your tenant of the API. Generally speaking, these would be other people who were issued accounts by the same organization that issued you the username and password you used to login to this developer portal.

<h3>Viewing a specific user profile</h3>

[tabgroup]
[tab title="Curl"]
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/profiles/$API_VERSION/me
```  
[/tab][tab title="CLI"]
```bash  
profiles-list -v me
```  
[/tab][/tabgroup]

The response from the service will resemble the following:

[code lang=javascript]
{
  &quot;status&quot;:&quot;success&quot;,
  &quot;message&quot;:&quot;&quot;,
  &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8244&quot;,
  &quot;result&quot;:[
     {
        &quot;username&quot;:&quot;nryan&quot;,
        &quot;email&quot;:&quot;nryan@astros.mlb.com&quot;,
        &quot;firstName&quot;:&quot;Nolan&quot;,
        &quot;lastName&quot;:&quot;Ryan&quot;,
        &quot;position&quot;:&quot;Pitcher&quot;,
        &quot;institution&quot;:&quot;Baseball&quot;,
        &quot;phone&quot;:&quot;(817) 273-5222&quot;,
        &quot;fax&quot;:null,
        &quot;researchArea&quot;:null,
        &quot;department&quot;:null,
        &quot;city&quot;:&quot;Houston&quot;,
        &quot;state&quot;:&quot;TX&quot;,
        &quot;country&quot;:&quot;USA&quot;,
        &quot;gender&quot;:&quot;MALE&quot;,
        &quot;_links&quot;:{
           &quot;self&quot;:{
&quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan&quot;
           },
           &quot;users&quot;:{
&quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan/users&quot;
           }
        }
     }
  ]
}
[/code]

<h2>Searching for other users</h2>

It is also possible to search for users by partial name, email address, or username. The syntax for these queries are as follows:
[tabgroup][tab title="Curl"]
Search by name:
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; http://$API_BASE_URL/profiles/$API_VERSION/search/name/$NAME
```  
Search by email address:
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; http://$API_BASE_URL/profiles/$API_VERSION/search/name/$EMAIL
```  
Search by username:
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; http://$API_BASE_URL/profiles/$API_VERSION/search/username/$USERNAME
```  
[/tab]
[tab title="CLI"]
Search by name:
```bash  
profiles-list -v -N $NAME
```  
Search by email address:
```bash  
profiles-list -v -E $EMAIL
```  
Search by username:
```bash  
profiles-list -v -U $USERNAME
```  
[/tab][/tabgroup]

Search values can be partial values. The service will look for case-insensitive matches for the given value anywhere within the specified field. For name searches, the service will look for matches in the user's first name, last name, and first name + last name separated by a space.

<h2>Identity Management</h2>

Agave's hosted Identity service supports full CRUD access to user accounts through a REST API and an OpenLDAP interface. Extensive documentation on the OpenLDAP interface can be found on the OpenLDAP <a href="http://www.openldap.org/" title="OpenLDAP" target="_blank">website</a> and is beyond the scope of this document. For more information on how to create a tenant of Agave for your project or organization, please reach out to dooley [at] tacc [dot] utexas [dot] edu.

[notice]If your organization runs their own identity service, the information available through the Profiles will most likely be restricted to read only access. This will still allow you to search for and view other users, but you will not be able to do things like update your personal profile information or create new user accounts. To do that, consult your organization's user portal or contact their user support team.[/notice]

<h2>Creating users</h2>

To create a new user profile, send a POST request with a JSON description of the user to the <code>/profiles/$API_VERSION/</code> endpoint.

[tabgroup]
[tab title="Curl"]
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; 
   --data &#039;{&quot;username&quot;:&quot;rclemens&quot;,&quot;email&quot;:&quot;rclemens@mlb.com&quot;, &quot;firstname&quot;:&quot;Roger&quot;,&quot;lastname&quot;:&quot;Clemens&quot;}&#039; 
   &quot;https://$API_BASE_URL/profiles/$API_VERSION/
```  
[/tab][tab title="CLI"]
```bash  
profiles-addupdate -v -F rclemens.json
```  
[/tab][/tabgroup]

The response from the service will resemble the following:

[code lang=javascript]
{
  &quot;status&quot;:&quot;success&quot;,
  &quot;message&quot;:&quot;&quot;,
  &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8244&quot;,
  &quot;result&quot;:[
     {
        &quot;username&quot;:&quot;rclemens&quot;,
        &quot;email&quot;:&quot;rclemens@mlb.com&quot;,
        &quot;firstName&quot;:&quot;Roger&quot;,
        &quot;lastName&quot;:&quot;Clemens&quot;,
        &quot;position&quot;:null,
        &quot;institution&quot;:null,
        &quot;phone&quot;:null,
        &quot;fax&quot;:null,
        &quot;researchArea&quot;:null,
        &quot;department&quot;:null,
        &quot;city&quot;:null,
        &quot;state&quot;:null,
        &quot;country&quot;:null,
        &quot;gender&quot;:&quot;MALE&quot;,
        &quot;_links&quot;:{
           &quot;self&quot;:{
&quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens&quot;
           },
           &quot;users&quot;:{
&quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens/users&quot;
           }
        }
     }
  ]
}
[/code]

<h2>Updating users</h2>

To update a user profile, make a PUT request to the URI of the user, passing the
updated description of the user in the payload.

[tabgroup]
[tab title="Curl"]
```bash  
curl -sk -X PUT -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; 
   --data &#039;{&quot;username&quot;:&quot;rclemens&quot;,&quot;email&quot;:&quot;rclemens@mlb.com&quot;, &quot;firstname&quot;:&quot;Roger&quot;,&quot;lastname&quot;:&quot;Clemens&quot;}&#039; 
   &quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens
```  
[/tab][tab title="CLI"]
```bash  
profiles-addupdate -v -F profile.json
```  
[/tab][/tabgroup]

The response from the service will resemble the following:

[code lang=javascript]
[  
  {  
    &quot;username&quot;:&quot;rclemens&quot;,
    &quot;email&quot;:&quot;rclemens@mlb.com&quot;,
    &quot;firstName&quot;:&quot;Roger&quot;,
    &quot;lastName&quot;:&quot;Clemens&quot;,
    &quot;position&quot;:null,
    &quot;institution&quot;:null,
    &quot;phone&quot;:null,
    &quot;fax&quot;:null,
    &quot;researchArea&quot;:null,
    &quot;department&quot;:null,
    &quot;city&quot;:null,
    &quot;state&quot;:null,
    &quot;country&quot;:null,
    &quot;gender&quot;:&quot;MALE&quot;,
    &quot;_links&quot;:{  
      &quot;self&quot;:{  
        &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens&quot;
      },
      &quot;users&quot;:{  
        &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens/users&quot;
      }
    }
  }
]
[/code]

<h2>Deleting users</h2>

To delete a user profile, make a DELETE request to the URI of the user.

[tabgroup]
[tab title="Curl"]
```bash  
curl -sk -X DELETE -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; 
   &quot;https://$API_BASE_URL/profiles/$API_VERSION/rclemens
```  
[/tab][tab title="CLI"]
```bash  
profiles-users-delete -v rclemens
```  
[/tab][/tabgroup]

The response from the service will be an empty result object.

[code lang=javascript]
{}
[/code]

<h2>User roles</h2>

Agave supports three user roles: user, tenant admin, and super admin. Each role is described in the following table. User roles are currently assigned and managed by Agave staff. If you need help configuring user roles for your tenant, please contact your tenant admin at $TENANT_ADMIN_EMAIL.

[table id=56 /]