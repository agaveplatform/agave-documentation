<h2>Introduction</h2>

The Agave hosted identity service (profiles service) is a RESTful web service that gives organizations a way to create and manage the user accounts within their Agave tenant. The service is backed by a redundant LDAP instance hosted in multiple datacenters making it highly available. Additionally, passwords are stored using the openldap md5crypt algorithm.

Tenant administrators can manage only a basic set of fields on each user account within LDAP itself. For more complex profiles, we recommend combing the profiles service with the metadata service. See the section on Extending the Basic Profile with the Metadata Service below.

The service uses OAuth2 for authentication, and user's must have special privileges to create and update user accounts within the tenant. Please work with the Agave development team to make sure your admins have the user-account-manager role.

In addition to the web service, there is also a basic front-end web application providing user sign up. The web application will suffice for basic user profiles and can be used as a starting point for more advanced use cases.

[notice]This service should <b>NOT</b> be used for authenticating users. For details on using OAuth for authentication, see the <a href="http://agaveapi.co/?p=1161">Authorization Guide</a>[/notice]

<h2>Creating Users</h2>

Create a user account by sending a POST request to the profiles service, providing an access token of a user with the user-account-manager role. The fields username, password and email are required to create a new user.

[notice]Creating and managing accounts requires a special <span class="code">user-account-manager</span> role. As a best practice, we recommend setting up a separate, dedicated, account to handle user management. Please work with the Agave developer team if this is of interest to your organization.[/notice]

[tabgroup]

[tab title="Curl"]

```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;username=testuser&amp;password=abcd123&amp;email=testuser@test.com&quot; https://$API_BASE_URL/profiles/$API_VERSION
```
[/tab]

[tab title="CLI"]
```bash

```
[/tab]
[/tabgroup]

The response to this call for our example user looks like this:

[code lang=javascript]
{  
  &quot;message&quot;:&quot;User created successfully.&quot;,
  &quot;result&quot;:{  
    &quot;email&quot;:&quot;testuser@test.com&quot;,
    &quot;first_name&quot;:&quot;&quot;,
    &quot;full_name&quot;:&quot;testuser&quot;,
    &quot;last_name&quot;:&quot;testuser&quot;,
    &quot;mobile_phone&quot;:&quot;&quot;,
    &quot;phone&quot;:&quot;&quot;,
    &quot;status&quot;:&quot;Active&quot;,
    &quot;uid&quot;:null,
    &quot;username&quot;:&quot;testuser&quot;
  },
  &quot;status&quot;:&quot;success&quot;,
  &quot;version&quot;:&quot;2.0.0-SNAPSHOT-rc3fad&quot;
}
[/code]

The complete list of available fields and their descriptions is provided in the table below.
[table id=72 /]

Note that the service does not do any password strength enforcement or other password management policies. We leave it to each organization to implement the policies best suited for their use case.

<h3>Extending the Basic Profile with the Metadata Service</h3>

We do not expect the fields above to provide full support for anything but the most basic profiles. The recommended strategy is to use the profiles service in combination with the metadata service (see <a href="http://agaveapi.co/?p=1274" title="Metadata Management">Metadata Management</a> for more details) to store additional information. The metadata service allows you to create custom types using JSON schema, making it more flexible than standard LDAP from within a self-service model. Additionally, the metadata service includes a rich query interface for retrieving users based on arbitrary JSON queries.

The general approach used by existing tenants has been to create a single entry per user where the entry contains all additional profile data for the user. Every metadata item representing a user profile can be identified using a fixed string for the "name" attribute (e.g., "user_profile'). The value of the metadata item contains a unique identifier for the user (e.g. username or email address) along with all the additional fields you wish to track on the profile. One benefit of this approach is that it cleanly delineates multiple classes of profiles, for example "admin_profile", "developer_profile", "mathematician_profile", etc. When consuming this information in a web interface, such user-type grouping makes presentation significantly easier.

Another issue to consider when extending user profile information through the Metadata service is ownership. If you create the user's account, then prompt them to login before entering their extended data, it is possible to create the user's metadata record under their account. This has the advantage of giving the user full ownership over the information, however it also opens up the possibility that the user, or a third-party application, could modify or delete the record.

A better approach is to use a service account to create all extended profile metadata records and grant the user READ access on the record. This still allows third-party applications to access the user's information at their request, but prevents any malicious things from happening.

Here is a possible JSON document that could be used to store a metadata record representing a profile:

[code lang=javascript]
{  
  &quot;name&quot;:&quot;user_profile&quot;,
  &quot;value&quot;:{  
    &quot;firstName&quot;:&quot;Test&quot;,
    &quot;lastName&quot;:&quot;User&quot;,
    &quot;email&quot;:&quot;testuser@test.com&quot;,
    &quot;city&quot;:&quot;Springfield&quot;,
    &quot;state&quot;:&quot;IL&quot;,
    &quot;country&quot;:&quot;USA&quot;,
    &quot;phone&quot;:&quot;636-555-3226&quot;,
    &quot;gravatar&quot;:&quot;http://www.gravatar.com/avatar/ed53e691ee322e24d8cc843fff68ebc6&quot;
  }
}
[/code]

And here's a call to the Metadata service:
[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@profile_ex&quot; https://agave.iplantc.org/meta/v2/data/?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
metadata-addupdate -v -F profile_ex 
```
[/tab]
[/tabgroup]

and the response:

[code lang=javascript]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-rc0c5a&quot;,
  &quot;result&quot; : {
    &quot;uuid&quot; : &quot;0001429724043699-5056a550b8-0001-012&quot;,
    &quot;owner&quot; : &quot;jstubbs&quot;,
    &quot;schemaId&quot; : null,
    &quot;internalUsername&quot; : null,
    &quot;associationIds&quot; : [ ],
    &quot;lastUpdated&quot; : &quot;2015-04-22T12:34:03.698-05:00&quot;,
    &quot;name&quot; : &quot;user_profile&quot;,
    &quot;value&quot; : {
      &quot;firstName&quot; : &quot;Test&quot;,
      &quot;lastName&quot; : &quot;User&quot;,
      &quot;email&quot; : &quot;testuser@test.com&quot;,
      &quot;city&quot; : &quot;Springfield&quot;,
      &quot;state&quot; : &quot;IL&quot;,
      &quot;country&quot; : &quot;USA&quot;,
      &quot;phone&quot; : &quot;636-555-3226&quot;,
      &quot;gravatar&quot; : &quot;http://www.gravatar.com/avatar/ed53e691ee322e24d8cc843fff68ebc6&quot;
    },
    &quot;created&quot; : &quot;2015-04-22T12:34:03.698-05:00&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/meta/v2/data/0001429724043699-5056a550b8-0001-012&quot;
      }
    }
  }
}
[/code]

[notice]For even quicker access, you can associate the metadata record with the UUID of the user through the associationIds attribute. See the <a href="http://agaveapi.co/documentation/tutorials/metadata-management-tutorial/" title="Metadata Management Tutorial">Metadata Tutorial</a> for more information about efficient storing and searching of metadata.[/notice]

<h2>Updating Users</h2>

Updates to existing users can be made by sending a PUT request to https://$API_BASE_URL/profiles/$API_VERSION/ and passing the fields to update. For example, we can add a <code>gravatar</code> attribute to the account we created above.

[tabgroup]
[tab title="Curl"]
```bash  
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;password=abcd123&amp;email=testuser@test.com&amp;first_name=Test&amp;last_name=User&quot; https://$API_BASE_URL/profiles/$API_VERSION/testuser
```
[/tab]
[tab title="CLI"]
```bash  
profiles-update -v -p abcd123 -e &quot;testuser@test.com&quot; -f Test -l User testuser
```
[/tab]
[/tabgroup]

The response to this call looks like this:

[code lang=javascript]
{  
  &quot;message&quot;:&quot;User updated successfully.&quot;,
  &quot;result&quot;:{  
    &quot;create_time&quot;:&quot;20150421153504Z&quot;,
    &quot;email&quot;:&quot;testuser@test.com&quot;,
    &quot;first_name&quot;:&quot;Test&quot;,
    &quot;full_name&quot;:&quot;Test User&quot;,
    &quot;last_name&quot;:&quot;User&quot;,
    &quot;mobile_phone&quot;:&quot;&quot;,
    &quot;phone&quot;:&quot;&quot;,
    &quot;status&quot;:&quot;Active&quot;,
    &quot;uid&quot;:0,
    &quot;username&quot;:&quot;testuser&quot;
  },
  &quot;status&quot;:&quot;success&quot;,
  &quot;version&quot;:&quot;2.0.0-SNAPSHOT-rc3fad&quot;
}
[/code]

<h2>Deleting Users</h2>

Deleting existing users can be made by sending a DELETE request to https://$API_BASE_URL/profiles/$API_VERSION/ - for example:

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/profiles/$API_VERSION/testuser
```
[/tab]
[tab title="CLI"]
```bash
profiles-delete -v testuser
```
[/tab]
[/tabgroup]

The response to this call looks like this:

[code lang=javascript]
{
&quot;message&quot;: &quot;User deleted successfully.&quot;,
&quot;result&quot;: {},
&quot;status&quot;: &quot;success&quot;,
&quot;version&quot;: &quot;2.0.0-SNAPSHOT-rc3fad&quot;
}
[/code]

<h2>Account Creation Web Application</h2>

The account creation web app provides a simple form to enable user self-sign. Here is a screenshot of the sign up form:

<img src="http://agaveapi.co/wp-content/uploads/2015/04/self-signup-screenshot.png" alt="Account creation web app form" />

The web application also provides an email loop for verification of new accounts. The code is open source and freely available from bitbucket: <a href="https://bitbucket.org/jstubbs/agave_id">Account Creation Web Application</a>

Most likely you will want to customize the branding and other aspects of the application, but for simple use cases, the Agave team can deploy a stock instance of the application in your tenant. Work with the Agave developer team if this is of interest to your organization.