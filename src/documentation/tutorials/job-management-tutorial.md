<h3>Overview</h3>

The Jobs service is a basic execution service that allows you to run applications registered with the Apps service across multiple, distributed, heterogeneous systems through a common REST interface. The service manages all aspects of execution and job management from data staging, job submission, monitoring, output archiving, event logging, sharing, and notifications. The Jobs service also provides a persistent reference to your job's output data and a mechanism for sharing all aspects of your job with others. Each feature will be described in more detail below.

[notice]If you are not familiar with batch computing and why we refer to a simulation run as a "job," we wrote a good blog post on the topic, <a href="http://agaveapi.co/what-is-a-job2/" title="What is a Job">What is a "Job"</a> that will help give you some context and background on the subject and terminology.[/notice]

<h3>Job submission</h3>

Job submission is a term recycled from shared batch computing environments where a user would submit a request for a unit of computational work (called a Job) to the batch scheduler, then go head home for dinner while waiting for the computer to complete the job they gave it.

Originally the batch scheduler was a person and the term batch came from their ability to process several submissions together. Later on, as human schedulers were replaced by software, the term stuck even though the process remained unchanged. Today the term job submission is essentially unchanged.

A user submits a request for a unit of work to be done. The primary difference is that today, often times, the wait time between submission and execution is considerably less. On shared systems, such as many of the HPC systems originally targeted by Agave, waiting for your job to start is the price you pay for the incredible performance you get once your job starts.

Agave, too, adopts the concept of job submission, though it is not in and of itself a scheduler. In the context of Agave's Job service, the process of running an application registered with the Apps service is referred to as submitting a job.

Unlike in the batch scheduling world where each scheduler has its own job submission syntax and its own idiosyncrasies, the mechanism for submitting a job to Agave is consistent regardless of the application or system on which you run. A HTML form or JSON object are posted to the Jobs service. The submission is validated, and the job is forwarded to the scheduling and execution services for processing.

Because Agave takes an app-centric view of science, execution does not require knowing about the underlying systems on which an application runs. Simply knowing how the parameters and inputs you want to use when running an app is sufficient to define a job. Agave will handle the rest.

As mentioned previously, jobs are submitted by making a HTTP POST request either a HTML form or a JSON object to the Jobs service. All job submissions must include a few mandatory values that are used to define a basic unit of work. Table 1 lists the optional and required attributes of all job submissions.

[table id=69 /]

<p class="table-caption">Table 1. The optional and required attributes common to all job submissions. Optional fields are marked with an astericks.</p>

[notice]In this tutorial we will use JSON for our examples, however, one could replace the JSON object with a HTML form mapping JSON attribute and values to HTML form attributes and values one for one and get the same results, with the exception of the `notifications` attribute which is not accepted using HTML form submission and would need to be added after submitting the job request by sending each of the notification objects with the returned job id to the <a href="http://agaveapi.co/documentation/tutorials/notification-management-tutorial/" title="Notification Management Tutorial">Notifications API</a>.[/notice]

In addition to the standard fields for all jobs, the application you specify in the <code>appId</code> field will also have its own set of inputs and parameters specified during registration that are unique to that app. (For more information about app registration and descriptions, see the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">App Management Tutorial</a>).

The following snippet shows a sample JSON job request that could be submitted to the Jobs service to run the <code>pyplot-0.1.0</code> app from the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/advanced-app-example/" title="Advanced App Example">Advanced App Example</a> tutorial.

[code lang=javascript]
{  
  &quot;name&quot;:&quot;pyplot-demo test&quot;,
  &quot;appId&quot;:&quot;demo-pyplot-demo-advanced-0.1.0&quot;,
  &quot;inputs&quot;:{  
    &quot;dataset&quot;:[  
      &quot;agave://$PUBLIC_STORAGE_SYSTEM/$API_USERNAME/inputs/pyplot/testdata.csv&quot;,
      &quot;agave://$PUBLIC_STORAGE_SYSTEM/$API_USERNAME/inputs/pyplot/testdata2.csv&quot;
    ]
  },
  &quot;archive&quot;:false,
  &quot;parameters&quot;:{  
    &quot;unpackInputs&quot;:false,
    &quot;chartType&quot;:[  
      &quot;bar&quot;,
      &quot;line&quot;
    ],
    &quot;width&quot;:1024,
    &quot;height&quot;:512,
    &quot;background&quot;:&quot;#d96727&quot;,
    &quot;showYLabel&quot;:true,
    &quot;ylabel&quot;:&quot;The Y Axis Label&quot;,
    &quot;showXLabel&quot;:true,
    &quot;xlabel&quot;:&quot;The X Axis Label&quot;,
    &quot;showLegend&quot;:true,
    &quot;separateCharts&quot;:false
  },
  &quot;notifications&quot;:[  
    {  
      &quot;url&quot;:&quot;$API_EMAIL&quot;,
      &quot;event&quot;:&quot;RUNNING&quot;
    },
    {  
      &quot;url&quot;:&quot;$API_EMAIL&quot;,
      &quot;event&quot;:&quot;FINISHED&quot;
    },
    {  
      &quot;url&quot;:&quot;http://http://requestbin.agaveapi.co/o1aiawo1?job_id=${JOB_ID}&amp;status=${JOB_STATUS}&quot;,
      &quot;event&quot;:&quot;*&quot;,
      &quot;persistent&quot;:true
    }
  ]
}
[/code]

Notice that this example specifies a single input attribute, <code>dataset</code>. The <code>pyplot-0.1.0</code> app definition specified that the <code>dataset</code> input attribute could accept more than one value (maxCardinality = 2). In the job request object, that translates to an array of string values. Each string represents a piece of data that Agave will transfer into the job work directory prior to job execution. Any value accepted by the Files service when <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/#importing-data">importing data</a> is accepted here. Some examples of valid values are given in the following table.

[table id=73 /]

<p class="table-caption">Table 2. Examples of different syntaxes that input values can be specified in the job request object. Here we assume that the validator for the input field is such that these would pass.</p>

The example job request also specifies <code>parameters</code> object with the parameters defined in the <code>pyplot-0.1.0</code> app description. Notice that the parameter <code>type</code> value specified in the app description is reflected here. Numbers are given as numbers, not strings. Boolean and flag attributes are given as boolean true and false values. As with the input section, there is also a parameter <code>chartType</code> that accepts multiple values. In this case that translates to an array of string value. Had the parameter type required another primary type, that would be used in the array instead.

Finally, we see a <code>notifications</code> array specifying that we want Agave send three notifications related to this job. The first is a one-time email when the job starts running. The second is a one-time email when the job reaches a terminal state. The third is a webhook to the url we specified. More on notifications in the section on monitoring below.

<h3>Job submission validation</h3>

If everything went well, you will receive a response that looks something like the following JSON object.

[tabgroup]
[tab title="Curl"]
```javascript 
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@job.json&quot; https://$API_BASE_URL/jobs/$API_VERSION?pretty=true
``` 
[/tab]
[tab title="CLI"]
jobs-submit -F job.json
[/tab]
[/tabgroup]

[code lang=javascript]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-r6d11c&quot;,
  &quot;result&quot; : {
    &quot;id&quot; : &quot;0001414144065563-5056a550b8-0001-007&quot;,
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced test-1414139896&quot;,
    &quot;owner&quot; : &quot;$API_USERNAME&quot;,
    &quot;appId&quot; : &quot;demo-pyplot-demo-advanced-0.1.0&quot;,
    &quot;executionSystem&quot; : &quot;$PUBLIC_EXECUTION_SYSTEM&quot;,
    &quot;batchQueue&quot; : &quot;debug&quot;,
    &quot;nodeCount&quot; : 1,
    &quot;processorsPerNode&quot; : 1,
    &quot;memoryPerNode&quot; : 1.0,
    &quot;maxRunTime&quot; : &quot;01:00:00&quot;,
    &quot;archive&quot; : false,
    &quot;retries&quot; : 0,
    &quot;localId&quot; : &quot;10321&quot;,
    &quot;outputPath&quot; : null,
    &quot;status&quot; : &quot;FINISHED&quot;,
    &quot;submitTime&quot; : &quot;2014-10-24T04:48:11.000-05:00&quot;,
    &quot;startTime&quot; : &quot;2014-10-24T04:48:08.000-05:00&quot;,
    &quot;endTime&quot; : &quot;2014-10-24T04:48:15.000-05:00&quot;,
    &quot;inputs&quot; : {
      &quot;dataset&quot; : &quot;agave://$PUBLIC_STORAGE_SYSTEM/$API_USERNAME/inputs/pyplot/testdata.csv&quot;
    },
    &quot;parameters&quot; : {
      &quot;chartType&quot; : &quot;bar&quot;,
      &quot;height&quot; : &quot;512&quot;,
      &quot;showLegend&quot; : &quot;false&quot;,
      &quot;xlabel&quot; : &quot;Time&quot;,
      &quot;background&quot; : &quot;#FFF&quot;,
      &quot;width&quot; : &quot;1024&quot;,
      &quot;showXLabel&quot; : &quot;true&quot;,
      &quot;separateCharts&quot; : &quot;false&quot;,
      &quot;unpackInputs&quot; : &quot;false&quot;,
      &quot;ylabel&quot; : &quot;Magnitude&quot;,
      &quot;showYLabel&quot; : &quot;true&quot;
    },
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007&quot;
      },
      &quot;app&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/apps/v2/demo-pyplot-demo-advanced-0.1.0&quot;
      },
      &quot;executionSystem&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/v2/$PUBLIC_EXECUTION_SYSTEM&quot;
      },
      &quot;archiveData&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007/outputs/listings&quot;
      },
      &quot;owner&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/profiles/v2/$API_USERNAME&quot;
      },
      &quot;permissions&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007/pems&quot;
      },
      &quot;history&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007/history&quot;
      },
      &quot;metadata&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/meta/v2/data/?q={&quot;associationIds&quot;:&quot;0001414144065563-5056a550b8-0001-007&quot;}&quot;
      },
      &quot;notifications&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/notifications/v2/?associatedUuid=0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }
}
[/code]

<h3>Job monitoring</h3>

Once you submit your job request, the job will be handed off to Agave's back end execution service. Your job may run right away, or it may wait in a batch queue on the execution system until the required resources are available. Either way, the execution process occurs completely asynchronous to the submission process. To monitor the status of your job, Agave supports two different mechanisms: polling and webhooks.

[notice]For the sake of brevity, we placed a detailed explanation of the job lifecycle in a separate, aptly title post, <a href="http://agaveapi.co/documentation/tutorials/job-management-tutorial/the-job-lifecycle" title="The Job Lifecycle">The Job Lifecycle</a>. There you will find detailed information about how, when, and why everything moves from place to place and how you can peek behind the curtains.[/notice]

<h4>Polling</h4>

If you have ever taken a long road trip with children, you are probably painfully aware of how polling works. Starting several minutes from the time you leave the house, a child asks, <a href="https://www.youtube.com/watch?v=4vUBsTJYK28&amp;w=640&amp;h=385" title="Are we there yet Shrek?" target="_blank">"Are we there yet?"</a> You reply, "No." Several minutes later the child again asks, "Are we there yet?" You again reply, "No." This process continues until you finally arrive at your destination. <strong>This is called polling and polling is bad</strong>

Polling for your job status works the same way. After submitting your job, you start a while loop that queries the Jobs service for your job status until it detects that the job is in a terminal state. The following two URLs both return the status of your job. The first will result in a list of abbreviated job descriptions, the second will result in a full description of the job with the given $JOB_ID, exactly like that returned when submitting the job. The third will result in a much smaller response object that contains only the $JOB_ID and status being returned.

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/status
[/code]

Sample response snippet

[code lang=javascript]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-r6d11c&quot;,
  &quot;result&quot; : {
    &quot;id&quot; : &quot;0001414144065563-5056a550b8-0001-007&quot;,
    &quot;status&quot; : &quot;FINISHED&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }
}
[/code]

The list of all possible job statuses is given in table 2.

[table id=71 /]

<p class="table-caption">Table 2. Job statuses listed in progressive order from job submission to completion.</p>

Polling is an incredibly effective approach, but it is bad practice for two reasons. First, it does not scale well. Querying for one job status every few seconds does not take much effort, but querying for 100 takes quite a bit of time and puts unnecessary load on Agave's servers. Second, polling provides what is effectively a binary response. It tells you whether a job is done or not done, it does not give you any information on what is actually going on with the job or where it is in the overall execution process.

The job history URL provides much more detailed information on the various state changes, system messages, and progress information associated with data staging. The syntax of the job history URL is as follows

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/history
[/code]

Sample response snippet

[code lang=javascript]
{  
  &quot;status&quot;:&quot;success&quot;,
  &quot;message&quot;:null,
  &quot;version&quot;:&quot;2.1.0-r6d11c&quot;,
  &quot;result&quot;:[  
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:45.000-05:00&quot;,
      &quot;status&quot;:&quot;PENDING&quot;,
      &quot;description&quot;:&quot;Job accepted and queued for submission.&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:47.000-05:00&quot;,
      &quot;status&quot;:&quot;PROCESSING_INPUTS&quot;,
      &quot;description&quot;:&quot;Attempt 1 to stage job inputs&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:47.000-05:00&quot;,
      &quot;status&quot;:&quot;PROCESSING_INPUTS&quot;,
      &quot;description&quot;:&quot;Identifying input files for staging&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:48.000-05:00&quot;,
      &quot;status&quot;:&quot;STAGING_INPUTS&quot;,
      &quot;description&quot;:&quot;Staging agave://$PUBLIC_STORAGE_SYSTEM/$API_USERNAME/inputs/pyplot/testdata.csv to remote job directory&quot;
    },
    {  
      &quot;progress&quot;:{  
        &quot;averageRate&quot;:0,
        &quot;totalFiles&quot;:1,
        &quot;source&quot;:&quot;agave://$PUBLIC_STORAGE_SYSTEM/$API_USERNAME/inputs/pyplot/testdata.csv&quot;,
        &quot;totalActiveTransfers&quot;:0,
        &quot;totalBytes&quot;:3212,
        &quot;totalBytesTransferred&quot;:3212
      },
      &quot;created&quot;:&quot;2014-10-24T04:47:48.000-05:00&quot;,
      &quot;status&quot;:&quot;STAGING_INPUTS&quot;,
      &quot;description&quot;:&quot;Copy in progress&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:50.000-05:00&quot;,
      &quot;status&quot;:&quot;STAGED&quot;,
      &quot;description&quot;:&quot;Job inputs staged to execution system&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:55.000-05:00&quot;,
      &quot;status&quot;:&quot;SUBMITTING&quot;,
      &quot;description&quot;:&quot;Preparing job for submission.&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:47:55.000-05:00&quot;,
      &quot;status&quot;:&quot;SUBMITTING&quot;,
      &quot;description&quot;:&quot;Attempt 1 to submit job&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:48:08.000-05:00&quot;,
      &quot;status&quot;:&quot;RUNNING&quot;,
      &quot;description&quot;:&quot;Job started running&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:48:12.000-05:00&quot;,
      &quot;status&quot;:&quot;CLEANING_UP&quot;
    },
    {  
      &quot;created&quot;:&quot;2014-10-24T04:48:15.000-05:00&quot;,
      &quot;status&quot;:&quot;FINISHED&quot;,
      &quot;description&quot;:&quot;Job completed. Skipping archiving at user request.&quot;
    }
  ]
}
[/code]

Depending on the nature of your job and the reliability of the underlying systems, the response from this service can grow rather large, so it is important to be aware that this query can be an expensive call for your client application to make. Everything we said before about polling job status applies to polling job history with the additional caveat that you can chew through quite a bit of bandwidth polling this service, so keep that in mind if your application is bandwidth starved.

Often times, however, polling is unavoidable. In these situations, we recommend using an <a href="http://en.wikipedia.org/wiki/Exponential_backoff" title="Exponential Backoff" target="_blank">exponential backoff</a> to check job status. An exponential backoff is an alogrithm that increases the time between retries as the number of failures increases.

<h4>Webhooks</h4>

Webhooks are the alternative, preferred way for your application to monitor the status of asynchronous actions in Agave. If you are a <a href="http://en.wikipedia.org/wiki/Design_Patterns_(book)" title="Gang of Four" target="_blank">Gang of Four</a> disciple, webhooks are a mechanism for implementing the <a href="http://en.wikipedia.org/wiki/Observer%5Fpattern" title="Observer Pattern" target="_blank">Observer Pattern</a>. They are widely used across the web and chances are that something you're using right now is leveraging them. In the context of Agave, a webhook is a URL that you give to Agave in advance of an event which it later POSTs a response to when that event occurs. A webhook can be any web accessible URL.

[notice]For more information about webhooks, events, and notifications in Agave, please see the <a href="http://agaveapi.co/notifications-and-events/" title="Notifications and Events">Notifications and Events</a> page.[/notice]

The Jobs service provides several template variables for constructing dynamic URLs. Template variables can be included anywhere in your URL by surrounding the variable name in the following manner <code>${VARIABLE_NAME}</code>. When an event of interest occurs, the variables will be resolved and the resulting URL called. Several example urls are given below.

[code lang=text]
http://example.com/?job_id=${JOB_ID}&amp;job_status=${EVENT}
[/code]

[code lang=text]
http://example.com/trigger/job/${JOB_NAME}/${EVENT}
[/code]

[code lang=text]
http://example.com/webhooks/?nonce=sdfkajerouiwe234289fahlkqr&amp;id=${JOB_ID}&amp;status=${EVENT}&amp;start=${JOB_START_TIME}&amp;end=${JOB_END_TIME}&amp;url=${JOB_ARCHIVE_URL}
[/code]

The full list of template variables are listed in Table 3.

[table id=33 /]

<p class="table-caption">Table 3. Template variables available for use when defining webhooks for your job.</p>

<h4>Email</h4>

In situations where you do not have a persistent web address, or access to a backend service, you may find it more convenient to subscribe for email notifications rather then providing a webhook. Agave supports email notifications support as well. Simply specify a valid email address in the <code>url</code> field in your job submission notification object and an email will be sent to that address when a relevant event occurs. A sample email message is given below.

[code lang=text]
The status of job 0001414144065563-5056a550b8-0001-007, &quot;demo-pyplot-demo-advanced test-1414139896,&quot; has changed to FINISHED.

Name: demo-pyplot-demo-advanced test-1414139896
URL: https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007
Message: Job completed successfully.
Submit Time: 2014-10-24T04:48:11.000-05:00
Start Time: 2014-10-24T04:48:08.000-05:0
End Time: 2014-10-24T04:48:15.000-05:00
Output Path: $API_USERNAME/archive/jobs/job-0001414144065563-5056a550b8-0001-007
Output URL: https://$API_BASE_URL/jobs/v2/0001414144065563-5056a550b8-0001-007/outputs
[/code]

<h3>Job outputs</h3>

Throughout the lifecycle of a job, your inputs, application assets, and outputs are copied from and shuffled between several different locations. Though it is possible in many instances to explicitly locate and view all the moving pieces of your job through the Files service, resolving where those pieces are given the status, execution system, storage systems, data protocols, login protocols, and execution mechanisms of your job at a given time is...challenging. It is important, however, that you have the ability to monitor your job's output throughout the lifetime of the job.

To make tracking the output of a specific job easier to do, the Jobs service provides a special URL for referencing individual job outputs

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/outputs/listings/$PATH
[/code]

The syntax of this service is consistent with the Files service syntax, as is the JSON response from the service. The response would be similar to the following:

[code lang=javascript]
{
  &quot;status&quot; : &quot;success&quot;,
  &quot;message&quot; : null,
  &quot;version&quot; : &quot;2.1.0-r6d11c&quot;,
  &quot;result&quot; : [ {
    &quot;name&quot; : &quot;output&quot;,
    &quot;path&quot; : &quot;/output&quot;,
    &quot;lastModified&quot; : &quot;2014-11-06T13:34:35.000-06:00&quot;,
    &quot;length&quot; : 0,
    &quot;permission&quot; : &quot;NONE&quot;,
    &quot;mimeType&quot; : &quot;text/directory&quot;,
    &quot;format&quot; : &quot;folder&quot;,
    &quot;type&quot; : &quot;dir&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/outputs/media/output&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org&quot;
      },
      &quot;parent&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }, {
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced-test-1414139896.err&quot;,
    &quot;path&quot; : &quot;/demo-pyplot-demo-advanced-test-1414139896.err&quot;,
    &quot;lastModified&quot; : &quot;2014-11-06T13:34:27.000-06:00&quot;,
    &quot;length&quot; : 442,
    &quot;permission&quot; : &quot;NONE&quot;,
    &quot;mimeType&quot; : &quot;application/octet-stream&quot;,
    &quot;format&quot; : &quot;unknown&quot;,
    &quot;type&quot; : &quot;file&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/outputs/media/demo-pyplot-demo-advanced-test-1414139896.err&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org&quot;
      },
      &quot;parent&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }, {
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced-test-1414139896.out&quot;,
    &quot;path&quot; : &quot;/demo-pyplot-demo-advanced-test-1414139896.out&quot;,
    &quot;lastModified&quot; : &quot;2014-11-06T13:34:30.000-06:00&quot;,
    &quot;length&quot; : 1396,
    &quot;permission&quot; : &quot;NONE&quot;,
    &quot;mimeType&quot; : &quot;application/octet-stream&quot;,
    &quot;format&quot; : &quot;unknown&quot;,
    &quot;type&quot; : &quot;file&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/outputs/media/demo-pyplot-demo-advanced-test-1414139896.out&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org&quot;
      },
      &quot;parent&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }, {
    &quot;name&quot; : &quot;demo-pyplot-demo-advanced-test-1414139896.pid&quot;,
    &quot;path&quot; : &quot;/demo-pyplot-demo-advanced-test-1414139896.pid&quot;,
    &quot;lastModified&quot; : &quot;2014-11-06T13:34:33.000-06:00&quot;,
    &quot;length&quot; : 6,
    &quot;permission&quot; : &quot;NONE&quot;,
    &quot;mimeType&quot; : &quot;application/octet-stream&quot;,
    &quot;format&quot; : &quot;unknown&quot;,
    &quot;type&quot; : &quot;file&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/outputs/media/demo-pyplot-demo-advanced-test-1414139896.pid&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org&quot;
      },
      &quot;parent&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  }, {
    &quot;name&quot; : &quot;testdata.csv&quot;,
    &quot;path&quot; : &quot;/testdata.csv&quot;,
    &quot;lastModified&quot; : &quot;2014-11-06T13:34:42.000-06:00&quot;,
    &quot;length&quot; : 3212,
    &quot;permission&quot; : &quot;NONE&quot;,
    &quot;mimeType&quot; : &quot;application/octet-stream&quot;,
    &quot;format&quot; : &quot;unknown&quot;,
    &quot;type&quot; : &quot;file&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007/outputs/media/testdata.csv&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/systems/$API_VERSION/data.iplantcollaborative.org&quot;
      },
      &quot;parent&quot; : {
        &quot;href&quot; : &quot;https://$API_BASE_URL/jobs/$API_VERSION/0001414144065563-5056a550b8-0001-007&quot;
      }
    }
  } ]
}
[/code]

To download a file you would use the following syntax

[code lang=bash]
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/outputs/media/$PATH
[/code]

[notice]The Jobs output service follows the same conventions of the Files service. Thus, you may specify a range header to retrieve a specific byte range. This is particularly helpful when tracking job progress since it gives you a mechanism to tail the output and error log files.[/notice]

Regardless of job status, the above services will always point to the most recent location of the job data. If you choose for the Jobs service to archive your job after completion, the URL will point to the archive folder of the job. If you do not choose to archive your data, or if archiving fails, the URL will point to the execution folder created for your job at runtime. Because Agave does not own any of the underlying hardware, it cannot guarantee that those locations will always exist. If, for example, the execution system enforces a purge policy, the output data may be deleted by the system administrators. Agave will let you know if the data is no longer present, however, it cannot prevent it from being deleted. This is another reason that it is important to archive data you feel will be needed in the future.

<h3>Managing your job</h3>

Once your job is submitted, you have the ability to stop, delete, and resubmit it as a new job.
[tabgroup]
[tab title="Killing"]
```bash 
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;action=kill&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID
``` 
[/tab]
[tab title="Deleting"]
```bash 
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID
```
[/tab]
[tab title="Resubmitting"]
```bash 
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -d &quot;action=resubmit&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID
```
[/tab]
[/tabgroup]

<h3>Permissions and sharing</h3>

As with the <a title="System Registration" href="http://agaveapi.co/system-registration/">Systems</a>, <a title="Application Management" href="http://agaveapi.co/application-management/">Apps</a>, and <a title="File Management" href="http://agaveapi.co/file-management/">Files</a> services, your jobs have their own set of access controls. Using these, you can share your job and its data with other Agave users. Job permissions are private by default. The permissions you give a job apply both to the job, its outputs, its metadata, and the permissions themselves. Thus, by sharing a job with another user, you share all aspects of that job.

Job permissions are managed through a set of URLs consistent with the permissions URL elsewhere in the API.

[tabgroup]
[tab title="Listing"]

All permissions granted for this job:
```bash
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/pems
```

Permissions granted to a specific user: 
```bash
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/pems/$USERNAME
```
[/tab]
[tab title="Adding &amp; Updating"]
```bash 
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; -X POST -d &quot;permission:$PERMISSION&quot; https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/$USERNAME
```
[/tab]
[tab title="Deleting"]
Deleting permissions for all users on a job: 

```bash 
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID
```

Deleting permissions for a specific user on a job: 

```bash
curl -sk -H &quot;Authorization: Bearer  $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/jobs/$API_VERSION/$JOB_ID/$USERNAME
``` 
[/tab]
[/tabgroup]

The available permission values are listed in Table 2.

[table id=70 /]

<p class="table-caption">Table 2. Supported job permission values.</p>

[alert]Job permissions are distinct from file permissions. In many instances, your job output will be accessible via the Files and Jobs services simultaneously. Granting a user permissions a job output file through the Files services does not alter the accessibility of that file through the Jobs service. It is important, then, that you consider to whom you grant permissions, and the implications of that decision in all areas of your application.[/alert]