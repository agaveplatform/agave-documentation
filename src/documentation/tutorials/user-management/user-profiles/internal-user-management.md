Historically many gateways providing access to HPC resources have utilized a single, shared community account through which all compute and storage activity is performed. This has several advantages, not the least of which is significantly reduced complexity in the back end infrastructure of the gateway.

While convenient for the gateway developers, this approach was not sustainable for the gateway owners because aggregate usage by all the gateway users quickly outgrew the resources available under a single community account.

The result was that gateways would experience an initial surge of new users followed by a plateau, then an oscillating cycle of usage and inactivity that was always bound by the total compute and storage resources available to the community account.

The gateways that successfully navigated this obstacle did so by implementing a mechanism where users could provide their own storage and compute accounts that the gateway would use on their behalf, thereby reducing demand on the community account resources while still reaping the full benefit of the gateway.

Agave supports each of these scenarios through its concept of Internal Users. An internal user is a profile object similar to those described by the Profiles service, but localized to a single user account. That is to say, if our tutorial example user, nryan, creates an internal user named bgibson, then bgibson will only be visible to nryan and not to any other user.

If you plan to take advantage of the Files, Systems, or Jobs services, you can assign authentication credentials for internal users on each system. When you authenticate to those services, the service will use the credentials of the internal user attached to the authentication token rather than the default account. This allows you to leverage both community and individual accounts through your application. [notice]For more information on how to attach internal user identities to authentication tokens, see the <a title="Authentication Tutorial" href="http://agaveapi.co/authentication-tutorial/">Authentication Tutorial</a>.[/notice][title size="3"]Creating a new interal user[/title]Creating a new internal user is done by posting to the internal users collection. Internal users have several preset fields, most of which are optional. The only required fields are username and email address. Usernames must be unique within the context of your application. An example of creating a new internal user is given below. [code]curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; -X POST --data &quot;{'username':'bgibson', 'email':'bgibson@dodgers.com'}&quot; https://$API_BASE_URL/profiles/$API_VERSION/nryan/users[/code][code]{
   &quot;status&quot;:&quot;success&quot;,
   &quot;message&quot;:null,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8236&quot;,
   &quot;result&quot;:[
      {
         &quot;status&quot;:&quot;active&quot;,
         &quot;city&quot;:null,
         &quot;country&quot;:&quot;United States&quot;,
         &quot;createdBy&quot;:&quot;nryan&quot;,
         &quot;department&quot;:null,
         &quot;email&quot;:&quot;bgibson@dodgers.com&quot;,
         &quot;fax&quot;:null,
         &quot;firstName&quot;:null,
         &quot;gender&quot;:&quot;&quot;,
         &quot;institution&quot;:null,
         &quot;lastName&quot;:null,
         &quot;phone&quot;:null,
         &quot;position&quot;:null,
         &quot;researchArea&quot;:null,
         &quot;state&quot;:null,
         &quot;username&quot;:&quot;bgibson&quot;,
         &quot;_links&quot;:{
            &quot;profile&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan&quot;
            },
            &quot;self&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan/users/bgibson&quot;
            }
         }
      }
   ]
}[/code]

[title size="3"]Updating an internal user[/title] Updating the user later on is done by posting to the "self" link in the response snippet.[code]curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; -X POST --data &quot;{'username':'bgibson', 'email':'bgibson@dodgers.com', 'firstName':'Bob', 'lastName':'Gibson', 'position': 'pitcher'}&quot; https://$API_BASE_URL/profiles/$API_VERSION/nryan/users/bgibson[/code][code]{
   &quot;status&quot;:&quot;success&quot;,
   &quot;message&quot;:null,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8236&quot;,
   &quot;result&quot;:[
      {
         &quot;status&quot;:&quot;active&quot;,
         &quot;city&quot;:null,
         &quot;country&quot;:null,
         &quot;createdBy&quot;:&quot;nryan&quot;,
         &quot;department&quot;:null,
         &quot;email&quot;:&quot;bgibson@dodgers.com&quot;,
         &quot;fax&quot;:null,
         &quot;firstName&quot;:&quot;Bob&quot;,
         &quot;gender&quot;:&quot;&quot;,
         &quot;institution&quot;:null,
         &quot;lastName&quot;:&quot;Gibson&quot;,
         &quot;phone&quot;:null,
         &quot;position&quot;:&quot;pitcher&quot;,
         &quot;researchArea&quot;:null,
         &quot;state&quot;:null,
         &quot;username&quot;:&quot;bgibson&quot;,
         &quot;_links&quot;:{
            &quot;profile&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan&quot;
            },
            &quot;self&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan/users/bgibson&quot;
            }
         }
      }
   ]
}[/code]

[title size="3"]Creating a new interal user[/title] A list of internal users can be obtained by querying the internal user collection. [code]curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; https://$API_BASE_URL/profiles/$API_VERSION/nryan/users[/code][code]{
   &quot;status&quot;:&quot;success&quot;,
   &quot;message&quot;:null,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8236&quot;,
   &quot;result&quot;:[
      {
         &quot;status&quot;:&quot;active&quot;,
         &quot;city&quot;:null,
         &quot;country&quot;:null,
         &quot;createdBy&quot;:&quot;nryan&quot;,
         &quot;department&quot;:null,
         &quot;email&quot;:&quot;bgibson@dodgers.com&quot;,
         &quot;fax&quot;:null,
         &quot;firstName&quot;:&quot;Bob&quot;,
         &quot;gender&quot;:&quot;&quot;,
         &quot;institution&quot;:null,
         &quot;lastName&quot;:&quot;Gibson&quot;,
         &quot;phone&quot;:null,
         &quot;position&quot;:&quot;pitcher&quot;,
         &quot;researchArea&quot;:null,
         &quot;state&quot;:null,
         &quot;username&quot;:&quot;bgibson&quot;,
         &quot;_links&quot;:{
            &quot;profile&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan&quot;
            },
            &quot;self&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan/users/bgibson&quot;
            }
         }
      },
      {
         &quot;status&quot;:&quot;active&quot;,
         &quot;city&quot;:null,
         &quot;country&quot;:null,
         &quot;createdBy&quot;:&quot;nryan&quot;,
         &quot;department&quot;:null,
         &quot;email&quot;:&quot;spaige@dodgers.com&quot;,
         &quot;fax&quot;:null,
         &quot;firstName&quot;:&quot;Satchel&quot;,
         &quot;gender&quot;:&quot;&quot;,
         &quot;institution&quot;:null,
         &quot;lastName&quot;:&quot;Paige&quot;,
         &quot;phone&quot;:null,
         &quot;position&quot;:&quot;pitcher&quot;,
         &quot;researchArea&quot;:null,
         &quot;state&quot;:null,
         &quot;username&quot;:&quot;spaige&quot;,
         &quot;_links&quot;:{
            &quot;profile&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan&quot;
            },
            &quot;self&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/profiles/$API_VERSION/nryan/users/spaige&quot;
            }
         }
      }
   ]
}[/code]

[title size="3"]Deleting an internal user[/title] Deleting an internal user is done by invoking a DELETE action on the any of the internal user "self" links from their json representations. [code]curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; -X DELETEhttps://$API_BASE_URL/profiles/$API_VERSION/nryan/users/spaige[/code][code]{
   &quot;message&quot;:&quot;&quot;,
   &quot;result&quot;:null,
   &quot;status&quot;:&quot;success&quot;,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8236&quot;
}[/code]

[alert]Note that after deleting an internal user, the record of the internal user is still present, however the entity will have its status set to "deleted" and all data associated with the user will be removed. Once deleted, internal users cannot be reactivated. This is due to conflicts that could arise when generating accounting records between accounts who share a common username.[/alert]