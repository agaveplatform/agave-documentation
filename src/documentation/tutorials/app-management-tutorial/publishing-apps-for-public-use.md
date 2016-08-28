<h2>Overview</h2>

In the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">App Management Tutorial</a> you learned about how to register apps for your own personal use and share them with other users to enable collaborative research. In this section, we will learn about the concept of app publication and what it means to promote an app into the public space.

In addition to traditional permissions, Agave also has a concept of scope. By default, every app you personally register with Agave has a private scope. For individual users, this is usually sufficient for all your needs. At an organizational level, however, it is a very common requirement to provide a curated collection of apps that are publicly available to everyone. Such a collection of apps would reside in the public scope. The process of moving an app from the (default) private scope into the public scope is called <strong><em>publishing</em></strong>.

<h2>Implications of publishing an app <a name="implications-of-publishing-an-app">&nbsp;</a></h2>

As you can imagine, publishing an app gives it much greater exposure and results in increased usage by the user community. It also comes with increased responsibilities for the original owner as well as the API administrators.

<h5>Public apps must run on public systems.</h5>

In order to ensure that all users can actually use the app after it is published, it must have a public system specified as the <code>executionSystem</code>. This ensures that the app will perform consistently for anyone who uses it. It also means that publishing an app carries with it a cost in terms of resource consumption.

<h5>Publishing an app can only be done by tenant admins</h5>

Because of the requirement that public apps run on public systems, apps may only be published by tenant admins. This allows them to vet each app for performance, reliability, and security prior to opening it up to the broader community. In most situation this simply involves emailing your admin and asking them to publish the app, but policy can vary from tenant to tenant, so check with your tenant administrators for specifics.

<h5>Public apps maintain the original author as point of contact</h5>

Creating and registering an app that can be used by the community at large is a tremendous contribution in and of itself. Your contribution can go on to help thousands of other users stay focused on their science rather than their computational needs. Once your app is published, your name will remain as the acknowledged "owner" of the app. This allows you to receive attribute for your contribution to the field as well as provide an additional point of contact for support. The degree to which you are expected to actually address support issues related to the published app is a matter of policy laid out by your tenant administrators. Generally speaking, you won't be expected to do much more than address scientifically based questions on the mailing list and/or forums about the inner workings of the app.

<h2>Publication lifecycle</h2>

The publication lifecycle begins after an app is already registered.

<h5>Validate your app works</h5>

Once you have a working app that you have verified runs correctly, you contact your tenant admins requesting the app be published. Hopefully you cloned the public system and used your own personal account on that system to verify the app performance. If not, you will need to work with the admins to ensure it works as intended on the public system.

<h5>Admins create a public version of the app <a name="admins-create-a-public-version-of-the-app">&nbsp;</a></h5>

Once the app is vetted, your tenant admins will tell Agave to publish the app. This can be done with a single call the the Apps API. An example of publishing the <code>demo-pyplot-demo-advanced-0.1.0</code> app from our <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">App Management Tutorial</a> is shown below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=publish&quot; https://$API_BASE_URL/apps/$API_VERSION/demo-pyplot-demo-advanced-0.1.0?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
apps-publish -v demo-pyplot-demo-advanced-0.1.0
```
[/tab][/tabgroup]

[javascript collapse="true"]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-rc424a&quot;,
  &quot;result&quot; : {
    &quot;id&quot; : &quot;demo-pyplot-demo-advanced-0.1.0u1&quot;,
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced&quot;,
    &quot;icon&quot; : null,
    &quot;uuid&quot; : &quot;0001414144637043-5056a550b8-0001-005&quot;,
    &quot;parallelism&quot; : &quot;SERIAL&quot;,
    &quot;defaultProcessorsPerNode&quot; : 1,
    &quot;defaultMemoryPerNode&quot; : 1,
    &quot;defaultNodeCount&quot; : 1,
    &quot;defaultMaxRunTime&quot; : null,
    &quot;defaultQueue&quot; : &quot;debug&quot;,
    &quot;version&quot; : &quot;0.1.0&quot;,
    &quot;revision&quot; : 1,
    &quot;isPublic&quot; : true,
    &quot;helpURI&quot; : null,
    &quot;label&quot; : &quot;PyPlot Demo Advanced&quot;,
    &quot;shortDescription&quot; : &quot;Advanced demo plotting app&quot;,
    &quot;longDescription&quot; : &quot;Advanced demo app to create a graph using Python&quot;,
    &quot;tags&quot; : [ &quot;python&quot;, &quot;demo&quot;, &quot;plotting&quot;, &quot;tutorial&quot; ],
    &quot;ontology&quot; : [ &quot;&quot; ],
    &quot;executionType&quot; : &quot;CLI&quot;,
    &quot;executionSystem&quot; : &quot;docker.iplantcollaborative.org&quot;,
    &quot;deploymentPath&quot; : &quot;/api/v2/apps/demo-pyplot-demo-advanced-0.1.0u1.zip&quot;,
    &quot;deploymentSystem&quot; : &quot;data.iplantcollaborative.org&quot;,
    &quot;templatePath&quot; : &quot;wrapper.sh&quot;,
    &quot;testPath&quot; : &quot;test/test.sh&quot;,
    &quot;checkpointable&quot; : false,
    &quot;lastModified&quot; : &quot;2014-10-24T04:57:17.000-05:00&quot;,
    &quot;modules&quot; : [ ],
    &quot;available&quot; : true,
    &quot;inputs&quot; : [ {
      &quot;id&quot; : &quot;dataset&quot;,
      &quot;value&quot; : {
        &quot;validator&quot; : &quot;([^s]+(.(?i)(zip|gz|tgz|tar.gz|bz2|rar|csv))$)&quot;,
        &quot;visible&quot; : true,
        &quot;required&quot; : true,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : [ &quot;agave://demo.storage.example.com/api_sample_user/inputs/pyplot/testdata.csv&quot; ]
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Dataset&quot;,
        &quot;description&quot; : &quot;The dataset to plot&quot;,
        &quot;argument&quot; : null,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 1,
        &quot;maxCardinality&quot; : -1,
        &quot;ontology&quot; : [ &quot;http://sswapmeet.sswap.info/mime/text/Csv&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Zip&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Tar&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Bzip&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Rar&quot; ],
        &quot;fileTypes&quot; : [ &quot;csv-0&quot;, &quot;zip-0&quot;, &quot;tar-0&quot;, &quot;tgz-0&quot;, &quot;bz-2&quot;, &quot;rar-0&quot; ]
      }
    } ],
    &quot;parameters&quot; : [ {
      &quot;id&quot; : &quot;showYLabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : true,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Show y-axis label?&quot;,
        &quot;description&quot; : &quot;Select whether a label will be shown on the y axis&quot;,
        &quot;argument&quot; : &quot;--show-y-label&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;unpackInputs&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : null
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Unpack input(s)&quot;,
        &quot;description&quot; : &quot;If true, any compressed input files will be expanded prior to execution on the remote system.&quot;,
        &quot;argument&quot; : &quot;1&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;showLegend&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Extract the first k bytes&quot;,
        &quot;description&quot; : &quot;Select whether to include a legend in each chart&quot;,
        &quot;argument&quot; : &quot;--show-legend&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;width&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;number&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : 1024,
        &quot;validator&quot; : &quot;d+&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart width&quot;,
        &quot;description&quot; : &quot;The width in pixels of each chart&quot;,
        &quot;argument&quot; : &quot;--width=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:integer&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;chartType&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : true,
        &quot;type&quot; : &quot;enumeration&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;line&quot;,
        &quot;enum_values&quot; : [ {
          &quot;bar&quot; : &quot;Bar Chart&quot;
        }, {
          &quot;line&quot; : &quot;Line Chart&quot;
        } ]
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart types&quot;,
        &quot;description&quot; : &quot;Select one or more chart types to generate for each dataset&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:enumeration&quot;, &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;showXLabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : true,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Show x-axis label?&quot;,
        &quot;description&quot; : &quot;Select whether a label will be shown on the x axis&quot;,
        &quot;argument&quot; : &quot;--show-x-label&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;xlabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;Time&quot;,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;X-axis label&quot;,
        &quot;description&quot; : &quot;Label to display below the x-axis&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;ylabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;Magnitude&quot;,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Y-axis label&quot;,
        &quot;description&quot; : &quot;Label to display below the y-axis&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;background&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;#FFFFFF&quot;,
        &quot;validator&quot; : &quot;^#(?:[0-9a-fA-F]{6}){1}$&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Background color&quot;,
        &quot;description&quot; : &quot;The hexadecimal background color of the charts. White by default&quot;,
        &quot;argument&quot; : &quot;--background=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;height&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;number&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : 512,
        &quot;validator&quot; : &quot;d+&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart height&quot;,
        &quot;description&quot; : &quot;The height in pixels of each chart&quot;,
        &quot;argument&quot; : &quot;--height=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:integer&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;separateCharts&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Extract the first k bytes&quot;,
        &quot;description&quot; : &quot;Select whether to include a legend in each chart&quot;,
        &quot;argument&quot; : &quot;--file-per-series&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    } ],
    &quot;outputs&quot; : [ ],
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/apps/v2/demo-pyplot-demo-advanced-0.1.0u1&quot;
      },
      &quot;executionSystem&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org&quot;
      },
      &quot;storageSystem&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      },
      &quot;owner&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/api_sample_user&quot;
      },
      &quot;permissions&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/apps/v2/demo-pyplot-demo-advanced-0.1.0u1/pems&quot;
      },
      &quot;metadata&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/meta/v2/data/?q={\\&quot;associationIds\\&quot;:\\&quot;0001414144637043-5056a550b8-0001-005\\&quot;}&quot;
      }
    }
  }
}
[/javascript]

Notice a few things about the response above. First, a new app was created. Our existing private app is still available and in place, however we now have a new app, <code>demo-pyplot-demo-advanced-0.1.0u1</code> with its own id. We should also point out that the id structure of public apps is different than that of private apps. In this example, the newly published app has a <code>u1</code> appended to the end of the private app id. The <code>u1</code> refers to the revision number of the public app. This is rest to 1 the first time you publish an app. Unlike private apps which can be updated over and over again without chagning the canonical URL, the canonical URL for public apps changes ever time the app is updated. This ensures that the behavior of an app never change. You can be assured that as long as a public app is available, it will always behave the same.

Second, notice that the <code>deploymentPath</code> has changed. Previously the app's assets were hosted out of a folder on the user's private storage system. Now, the <code>deploymentPath</code> points to a zip archive off the root of a public storage system. The location where public app archives are stored is determined by the <code>system.storage.publicAppsDir</code> value of the public <code>deploymentSystem</code>. By default, if no value is provided, Agave will attempt to store the archive in <code>/api/v2/apps</code>. If this folder does not exist and cannot be created, then publication will fail.

<pre><code>When an app is published, a zip archive is created of the private apps's &lt;span class="code"&gt;deploymentPath&lt;/span&gt; and coped to the public apps directory of the &lt;span class="code"&gt;deploymentSystem&lt;/span&gt;. 
</code></pre>

This is an important point. The new public app record is updated to reflect the new storage location and a checksum of the zipped archive is saved. Every time the app is run, the checksum is validated, the archive is unzipped, and the app is run exactly as before. If at any time, the checksum of the zipped archive does not match the recorded value, the app is disabled and the tenant administrators are notified. As a design decision, public apps are disabled if their data or behavior becomes compromised. Because of this, you can be assured that when you use a public app, the results will always be consistent.

Third, notice that the <code>executionSystem</code> has been updated to point to the public system, and lastly, notice that the app has a new UUID.

<h5>Admins update a public app</h5>

It is not uncommon for the need to arise where you realize you need to update an app. This happens often when a bug is detected or the default values need to change. In this situation, you simply update your private app just as you did before, then ask your tenant admins to republish the app. An example is given below where we change the default value of the <code>dataset</code> input attribute to point to a file on a publicly available storage system.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=publish&quot; https://$API_BASE_URL/apps/$API_VERSION/demo-pyplot-demo-advanced-0.1.0?pretty=true
```
[/tab]
[tab title="CLI"]
```bash
apps-publish -v demo-pyplot-demo-advanced-0.1.0
```
[/tab][/tabgroup]

[javascript collapse="true"]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-rc424a&quot;,
  &quot;result&quot; : {
    &quot;id&quot; : &quot;demo-pyplot-demo-advanced-0.1.0u1&quot;,
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced&quot;,
    &quot;icon&quot; : null,
    &quot;uuid&quot; : &quot;0001414144632114-5056a550b8-0001-005&quot;,
    &quot;parallelism&quot; : &quot;SERIAL&quot;,
    &quot;defaultProcessorsPerNode&quot; : 1,
    &quot;defaultMemoryPerNode&quot; : 1,
    &quot;defaultNodeCount&quot; : 1,
    &quot;defaultMaxRunTime&quot; : null,
    &quot;defaultQueue&quot; : &quot;debug&quot;,
    &quot;version&quot; : &quot;0.1.0&quot;,
    &quot;revision&quot; : 2,
    &quot;isPublic&quot; : true,
    &quot;helpURI&quot; : null,
    &quot;label&quot; : &quot;PyPlot Demo Advanced&quot;,
    &quot;shortDescription&quot; : &quot;Advanced demo plotting app&quot;,
    &quot;longDescription&quot; : &quot;Advanced demo app to create a graph using Python&quot;,
    &quot;tags&quot; : [ &quot;python&quot;, &quot;demo&quot;, &quot;plotting&quot;, &quot;tutorial&quot; ],
    &quot;ontology&quot; : [ &quot;&quot; ],
    &quot;executionType&quot; : &quot;CLI&quot;,
    &quot;executionSystem&quot; : &quot;docker.iplantcollaborative.org&quot;,
    &quot;deploymentPath&quot; : &quot;/api/v2/apps/demo-pyplot-demo-advanced-0.1.0u2.zip&quot;,
    &quot;deploymentSystem&quot; : &quot;data.iplantcollaborative.org&quot;,
    &quot;templatePath&quot; : &quot;wrapper.sh&quot;,
    &quot;testPath&quot; : &quot;test/test.sh&quot;,
    &quot;checkpointable&quot; : false,
    &quot;lastModified&quot; : &quot;2014-10-24T04:57:17.000-05:00&quot;,
    &quot;modules&quot; : [ ],
    &quot;available&quot; : true,
    &quot;inputs&quot; : [ {
      &quot;id&quot; : &quot;dataset&quot;,
      &quot;value&quot; : {
        &quot;validator&quot; : &quot;([^s]+(.(?i)(zip|gz|tgz|tar.gz|bz2|rar|csv))$)&quot;,
        &quot;visible&quot; : true,
        &quot;required&quot; : true,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : [ &quot;agave://data.iplantcollaborative.org/datasets/tutorials/apps/demo-pyplot-demo-advanced-0.1.0/testdata.csv&quot; ]
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Dataset&quot;,
        &quot;description&quot; : &quot;The dataset to plot&quot;,
        &quot;argument&quot; : null,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 1,
        &quot;maxCardinality&quot; : -1,
        &quot;ontology&quot; : [ &quot;http://sswapmeet.sswap.info/mime/text/Csv&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Zip&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Tar&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Bzip&quot;, &quot;http://sswapmeet.sswap.info/mime/text/Rar&quot; ],
        &quot;fileTypes&quot; : [ &quot;csv-0&quot;, &quot;zip-0&quot;, &quot;tar-0&quot;, &quot;tgz-0&quot;, &quot;bz-2&quot;, &quot;rar-0&quot; ]
      }
    } ],
    &quot;parameters&quot; : [ {
      &quot;id&quot; : &quot;showYLabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : true,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Show y-axis label?&quot;,
        &quot;description&quot; : &quot;Select whether a label will be shown on the y axis&quot;,
        &quot;argument&quot; : &quot;--show-y-label&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;unpackInputs&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : null
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Unpack input(s)&quot;,
        &quot;description&quot; : &quot;If true, any compressed input files will be expanded prior to execution on the remote system.&quot;,
        &quot;argument&quot; : &quot;1&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;showLegend&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Extract the first k bytes&quot;,
        &quot;description&quot; : &quot;Select whether to include a legend in each chart&quot;,
        &quot;argument&quot; : &quot;--show-legend&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;width&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;number&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : 1024,
        &quot;validator&quot; : &quot;d+&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart width&quot;,
        &quot;description&quot; : &quot;The width in pixels of each chart&quot;,
        &quot;argument&quot; : &quot;--width=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:integer&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;chartType&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : true,
        &quot;type&quot; : &quot;enumeration&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;line&quot;,
        &quot;enum_values&quot; : [ {
          &quot;bar&quot; : &quot;Bar Chart&quot;
        }, {
          &quot;line&quot; : &quot;Line Chart&quot;
        } ]
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart types&quot;,
        &quot;description&quot; : &quot;Select one or more chart types to generate for each dataset&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:enumeration&quot;, &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;showXLabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : true,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Show x-axis label?&quot;,
        &quot;description&quot; : &quot;Select whether a label will be shown on the x axis&quot;,
        &quot;argument&quot; : &quot;--show-x-label&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;xlabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;Time&quot;,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;X-axis label&quot;,
        &quot;description&quot; : &quot;Label to display below the x-axis&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;ylabel&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;Magnitude&quot;,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Y-axis label&quot;,
        &quot;description&quot; : &quot;Label to display below the y-axis&quot;,
        &quot;argument&quot; : &quot;&quot;,
        &quot;showArgument&quot; : false,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;background&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;string&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : &quot;#FFFFFF&quot;,
        &quot;validator&quot; : &quot;^#(?:[0-9a-fA-F]{6}){1}$&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Background color&quot;,
        &quot;description&quot; : &quot;The hexadecimal background color of the charts. White by default&quot;,
        &quot;argument&quot; : &quot;--background=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:string&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;height&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;number&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : 512,
        &quot;validator&quot; : &quot;d+&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Chart height&quot;,
        &quot;description&quot; : &quot;The height in pixels of each chart&quot;,
        &quot;argument&quot; : &quot;--height=&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:integer&quot; ]
      }
    }, {
      &quot;id&quot; : &quot;separateCharts&quot;,
      &quot;value&quot; : {
        &quot;visible&quot; : true,
        &quot;required&quot; : false,
        &quot;type&quot; : &quot;flag&quot;,
        &quot;order&quot; : 0,
        &quot;enquote&quot; : false,
        &quot;default&quot; : false,
        &quot;validator&quot; : &quot;&quot;
      },
      &quot;details&quot; : {
        &quot;label&quot; : &quot;Extract the first k bytes&quot;,
        &quot;description&quot; : &quot;Select whether to include a legend in each chart&quot;,
        &quot;argument&quot; : &quot;--file-per-series&quot;,
        &quot;showArgument&quot; : true,
        &quot;repeatArgument&quot; : false
      },
      &quot;semantics&quot; : {
        &quot;minCardinality&quot; : 0,
        &quot;maxCardinality&quot; : 1,
        &quot;ontology&quot; : [ &quot;xs:boolean&quot; ]
      }
    } ],
    &quot;outputs&quot; : [ ],
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/apps/v2/demo-pyplot-demo-advanced-0.1.0u2&quot;
      },
      &quot;executionSystem&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org&quot;
      },
      &quot;storageSystem&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      },
      &quot;owner&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/profiles/v2/api_sample_user&quot;
      },
      &quot;permissions&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/apps/v2/demo-pyplot-demo-advanced-0.1.0u2/pems&quot;
      },
      &quot;metadata&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/meta/v2/data/?q={&quot;associationIds&quot;:&quot;0001414144632114-5056a550b8-0001-005&quot;}&quot;
      }
    }
  }
}
[/javascript]

Notice that both the revision number and app id changed after publication. Now, if we were to query the Apps service, we would see both <code>demo-pyplot-demo-advanced-0.1.0u1</code> and <code>demo-pyplot-demo-advanced-0.1.0u2</code> present.

<pre><code>Republishing an app creates a new app with incremented revision number. It does **not** delete the previous app.
</code></pre>

It is up to you to set the policy in place dealing with how you choose to retire public apps.

Also notice that the <code>deploymentPath</code> for the new app has changed. Every time an app is published, a new snapshot of the private app's assets is archived, checksummed, and stored on the public system. Again, this guarantees that each app is independent of the previous one and can be counted on to behave consistently over time.

<h5>Deleting a public app</h5>

As with private apps, public apps can be removed by issuing a DELETE request on the app's URL. Tenant admin permissions are required to delete public apps.

[tabgroup]
[tab title="Curl"]
```bash 
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/apps/$API_VERSION/demo-pyplot-demo-advanced-0.1.0u1
``` 
[/tab]
[tab title="CLI"]
```bash 
apps-delete demo-pyplot-demo-advanced-0.1.0u1
```
[/tab]
[/tabgroup]