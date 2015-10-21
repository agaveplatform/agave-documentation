We saw in the <a href="http://agaveapi.co/documentation/beginners-guides/system-discovery/" title="System Discovery">System Discovery</a> guide that there were both storage and execution systems. The <a href="http://agaveapi.co/documentation/beginners-guides/managing-data/" title="Managing Data">Data Management</a> guide covered interacting with storage systems. In this section we look at Apps, which are the primary point of interaction with execution systems.

An app in Agave is most easily thought of as the installation of a simulation code on a physical resource. For example, the official installation of Blast on Stampede would be described by a single app. Your personally compiled version of Blast on Stampede would be described by a different app. Ditto for the same two codes on Lonestar.

<pre><code>binary code + system = app
</code></pre>

<h2>Discovering Apps</h2>

To view a list of all the apps available to you, make a GET request to the Apps service.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/apps/$API_VERSION
```
[/tab]
[tab title="CLI"]
```bash
apps-list -v
```
[/tab][/tabgroup]

The response is a JSON array of summary app descriptions.

[code lang=javascript]
[  
   {  
      &quot;executionSystem&quot;:&quot;condor.opensciencegrid.org&quot;,
      &quot;id&quot;:&quot;wc-osg-1.00u1&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-07T12:29:12.000-05:00&quot;,
      &quot;name&quot;:&quot;wc-osg&quot;,
      &quot;revision&quot;:1,
      &quot;shortDescription&quot;:&quot;Count words in a file&quot;,
      &quot;version&quot;:&quot;1.00&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/wc-osg-1.00u1&quot;
         }
      }
   },
   {  
      &quot;executionSystem&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;id&quot;:&quot;docker-python-demo-0.1.0u2&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-13T12:13:47.000-05:00&quot;,
      &quot;name&quot;:&quot;docker-python-demo&quot;,
      &quot;revision&quot;:2,
      &quot;shortDescription&quot;:&quot;Demo Python app running as a Docker container.&quot;,
      &quot;version&quot;:&quot;0.1.0&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/docker-python-demo-0.1.0u2&quot;
         }
      }
   },
   {  
      &quot;executionSystem&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;id&quot;:&quot;docker-python-demo-0.1.0u1&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-07T19:02:53.000-05:00&quot;,
      &quot;name&quot;:&quot;docker-python-demo&quot;,
      &quot;revision&quot;:1,
      &quot;shortDescription&quot;:&quot;Demo Python app running as a Docker container.&quot;,
      &quot;version&quot;:&quot;0.1.0&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/docker-python-demo-0.1.0u1&quot;
         }
      }
   },
   {  
      &quot;executionSystem&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;id&quot;:&quot;docker-python-demo-0.1.0u3&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-30T17:20:12.000-05:00&quot;,
      &quot;name&quot;:&quot;docker-python-demo&quot;,
      &quot;revision&quot;:3,
      &quot;shortDescription&quot;:&quot;Demo Python app running as a Docker container.&quot;,
      &quot;version&quot;:&quot;0.1.0&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/docker-python-demo-0.1.0u3&quot;
         }
      }
   },
   {  
      &quot;executionSystem&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;id&quot;:&quot;docker-r-demo-0.1.0u1&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-07T19:02:41.000-05:00&quot;,
      &quot;name&quot;:&quot;docker-r-demo&quot;,
      &quot;revision&quot;:1,
      &quot;shortDescription&quot;:&quot;Demo R app running as a Docker container.&quot;,
      &quot;version&quot;:&quot;0.1.0&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/docker-r-demo-0.1.0u1&quot;
         }
      }
   },
   {  
      &quot;executionSystem&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;id&quot;:&quot;docker-r-demo-0.1.0u2&quot;,
      &quot;isPublic&quot;:true,
      &quot;lastModified&quot;:&quot;2014-06-30T17:19:56.000-05:00&quot;,
      &quot;name&quot;:&quot;docker-r-demo&quot;,
      &quot;revision&quot;:2,
      &quot;shortDescription&quot;:&quot;Demo R app running as a Docker container.&quot;,
      &quot;version&quot;:&quot;0.1.0&quot;,
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/docker-r-demo-0.1.0u2&quot;
         }
      }
   }
]
[/code]

[notice]Depending on who is administering the Agave platform for your organization, you may see many or few apps returned from the above response. This is normal and has to do with what systems and apps they have chosen to make publicly available. If you don't see any apps there by default, no worries, see the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">App Management Tutorial</a> for a quick reference on how to add your own.[/notice]

<h2>Viewing app details</h2>

Appending an app's id to the above commands will give the full app description. Let's look at the <code>wc-osg-1.00u1</code> app as an example.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/apps/$API_VERSION/wc-osg-1.00u1
```
[/tab]
[tab title="CLI"]
```bash
apps-list -v wc-osg-1.00u1
```
[/tab][/tabgroup]

The response is a JSON object with a lot of information that we elaborate more on in the App Service tutorial.

[code lang="javascript" light="false" highlight="11,15,16,21,25,38,39,80" gutter="true"]
{  
   &quot;available&quot;:true,
   &quot;checkpointable&quot;:true,
   &quot;defaultMaxRunTime&quot;:null,
   &quot;defaultMemoryPerNode&quot;:null,
   &quot;defaultNodeCount&quot;:null,
   &quot;defaultProcessorsPerNode&quot;:null,
   &quot;defaultQueue&quot;:null,
   &quot;deploymentPath&quot;:&quot;/api/v2/apps/wc-osg-1.00u1.zip&quot;,
   &quot;deploymentSystem&quot;:&quot;data.iplantcollaborative.org&quot;,
   &quot;executionSystem&quot;:&quot;condor.opensciencegrid.org&quot;,
   &quot;executionType&quot;:&quot;CONDOR&quot;,
   &quot;helpURI&quot;:&quot;http://www.gnu.org/s/coreutils/manual/html_node/wc-invocation.html&quot;,
   &quot;icon&quot;:null,
   &quot;id&quot;:&quot;wc-osg-1.00u1&quot;,
   &quot;inputs&quot;:[  
      {  
         &quot;details&quot;:{  
            &quot;argument&quot;:null,
            &quot;description&quot;:&quot;&quot;,
            &quot;label&quot;:&quot;File to count words in: &quot;,
            &quot;showArgument&quot;:false,
            &quot;visible&quot;:true
         },
         &quot;id&quot;:&quot;query1&quot;,
         &quot;semantics&quot;:{  
            &quot;fileTypes&quot;:[  
               &quot;text-0&quot;
            ],
            &quot;minCardinality&quot;:1,
            &quot;ontology&quot;:[  
               &quot;http://sswapmeet.sswap.info/util/TextDocument&quot;
            ]
         },
         &quot;value&quot;:{  
            &quot;default&quot;:&quot;read1.fq&quot;,
            &quot;order&quot;:0,
            &quot;required&quot;:false,
            &quot;validator&quot;:&quot;&quot;,
            &quot;visible&quot;:true
         }
      }
   ],
   &quot;isPublic&quot;:true,
   &quot;label&quot;:&quot;wc condor&quot;,
   &quot;lastModified&quot;:&quot;2014-06-07T12:29:12.000-05:00&quot;,
   &quot;longDescription&quot;:&quot;&quot;,
   &quot;modules&quot;:[  
      &quot;load TACC&quot;,
      &quot;purge&quot;
   ],
   &quot;name&quot;:&quot;wc-osg&quot;,
   &quot;ontology&quot;:[  
      &quot;http://sswapmeet.sswap.info/algorithms/wc&quot;
   ],
   &quot;outputs&quot;:[  
      {  
         &quot;details&quot;:{  
            &quot;description&quot;:&quot;Results of WC&quot;,
            &quot;label&quot;:&quot;Text file&quot;
         },
         &quot;id&quot;:&quot;outputWC&quot;,
         &quot;semantics&quot;:{  
            &quot;fileTypes&quot;:[  

            ],
            &quot;maxCardinality&quot;:1,
            &quot;minCardinality&quot;:1,
            &quot;ontology&quot;:[  
               &quot;http://sswapmeet.sswap.info/util/TextDocument&quot;
            ]
         },
         &quot;value&quot;:{  
            &quot;default&quot;:&quot;wc_out.txt&quot;,
            &quot;validator&quot;:&quot;&quot;
         }
      }
   ],
   &quot;parallelism&quot;:&quot;SERIAL&quot;,
   &quot;parameters&quot;:[  

   ],
   &quot;revision&quot;:1,
   &quot;shortDescription&quot;:&quot;Count words in a file&quot;,
   &quot;tags&quot;:[  
      &quot;gnu&quot;,
      &quot;textutils&quot;
   ],
   &quot;templatePath&quot;:&quot;/wrapper.sh&quot;,
   &quot;testPath&quot;:&quot;/wrapper.sh&quot;,
   &quot;uuid&quot;:&quot;0001402162152914-5056a550b8-0001-005&quot;,
   &quot;version&quot;:&quot;1.00&quot;,
   &quot;_links&quot;:{  
      &quot;executionSystem&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/condor.opensciencegrid.org&quot;
      },
      &quot;metadata&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2/data/?q={\\&quot;associationIds\\&quot;:\\&quot;0001402162152914-5056a550b8-0001-005\\&quot;}&quot;
      },
      &quot;owner&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/profiles/v2/dooley&quot;
      },
      &quot;permissions&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/wc-osg-1.00u1/pems&quot;
      },
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/apps/v2/wc-osg-1.00u1&quot;
      },
      &quot;storageSystem&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      }
   }
}
[/code]

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

Now that you understand how to find an app and how to identify the inputs and parameters needed in a job request, we can move on to the next lesson on <a href="http://agaveapi.co/documentation/beginners-guides/running-a-simulation/" title="Running a Simulation">Running a Simulation</a>.