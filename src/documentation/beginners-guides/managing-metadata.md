Until now we have see how to interact with <a href="http://agaveapi.co/documentation/beginners-guides/system-discovery/" title="System Discovery">systems</a>, <a href="http://agaveapi.co/documentation/beginners-guides/managing-data/" title="Managing Data">data</a>, <a href="http://agaveapi.co/documentation/beginners-guides/app-discovery/" title="App Discovery">apps</a>, and <a href="http://agaveapi.co/documentation/beginners-guides/running-a-simulation/" title="Running a Simulation">jobs</a>. These are a few of the core resources in the Agave APIs. Individually these services give you tremendous flexibility and capability to carry out your digital science. However, the process of conducting science is more than just a series of <em>hows</em>. Tying together all the different data and activities that constitute a computational experiment in a way that adds understanding to the process is just as important as the activities themselves. This is one of the key roles of the Metadata service.

The Metadata service is an unstructured document store supporting object relationships, advanced search, schema definitions, and optional validation. Let's create two pieces of metadata to tie together what we've done in this lesson. First, we will create a new "project" and associate the input data, job, and app we used to run our simulation with it by including each uuid in the list of <code>associatedIds</code> for this metadata object.

[code lang=javascript]
{
  &quot;name&quot;: &quot;project&quot;,
  &quot;value&quot;: &quot;My First Project&quot;,
  &quot;schemaId&quot;: null,
  &quot;associatedIds&quot;: [
    &quot;0001409784588509-5056a550b8-0001-007&quot;,
    &quot;0001402162152914-5056a550b8-0001-005&quot;,
    &quot;0001409758089943-5056a550b8-0001-002&quot;
  ]
}
[/code]

<h2>Adding new metadata</h2>

We will POST this to the Metadata service to get a uuid we can reference when adding subsequent metadata for our "project."

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@project.json&quot; https://$API_BASE_URL/meta/$API_VERSION/data
```
[/tab]
[tab title="CLI"]
```bash
metadata-addupdate -v -F project.json
```
[/tab][/tabgroup]

The response to this request will be a JSON object describing the metadata item we just created.

[code lang=javascript]
{  
   &quot;uuid&quot;:&quot;0001409792924730-5056a550b8-0001-012&quot;,
   &quot;owner&quot;:&quot;systest&quot;,
   &quot;schemaId&quot;:null,
   &quot;internalUsername&quot;:null,
   &quot;associationIds&quot;:[  
      &quot;0001409784588509-5056a550b8-0001-007&quot;,
      &quot;0001402162152914-5056a550b8-0001-005&quot;,
      &quot;0001409758089943-5056a550b8-0001-002&quot;
   ],
   &quot;lastUpdated&quot;:&quot;2014-09-03T20:08:44.652-05:00&quot;,
   &quot;name&quot;:&quot;project&quot;,
   &quot;value&quot;:&quot;My First Project&quot;,
   &quot;created&quot;:&quot;2014-09-03T20:08:44.652-05:00&quot;,
   &quot;_links&quot;:{  
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2/data/0001409792924730-5056a550b8-0001-012&quot;
      },
      &quot;job&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
      },
      &quot;app&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/wc-osg-1.00u1&quot;
      },
      &quot;file&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
      }
   }
}
[/code]

Next we will add the following "note" to the "project" we just created and POST it to the Metadata service as before. Notice that in this "note" we only include the uuid of the previous metadata object. We will see in the next section how we can chain associations together in queries to find all the metadata related directly or indirectly to a particular resource.

[code lang=javascript]
{
  &quot;name&quot;: &quot;note&quot;,
  &quot;value&quot;: &quot;This was my first lesson with the Agave API.&quot;,
  &quot;schemaId&quot;: null,
  &quot;associatedIds&quot;: [
    &quot;0001409788737810-5056a550b8-0001-012&quot;
  ]
}
[/code]

As before, we will POST the JSON to the Metadata service.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@project_note.json&quot; https://$API_BASE_URL/meta/$API_VERSION/data
```
[/tab]
[tab title="CLI"]
```bash
metadata-addupdate -v -F project_note.json
```
[/tab][/tabgroup]

This time the response will be a JSON object describing the metadata item, but only referencing the previous metadata item.

[code lang=javascript]
{  
   &quot;uuid&quot;:&quot;0001409793131588-5056a550b8-0001-012&quot;,
   &quot;owner&quot;:&quot;systest&quot;,
   &quot;schemaId&quot;:null,
   &quot;internalUsername&quot;:null,
   &quot;associationIds&quot;:[  
      &quot;0001409792924730-5056a550b8-0001-012&quot;
   ],
   &quot;lastUpdated&quot;:&quot;2014-09-03T20:13:22.286-05:00&quot;,
   &quot;name&quot;:&quot;note&quot;,
   &quot;value&quot;:&quot;This was my first lesson with the Agave API.&quot;,
   &quot;created&quot;:&quot;2014-09-03T20:12:11.587-05:00&quot;,
   &quot;_links&quot;:{  
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2/data/0001409793131588-5056a550b8-0001-012&quot;
      },
      &quot;metadata&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2//data/0001409792924730-5056a550b8-0001-012&quot;
      }
   }
}
[/code]

<h2>Searching metadata</h2>

In the future, when referring back to this experiment, we can simply refer to the metadata "project" we created and use that to locate all the moving parts, provenance trails, and users that led to the results we found. The metadata service supports a JSON-style dot notation search interface, so finding the project we just created is simply a matter of specifying a key-value search string. Following are some example queries:

<h4>List all metadata with name "project"</h4>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@project_note.json&quot; https://$API_BASE_URL/meta/$API_VERSION/data?q=%7b%6e%61%6d%65%3a%22%70%72%6f%6a%65%63%74%22%7d
```
[/tab]
[tab title="CLI"]
```bash
metadata-list -v -Q &#039;{name:&quot;project&quot;}&#039;
```
[/tab][/tabgroup]

[notice]When querying the metadata service using curl, be sure to URL encode the json query string[/notice]

This time the response will be a JSON array of metadata objects matching your query.

<h4>List all "notes" for the project with uuid "0001409792924730-5056a550b8-0001-012"</h4>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@project_note.json&quot; https://$API_BASE_URL/meta/$API_VERSION/data?q=%7b%61%73%73%6f%63%69%61%74%69%6f%6e%49%64%73%3a%22%30%30%30%31%34%30%39%37%39%32%39%32%34%37%33%30%2d%35%30%35%36%61%35%35%30%62%38%2d%30%30%30%31%2d%30%31%32%22%2c%20%6e%61%6d%65%3a%22%6e%6f%74%65%22%7d
```
[/tab]
[tab title="CLI"]
```bash
metadata-list -v -Q &#039;{associationIds:&quot;0001409792924730-5056a550b8-0001-012&quot;, name:&quot;note&quot;}&#039;
```
[/tab][/tabgroup]

<h4>List all metadata for job "0001409784588509-5056a550b8-0001-007"</h4>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@project_note.json&quot; https://$API_BASE_URL/meta/$API_VERSION/data?q=%7b%61%73%73%6f%63%69%61%74%69%6f%6e%49%64%73%3a%22%30%30%30%31%34%30%39%37%38%34%35%38%38%35%30%39%2d%35%30%35%36%61%35%35%30%62%38%2d%30%30%30%31%2d%30%30%37%22%7d
```
[/tab]
[tab title="CLI"]
```bash
metadata-list -v -Q &#039;{associationIds:&quot;0001409784588509-5056a550b8-0001-007&quot;}&#039;
```
[/tab][/tabgroup]