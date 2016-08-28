Agave enables you to group together one or more compute and storage systems to assemble the infrastructure you need to power your digital lab. To help you get started with Agave, we provide several sandbox environments you can use to walk through these tutorials. These compute and storage resources are available to all users and will be used throughout the tutorials and examples on this site. Let's start out by querying the systems service to see what we already have.

<h2>Find all systems available to you</h2>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION
```
[/tab]
[tab title="CLI"]
```bash
systems-list -v
```
[/tab][/tabgroup]

The response to this call for our example user looks like this:

[code lang=javascript]
[  
   {  
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/lonestar4.tacc.teragrid.org&quot;
         }
      },
      &quot;default&quot;:false,
      &quot;description&quot;:&quot;The TACC Dell Linux Cluster (Lonestar) is a powerful, multi-use cyberinfrastructure HPC and remote visualization resource. Lonestar contains 22,656 cores within 1,888 Dell PowerEdgeM610 compute blades (nodes), 16 PowerEdge R610 compute-I/Oserver-nodes, an...&quot;,
      &quot;id&quot;:&quot;lonestar4.tacc.teragrid.org&quot;,
      &quot;name&quot;:&quot;TACC Lonestar (Public)&quot;,
      &quot;public&quot;:true,
      &quot;status&quot;:&quot;UP&quot;,
      &quot;type&quot;:&quot;EXECUTION&quot;
   },
   {  
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
         }
      },
      &quot;default&quot;:true,
      &quot;description&quot;:&quot;The iPlant Data Store is where your data are stored. The Data Store is cloud-based and is the central repository from which data is accessed by all of iPlant&#039;s technologies.&quot;,
      &quot;id&quot;:&quot;data.iplantcollaborative.org&quot;,
      &quot;name&quot;:&quot;iPlant Data Store&quot;,
      &quot;public&quot;:true,
      &quot;status&quot;:&quot;UP&quot;,
      &quot;type&quot;:&quot;STORAGE&quot;
   },
   {  
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/condor.opensciencegrid.org&quot;
         }
      },
      &quot;default&quot;:false,
      &quot;description&quot;:&quot;The Open Science Grid (OSG) advances science through open distributed computing. The OSG is a multi-disciplinary partnership to federate local, regional, community and national cyberinfrastructures to meet the needs of research and academic communities at...&quot;,
      &quot;id&quot;:&quot;condor.opensciencegrid.org&quot;,
      &quot;name&quot;:&quot;Open Science Grid&quot;,
      &quot;public&quot;:true,
      &quot;status&quot;:&quot;UP&quot;,
      &quot;type&quot;:&quot;EXECUTION&quot;
   },
   {  
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org&quot;
         }
      },
      &quot;default&quot;:false,
      &quot;description&quot;:&quot;Atmosphere VM used for Docker demonstrations and tutorials.&quot;,
      &quot;id&quot;:&quot;docker.iplantcollaborative.org&quot;,
      &quot;name&quot;:&quot;Demo Docker VM&quot;,
      &quot;public&quot;:true,
      &quot;status&quot;:&quot;UP&quot;,
      &quot;type&quot;:&quot;EXECUTION&quot;
   },
   {  
      &quot;_links&quot;:{  
         &quot;self&quot;:{  
            &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/stampede.tacc.utexas.edu&quot;
         }
      },
      &quot;default&quot;:false,
      &quot;description&quot;:&quot;Stampede is intended primarily for parallel applications scalable to tens of thousands of cores. Normal batch queues will enable users to run simulations up to 24 hours. Jobs requiring run times and more cores than allowed by the normal queues will be run...&quot;,
      &quot;id&quot;:&quot;stampede.tacc.utexas.edu&quot;,
      &quot;name&quot;:&quot;TACC Stampede (Public)&quot;,
      &quot;public&quot;:true,
      &quot;status&quot;:&quot;UP&quot;,
      &quot;type&quot;:&quot;EXECUTION&quot;
   }
]
[/code]

The response contains a list of abbreviated system descriptions. Notice that there are two kinds of systems returned: <code>EXECUTION</code> and <code>STORAGE</code>. Execution systems are used to run your simulations and optionally store and cache data. Storage systems are used to exclusively to store data. Agave speaks multiple data, scheduling, and authentication protocols, so chances are that whatever mechanism you are using to interact with your data and compute resources today, Agave can use those same mechanisms out of the box with no installation needed. The systems in the above example all use different combinations of protocols.

<h2>Viewing system details</h2>

You can see each system's detailed description by adding the system id to the above request.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/docker.iplantcollaborative.org
```
[/tab]
[tab title="CLI"]
```bash
systems-list -v docker.iplantcollaborative.org
```
[/tab][/tabgroup]

The response to this contains the full description of the system <code>docker.iplantcollaborative.org</code>:

[code lang=javascript]
{  
   &quot;description&quot;:&quot;Atmosphere VM used for Docker demonstrations and tutorials.&quot;,
   &quot;environment&quot;:null,
   &quot;executionType&quot;:&quot;CLI&quot;,
   &quot;id&quot;:&quot;docker.iplantcollaborative.org&quot;,
   &quot;lastModified&quot;:&quot;2014-07-17T10:00:24.000-05:00&quot;,
   &quot;login&quot;:{  
      &quot;auth&quot;:{  
         &quot;type&quot;:&quot;SSHKEYS&quot;
      },
      &quot;host&quot;:&quot;128.196.64.126&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SSH&quot;,
      &quot;proxy&quot;:null
   },
   &quot;maxSystemJobs&quot;:100,
   &quot;maxSystemJobsPerUser&quot;:5,
   &quot;name&quot;:&quot;Demo Docker VM&quot;,
   &quot;public&quot;:true,
   &quot;queues&quot;:[  
      {  
         &quot;customDirectives&quot;:null,
         &quot;default&quot;:true,
         &quot;maxJobs&quot;:100,
         &quot;maxMemoryPerNode&quot;:1,
         &quot;maxNodes&quot;:1,
         &quot;maxProcessorsPerNode&quot;:1,
         &quot;maxUserJobs&quot;:10,
         &quot;name&quot;:&quot;debug&quot;
      }
   ],
   &quot;revision&quot;:5,
   &quot;scheduler&quot;:&quot;FORK&quot;,
   &quot;scratchDir&quot;:&quot;&quot;,
   &quot;site&quot;:&quot;iplantc.org&quot;,
   &quot;startupScript&quot;:&quot;./bashrc&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;storage&quot;:{  
      &quot;auth&quot;:{  
         &quot;type&quot;:&quot;SSHKEYS&quot;
      },
      &quot;homeDir&quot;:&quot;/&quot;,
      &quot;host&quot;:&quot;128.196.64.126&quot;,
      &quot;mirror&quot;:false,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;proxy&quot;:null,
      &quot;rootDir&quot;:&quot;/home/dooley/vhome&quot;
   },
   &quot;type&quot;:&quot;EXECUTION&quot;,
   &quot;uuid&quot;:&quot;0001402177703917-5056a550b8-0001-006&quot;,
   &quot;_links&quot;:{  
      &quot;credentials&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org/credentials&quot;
      },
      &quot;metadata&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2/data/?q={\&quot;associationIds\&quot;:\&quot;0001402177703917-5056a550b8-0001-006\&quot;}&quot;
      },
      &quot;roles&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org/roles&quot;
      },
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org&quot;
      }
   }
}
[/code]

In the next beginner's guide we will learn how to interact with data on our storage systems.