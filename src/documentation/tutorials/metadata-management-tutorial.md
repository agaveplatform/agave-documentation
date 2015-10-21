<h2>Introduction</h2>

The Agave Metadata service allows you to manage metadata and associate it with Agave entities via associated UUIDs. It supports JSON schema for structured JSON metadata; it also accepts any valid JSON-formatted metadata or plain text String when no schema is specified. As with a number of other Agave services, a full access control layer is supported enabling you to keep your metadata private or share it with your colleagues.

<h3>UUID</h3>

All metadata and schemata referenced through the Metadata service have canonical URIs defined via their identifying UUIDs:

[code lang=bash]
https://$API_BASE_URL/meta/$API_VERSION/data/$UUID
[/code]

and

[code lang=bash]
https://$API_BASE_URL/meta/$API_VERSION/schemas/$UUID
[/code]

Both Metadata and Schemata with a given UUID can be retrieved, updated or deleted via a GET, POST or DELETE operation respectively upon the appropriate endpoint. Please see the Quick Start guide for more information and examples.

New Metadata or Schemata are created in the repository via a POST to either

[code lang=bash]
https://$API_BASE_URL/meta/$API_VERSION/data/
[/code]

or

[code lang=bash]
https://$API_BASE_URL/meta/$API_VERSION/schemas/
[/code]

Adding new Metadata or Schemata to the system results in the Metadata service generating a new UUID for the object and returning it to the client, for example:

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    -H &#039;Content-Type: application/x-www-form-urlencoded&#039;  
    --data &#039;{&quot;value&quot;: {&quot;title&quot;: &quot;Example Metadata&quot;, &quot;properties&quot;: {&quot;species&quot;: &quot;arabidopsis&quot;, &quot;description&quot;: &quot;A model organism...&quot;}}, &quot;name&quot;: &quot;some metadata&quot;}&#039;  
    https://$API_BASE_URL/meta/$API_VERSION/data
```
[/tab]
[tab title="CLI"]
```bash
metadata-addupdate -v -d &#039;{&quot;value&quot;: {&quot;title&quot;: &quot;Example Metadata&quot;, &quot;properties&quot;: {&quot;species&quot;: &quot;arabidopsis&quot;, &quot;description&quot;: &quot;A model organism...&quot;}}, &quot;name&quot;: &quot;some metadata&quot;}&#039;
```
[/tab][/tabgroup]

Submitting the above will result in a message like the following:

[code lang=javascript]
{  
   &quot;uuid&quot;:&quot;0001381522769680-8002797ffffddcd-0001-012&quot;,
   &quot;owner&quot;:&quot;nryan&quot;,
   &quot;internalUsername&quot;:null,
   &quot;associationIds&quot;:[  

   ],
   &quot;lastUpdated&quot;:&quot;2013-10-11T15:19:27.822-05:00&quot;,
   &quot;name&quot;:&quot;some metadata&quot;,
   &quot;value&quot;:{  
      &quot;title&quot;:&quot;Example Metadata&quot;,
      &quot;properties&quot;:{  
         &quot;species&quot;:&quot;arabidopsis&quot;,
         &quot;description&quot;:&quot;A model organism...&quot;
      }
   },
   &quot;created&quot;:&quot;2013-10-11T15:19:27.822-05:00&quot;,
   &quot;_links&quot;:{  
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://$API_BASE_URL/meta/$API_VERSION/0001381522769680-8002797ffffddcd-0001-012&quot;
      }
   }
}
[/code]

Further, UUIDs are used to link Metadata to the relevant Agave entities. The UUIDs for each Agave entity to which the Metadata refers or is linked should be entered as an AssociationId in the Metadata object.

<h3>JSON Schema</h3>

Schemata can be provided in JSON Schema form. The service will validate that the schema is valid JSON and store it. To validate Metadata against it, the schema UUID should be given as a parameter, SchemaId, when uploading Metadata. If no SchemaId is provided, the Metadata service will accept any JSON Object or plain text string and store it accordingly. This flexible approach enabled Agave to handle different levels of structure of Metadata from completely unstructured, to highly structured with complex JSON schemata.

For more on JSON Schema please see <a title="JSON Schema" href="http://json-schema.org/">http://json-schema.org/</a>

To add a metadata schema to the repository:

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    -H &#039;Content-Type: application/x-www-form-urlencoded&#039;  
    --data &#039;{ &quot;title&quot;: &quot;Example Schema&quot;, &quot;type&quot;: &quot;object&quot;, &quot;properties&quot;: { &quot;species&quot;: { &quot;type&quot;: &quot;string&quot; } }, &quot;required&quot;: [&quot;species&quot;] }&#039; 
https://$API_BASE_URL/meta/$API_VERSION/schemas/
```
[/tab]
[tab title="CLI"]
```bash
metadata-schema-addupdate -v -d &#039;{ &quot;title&quot;: &quot;Example Schema&quot;, &quot;type&quot;: &quot;object&quot;, &quot;properties&quot;: { &quot;species&quot;: { &quot;type&quot;: &quot;string&quot; } }, &quot;required&quot;: [&quot;species&quot;] }&#039;
```
[/tab][/tabgroup]

Submitting the above will result in the following sort of message from the Metadata service:

[code lang=javascript]
{
   &quot;status&quot;:&quot;success&quot;,
   &quot;message&quot;:null,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8548&quot;,
   &quot;result&quot;:{
      &quot;uuid&quot;:&quot;0001381781874558-8002797ffffddcd-0001-013&quot;,
      &quot;owner&quot;:&quot;nryan&quot;,
      &quot;internalUsername&quot;:null,
      &quot;lastUpdated&quot;:&quot;2013-10-14T15:12:54.552-05:00&quot;,
      &quot;schema&quot;:{
         &quot;schema&quot;:{
            &quot;title&quot;:&quot;Example Schema&quot;,
            &quot;type&quot;:&quot;object&quot;,
            &quot;properties&quot;:{
               &quot;species&quot;:{
                  &quot;type&quot;:&quot;string&quot;
               }
            }
         },
         &quot;required&quot;:[
            &quot;species&quot;
         ]
      },
      &quot;created&quot;:&quot;2013-10-14T15:12:54.552-05:00&quot;,
      &quot;_links&quot;:[
         {
            &quot;self&quot;:{
               &quot;href&quot;:&quot;https://$API_BASE_URL/meta/$API_VERSION/schemas/0001381781874558-8002797ffffddcd-0001-013&quot;
            }
         }
      ]
   }
}
[/code]

Some other example schemata:

An example user profile schema:

[code lang=javascript]
{
   &quot;title&quot;:&quot;profile&quot;,
   &quot;type&quot;:&quot;object&quot;,
   &quot;properties&quot;:{
      &quot;firstName&quot;:{
         &quot;type&quot;:&quot;string&quot;
      },
      &quot;lastName&quot;:{
         &quot;type&quot;:&quot;string&quot;
      },
      &quot;city&quot;:{
         &quot;type&quot;:&quot;string&quot;
      },
      &quot;state&quot;:{
         &quot;type&quot;:&quot;string&quot;
      },
      &quot;email&quot;:{
         &quot;type&quot;:&quot;string&quot;
      }
   },
   &quot;required&quot;:[
      &quot;firstName&quot;,
      &quot;lastName&quot;,
      &quot;email&quot;
   ]
}
[/code]

A project schema:

[code lang=javascript]
{
   &quot;title&quot;:&quot;project&quot;,
   &quot;type&quot;:&quot;object&quot;,
   &quot;properties&quot;:{
      &quot;name&quot;:{
         &quot;type&quot;:&quot;string&quot;
      },
      &quot;associatedUsernames&quot;:{
         &quot;type&quot;:&quot;array&quot;
      },
      &quot;fileIds&quot;:{
         &quot;type&quot;:&quot;array&quot;
      }
   },
   &quot;required&quot;:[
      &quot;name&quot;,
      &quot;associatedUsernames&quot;,
      &quot;fileIds&quot;
   ]
}
[/code]

<h3>Retrieving Metadata via JSON Query</h3>

In addition to retrieving Metadata via its UUID, the Metadata service supports JSON queries. If you wanted to look up Metadata corresponding to a specific value within its JSON Metadata value, you can specify this as something like:

[code lang=bash]
q={&quot;name&quot;: &quot;mustard plant&quot;}
[/code]

To use with curl, the query must be url-encoded. Then you can send a request something like the following:

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/meta/$API_VERSION/data?q=%7B%22name%22%3A%22mustard+plant%22%7D
```
[/tab]
[tab title="CLI"]
```bash
metadata-list -i -v -Q &#039;%7B%22name%22%3A%22mustard+plant%22%7D&#039;
```
[/tab][/tabgroup]

And this will find all metadata with name, "mustard plant" that you have permission to access. For example:

[code lang=javascript]
{
   &quot;status&quot;:&quot;success&quot;,
   &quot;message&quot;:null,
   &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8560&quot;,
   &quot;result&quot;:[
      {
         &quot;uuid&quot;:&quot;0001378482703225-8002797ffffddcd-0001-metadata-&quot;,
         &quot;owner&quot;:&quot;nryan&quot;,
         &quot;internalUsername&quot;:null,
         &quot;associationIds&quot;:null,
         &quot;lastUpdated&quot;:&quot;2013-09-06T10:51:10.072-05:00&quot;,
         &quot;name&quot;:&quot;mustard plant&quot;,
         &quot;value&quot;:{
            &quot;type&quot;:&quot;a plant&quot;
         },
         &quot;created&quot;:&quot;2013-09-06T10:51:10.072-05:00&quot;,
         &quot;_links&quot;:[
            {
               &quot;self&quot;:{
                  &quot;href&quot;:&quot;https://$API_BASE_URL/meta/$API_VERSION/0001378482703225-8002797ffffddcd-0001-metadata-&quot;
               }
            }
         ]
      }
   ]
}
[/code]

<h3>Metadata Permissions</h3>

The metadata service supports permissions for both Metadata and Schemata consistent with that of a number of other Agave services. If no permissions are explicitly set, only the owner of the Metadata and Agave administrators can access it.

To list the permissions on Metadata for a given user:

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/meta/$API_VERSION/data/0001381781409939-8002797ffffddcd-0001-012/pems/$USER_TO_SHARE_METADATA_WITH
[/code]

The following response confirms that the user does not have permissions on that Metadata:

[code lang=javascript]
{
    &quot;status&quot;:&quot;error&quot;,
    &quot;message&quot;:&quot;No permissions found for user anotherAgaveUser&quot;,
    &quot;version&quot;:&quot;2.1.8-SNAPSHOT-r8560&quot;
}
[/code]

To share Metadata with that user:

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    --data &quot;permission=READ&quot;  
        https://$API_BASE_URL/meta/$API_VERSION/data/0001381781409939-8002797ffffddcd-0001-012/pems/$USER_TO_SHARE_METADATA_WITH
[/code]

To delete all permissions on a Metadata object:

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/meta/$API_VERSION/data/0001381781409939-8002797ffffddcd-0001-012/pems/
[/code]

Please note that the above will delete all permissions for Metadata, such that only the owner will be able to access it. To remove a specific user, send a POST with permissions set to "NONE" for that user.

Permissions are supported for schemata in a similar manner:

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/meta/$API_VERSION/schemas/0001381781409939-8002797ffffddcd-0001-012/pems/$USER_TO_SHARE_METADATA_WITH
[/code]