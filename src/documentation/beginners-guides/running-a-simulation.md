In the previous lesson on <a title="App Discovery" href="http://agaveapi.co/documentation/beginners-guides/app-discovery/">Discovering Apps</a>, we learned how to identify the inputs and parameters needed to run an app from its app description. Using that knowledge, we can craft a JSON description of our public app, <code>wc-osg-1.00u1</code>.

[code lang=javascript]
{
&quot;name&quot;:&quot;wordcount demo&quot;,
&quot;appId&quot;:&quot;wc-osg-1.00u1&quot;,
&quot;inputs&quot;:{
&quot;query1&quot;:&quot;agave://data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
},
&quot;parameters&quot;: {},
&quot;notifications&quot;:[
{
&quot;url&quot;:&quot;http://postbin.agaveapi.co/ad3a9dz?job_status=${JOB_STATUS}&amp;job_id=${JOB_ID}&quot;,
&quot;event&quot;:&quot;*&quot;,
&quot;persistent&quot;:true
}
]
}
[/code]

You should recognize the attributes in this object from the app description in the <a title="App Discovery" href="http://agaveapi.co/documentation/beginners-guides/app-discovery/">Discovering Apps</a> guide. Additionally we add two new attributes: <code>name</code> and <code>notifications</code>. The <code>name</code> attribute is a mandatory descriptive name for the job. The <code>notifications</code> attribute is an optional array of notification objects used to send you alerts of various job events. We cover notifications more in a couple sections.

<h2>Submitting a job request</h2>

Running a job is simply a matter of sending a POST request to the Jobs service with a JSON description, like the one above, of your job.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST --data &#039;&#039; https://$API_BASE_URL/jobs/$API_VERSION
```
[/tab]
[tab title="CLI"]
```bash
jobs-submit -v -F submit.json
```
[/tab][/tabgroup]

Submitting this job description will return a JSON object with a full description of the job including all the default, hidden, and global parameters used.

[code lang=javascript]
{
&quot;appId&quot;: &quot;wc-osg-1.00u1&quot;,
&quot;archive&quot;: true,
&quot;archivePath&quot;: &quot;systest/archive/jobs/job-0001409784588509-5056a550b8-0001-007&quot;,
&quot;archiveSystem&quot;: &quot;data.iplantcollaborative.org&quot;,
&quot;batchQueue&quot;: &quot;condorqueue&quot;,
&quot;endTime&quot;: null,
&quot;executionSystem&quot;: &quot;condor.opensciencegrid.org&quot;,
&quot;id&quot;: &quot;0001409784588509-5056a550b8-0001-007&quot;,
&quot;inputs&quot;: {
&quot;query1&quot;: &quot;agave://data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
},
&quot;localId&quot;: null,
&quot;maxRunTime&quot;: &quot;999:59:59&quot;,
&quot;memoryPerNode&quot;: 2.0,
&quot;name&quot;: &quot;wordcount demo&quot;,
&quot;nodeCount&quot;: 1,
&quot;outputPath&quot;: null,
&quot;owner&quot;: &quot;systest&quot;,
&quot;parameters&quot;: {},
&quot;processorsPerNode&quot;: 1,
&quot;retries&quot;: 0,
&quot;startTime&quot;: null,
&quot;status&quot;: &quot;PENDING&quot;,
&quot;submitTime&quot;: &quot;2014-09-03T17:49:48.568-05:00&quot;,
&quot;_links&quot;: {
&quot;app&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/apps/v2/wc-osg-1.00u1&quot;
},
&quot;archiveData&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/listings&quot;
},
&quot;archiveSystem&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;executionSystem&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/condor.opensciencegrid.org&quot;
},
&quot;history&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/history&quot;
},
&quot;metadata&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/meta/v2/data/?q={&quot;associationIds&quot;:&quot;0001409784588509-5056a550b8-0001-007&quot;}&quot;
},
&quot;notifications&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/notifications/v2/?associatedUuid=0001409784588509-5056a550b8-0001-007&quot;
},
&quot;owner&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/profiles/v2/systest&quot;
},
&quot;permissions&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/pems&quot;
},
&quot;self&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}
[/code]

<h2>Monitoring your job</h2>

Throughput on the OSG Condor pool, where this job is running, is generally pretty quick. However, depending on several factors out of our control, this can take a bit of time to complete. You can following the status of the job either by adding a <code>-W</code> argument to the <code>jobs-submit</code> command or querying the status of the job using the <code>jobs-status</code> command. An example is shown below.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001409784588509-5056a550b8-0001-007/status
```
[/tab]
[tab title="CLI"]
```bash
jobs-status -v 0001409784588509-5056a550b8-0001-007
```
[/tab][/tabgroup]

The response will be an abbreviated JSON object containing just the status of the job.

[code lang=javascript]
{
&quot;id&quot;: &quot;0001409784588509-5056a550b8-0001-007&quot;,
&quot;status&quot;: &quot;FINISHED&quot;,
&quot;_links&quot;: {
&quot;self&quot;: {
&quot;href&quot;: &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}
[/code]

<h2>Job notifications</h2>

When we described our job in the first section, we pointed out a <code>notifications</code> attribute. The preferred way to track the status of your jobs is to subscribe to receive asynchronous notifications on job events of interest such as FINISHED, RUNNING, and FAILED. In our job request above, we used the wildcard event <code>"*"</code> to indicate that we want to receive notifications about every event that occurs in our job's lifecycle. We provide a url where the notification should be sent, and we specify that we want the notification to persist between invocations rather than expire the first time it is sent.

[code lang=javascript]
{
&quot;url&quot;:&quot;http://agaveapi.co/requestbin/ad3a9dz?job_status=${JOB_STATUS}&amp;job_id=${JOB_ID}&quot;,
&quot;event&quot;:&quot;*&quot;,
&quot;persistent&quot;:true
}
[/code]

Agave supports two kinds of notifications: <a title="Webhooks" href="http://webhooks.org" target="_blank">webhooks</a> and email. In the job notification we created, we specified a webhook. Webhooks are just HTTP endpoints that will receive a POST from Agave's Notification service when the desired event occurs. Agave supports a rich set of template variables that allow you to craft informative, custom URLS to suite your particular application needs. Our URL will be resolved at run time to include the job's id, <code>${JOB_ID}</code>, and status, <code>${JOB_STATUS}</code> before being called.

[notice]There are several good services available online for testing webhooks. Runscope's <a title="Request Bin by Runscope" href="http://requestb.in" target="_blank">RequestBin</a> is a good, free hosted service. A simple, self-hosted node listener is available <a href="https://github.com/deardooley/node-http-post-listener">here</a>. You can also create a <a title="Agave Request Bin" href="http://requestbin.agaveapi.co" target="_blank">request bin</a> on this site to use in your development.[/notice]

<h2>Job history</h2>

As with the Files service, Agave keeps a complete history of all activity related to your jobs. You can access this provenance trail through the job history.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001409784588509-5056a550b8-0001-007/history
```
[/tab]
[tab title="CLI"]
```bash
jobs-history -v 0001409784588509-5056a550b8-0001-007
```
[/tab][/tabgroup]

The response will be a JSON array of events related to the job. At this point we've simply submitted the job and let it run to completion. If we share the job with out colleagues, resubmit it, or want to watch it progress in real time, we will see those events show up in the job's history.

[code lang=javascript]
[
{
&quot;created&quot;: &quot;2014-09-03T17:49:48.000-05:00&quot;,
&quot;description&quot;: &quot;Job accepted and queued for submission.&quot;,
&quot;status&quot;: &quot;PENDING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:50.000-05:00&quot;,
&quot;description&quot;: &quot;Attempt 1 to stage job inputs&quot;,
&quot;status&quot;: &quot;PROCESSING_INPUTS&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:51.000-05:00&quot;,
&quot;description&quot;: &quot;Identifying input files for staging&quot;,
&quot;status&quot;: &quot;PROCESSING_INPUTS&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:51.000-05:00&quot;,
&quot;description&quot;: &quot;Staging agave://data.iplantcollaborative.org/systest/picksumipsum.txt to remote job directory&quot;,
&quot;status&quot;: &quot;STAGING_INPUTS&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:51.000-05:00&quot;,
&quot;description&quot;: &quot;Copy in progress&quot;,
&quot;progress&quot;: {
&quot;averageRate&quot;: 3235,
&quot;source&quot;: &quot;agave://data.iplantcollaborative.org/systest/picksumipsum.txt&quot;,
&quot;totalActiveTransfers&quot;: 0,
&quot;totalBytes&quot;: 3235,
&quot;totalBytesTransferred&quot;: 3235,
&quot;totalFiles&quot;: 1
},
&quot;status&quot;: &quot;STAGING_INPUTS&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:53.000-05:00&quot;,
&quot;description&quot;: &quot;Job inputs staged to execution system&quot;,
&quot;status&quot;: &quot;STAGED&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:54.000-05:00&quot;,
&quot;description&quot;: &quot;Preparing job for submission.&quot;,
&quot;status&quot;: &quot;SUBMITTING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:49:54.000-05:00&quot;,
&quot;description&quot;: &quot;Attempt 1 to submit job&quot;,
&quot;status&quot;: &quot;SUBMITTING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:50:28.000-05:00&quot;,
&quot;description&quot;: &quot;Condor job successfully placed into queue&quot;,
&quot;status&quot;: &quot;QUEUED&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:50:39.000-05:00&quot;,
&quot;description&quot;: &quot;Job started running&quot;,
&quot;status&quot;: &quot;RUNNING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:01.000-05:00&quot;,
&quot;description&quot;: &quot;Job completion detected by Condor monitor.&quot;,
&quot;status&quot;: &quot;CLEANING_UP&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:02.000-05:00&quot;,
&quot;description&quot;: &quot;Beginning to archive output.&quot;,
&quot;status&quot;: &quot;ARCHIVING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:02.000-05:00&quot;,
&quot;description&quot;: &quot;Attempt 1 to archive job output&quot;,
&quot;status&quot;: &quot;ARCHIVING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:02.000-05:00&quot;,
&quot;description&quot;: &quot;Transferring job output to archive system&quot;,
&quot;status&quot;: &quot;ARCHIVING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:03.000-05:00&quot;,
&quot;description&quot;: &quot;Archiving agave://condor.opensciencegrid.org//condor/scratch/systest/job-0001409784588509-5056a550b8-0001-007-wordcount-demo to agave://data.iplantcollaborative.org/systest/archive/jobs/job-0001409784588509-5056a550b8-0001-007&quot;,
&quot;progress&quot;: {
&quot;averageRate&quot;: 0,
&quot;source&quot;: &quot;agave://condor.opensciencegrid.org//condor/scratch/systest/job-0001409784588509-5056a550b8-0001-007-wordcount-demo&quot;,
&quot;totalActiveTransfers&quot;: 1,
&quot;totalBytes&quot;: 7514,
&quot;totalBytesTransferred&quot;: 7514,
&quot;totalFiles&quot;: 8
},
&quot;status&quot;: &quot;ARCHIVING&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:20.000-05:00&quot;,
&quot;description&quot;: &quot;Job archiving completed successfully.&quot;,
&quot;status&quot;: &quot;ARCHIVING_FINISHED&quot;
},
{
&quot;created&quot;: &quot;2014-09-03T17:51:22.000-05:00&quot;,
&quot;description&quot;: &quot;Job complete&quot;,
&quot;status&quot;: &quot;FINISHED&quot;
}
]
[/code]

[notice]In each job's history you will see every event that occurs during the job's lifetime. This includes data movement. The job history is a good place to track the progress of the job's data movement before and after a job runs.[/notice]

Note that data produced from the job will be archived by default to your public storage system. Input files are not archived. If you do not want the job output data archived, specify <code>archive: false</code> in your job request JSON and all job data will remain in the original work directory. You will still be able to access this data using the <code>jobs-output</code> command described next.

<h2>Job output</h2>

Now that your job has completed, you will probably want to retrieve the output. We could use the Files service for this, but let's look at how to interact with job data through the job output API.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001409784588509-5056a550b8-0001-007/outputs/listing
```
[/tab]
[tab title="CLI"]
```bash
jobs-output -v 0001409784588509-5056a550b8-0001-007
```
[/tab][/tabgroup]

The response will be a JSON array of file objects identical to that returned from the Files service. The array will contain the contents of our job's work directory. You can dive deeper into subfolders simply by appending the relative path to the curl URL or to the CLI using the <code>-P</code> or <code>--path</code> argument.

[code lang=javascript]
[
{
&quot;name&quot; : &quot;condorSubmit&quot;,
&quot;path&quot; : &quot;/condorSubmit&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:05.000-05:00&quot;,
&quot;length&quot; : 310,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;application/octet-stream&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/condorSubmit&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;job.err&quot;,
&quot;path&quot; : &quot;/job.err&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:07.000-05:00&quot;,
&quot;length&quot; : 104,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;application/octet-stream&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/job.err&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;job.out&quot;,
&quot;path&quot; : &quot;/job.out&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:09.000-05:00&quot;,
&quot;length&quot; : 100,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;application/octet-stream&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/job.out&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;output.txt&quot;,
&quot;path&quot; : &quot;/output.txt&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:12.000-05:00&quot;,
&quot;length&quot; : 20,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;text/plain&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/output.txt&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;picksumipsum.txt&quot;,
&quot;path&quot; : &quot;/picksumipsum.txt&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:14.000-05:00&quot;,
&quot;length&quot; : 3235,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;text/plain&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/picksumipsum.txt&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;runtime.log&quot;,
&quot;path&quot; : &quot;/runtime.log&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:16.000-05:00&quot;,
&quot;length&quot; : 1007,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;application/octet-stream&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/runtime.log&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}, {
&quot;name&quot; : &quot;transfer.tar.gz&quot;,
&quot;path&quot; : &quot;/transfer.tar.gz&quot;,
&quot;lastModified&quot; : &quot;2014-09-03T17:51:19.000-05:00&quot;,
&quot;length&quot; : 2738,
&quot;permission&quot; : &quot;NONE&quot;,
&quot;mimeType&quot; : &quot;application/octet-stream&quot;,
&quot;format&quot; : &quot;unknown&quot;,
&quot;type&quot; : &quot;file&quot;,
&quot;_links&quot; : {
&quot;self&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007/outputs/media/transfer.tar.gz&quot;
},
&quot;system&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
},
&quot;parent&quot; : {
&quot;href&quot; : &quot;https://agave.iplantc.org/jobs/v2/0001409784588509-5056a550b8-0001-007&quot;
}
}
}
]
[/code]

Downloading job data is just as easy and uses the same conventions from the Files service.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/jobs/$API_VERSION/0001409784588509-5056a550b8-0001-007/outputs/media/output.txt
```
[/tab]
[tab title="CLI"]
```bash
jobs-output -D -P output.txt 0001409784588509-5056a550b8-0001-007
```
[/tab][/tabgroup]

HTTP isn't the best way to download directories, so if you need to pull down your entire job directory, try using the <code>files-get</code> command in the CLI. Alternatively, if you need to move your job output to another system you've registered in Agave, you can have Agave transfer the entire directory for you.