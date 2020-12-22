We saw in the <a href="https://agaveplatform.org/documentation/beginners-guides/system-discovery/" title="System Discovery">System Discovery</a> guide that there were both storage and execution systems. The <a href="https://agaveplatform.org/documentation/beginners-guides/managing-data/" title="Managing Data">Data Management</a> guide covered interacting with storage systems. In this section we look at Apps, which are the primary point of interaction with execution systems.

An app in Agave is most easily thought of as the installation of a simulation code on a physical resource. For example, the official installation of Blast on Stampede would be described by a single app. Your personally compiled version of Blast on Stampede would be described by a different app. Ditto for the same two codes on Lonestar.

<pre><code>binary code + system = app
</code></pre>

## Discovering Apps  

To view a list of all the apps available to you, make a GET request to the Apps service.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -X DELETE https://$API_BASE_URL/apps/$API_VERSION
```


```plaintext
apps-list -v
```


The response is a JSON array of summary app descriptions.

```javascript
[  
   {  
      "executionSystem":"condor.opensciencegrid.org",
      "id":"wc-osg-1.00u1",
      "isPublic":true,
      "lastModified":"2014-06-07T12:29:12.000-05:00",
      "name":"wc-osg",
      "revision":1,
      "shortDescription":"Count words in a file",
      "version":"1.00",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/wc-osg-1.00u1"
         }
      }
   },
   {  
      "executionSystem":"docker.iplantcollaborative.org",
      "id":"docker-python-demo-0.1.0u2",
      "isPublic":true,
      "lastModified":"2014-06-13T12:13:47.000-05:00",
      "name":"docker-python-demo",
      "revision":2,
      "shortDescription":"Demo Python app running as a Docker container.",
      "version":"0.1.0",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/docker-python-demo-0.1.0u2"
         }
      }
   },
   {  
      "executionSystem":"docker.iplantcollaborative.org",
      "id":"docker-python-demo-0.1.0u1",
      "isPublic":true,
      "lastModified":"2014-06-07T19:02:53.000-05:00",
      "name":"docker-python-demo",
      "revision":1,
      "shortDescription":"Demo Python app running as a Docker container.",
      "version":"0.1.0",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/docker-python-demo-0.1.0u1"
         }
      }
   },
   {  
      "executionSystem":"docker.iplantcollaborative.org",
      "id":"docker-python-demo-0.1.0u3",
      "isPublic":true,
      "lastModified":"2014-06-30T17:20:12.000-05:00",
      "name":"docker-python-demo",
      "revision":3,
      "shortDescription":"Demo Python app running as a Docker container.",
      "version":"0.1.0",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/docker-python-demo-0.1.0u3"
         }
      }
   },
   {  
      "executionSystem":"docker.iplantcollaborative.org",
      "id":"docker-r-demo-0.1.0u1",
      "isPublic":true,
      "lastModified":"2014-06-07T19:02:41.000-05:00",
      "name":"docker-r-demo",
      "revision":1,
      "shortDescription":"Demo R app running as a Docker container.",
      "version":"0.1.0",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/docker-r-demo-0.1.0u1"
         }
      }
   },
   {  
      "executionSystem":"docker.iplantcollaborative.org",
      "id":"docker-r-demo-0.1.0u2",
      "isPublic":true,
      "lastModified":"2014-06-30T17:19:56.000-05:00",
      "name":"docker-r-demo",
      "revision":2,
      "shortDescription":"Demo R app running as a Docker container.",
      "version":"0.1.0",
      "_links":{  
         "self":{  
            "href":"https://sandbox.agaveplatform.org/apps/v2/docker-r-demo-0.1.0u2"
         }
      }
   }
]
```

<aside class="notice">Depending on who is administering the Agave platform for your organization, you may see many or few apps returned from the above response. This is normal and has to do with what systems and apps they have chosen to make publicly available. If you don't see any apps there by default, no worries, see the <a href="https://agaveplatform.org/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">App Management Tutorial</a> for a quick reference on how to add your own.</aside>

## Viewing app details  

Appending an app's id to the above commands will give the full app description. Let's look at the <code>wc-osg-1.00u1</code> app as an example.

```shell
curl -sk -H "Authorization: Bearer $ACCESS_TOKEN" -X DELETE https://$API_BASE_URL/apps/$API_VERSION/wc-osg-1.00u1
```
]
```plaintext
apps-list -v wc-osg-1.00u1
```


The response is a JSON object with a lot of information that we elaborate more on in the App Service tutorial.

[code lang="javascript" light="false" highlight="11,15,16,21,25,38,39,80" gutter="true"]
{  
   "available":true,
   "checkpointable":true,
   "defaultMaxRunTime":null,
   "defaultMemoryPerNode":null,
   "defaultNodeCount":null,
   "defaultProcessorsPerNode":null,
   "defaultQueue":null,
   "deploymentPath":"/api/v2/apps/wc-osg-1.00u1.zip",
   "deploymentSystem":"data.agaveplatform.org",
   "executionSystem":"condor.opensciencegrid.org",
   "executionType":"CONDOR",
   "helpURI":"http://www.gnu.org/s/coreutils/manual/html_node/wc-invocation.html",
   "icon":null,
   "id":"wc-osg-1.00u1",
   "inputs":[  
      {  
         "details":{  
            "argument":null,
            "description":"",
            "label":"File to count words in: ",
            "showArgument":false,
            "visible":true
         },
         "id":"query1",
         "semantics":{  
            "fileTypes":[  
               "text-0"
            ],
            "minCardinality":1,
            "ontology":[  
               "http://sswapmeet.sswap.info/util/TextDocument"
            ]
         },
         "value":{  
            "default":"read1.fq",
            "order":0,
            "required":false,
            "validator":"",
            "visible":true
         }
      }
   ],
   "isPublic":true,
   "label":"wc condor",
   "lastModified":"2014-06-07T12:29:12.000-05:00",
   "longDescription":"",
   "modules":[  
      "load TACC",
      "purge"
   ],
   "name":"wc-osg",
   "ontology":[  
      "http://sswapmeet.sswap.info/algorithms/wc"
   ],
   "outputs":[  
      {  
         "details":{  
            "description":"Results of WC",
            "label":"Text file"
         },
         "id":"outputWC",
         "semantics":{  
            "fileTypes":[  

            ],
            "maxCardinality":1,
            "minCardinality":1,
            "ontology":[  
               "http://sswapmeet.sswap.info/util/TextDocument"
            ]
         },
         "value":{  
            "default":"wc_out.txt",
            "validator":""
         }
      }
   ],
   "parallelism":"SERIAL",
   "parameters":[  

   ],
   "revision":1,
   "shortDescription":"Count words in a file",
   "tags":[  
      "gnu",
      "textutils"
   ],
   "templatePath":"/wrapper.sh",
   "testPath":"/wrapper.sh",
   "uuid":"0001402162152914-5056a550b8-0001-005",
   "version":"1.00",
   "_links":{  
      "executionSystem":{  
         "href":"https://sandbox.agaveplatform.org/systems/v2/condor.opensciencegrid.org"
      },
      "metadata":{  
         "href":"https://sandbox.agaveplatform.org/meta/v2/data/?q={\\"associationIds\\":\\"0001402162152914-5056a550b8-0001-005\\"}"
      },
      "owner":{  
         "href":"https://sandbox.agaveplatform.org/profiles/v2/dooley"
      },
      "permissions":{  
         "href":"https://sandbox.agaveplatform.org/apps/v2/wc-osg-1.00u1/pems"
      },
      "self":{  
         "href":"https://sandbox.agaveplatform.org/apps/v2/wc-osg-1.00u1"
      },
      "storageSystem":{  
         "href":"https://sandbox.agaveplatform.org/systems/v2/data.agaveplatform.org"
      }
   }
}
```

In the above response, the important fields to notice are <code>id</code>, <code>inputs</code>, <code>parameters</code>, and <code>executionSystem</code>.

<ul>
<li><code>id</code>: The unique id of the app. App ids are made up of a name separated by a version number. Public apps also have the revision number appended to the id to distinguish their changes over time.</li>
<li><code>inputs</code>: a JSON array of objects describing the input files needed to run this app.

<ul>
<li><code>inputs.id</code>: the input id, which is the attribute name that will be used when specifying this input in a job request.</li>
<li><code>inputs.details.label</code>: a short description of what this input field represents in terms of the app</li>
<li><code>inputs.value.required</code>: a boolean value indicating whether this value is required to submit a job request.</li>
<li><code>inputs.value.validator</code>: a Perl regular expression used to validate this field value in a job request.</li>
</ul></li>
<li><code>parameters</code>: a JSON array of objects describing the parameters needed to run this app.

<ul>
<li><code>parameters.id</code>: the input id, which is the attribute name that will be used when specifying this input in a job request.</li>
<li><code>parameters.details.label</code>: a short description of what this parameter represents in terms of the app</li>
<li><code>parameters.value.type</code>: the primary type assigned to this parameter. This determines what kind of value you pass for this parameter in a job request. Possible values are string, number, bool, flag, and enum.</li>
<li><code>parameters.value.required</code>: a boolean value indicating whether this parameter is required to submit a job request.</li>
<li><code>parameters.value.validator</code>: a Perl regular expression used to validate this parameter value in a job request. Any parameter-specific validation will occur after the value's primary type is validated.</li>
</ul></li>
<li><code>executionSystem</code>: the system on which this app code will run. You don't actually need to know this to run a job with this app, but it's helpful in case you need/want to debug at some point.</li>
</ul>

Now that you understand how to find an app and how to identify the inputs and parameters needed in a job request, we can move on to the next lesson on <a href="https://agaveplatform.org/documentation/beginners-guides/running-a-simulation/" title="Running a Simulation">Running a Simulation</a>.
