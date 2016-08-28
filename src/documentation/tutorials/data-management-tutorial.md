<h2>Introduction</h2>

The Agave Files service allows you to manage data across multiple storage systems using multiple protocols. It supports traditional file operations such as directory listing, renaming, copying, deleting, and upload/download that are traditional to most file services. It also supports file importing from arbitrary locations, metadata assignment, and a full access control layer allowing you to keep your data private, share it with your colleagues, or make it publicly available.

<h3>Files service URL structure</h3>

Every file and directory referenced through the Files service has a canonical URI defined as:

[code lang=bash]
https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
[/code]

The following table defines each component:

[table id=22 /]

Agave also supports the concept of default systems. Excluding the <code>/system/$SYSTEM_ID</code> tokens from the above URL, the Files service will automatically assume you are referencing your default storage system. Thus, if your default system was <code>data.iplantcollaborative.org</code>,

[code lang=bash]
https://$API_BASE_URL/files/$API_VERSION/media/shared
[/code]

would behave identically to:

[code lang=bash]
https://$API_BASE_URL/files/$API_VERSION/media/system/data.iplantcollaborative.org/shared
[/code]

This comes in especially handy when referencing your default system paths in other contexts such as job requests and when interacting with the Agave CLI. A good example of this situation is when you have a global default storage system accessible to all your users. In this case, most users will use that for all of their data staging and archiving needs. These users may find it easier not to even think about the system they are using. The default system support in the Files service allows them to do just that.

[notice]When building applications against the Files service, it is considered a best practice to always specify the intended system ID when constructing URL paths to avoid situations where users change their default systems. This will also provide long-term stability to your data references and make debugging much easier. You can read more about default systems in the <a href="http://agaveapi.co/documentation/tutorials/system-management/" title="System Management">System Management</a> tutorial.[/notice]

<h2>Understanding Agave file paths vs actual system paths <a name="understanding-agave-file-paths-vs-actual-system-paths"></a></h2>

One potentially confusing feature of Agave is its support for virtualizing systems paths. Every registered system specifies both a root directory, <code>rootDir</code>, and a home directory, <code>homeDir</code> attribute in its storage configuration. <code>rootDir</code> tells Agave the absolute path on the remote system that it should treat as <code>/</code>. Similar to the Linux <code>chroot</code> command; no requests made to Agave will ever be resolved to locations outside of <code>rootDir</code>.

[table id=21 /]

<code>homeDir</code> specifies the path, relative to <code>rootDir</code>, that Agave should use for relative paths. Since Agave is stateless, there is no concept of a current working directory. Thus, when you specify a path to Agave that does not begin with a <code>/</code>, Agave will always prefix the path with the value of <code>homeDir</code>. The following table gives several examples of how different combinations of <code>rootDir</code>, <code>homeDir</code>, and URL paths will be resolved by Agave. For a deeper dive into this subject, please see the <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/understanding-agave-file-paths/" title="Understanding Agave File Paths">Understanding Agave File Paths</a> tutorial.

[table id=20 /]

<h2>Moving data</h2>

Before we talk about how to do basic operations on your data, let's first talk about how you can move your data around. You already have a storage system available to you, so we will start with the "hello world" of data movement, uploading a file.

<h3>Uploading data</h3>

You may upload data to a remote systems by performing a multipart POST on the FILES service. If you are using the Agave CLI, you can perform recursive directory uploads. If you are manually calling curl or building an app with the Agave SDK, you will need to implement the recursion yourself. You can take a look in the <code>files-upload</code> script to see how this is done. The following is an example of how to upload a file that we will use in the remainder of this tutorial.

[tabgroup]
[tab title="Curl"]

```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    -F &quot;fileToUpload=@files/picksumipsum.txt&quot;  
    https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```

[/tab]
[tab title="CLI"]
```bash
files-upload -v -F files/picksumipsum.txt -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

You will see a progress bar while the file uploads, followed by a response from the server with a description of the uploaded file. Agave does not block during data movement operations, so it may be just a second before the file physically shows up on the remote system.

[code lang=javascript]
{
    &quot;internalUsername&quot;: null,
    &quot;lastModified&quot;: &quot;2014-09-03T10:28:09.943-05:00&quot;,
    &quot;name&quot;: &quot;picksumipsum.txt&quot;,
    &quot;nativeFormat&quot;: &quot;raw&quot;,
    &quot;owner&quot;: &quot;systest&quot;,
    &quot;path&quot;: &quot;/iplant/home/systest/picksumipsum.txt&quot;,
    &quot;source&quot;: &quot;http://129.114.60.211/picksumipsum.txt&quot;,
    &quot;status&quot;: &quot;STAGING_QUEUED&quot;,
    &quot;systemId&quot;: &quot;data.iplantcollaborative.org&quot;,
    &quot;uuid&quot;: &quot;0001409758089943-5056a550b8-0001-002&quot;,
    &quot;_links&quot;: {
        &quot;history&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/files/v2/history/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
        },
        &quot;self&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
        },
        &quot;system&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
        }
    }
}
[/code]

<h3>Importing data <a name="importing-data">&nbsp;</a></h3>

You can also import data from an external URL. Rather than making a multipart file upload request, you can pass in a JSON object with the URL and an optional target file name, file type, and array of notifications which should be made when the import completes. Agave supports several protocols for ingestion listed in the next table.

[table id=23 /]

To demonstrate how this works, will import a the README.md file from the <a href="https://bitbucket.org/taccaci/agave-samples" title="Agave Samples" target="_blank">Agave Samples</a> git repository in Bitbucket.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    -- data &#039;{ &quot;url&quot;:&quot;https://bitbucket.org/taccaci/agave-samples/raw/master/README.md&quot;}&#039;  
    https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-import -v -U &quot;https://bitbucket.org/taccaci/agave-samples/raw/master/README.md&quot;  
    -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

Importing data from a third party is done offline as an asynchronous activity, so the response from the server will come right away. The response is given below. One thing worth noting is that the file length given in the response will always be -1. This is because Agave does not know what the actual file size is yet. That will be updated later on, after the transfer has finished.

[code lang=javascript]
{
    &quot;name&quot; : &quot;README.md&quot;,
    &quot;uuid&quot; : &quot;0001409758713912-5056a550b8-0001-002&quot;,
    &quot;owner&quot; : &quot;systest&quot;,
    &quot;internalUsername&quot; : null,
    &quot;lastModified&quot; : &quot;2014-09-10T20:00:55.266-05:00&quot;,
    &quot;source&quot; : &quot;https://bitbucket.org/taccaci/agave-samples/raw/master/README.md&quot;,
    &quot;path&quot; : &quot;/iplant/home/systest/README.md&quot;,
    &quot;status&quot; : &quot;STAGING_QUEUED&quot;,
    &quot;systemId&quot; : &quot;data.iplantcollaborative.org&quot;,
    &quot;nativeFormat&quot; : &quot;raw&quot;,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/README.md&quot;
      },
      &quot;system&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      },
      &quot;history&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/files/v2/history/system/data.iplantcollaborative.org/systest/README.md&quot;
      }
    }
}
[/code]

For this exercise, the file we just imported is just a few KB, so you should see it appear in your home folder on <code>data.iplantcollaborative.org</code> almost immediately. If you were importing larger datasets, the transfer could take significantly longer depending on the network quality between Agave and the source location. In this case, you would see the file size continue to increase until it completed. In the event of a failed transfer, Agave will retry several times before canceling the transfer.

[notice]Agave attempts to make smart decisions about how and when to transfer data. This includes leveraging third-party transfers whenever possible, scaling directory copies out horizontally, and taking advantage of chunked or parallel uploads. As a result, data may arrive in a non-deterministic way on the target system. This is normal and should be expected.[/notice]

<h3>Transferring data</h3>

Much like importing data, Agave can manage the transfer of data between registered systems. This is, in fact, how data is staged prior to running a simulation. Data transfers are fire and forget, so you can simply start a transfer and go about your business. Agave will ensure it completes. If you would like a notification when the transfer completes or reaches a certain stage, you can subscribe for one or more emails and/or <a href="http://webhooks.org" title="Webhooks" target="_blank">webhooks</a> and Agave will process them upon completion. The following table lists the available file events. For more information about Agave's event and notification system, please see the <a href="http://agaveapi.co/documentation/tutorials/notifications-tutorial/" title="Notifications Tutorial" target="_blank">Notifications Tutorial</a> and <a href="http://agaveapi.co/documentation/event-reference/" title="Agave Platform Event Reference" target="_blank">Event Reference</a>.

In the example below, we will transfer a file from <code>stampede.tacc.utexas.edu</code> to <code>data.iplantcollaborative.org</code>. While the request looks pretty basic, there's a lot going on behind the scenes. Agave will authenticate to both systems, check permissions, stream data out of Stampede using SFTP and proxy it into <code>data.iplantcollaborative.org</code> using the IRODS protocol, adjusting the transfer buffer size along the way to optimize throughput. Doing this by hand is both painful and error prone. Doing it with Agave is nearly identical to copying a file from one directory to another on your local system.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST  
    -- data &#039;{ &quot;url&quot;:&quot;agave://stampede.tacc.utexas.edu//etc/motd&quot;}&#039;  
    https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-import -v -U &quot;agave://stampede.tacc.utexas.edu//etc/motd&quot; -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

The response from the service will be the same as the one we received importing a file.

One of the benefits of Agave's Files service is that it frees you up to work in parallel and scale as large as your application demands. In the next example we will use Agave's Files to create redundant archives of a shared project directory.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; 
    -X POST -- data &#039;{ &quot;url&quot;:&quot;agave://data.iplantcollaborative.org/$API_USERNAME/foo_project&quot;}&#039; 
    https://$API_BASE_URL/files/$API_VERSION/media/system/$API_USERNAME.storage1/
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; 
    -X POST -- data &#039;{ &quot;url&quot;:&quot;agave://data.iplantcollaborative.org/$API_USERNAME/foo_project&quot;}&#039; 
    https://$API_BASE_URL/files/$API_VERSION/media/system/$API_USERNAME.storage2/
```
[/tab]
[tab title="CLI"]
```bash
files-import -v -U &quot;agave://data.iplantcollaborative.org/$API_USERNAME/foo_project&quot; -S $API_USERNAME.storage1
files-import -v -U &quot;agave://data.iplantcollaborative.org/$API_USERNAME/foo_project&quot; -S $API_USERNAME.storage2
``` 
[/tab][/tabgroup]

[notice]Notice in the above examples that the Files services works identically regardless of whether the source is a file or directory. If the source is a file, it will copy the file. If the source is a directory, it will recursively process the contents until everything has been copied.[/notice]

<h2>Basic data operations</h2>

Now that we understand how to move data into, out of, and between systems, we will look at how to perform file operations on the data. Again, remember that the Files service gives you a common REST interface to all your storage and execution systems regardless of the authentication mechanism or protocol they use. The examples below will use your default public storage system, but they would work identically with any storage system you have access to.

<h3>Directory listing</h3>

Obtaining a directory listing, or information about a specific file is done by making a GET request on the <code>/files/$API_VERSION/listings/</code> resource.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot;  
    https://$API_BASE_URL/files/$API_VERSION/listings/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-list -v -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

The response to this contains a summary listing of the contents of your home directory on  <code>data.iplantcollaborative.org</code>. Appending a file path to your commands above would give information on a specific file.

[code lang=javascript]
[
    {
        &quot;format&quot;: &quot;folder&quot;,
        &quot;lastModified&quot;: &quot;2012-08-03T06:30:12.000-05:00&quot;,
        &quot;length&quot;: 0,
        &quot;mimeType&quot;: &quot;text/directory&quot;,
        &quot;name&quot;: &quot;.&quot;,
        &quot;path&quot;: &quot;systest&quot;,
        &quot;permisssions&quot;: &quot;ALL&quot;,
        &quot;system&quot;: &quot;data.iplantcollaborative.org&quot;,
        &quot;type&quot;: &quot;dir&quot;,
        &quot;_links&quot;: {
            &quot;self&quot;: {
                &quot;href&quot;: &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest&quot;
            },
            &quot;system&quot;: {
                &quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
            }
        }
    },
    {
    &quot;format&quot;: &quot;raw&quot;,
    &quot;lastModified&quot;: &quot;2014-09-10T19:47:44.000-05:00&quot;,
    &quot;length&quot;: 3235,
    &quot;mimeType&quot;: &quot;text/plain&quot;,
    &quot;name&quot;: &quot;picksumipsum.txt&quot;,
    &quot;path&quot;: &quot;systest/picksumipsum.txt&quot;,
    &quot;permissions&quot;: &quot;ALL&quot;,
    &quot;system&quot;: &quot;data.iplantcollaborative.org&quot;,
    &quot;type&quot;: &quot;file&quot;,
    &quot;_links&quot;: {
            &quot;self&quot;: {
                &quot;href&quot;: &quot;https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/picksumipsum.txt&quot;
        },
        &quot;system&quot;: {
            &quot;href&quot;: &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
        }
    }
    }
]
[/code]

<h3>Move, copy, rename, delete</h3>

Basic file operations are available by sending a POST request the the <code>/files/$API_VERSION/media/</code> collection with the following parameters.

[table id=24 /]

<h4>Copying files and directories</h4>

Copying can be performed on any remote system. Unlike the Unix <code>cp</code> command, all copy invocations in Agave will overwrite the destination target if it exists. In the event of a directory collision, the contents of the two directory trees will be merged with the source overwriting the destination. Any overwritten files will maintain their provenance records and have an additional entry added to record the copy operation.

[tabgroup]
[tab title="Curl"]
Copy a file or directory: 
```bash
curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot;  
    -X POST -d &quot;action=copy&amp;path=$DESTPATH&quot; 
    https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
```
[/tab]
[tab title="CLI"]
Copy a file or directory: 
```bash
files-copy -D $DESTPATH -S $SYSTEM_ID $PATH
```
[/tab]
[/tabgroup]

The response from a copy operation will be a JSON object describing the new file or folder.

<code>javascript</code>

<h4>Moving files and directories</h4>

Moving can be performed on any remote system. Moving a file or directory will overwrite the destination target if it exists. Unlike copy operations, the destination will be completely replaced by the source in the event of a collision. No merge will take place. Further, the provenance of the source will replace that of the target.

[tabgroup]
[tab title=&quot;Curl&quot;]
Move a file or directory: 
```bash
curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot;  
    -X POST -d &quot;action=move&amp;path=$DESTPATH&quot;  
    https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
```
[/tab]
[tab title=&quot;CLI&quot;]
Move a file or directory: 
```bash
files-move -D $DESTPATH -S $SYSTEM_ID $PATH
```
[/tab]
[/tabgroup]

<h4>Renaming files and directories</h4>

Renaming, like copying and moving, is only applicable within the context of a single system. Unlike on Unix systems, renaming and moving are not synonymous. When specifying a new name for a file or directory, the new name is relative to the parent directory of the original file or directory. Also, If a file or directory already exists with that name, the operation will fail and an error message will be returned. All provenance information will follow the renamed file or directory.

[tabgroup]
[tab title=&quot;Curl&quot;]
Rename a file or directory:
```bash
curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; 
    -X POST -d &quot;action=rename&amp;path=$NEWNAME&quot; 
    https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
```
[/tab]
[tab title=&quot;CLI&quot;]
Rename a file or directory:
```bash
files-rename -N $NEWNAME -S $SYSTEM_ID $PATH
```
[/tab]
[/tabgroup]

<h4>Creating a new directory</h4>

Creating a new directory is a recursive action in Agave. If the parent directories do not exist, they will be created on the fly. If a file or directory already exists with that name, the operation will fail and an error message will be returned.

[tabgroup]
[tab title=&quot;Curl&quot;]
Create a new directory:
```bash
curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; 
    -X POST -d &quot;action=mkdir&amp;path=$NEWDIR&quot; 
    https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
```
[/tab]
[tab title=&quot;CLI&quot;]
Create a new directory:
```bash
files-mkdir -N $NEWDIR -S $SYSTEM_ID $PATH
```
[/tab]
[/tabgroup]

<h4>Deleting a file or directory</h4>

As with creating a directory, deleting a file or directory is a recursive action in Agave. No prompt or warning will be given once the request is sent. It is up to you to implement such checks in your application logic and/or user interface.

[tabgroup]
[tab title=&quot;Curl&quot;]
Delete a file or directory:
```bash
curl -sk -H &quot;Authorization: Bearer de32225c235cf47b9965997270a1496c&quot; 
    -X DELETE https://$API_BASE_URL/files/$API_VERSION/media/system/$SYSTEM_ID/$PATH
```
[/tab]
[tab title=&quot;CLI&quot;]
Delete a file or directory:
```bash
files-delete -S $SYSTEM_ID $PATH
```
[/tab]
[/tabgroup]

<h2>Metadata management</h2>

In many systems, the concept of metadata is directly tied to the notion of a file system. Agave takes a broader view of metadata and supports it as its own first class resource in the REST API. For more information on how to leverage metadata in Agave, please consult the <a href="http://agaveapi.co/documentation/tutorials/metadata-tutorial/" title="Metadata Tutorial">Metadata Tutorial</a>. In there we cover all aspects of how to manage, search, validate, and associate metadata across your entire digital lab.

<h2>Data permissions</h2>

Agave has a fine-grained permission model supporting use cases from creating and expositing readonly storage systems to sharing individual files and folders with one or more users. To learn more about the data permission model and how you can use it to meet your needs, consult the <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/data-permissions-tutorial/" title="Data Permissions Tutorial">Data Permissions Tutorial</a>.

<h2>Data provenance</h2>

Agave keeps a full provenance record of every action it takes or observes on a a file and folder. You can read more about how Agave tracks these things as well as how to access provenance information in the <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/data-provenance-tutorial/" title="Data Provenance Tutorial">Data Provenance Tutorial</a>.