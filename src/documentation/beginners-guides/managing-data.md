In the last beginner's guide on system discovery we found several public systems we could use to test out the APIs. One of the great things about Agave is that it takes care of all the protocol management and account juggling so you can focus on <em>what</em> you want to do rather than <em>how</em> to do it. Let's look at the storage system <code>data.iplantcollaborative.org</code> to see how we can interact with data in Agave.

<h2>Directory listing</h2>

Browsing files and folders with Agave's Files service is the same regardless of the type, location, or protocols used by the underlying storage system. Let's list our home directory to see how it's done.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/files/$API_VERSION/listings/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-list -v -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

The response to this contains a summary listing of the contents of our home directory on  <code>data.iplantcollaborative.org</code>. Appending a file path to our commands above would give information on a specific file.

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
    }
]
[/code]

<h2>Uploading data</h2>

You may upload data to a remote systems by performing a multipart POST on the FILES service. Using the CLI, recursive directory uploads are supported. If you are manually calling curl, you will need to manually create the directories and upload the local contents one at a time. You can take a look in the <code>files-upload</code> script to see how this is done. Let's keep moving forward with our lesson by uploading a file we can use in the rest of this section.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@files/picksumipsum.txt&quot; https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
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
    },
    &quot;internalUsername&quot;: null,
    &quot;lastModified&quot;: &quot;2014-09-03T10:28:09.943-05:00&quot;,
    &quot;name&quot;: &quot;picksumipsum.txt&quot;,
    &quot;nativeFormat&quot;: &quot;raw&quot;,
    &quot;owner&quot;: &quot;systest&quot;,
    &quot;path&quot;: &quot;/iplant/home/systest/picksumipsum.txt&quot;,
    &quot;source&quot;: &quot;http://129.114.60.211/picksumipsum.txt&quot;,
    &quot;status&quot;: &quot;STAGING_QUEUED&quot;,
    &quot;systemId&quot;: &quot;data.iplantcollaborative.org&quot;,
    &quot;uuid&quot;: &quot;0001409758089943-5056a550b8-0001-002&quot;
}
[/code]

<h2>Importing data from a URL</h2>

You can also import data from an external URL. Rather than making a multipart file upload request, you can pass in JSON object with the URL and an optional target file name, file type, and array of notifications which should be made when the import completes. The next example will import a the README.md file from the Agave Samples git repository in Bitbucket.  in the  Let's keep moving forward with our lesson by uploading a file we can use in the rest of this section.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -- data &#039;{ &quot;url&quot;:&quot;https://bitbucket.org/taccaci/agave-samples/raw/master/README.md&quot;}&#039; https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-import -v -U &quot;https://bitbucket.org/taccaci/agave-samples/raw/master/README.md&quot; -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

Importing data from a third party is done offline as an asynchronous activity, so the response from the server will come right away. One thing worth noting is that the file length given in the response will always be -1. This is because Agave does not know what the actual file size is yet. That will be updated later on, after the transfer has finished.

For this exercise, the file we just imported is just a few KB, so you should see it appear in your home folder on <code>data.iplantcollaborative.org</code> almost immediately. If you were importing larger datasets, the transfer could take significantly longer depending on the network quality between Agave and the source location. In this case, you would see the file size continue to increase until it completed. In the event of a failed transfer, Agave will retry 3 times before canceling the transfer.

<h2>Transferring data between systems</h2>

Much like importing data, Agave can manage transfer of data between registered systems. This is, in fact, how data is staged prior to running a simulation. Data transfers are fire and forget, so you can simply start a transfer and go about your business. Agave will ensure it completes. If you would like a notification when the transfer completes, you can subscribe for one or more emails and/or webhooks and Agave will alert them upon completion.

In the example below, we will transfer a file from <code>stampede.tacc.utexas.edu</code> to <code>data.iplantcollaborative.org</code>. While the request looks pretty basic, there's a lot going on behind the scenes. Agave will authenticate to both systems, check permissions, stream data out of Stampede using SFTP and proxy it into <code>data.iplantcollaborative.org</code> using the IRODS protocol, adjusting the transfer buffer size along the way to optimize throughput. Doing this by hand is both painful and error prone. Doing it with Agave is nearly identical to copying a file from one directory to another on your local system.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -- data &#039;{ &quot;url&quot;:&quot;agave://stampede.tacc.utexas.edu//etc/motd&quot;}&#039; https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
files-import -v -U &quot;agave://stampede.tacc.utexas.edu//etc/motd&quot; -S data.iplantcollaborative.org $API_USERNAME
``` 
[/tab][/tabgroup]

The response from the service will be nearly identical to the one we received importing a file. This process is identical whether we copy a file or directory. If the source URL is a directory, it will recursively copy the contents until all contents have been copied.

<h2>Performing operations on your data</h2>

Similar to the POSIX paradigm, we can create, copy, move, rename, and delete files and folders. Let's try these out on one of the files we just uploaded. For brevity, we omitted the <code>-v</code> option from the CLI calls to get abbreviated output.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X POST -F &quot;fileToUpload=@files/picksumipsum.txt&quot; https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME
```
[/tab]
[tab title="CLI"]
```bash
$ files-mkdir -N foo -S data.iplantcollaborative.org $API_USERNAME
Successfully created directory $API_USERNAME/foo
$ files-list -S data.iplantcollaborative.org $API_USERNAME
.
foo
motd
picksumipsum.txt
README.md
$ files-copy -D $API_USERNAME/foo/picksumipsum.txt -S data.iplantcollaborative.org $ $API_USERNAME/picksumipsum.txt
Successfully copied $API_USERNAME/picsumipsum.txt to $API_USERNAME/foo/picsumipsum.txt
$ files-list -S data.iplantcollaborative.org $API_USERNAME/foo
.
picksumipsum.txt
$ files-move -D $API_USERNAME/foo/picksumipsum2.txt -S data.iplantcollaborative.org $API_USERNAME/foo/picksumipsum.txt
Successfully moved $API_USERNAME/foo/picsumipsum.txt to $API_USERNAME/foo/picsumipsum2.txt
$ files-list -S data.iplantcollaborative.org $API_USERNAME/foo
.
picksumipsum2.txt
$ files-rename -N picksumipsum.txt -S data.iplantcollaborative.org $API_USERNAME/foo/picksumipsum2.txt
Successfully renamed $API_USERNAME/foo/picsumipsum2.txt to $API_USERNAME/foo/picsumipsum.txt
$ files-list -S data.iplantcollaborative.org $API_USERNAME/foo
.
picksumipsum.txt
``` 
[/tab][/tabgroup]

<h2>Accessing your data's provenance</h2>

Before we delete our sample data, let's briefly point out one other feature of the Files service that can come in handy. By default, Agave will keep track of every file operation that it performs or observes on your data. Let's query the Files service to see what we've done to our file thus far.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME/foo/picksumipsum.txt
```
[/tab]
[tab title="CLI"]
```bash
files-history -S data.iplantcollaborative.org $API_USERNAME/foo/picksumipsum.txt
```
[/tab][/tabgroup]

The response will be a JSON array with the events on this file thus far.

[code lang=javascript]
[
    {
        &quot;created&quot;: &quot;2014-09-03T13:13:37.000-05:00&quot;,
        &quot;description&quot;: &quot;File item copied from https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/foo/picksumipsum.txt&quot;,
        &quot;status&quot;: &quot;CREATED&quot;
    },
    {
        &quot;created&quot;: &quot;2014-09-03T13:14:30.000-05:00&quot;,
        &quot;description&quot;: &quot;Moved from https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/foo/picksumipsum.txt to https://agave.iplantc.org/files/v2/media/system/data.iplantcollaborative.org/systest/foo/picksumipsum2.txt&quot;,
        &quot;status&quot;: &quot;MOVED&quot;
    },
    {
        &quot;created&quot;: &quot;2014-09-03T13:15:19.000-05:00&quot;,
        &quot;description&quot;: &quot;Renamed path from systest/foo/picksumipsum2.txt to systest/foo/picksumipsum.txt&quot;,
        &quot;status&quot;: &quot;RENAME&quot;
    }
]
[/code]

[notice]Agave will keep track of everything it has done, but it does not own the underlying systems, thus if you or another user manually alter data on the underlying file system, no provenance information will be available from Agave other than its observance that the data has changed. If you need full journaling support, we suggest either using Agave as the exclusive point of interaction with your storage system or seeking another system-level solution.[/notice]

<h2>Deleting data</h2>

Now that we've finished up our look at data operations, we will delete the <code>foo</code> directory with our copied file. (We will leave the original file we uploaded for later on when we get to our section on job submission.) By default Agave will perform recursive deletion on folders, so we just need to make the one call to delete the folder and all its contents. The response from this call is empty, so we'll skip showing the output.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/files/$API_VERSION/media/data.iplantcollaborative.org/$API_USERNAME/foo
```
[/tab]
[tab title="CLI"]
```bash
files-delete -S data.iplantcollaborative.org $API_USERNAME/foo
```
[/tab][/tabgroup]