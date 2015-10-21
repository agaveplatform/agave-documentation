<h2>Introduction</h2>

A system in Agave represents a server or collection of servers. A server can be physical, virtual, or a collection of servers exposed through a single hostname or ip address. Systems are identified and referenced in Agave by a unique ID unrelated to their ip address or hostname. Because of this, a single physical system may be registered multiple times. This allows different users to configure and use a system in whatever way they need to for their specific needs.

Systems come in two flavors: storage and execution. Storage systems are only used for storing and interacting with data. Execution systems are used for running apps (aka jobs or batch jobs) as well as storing and interacting with data.

The Systems service gives you the ability to add and discover storage and compute resources for use in the rest of the API. You may add as many or as few storage systems as you need to power your digital lab. When you register a system, it is private to you and you alone. Systems can also be published into the public space for all users to use. Depending on who is administering Agave for your organization, this may have already happened and you may already have one or more storage systems available to you by default.

In this tutorial we walk you through how to discovery, manage, share, and configure systems for your specific needs. This tutorial is best done in a hands-on manner, so if you do not have a compute or storage system of your own to use, you can grab a VM from our sandbox.

<h2>Discovering systems</h2>

The Systems service allows you to list and search for systems you have registered and systems that have been shared with you. To get a list of all your systems, make a GET request on the Systems collection.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/
```
[/tab]
[tab title="CLI"]
```bash
systems-list -v
```
[/tab][/tabgroup]

The response will be a JSON array of summary system objects. The full system description can get rather verbose, so a summary object is returned with the most critical fields in order to reduce response size when retrieving a user's systems.

[code lang=javascript]
[
  {
    &quot;id&quot; : &quot;data.iplantcollaborative.org&quot;,
    &quot;name&quot; : &quot;iPlant Data Store&quot;,
    &quot;type&quot; : &quot;STORAGE&quot;,
    &quot;description&quot; : &quot;The iPlant Data Store is where your data are stored. The Data Store is cloud-based and is the central repository from which data is accessed by all of iPlant&#039;s technologies.&quot;,
    &quot;status&quot; : &quot;UP&quot;,
    &quot;public&quot; : true,
    &quot;default&quot; : true,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      }
    }
  },
  {
    &quot;id&quot; : &quot;docker.iplantcollaborative.org&quot;,
    &quot;name&quot; : &quot;Demo Docker VM&quot;,
    &quot;type&quot; : &quot;EXECUTION&quot;,
    &quot;description&quot; : &quot;Atmosphere VM used for Docker demonstrations and tutorials.&quot;,
    &quot;status&quot; : &quot;UP&quot;,
    &quot;public&quot; : true,
    &quot;default&quot; : false,
    &quot;_links&quot; : {
      &quot;self&quot; : {
        &quot;href&quot; : &quot;https://agave.iplantc.org/systems/v2/docker.iplantcollaborative.org&quot;
      }
    }
  }
]
[/code]

[notice]The above response my vary depending on who administers Agave for your organization. To customize this tutorial for your specific account, login.[/notice]

You can further filter the results by type, scope, and default status.

[tabgroup]
[tab title="Curl"]
Only storage systems
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/?type=storage
```
Only execution systems
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/?type=execution
```
Only public systems
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/?publicOnly=true
```
Only private systems
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/?privateOnly=true
```
Only give the user's default systems
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/?default=true
```
[/tab]
[tab title="CLI"]
Only storage systems
```bash
systems-list -v -S
```
Only execution systems
```bash
systems-list -v -E
```
Only public systems
```bash
systems-list -v -P
```
Only private systems
```bash
systems-list -v -Q
```
Only give the user's default systems
```bash
systems-list -v -D
```
[/tab][/tabgroup]

To query for detailed information about a specific system, add the system id to the url and make another GET request.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-list -v $SYSTEM_ID
```
[/tab][/tabgroup]

This time, the response will be a JSON object with a full system description. The following is the description of a storage system. In the next section we talk more about storage systems and how to register one of your own.

[code lang=javascript]
{  
   &quot;default&quot;:true,
   &quot;description&quot;:&quot;The iPlant Data Store is where your data are stored. The Data Store is cloud-based and is the central repository from which data is accessed by all of iPlant&#039;s technologies.&quot;,
   &quot;id&quot;:&quot;data.iplantcollaborative.org&quot;,
   &quot;lastModified&quot;:&quot;2013-11-12T07:08:30.000-06:00&quot;,
   &quot;name&quot;:&quot;iPlant Data Store&quot;,
   &quot;public&quot;:true,
   &quot;revision&quot;:4,
   &quot;site&quot;:&quot;iplantcollaborative.org&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;storage&quot;:{  
      &quot;auth&quot;:{  
         &quot;type&quot;:&quot;PASSWORD&quot;
      },
      &quot;homeDir&quot;:&quot;/&quot;,
      &quot;host&quot;:&quot;data.iplantcollaborative.org&quot;,
      &quot;mirror&quot;:true,
      &quot;port&quot;:1247,
      &quot;protocol&quot;:&quot;IRODS&quot;,
      &quot;proxy&quot;:null,
      &quot;publicAppsDir&quot;:null,
      &quot;resource&quot;:&quot;bitol&quot;,
      &quot;rootDir&quot;:&quot;/iplant/home&quot;,
      &quot;zone&quot;:&quot;iplant&quot;
   },
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;uuid&quot;:&quot;0001384260598633-5056a550b8-0001-006&quot;,
   &quot;_links&quot;:{  
      &quot;credentials&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org/credentials&quot;
      },
      &quot;metadata&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/meta/v2/data/?q={&quot;associationIds&quot;:&quot;0001384260598633-5056a550b8-0001-006&quot;}&quot;
      },
      &quot;roles&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org/roles&quot;
      },
      &quot;self&quot;:{  
         &quot;href&quot;:&quot;https://agave.iplantc.org/systems/v2/data.iplantcollaborative.org&quot;
      }
   }
}
[/code]

<h2>Storage systems</h2>

A storage systems can be thought of as an individual data repository that you want to access through Agave. The following JSON object shows how a basic storage systems is described.

[code lang=javascript]
{
   &quot;id&quot;:&quot;sftp.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example SFTP Storage System&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using SFTP to store data for testing&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;rootDir&quot;:&quot;/&quot;,
      &quot;homeDir&quot;:&quot;/home/systest&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;PASSWORD&quot;
      }
   }
}
[/code]

The first four attribute are common to both storage and execution systems. The <code>storage</code> attribute describes the connectivity and authentication information needed to connect to the remote system. Here we describe a SFTP server accessible on <code>port</code> 22 at <code>host</code> storage.example.com. We specify that we want the <code>rootDir</code>, or virtual system root exposed through Agave, to be the system's physical root directory, and we want the authenticated user's home directory to be the <code>homeDir</code>, or virtual home directory and base of all relative paths given to Agave. Finally, we tell Agave to use password based authentication and provided the necessary credentials.

[notice]This example is given as a simple illustration of how to describe a systems for use by Agave. In most situations you should <b>NOT</b> provide your username and password. In fact, if you are using a compute or storage systems from your university or government-funded labs it is, at best, against the user agreement and, at worst, illegal to give your password to a third party service such as Agave. In these situations, use one of the many other authentication options such as SSH keys, X509 authentication, or a 3rd party authentication service like the MyProxy Gateway.[/notice]

The full list of storage system attributes is described in the following table.

[table id=57 /]

<h3>Supported data and authentication protocols</h3>

The example above described a system accessible by SFTP. Agave supports many different data and authentication protocols for interacting with your data. Sample configurations for many protocol combinations are given below.

[tabgroup]
[tab title="SFTP"]
```javascript
{
   &quot;id&quot;:&quot;sftp.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example SFTP Storage System&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using SFTP to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;rootDir&quot;:&quot;/&quot;,
      &quot;homeDir&quot;:&quot;/home/systest&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;PASSWORD&quot;
      }
   }
}
```
[/tab]
[tab title="SFTP (SSH Keys)"]
```javascript
{
   &quot;id&quot;:&quot;sftp.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example SFTP Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using SFTP to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;texas.rangers.mlb.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;rootDir&quot;:&quot;/&quot;,
      &quot;homeDir&quot;:&quot;/home/nryan&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;nryan&quot;,
         &quot;publicKey&quot;: &quot;ssh-rsa AAAAB3NzaC1yc2EBBAADAQABMQPRgQChJ6bzejqSuJdTi+VwMif8qotuSSlYwrVt0EWVduKZHpzOnS1zlknAyYXmQQFcaJ+vNAQayVMTqv+A+1lzxppTdgZ0Dn42EOYWRa6B/IEMPzDuKb7F0qNFiH9m+OZJDYdIWS1rlN1oK32jHUi0xV8kM3KOLf2TIjDBUyZRpMGyQ== Generated by Nova&quot;,
         &quot;privateKey&quot;: &quot;-----BEGIN RSA PRIVATE KEY-----nMIVCXAIBAAKBgQRhJ6bzejqSuJdTi+VwMif8qoyuSSlYwrVt0EWVduKZHpzOnSManlknAyYXmQQFcaJ+vNAQayVqTqv+A+1lzxppTdgZ0Dn42EOYWRa6B/IEMPzDuKb7Fn0uNFiH9x+OZJDYdIWS1rN1oK4DjHUi0xV8kMN3OPSIU23asx1UyZRpMGyQIDAQABnAoGATrW4NAkJ3Kltt6+HQ1Ir95sxFNrE6AZJaLYllke3iwPJpCX1dDdpDcXa8AGbVnjFXJUGA+dPrJqbyGCHA7E3H342837k/twSRGkcCNpRx/MMdWnw3asea/K5L4XVeunXAn79vo/e28D4Uue62dSwIvDJKIFWMSAgUoD53ImushqlLUCQQDPkObaowzkboLCnv3Nyj16KFZ5Lp7r5q5MYfRxO7t53Z7AWoflr++KrAT3UbSKtqmC68CqbPzxSd6qHnbnkWaD0HAkEAxsJZh7xorwAtdYznMFOsO0w5HDHOB7MuAnjwUvYZVaM0wA7HkE4rnH5SFAwEMlwx82OJxv83CnkRdlXOexn95rwJBALd8cnboGCd/AZzCvX2R+5K5lZtvnhLvczkWho3qrcoG/aUw4l1K78h4VFOFKMJOwv53BXQisF9kW6+qY3/XM49UCQHqDn4AYQOALvPBZCdVtPqFGg6W8csCAE7a5ud8zbj8A+6swcEB0+YcyEkvzID8en1ekmno/ET1wwRnhH6g/tdJlcCQM55QS4Z7rR4psgFDkFvA+wmxlqTGsXJD32sw15g4A0bmzSXnbfFg8TBAjGTDW7l0P8prFrtQ8Wml14390b29l1ptAyE=n-----END RSA PRIVATE KEY-----&quot;,
         &quot;type&quot;: &quot;SSHKEYS&quot;
      }
   }
}
```
[/tab]
[tab title="SFTP (tunnel)"]
```javascript
{
   &quot;id&quot;:&quot;sftp.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example SFTP Tunnel Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using SFTP via an ssh tunnel to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;rootDir&quot;:&quot;/&quot;,
      &quot;homeDir&quot;:&quot;/home/nryan&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;PASSWORD&quot;
      },
      &quot;proxy&quot;:{
         &quot;name&quot;:&quot;My gateway proxy server&quot;,
         &quot;host&quot;:&quot;proxy.example.com&quot;,
         &quot;port&quot;:22
      }
   }
}
```
[/tab]
[tab title="iRODS"]
```javascript
{
   &quot;id&quot;:&quot;irods.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example IRODS Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using IRODS to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:1247,
      &quot;protocol&quot;:&quot;IRODS&quot;,
      &quot;homeDir&quot;:&quot;/systest&quot;,
      &quot;rootDir&quot;:&quot;/demoZone/home&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;PASSWORD&quot;
      },
      &quot;resource&quot;:&quot;demoResc&quot;,
      &quot;zone&quot;:&quot;demoZone&quot;
   }
}
```
[/tab]
[tab title="iRODS (PAM)"]
```javascript
{
   &quot;id&quot;:&quot;irods.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example IRODS Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using IRODS with PAM authentication to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:1247,
      &quot;protocol&quot;:&quot;IRODS&quot;,
      &quot;homeDir&quot;:&quot;/systest&quot;,
      &quot;rootDir&quot;:&quot;/demoZone/home&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;PAM&quot;
      },
      &quot;resource&quot;:&quot;demoResc&quot;,
      &quot;zone&quot;:&quot;demoZone&quot;
   }
}
```
[/tab]
[tab title="iRODS (MyProxy)"]
```javascript
{
   &quot;id&quot;:&quot;irods.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example IRODS Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using IRODS to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;storage.example.com&quot;,
      &quot;port&quot;:1247,
      &quot;protocol&quot;:&quot;IRODS&quot;,
      &quot;homeDir&quot;:&quot;/systest&quot;,
      &quot;rootDir&quot;:&quot;/demoZone/home&quot;,
      &quot;auth&quot;:{
         &quot;username&quot;:&quot;systest&quot;,
         &quot;password&quot;:&quot;changeit&quot;,
         &quot;type&quot;:&quot;X509&quot;,
         &quot;server&quot;:{
            &quot;name&quot;:&quot;IRODS MyProxy Server&quot;,
            &quot;endpoint&quot;:&quot;myproxy.example.com&quot;,
            &quot;port&quot;:7512,
            &quot;protocol&quot;:&quot;MYPROXY&quot;
         }
      },
      &quot;resource&quot;:&quot;demoResc&quot;,
      &quot;zone&quot;:&quot;demoZone&quot;
   }
}
```
[/tab]
[tab title="GridFTP"]
```javascript
{
  &quot;id&quot;: &quot;demo.storage.example.com&quot;,
  &quot;name&quot;: &quot;Demo GRIDFTP demo vm&quot;,
  &quot;status&quot;: &quot;UP&quot;,
  &quot;type&quot;: &quot;STORAGE&quot;,
  &quot;description&quot;: &quot;My example storage system using GridFTP to store data for testing&quot;,
  &quot;site&quot;: &quot;example.com&quot;,
  &quot;storage&quot;: {
    &quot;host&quot;: &quot;gridftp.example.com&quot;,
    &quot;port&quot;: 2811,
    &quot;protocol&quot;: &quot;GRIDFTP&quot;,
    &quot;rootDir&quot;: &quot;/&quot;,
    &quot;homeDir&quot;: &quot;/home/systest&quot;,
    &quot;auth&quot;: {
      &quot;credential&quot;: &quot;-----BEGIN CERTIFICATE-----nMIIDqjCCApKgAwIBAgIDJSFGMA0GCSqGSIb3DQEBBQUAMHsxCzAJBgNVBAYTAlVTnMTgwNgYDVQQKEy9OYXRpb25hbCBDZW50ZXIgZm9yIFN1cGVyY29tcHV0aW5nIEFwncGxpY2F0aW9uczEgMB4GA1UECxMXQ2VydGlmaWNhdGUgQXV0aG9yaXRpZXMxEDAOnBgNVBAMTB015UHJveHkwHhcNMTMxMDE0MDcyMjE4WhcNMTMxMDE0MTkyNzE4WjBnnMQswCQYDVQQGEwJVUzE4MDYGA1UEChMvTmF0aW9uYWwgQ2VudGVyIGZvciBTdXBlncmNvbXB1dGluZyBBcHBsaWNhdGlvbnMxHjAcBgNVBAMTFWlwbGFudCBDb21tdW5pndHkgVXNlcjCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwfHbmtmJ1OUVwgDdn5oA8EsqihwRAi2xhZJYG/FFmOs38+0y7wTfORhVX/79XQMD3NqRJN8xhHQpmuoRynH9l9sbA9gbKaQsrpIYyExygrJ+qaZY0PccD+VAyPDjdLD86316AzWltEdV2E9b+OnCVioz62esJWSqOho8wya4Vo5svUCAwEAAaOBzjCByzAOBgNVHQ8BAf8EBAMCBLAwnHQYDVR0OBBYEFIJXT/jYmxaRywDbZudb1EXbxla5MB8GA1UdIwQYMBaAFNf8pQJ2nOvYT+iuh4OZQNccjx3tRMAwGA1UdEwEB/wQCMAAwNAYDVR0gBC0wKzAMBgorBgEEnAaQ+ZAIFMAwGCiqGSIb3TAUCAgMwDQYLKoZIhvdMBQIDAgEwNQYDVR0fBC4wLDAqnoCigJoYkaHR0cDovL2NhLm5jc2EudWl1Yy5lZHUvZjJlODlmZTMuY3JsMA0GCSqGnSIb3DQEBBQUAA4IBAQBDyW3FJ0xEIXEqk2NtiMqOM99MgufDPL0bxrR8CvPY5GRNn58EXU8RnSSJIuxL95PKclRPPOhGdB48eeF2H1MusOEUEEnHwzrZ1OUFUEpwKuqG6n0h411l3niRRx9wdJL4YITzAWZwpadzwj3d8aO9O/ttVJjGRc8A93I/d3fFAvHyvKnmlEaDrQZNBp1EtClW8xuxsfeUmyXkFlkRiKwqjkJGB8xBuzr8DfLomWq/mXaOkHznCo9nQxAs3gntszLOh+8U9aMxaeCsychRWxG3Y6Z33hrE0yz4AaVonVXu3Z7M+EN+nKbSVRblAzeKfQYYDOgsoFrugYbR9klv1so3Dt+n6n-----END CERTIFICATE-----n-----BEGIN RSA PRIVATE KEY-----nMIICWwIBAAKBgQDB8dua2YnU5RXCAN3mgDwSyqKHBECLbGFklgb8UWY6zfz7TLvBnN85GFVf/v1dAwPc2pEk3zGEdCma6hHIf2X2xsD2BsppCyukhjITHKCsn6ppljQ9xnwP5UDI8ON0sPzrfXoDNaW0R1XYT1v44JWKjPrZ6wlZKo6GjzDJrhWjmy9QIDAQABnAoGAcjrJZYMLM2FaV1G7YK/Wshq3b16JxZSoKF5U7vfihnAcuMaRL1R3IcAgfHlunIq2E7aIFnd+6sygVKXYo4alv5denekiucvKAyXK9F/VTTtLtajUnrvekLvSycKiEnbN9IgQ0ABCnlWyjgQMf64UUYBQtvU+lbRCs4jbuHxuyn5WECQQD8fJhlBHgA49hjnZBKnU9Xb+LEKhWDCEyIiOMMGY+2XhrGVvGF5KqJVusZEv8lbXNjzgSQFgLohEXVzn9v8tDFMzAkEAxKS5qCYHsTfgPlw3l1DLJRmG3SXrpevXSccBGpXQiUne9gfc9mlgnVTr5QQCXvvI673Y2LnNcnd94KEgvSrzhNwJACeS38/1g1mgXKo3ZTUUztBLinQ7sn463sQHsI6U8xGCbm/n8LMrxA8CsJadg6A6J3vdLpnm2U3YbZm1mqVhGNkQJAdsxxnoUVAdm8kWWhK6W6VG9e9I1OqdrXxfY/tecsyjg6D1a1Qb8mfuj4DoaKjCme69To8nZ3moZXRBWkypzYQopwJAB/zr1UpFz6vY4sIm3Gw3ll/ruNGCr2dzjTyLSGglCOf0nUljJ1FGLyW647JzGPMLcfdb0iEexzCEii9YUFUN1Ow==n-----END RSA PRIVATE KEY-----&quot;,
      &quot;type&quot;: &quot;X509&quot;
    }
  }
}
```
[/tab]
[tab title="GridFTP (MyProxy)"]
```javascript
{
  &quot;id&quot;: &quot;demo.storage.example.com&quot;,
  &quot;name&quot;: &quot;Demo GRIDFTP + MyProxy Storage System&quot;,
  &quot;status&quot;: &quot;UP&quot;,
  &quot;type&quot;: &quot;STORAGE&quot;,
  &quot;description&quot;: &quot;My example storage system using GridFTP with MyProxy to store data for testing&quot;,
  &quot;site&quot;: &quot;example.com&quot;,
  &quot;storage&quot;: {
    &quot;host&quot;: &quot;gridftp.example.com&quot;,
    &quot;port&quot;: 2811,
    &quot;protocol&quot;: &quot;GRIDFTP&quot;,
    &quot;rootDir&quot;: &quot;/&quot;,
    &quot;homeDir&quot;: &quot;/home/systest&quot;,
    &quot;auth&quot;: {
      &quot;username&quot;: &quot;systest&quot;,
      &quot;password&quot;: &quot;changeit&quot;,
      &quot;type&quot;: &quot;X509&quot;,
      &quot;server&quot;: {
        &quot;name&quot;: &quot;XSEDE MyProxy Server&quot;,
        &quot;endpoint&quot;: &quot;myproxy.example.com&quot;,
        &quot;port&quot;: 7512,
        &quot;protocol&quot;: &quot;MYPROXY&quot;
      }
    }
  }
}
```
[/tab]
[tab title="GridFTP (MyProxy Gateway)"]
```javascript
{
  &quot;id&quot;: &quot;demo.storage.example.com&quot;,
  &quot;name&quot;: &quot;Demo GRIDFTP + MyProxy Storage System&quot;,
  &quot;status&quot;: &quot;UP&quot;,
  &quot;type&quot;: &quot;STORAGE&quot;,
  &quot;description&quot;: &quot;My example storage system using GridFTP with MyProxy to store data for testing&quot;,
  &quot;site&quot;: &quot;example.com&quot;,
  &quot;storage&quot;: {
    &quot;host&quot;: &quot;gridftp.example.com&quot;,
    &quot;port&quot;: 2811,
    &quot;protocol&quot;: &quot;GRIDFTP&quot;,
    &quot;rootDir&quot;: &quot;/&quot;,
    &quot;homeDir&quot;: &quot;/home/systest&quot;,
    &quot;auth&quot;: {
      &quot;type&quot;: &quot;X509&quot;,
      &quot;server&quot;: {
        &quot;name&quot;: &quot;My Trusted MPG Server&quot;,
        &quot;endpoint&quot;: &quot;https://api.example.com/myproxy/v2/&quot;,
        &quot;port&quot;: 443,
        &quot;protocol&quot;: &quot;MPG&quot;
      }
    }
  }
}
```
[/tab]
[tab title="LOCAL"]
```javascript
{
   &quot;id&quot;:&quot;local.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example LOCAL Storage Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using the local file system to store data for testing&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;:&quot;localhost&quot;,
      &quot;protocol&quot;:&quot;LOCAL&quot;,
      &quot;rootDir&quot;:&quot;/&quot;,
      &quot;homeDir&quot;:&quot;/home/systest&quot;
   }
}
```
[/tab]
[tab title="Amazon S3"]
```javascript
{
   &quot;id&quot;:&quot;demo.storage.example.com&quot;,
   &quot;name&quot;:&quot;Example Amazon S3 Storage System&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;STORAGE&quot;,
   &quot;description&quot;:&quot;My example storage system using Amazon S3 to store data for testing&quot;,
   &quot;site&quot;:&quot;aws.amazon.com&quot;,
   &quot;storage&quot;:{
      &quot;host&quot;: &quot;s3-website-us-east-1.amazonaws.com&quot;,
      &quot;port&quot;: 443,
      &quot;protocol&quot;: &quot;S3&quot;,
      &quot;homeDir&quot;: &quot;/&quot;,
      &quot;rootDir&quot;: &quot;/&quot;,
      &quot;container&quot;: &quot;mybucket&quot;,
      &quot;auth&quot;: {
          &quot;publicKey&quot;: &quot;AKCA...1RCF&quot;,
          &quot;privateKey&quot;: &quot;8xj3...g/4+&quot;,
          &quot;type&quot;: &quot;APIKEYS&quot;
      }
   }
}
```
[/tab]
[/tabgroup]

In each of the examples above, the <code>storage</code> objects were slightly different, each unique to the protocol used. Descriptions of every attribute in the <code>storage</code> object and its children are given in the following tables.

<code>storage</code> attributes give basic connectivity information describing things like how to connect to the system and on what port.

[table id=58 /]

<code>storage.auth</code> attributes give authentication information describing how to authenticate to the system specified in the <code>storage</code> config above.

[table id=59 /]

<code>storage.auth.server</code> attributes give information about how to obtain a credential that can be used in the authentication process. Currently only systems using the X509 authentication can leverage this feature to communicate with <a href="http://grid.ncsa.illinois.edu/myproxy/" title="MyProxy Server" target="_blank">MyProxy</a> and <a href="https://bitbucket.org/taccaci/myproxy-gateway" title="MyProxy Gateway" target="_blank">MyProxy Gateway</a> servers.

[table id=61 /]

<code>system.proxy</code> configuration attributes give information about how to connect to a remote system through a proxy server. This often happens when the target system is behind a firewall or resides on a NAT. Currently proxy servers can only reuse the authentication configuration provided by the target system.

[table id=60 /]

[notice]If you have not yet set up a system of your own, now is a good time to grab a sandbox system to use while you follow along with the rest of this tutorial.[/notice]

<h3>Creating a new storage system</h3>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -F &quot;fileToUpload=@sftp-password.json&quot; https://$API_BASE_URL/systems/$API_VERSION
```
[/tab]
[tab title="CLI"]
```bash
systems-addupdate -v -F sftp-password.json
```
[/tab][/tabgroup]

The response from the service will be similar to the following:

[code lang="js" highlight="3,5,8-11,17-20,22" firstline="1" light="false"]
{
    &quot;id&quot; : &quot;demo.storage.example.com&quot;,
    &quot;uuid&quot; : &quot;0001411321620333-b0b0b0bb0b-0001-006&quot;,
    &quot;name&quot; : &quot;Example SFTP Storage System&quot;,
    &quot;status&quot; : &quot;UP&quot;,
    &quot;type&quot; : &quot;STORAGE&quot;,
    &quot;description&quot; : &quot;My example storage system using SFTP to store data for testing&quot;,
    &quot;site&quot; : null,
    &quot;revision&quot; : 1,
    &quot;public&quot; : false,
    &quot;lastModified&quot; : &quot;2014-09-21T14:50:35.268-05:00&quot;,
    &quot;storage&quot; : {
      &quot;host&quot; : &quot;storage.example.com&quot;,
      &quot;port&quot; : 22,
      &quot;protocol&quot; : &quot;SFTP&quot;,
      &quot;rootDir&quot; : &quot;/&quot;,
      &quot;homeDir&quot; : &quot;/home/systest&quot;,
      &quot;publicAppsDir&quot; : null,
      &quot;mirror&quot; : false,
      &quot;proxy&quot; : null,
      &quot;auth&quot; : {
        &quot;type&quot; : &quot;PASSWORD&quot;
      }
    }
}
[/code]

Congratulations, you just added your first system. This storage system can now be used by the <a title="File Management" href="http://agaveapi.co/documentation/tutorials/data-management/">Files service</a> to manage data, the Transfer service as a source or destination of data movement, the Apps service as a application repository, and the <a title="Job Submission" href="http://agaveapi.co/documentation/tutorials/job-managment/">Jobs Service</a> as both a staging and archiving destination.

Notice that the JSON returned from the Systems service is different than what was submitted. Several fields have been added, and several other have been removed. On line 3, the UUID of the system has been added. This is the same UUID that is used in notifications and metadata references. On line 5, the <code>status</code> value was added in and assigned a default value since we did not specify it. Ditto for the <code>site</code> attribute on line 8.

Three new fields were added on lines 9-11. <code>revision</code> is the number of times this system has been updated. This being our first time registering the system, it is set to <em>1</em>. <code>public</code> tells whether this system is published as a shared resource for all users. We will cover this more in the section on System scope. <code>lastModified</code> is a timestamp of the last time the system was updated.

In the <code>storage</code> object, the <code>publicAppsDir</code> and <code>mirror</code> fields were both added and set to their default values. In this example we are not using a <code>proxy</code> server, so it was defaulted to <em>null</em>. Last, and most important, all authentication information has been omitted from the response object. Regardless of the authentication type, no user credential information will ever be returned once they are stored.

<h2>Execution Systems</h2>

In contrast to storage systems, execution systems specify compute resources where application binaries can be run. In addition to the <code>storage</code> attribute found in storage systems, execution systems also have a <code>login</code> attribute describing how to connect to the remote system to submit jobs as well as several other attributes that allow Agave to determine how to stage data and run software on the system. The full list of execution system attributes is given in the following tables.

[table id=49 /]

<h3>Schedulers and system execution types</h3>

Agave supports job execution both interactively and through <a href="http://en.wikipedia.org/wiki/Job_scheduler" title="Job Scheduler" target="_blank">batch queueing systems</a> (aka schedulers). We cover the mechanics of job submission in the Job Management tutorial. Here we just point out that regardless of how your job is actually run on the underlying system, the process of submitting, monitoring, sharing, and otherwise interacting with your job through Agave is identical. Describing the scheduler and execution types for your system is really just a matter of picking the most efficient and/or available mechanism for running jobs on your system.

As you saw in the table above, <code>executionType</code> refers to the classification of jobs going into the system and <code>scheduler</code> refers to the type of batch scheduler used on a system. These two fields help limit the range of job submission options used on a specific system. For example, it is not uncommon for a HPC system to accept jobs from both a Condor scheduler and a batch scheduler. It is also possible, though generally discouraged, to fork jobs directly on the command line. With so many options, how would users publishing apps on such a system know what mechanism to use? Specifying the execution type and scheduler help narrow down the options to a single execution mechanism.

Thankfully, picking the right combination is pretty simple. The following table illustrates the available combinations.

[table id=63 /]

[notice]When you are describing your system, consider the policies put in place by your system administrators. If the system you are defining has a scheduler, chances are they want you to use it.[/notice]

<h3>Defining batch queues <a name="defining-batch-queues">&nbsp;</a></h3>

Agave supports the notion of multiple submit queues. On HPC systems, queues should map to actual batch scheduler queues on the target server. Additionally, queues are used by Agave as a mechanism for implementing quotas on job throughput in a given queue or across an entire system. Queues are defined as a JSON array of objects assigned to the <code>queues</code> attribute. The following table summarizes all supported queue parameters.

[table id=48 /]

<h3>Configuring quotas</h3>

In the batch queues table above, several attributes exist to specify limits on the number of total jobs and user jobs in a given queue. Corresponding attributes exist in the execution system to specify limits on the number of total and user jobs across an entire system. These attributes, when used appropriately, can be used to tell Agave how to enforce limits on the concurrent activity of any given user. They can also ensure that Agave will not unfairly monopolize your systems as your application usage grows.

If you have ever used a shared HPC system before, you should be familiar with batch queue quotas. If not, the important thing to understand is that they are a critical tool to ensure fair usage of any shared resource. As the owner/administrator for your registered system, you can use the batch queues you define to enforce whatever usage policy you deem appropriate.

Consider one example where you are using a VM to run image analysis routines on demand through Agave, your server will become memory bound and experience performance degradation if too many processes are running at once. To avoid this, you can set a limit using a batch queue configuration that limits the number of simultaneous tasks that can run at once on your server.

Another example where quotas can be helpful is to help you properly partitioning your system resources. Consider a user analyzing unstructured data. The problem is computationally and memory intensive. To preserve resources, you could create one queue with a moderate value of <code>maxJobs</code> and conservative <code>maxMemoryPerNode</code>, <code>maxProcessorsPerNode</code>, and <code>maxNodes</code> values to allow good throughput of small job. You could then create another queue with large <code>maxMemoryPerNode</code>, <code>maxProcessorsPerNode</code>, and <code>maxNodes</code> values while only allowing a single job to run at a time. This gives you both high throughput and high capacity on a single system.

The following sample queue definitions illustrate some other interesting use cases.

[tabgroup]
[tab title="Short jobs"]
Restrict the queue to running jobs for, at most, 15 minutes.
```javascript
{  
    &quot;name&quot;:&quot;short_job&quot;,
    &quot;maxJobs&quot;:100,
    &quot;maxUserJobs&quot;:10,
    &quot;maxNodes&quot;:32,
    &quot;maxMemoryPerNode&quot;:&quot;64GB&quot;,
    &quot;maxProcessorsPerNode&quot;:12,
    &quot;maxRequestedTime&quot;:&quot;00:15:00&quot;,
    &quot;customDirectives&quot;:null,
    &quot;default&quot;:true
}
```
[/tab]
[tab title="Small queues"]
Restrict the queue to having at most 10 total jobs in it at once. Jobs may run for no more than an hour.
```javascript
{  
    &quot;name&quot;:&quot;small_q&quot;,
    &quot;maxJobs&quot;:10,
    &quot;maxUserJobs&quot;:1,
    &quot;maxNodes&quot;:32,
    &quot;maxMemoryPerNode&quot;:&quot;64GB&quot;,
    &quot;maxProcessorsPerNode&quot;:12,
    &quot;maxRequestedTime&quot;:&quot;01:00:00&quot;,
    &quot;customDirectives&quot;:null,
    &quot;default&quot;:true
}
```
[/tab]
[tab title="Single node"]
Restrict the queue to only running single node jobs.
```javascript
{  
    &quot;name&quot;:&quot;short_job&quot;,
    &quot;maxJobs&quot;:100,
    &quot;maxUserJobs&quot;:10,
    &quot;maxNodes&quot;:1,
    &quot;maxMemoryPerNode&quot;:&quot;64GB&quot;,
    &quot;maxProcessorsPerNode&quot;:12,
    &quot;maxRequestedTime&quot;:&quot;24:00:00&quot;,
    &quot;customDirectives&quot;:null,
    &quot;default&quot;:true
}
```
[/tab]
[tab title="Dedicated queues"]
Create two queues. "big_mem" allows single node jobs with memory up to 1TB. "big_compute" allows jobs with up to 256 nodes, and 16GB of memory per node.
```javascript
[
  {  
    &quot;name&quot;:&quot;big_mem&quot;,
    &quot;maxJobs&quot;:10,
    &quot;maxUserJobs&quot;:1,
    &quot;maxNodes&quot;:1,
    &quot;maxMemoryPerNode&quot;:&quot;1TB&quot;,
    &quot;maxProcessorsPerNode&quot;:12,
    &quot;maxRequestedTime&quot;:&quot;12:00:00&quot;,
    &quot;customDirectives&quot;:null,
    &quot;default&quot;:true
  },
  {  
    &quot;name&quot;:&quot;big_compute&quot;,
    &quot;maxJobs&quot;:10,
    &quot;maxUserJobs&quot;:10,
    &quot;maxNodes&quot;:256,
    &quot;maxMemoryPerNode&quot;:&quot;16GB&quot;,
    &quot;maxProcessorsPerNode&quot;:12,
    &quot;maxRequestedTime&quot;:&quot;24:00:00&quot;,
    &quot;customDirectives&quot;:null,
    &quot;default&quot;:true
  }
]
```
[/tab]
[/tabgroup]

<h3>System login protocols</h3>

As with storage systems, Agave supports several different protocols and mechanisms for job submission. We already covered scheduler and queue support. Here we illustrate the different login configurations possible. For brevity, only the value of the <code>login</code> JSON object is shown.

[tabgroup]
[tab title="GSISSH"]
```javascript
{  
   &quot;host&quot;:&quot;execute.example.com&quot;,
   &quot;port&quot;:2222,
   &quot;protocol&quot;:&quot;GSISSH&quot;,
   &quot;auth&quot;:{  
      &quot;credential&quot;: &quot;-----BEGIN CERTIFICATE-----nMIIDqjCCApKgAwIBAgIDJSFGMA0GCSqGSIb3DQEBBQUAMHsxCzAJBgNVBAYTAlVTnMTgwNgYDVQQKEy9OYXRpb25hbCBDZW50ZXIgZm9yIFN1cGVyY29tcHV0aW5nIEFwncGxpY2F0aW9uczEgMB4GA1UECxMXQ2VydGlmaWNhdGUgQXV0aG9yaXRpZXMxEDAOnBgNVBAMTB015UHJveHkwHhcNMTMxMDE0MDcyMjE4WhcNMTMxMDE0MTkyNzE4WjBnnMQswCQYDVQQGEwJVUzE4MDYGA1UEChMvTmF0aW9uYWwgQ2VudGVyIGZvciBTdXBlncmNvbXB1dGluZyBBcHBsaWNhdGlvbnMxHjAcBgNVBAMTFWlwbGFudCBDb21tdW5pndHkgVXNlcjCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAwfHbmtmJ1OUVwgDdn5oA8EsqihwRAi2xhZJYG/FFmOs38+0y7wTfORhVX/79XQMD3NqRJN8xhHQpmuoRynH9l9sbA9gbKaQsrpIYyExygrJ+qaZY0PccD+VAyPDjdLD86316AzWltEdV2E9b+OnCVioz62esJWSqOho8wya4Vo5svUCAwEAAaOBzjCByzAOBgNVHQ8BAf8EBAMCBLAwnHQYDVR0OBBYEFIJXT/jYmxaRywDbZudb1EXbxla5MB8GA1UdIwQYMBaAFNf8pQJ2nOvYT+iuh4OZQNccjx3tRMAwGA1UdEwEB/wQCMAAwNAYDVR0gBC0wKzAMBgorBgEEnAaQ+ZAIFMAwGCiqGSIb3TAUCAgMwDQYLKoZIhvdMBQIDAgEwNQYDVR0fBC4wLDAqnoCigJoYkaHR0cDovL2NhLm5jc2EudWl1Yy5lZHUvZjJlODlmZTMuY3JsMA0GCSqGnSIb3DQEBBQUAA4IBAQBDyW3FJ0xEIXEqk2NtiMqOM99MgufDPL0bxrR8CvPY5GRNn58EXU8RnSSJIuxL95PKclRPPOhGdB48eeF2H1MusOEUEEnHwzrZ1OUFUEpwKuqG6n0h411l3niRRx9wdJL4YITzAWZwpadzwj3d8aO9O/ttVJjGRc8A93I/d3fFAvHyvKnmlEaDrQZNBp1EtClW8xuxsfeUmyXkFlkRiKwqjkJGB8xBuzr8DfLomWq/mXaOkHznCo9nQxAs3gntszLOh+8U9aMxaeCsychRWxG3Y6Z33hrE0yz4AaVonVXu3Z7M+EN+nKbSVRblAzeKfQYYDOgsoFrugYbR9klv1so3Dt+n6n-----END CERTIFICATE-----n-----BEGIN RSA PRIVATE KEY-----nMIICWwIBAAKBgQDB8dua2YnU5RXCAN3mgDwSyqKHBECLbGFklgb8UWY6zfz7TLvBnN85GFVf/v1dAwPc2pEk3zGEdCma6hHIf2X2xsD2BsppCyukhjITHKCsn6ppljQ9xnwP5UDI8ON0sPzrfXoDNaW0R1XYT1v44JWKjPrZ6wlZKo6GjzDJrhWjmy9QIDAQABnAoGAcjrJZYMLM2FaV1G7YK/Wshq3b16JxZSoKF5U7vfihnAcuMaRL1R3IcAgfHlunIq2E7aIFnd+6sygVKXYo4alv5denekiucvKAyXK9F/VTTtLtajUnrvekLvSycKiEnbN9IgQ0ABCnlWyjgQMf64UUYBQtvU+lbRCs4jbuHxuyn5WECQQD8fJhlBHgA49hjnZBKnU9Xb+LEKhWDCEyIiOMMGY+2XhrGVvGF5KqJVusZEv8lbXNjzgSQFgLohEXVzn9v8tDFMzAkEAxKS5qCYHsTfgPlw3l1DLJRmG3SXrpevXSccBGpXQiUne9gfc9mlgnVTr5QQCXvvI673Y2LnNcnd94KEgvSrzhNwJACeS38/1g1mgXKo3ZTUUztBLinQ7sn463sQHsI6U8xGCbm/n8LMrxA8CsJadg6A6J3vdLpnm2U3YbZm1mqVhGNkQJAdsxxnoUVAdm8kWWhK6W6VG9e9I1OqdrXxfY/tecsyjg6D1a1Qb8mfuj4DoaKjCme69To8nZ3moZXRBWkypzYQopwJAB/zr1UpFz6vY4sIm3Gw3ll/ruNGCr2dzjTyLSGglCOf0nUljJ1FGLyW647JzGPMLcfdb0iEexzCEii9YUFUN1Ow==n-----END RSA PRIVATE KEY-----&quot;,
      &quot;type&quot;: &quot;X509&quot;
   }
}
```
[/tab]
[tab title="GSISSH (MyProxy)"]
```javascript
{  
   &quot;host&quot;:&quot;execute.example.com&quot;,
   &quot;port&quot;:2222,
   &quot;protocol&quot;:&quot;GSISSH&quot;,
   &quot;auth&quot;:{  
      &quot;username&quot;:&quot;systest&quot;,
      &quot;password&quot;:&quot;changeit&quot;,
      &quot;credential&quot;:&quot;&quot;,
      &quot;type&quot;:&quot;X509&quot;,
      &quot;server&quot;:{
        &quot;name&quot;:&quot;IRODS MyProxy Server&quot;,
        &quot;endpoint&quot;:&quot;myproxy.example.com&quot;,
        &quot;port&quot;:7512,
        &quot;protocol&quot;:&quot;MYPROXY&quot;
      }
   }
}
```
[/tab]
[tab title="GSISSH (MPG)"]
```javascript
{  
   &quot;host&quot;:&quot;execute.example.com&quot;,
   &quot;port&quot;:2222,
   &quot;protocol&quot;:&quot;GSISSH&quot;,
   &quot;auth&quot;:{  
      &quot;username&quot;:&quot;systest&quot;,
      &quot;type&quot;:&quot;X509&quot;,
      &quot;server&quot;: {
        &quot;name&quot;: &quot;My Trusted MPG Server&quot;,
        &quot;endpoint&quot;: &quot;https://api.example.com/myproxy/v2/&quot;,
        &quot;port&quot;: 443,
        &quot;protocol&quot;: &quot;MPG&quot;
      }
   }
}
```
[/tab]
[tab title="SSH"]
```javascript
{
  &quot;host&quot;: &quot;execute.example.com&quot;,
  &quot;port&quot;: 22,
  &quot;protocol&quot;: &quot;SSH&quot;,
  &quot;auth&quot;: {
    &quot;username&quot;: &quot;systest&quot;,
    &quot;password&quot;: &quot;changeit&quot;,
    &quot;type&quot;: &quot;PASSWORD&quot;
  }
}
```
[/tab]
[tab title="SSH (tunnel)"]
```javascript
{
  &quot;host&quot;:&quot;execute.example.com&quot;,
  &quot;port&quot;:22,
  &quot;protocol&quot;:&quot;SSH&quot;,
  &quot;auth&quot;:{
    &quot;username&quot;:&quot;systest&quot;,
    &quot;password&quot;:&quot;changeit&quot;,
    &quot;type&quot;:&quot;PASSWORD&quot;
  },
  &quot;proxy&quot;:{
    &quot;name&quot;:&quot;My gateway proxy server&quot;,
    &quot;host&quot;:&quot;proxy.example.com&quot;,
    &quot;port&quot;:&quot;22&quot;
  }
}
```
[/tab]
[tab title="LOCAL"]
```javascript
{
  &quot;host&quot;: &quot;localhost&quot;,
  &quot;protocol&quot;: &quot;LOCAL&quot;,
  &quot;auth&quot;: {
    &quot;type&quot;: &quot;LOCAL&quot;
  }
}
```
[/tab]
[/tabgroup]

The full list of login configuration options is given in the following table. We omit the <code>login.auth</code> and <code>login.proxy</code> attributes as they are identical to those used in the storage config.

[table id=62 /]

<h3>Scratch and work directories</h3>

In the Job Management tutorial we will dive into how Agave manages the end-to-end lifecycle of running a job. Here we point out two relevant attributes that control where data is staged and where your job will physically run. The <code>scratchDir</code> and <code>workDir</code> attributes control where the working directories for each job will be created on an execution system. The following table summarizes the decision making process Agave uses to determine where the working directories should be created.

[table id=52 /]

While it is not required, it is a best practice to always specify <code>scratchDir</code> and <code>workDir</code> values for your execution systems and, whenever possible, place them outside of the system <code>homeDir</code> to ensure data privacy. The reason for this is that the file system available on many servers is actually made up of a combination of physically attached storage, mounted volumes, and network mounts. Often times, your home directory will have a very conservative quota while the mounted storage will essentially be quota free. As the above table shows, when you do not specify a <code>scratchDir</code> or <code>workDir</code>, Agave will attempt to create your job work directories in your system <code>homeDir</code>. It is very likely that, in the course of running simulations, you will reach the quota on your home directory, thereby causing that job and all future jobs to fail on the system until you clear up more space. To avoid this, we recommend specifying a location with sufficient available space to handle the work you want to do.

Another common error that arises from not specifying thoughtful <code>scratchDir</code> and <code>workDir</code> values for your execution systems is jobs failing due to "permission denied" errors. This often happens when your <code>scratchDir</code> and/or <code>workDir</code> resolve to the actual system root. Usually the account you are using to access the system will not have permission to write to <code>/</code>, so all attempts to create a job working directory fail, accurately, due to a "permission denied" error.

[notice]While it is not required, it is a best practice to always specify `scratchDir` and `workDir` values for your execution systems and, whenever possible, place them outside of the system `homeDir` to ensure data privacy.[/notice]

<h3>Creating a new execution system</h3>

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -F &quot;fileToUpload=@ssh-password.json&quot; https://$API_BASE_URL/systems/$API_VERSION
```
[/tab]
[tab title="CLI"]
```bash
systems-addupdate -v -F ssh-password.json
```
[/tab][/tabgroup]

The response from the server will be similar to the following.

[code lang=javascript]
{  
   &quot;id&quot;:&quot;demo.execute.example.com&quot;,
   &quot;uuid&quot;:&quot;0001323106792914-5056a550b8-0001-006&quot;,
   &quot;name&quot;:&quot;Example SSH Execution Host&quot;,
   &quot;status&quot;:&quot;UP&quot;,
   &quot;type&quot;:&quot;EXECUTION&quot;,
   &quot;description&quot;:&quot;My example system using ssh to submit jobs used for testing.&quot;,
   &quot;site&quot;:&quot;example.com&quot;,
   &quot;revision&quot;:1,
   &quot;public&quot;:false,
   &quot;lastModified&quot;:&quot;2013-07-02T10:16:11.000-05:00&quot;,
   &quot;executionType&quot;:&quot;HPC&quot;,
   &quot;scheduler&quot;:&quot;SGE&quot;,
   &quot;environment&quot;:null,
   &quot;startupScript&quot;:&quot;./bashrc&quot;,
   &quot;maxSystemJobs&quot;:100,
   &quot;maxSystemJobsPerUser&quot;:10,
   &quot;workDir&quot;:&quot;/work&quot;,
   &quot;scratchDir&quot;:&quot;/scratch&quot;,
   &quot;queues&quot;:[  
      {  
         &quot;name&quot;:&quot;normal&quot;,
         &quot;maxJobs&quot;:100,
         &quot;maxUserJobs&quot;:10,
         &quot;maxNodes&quot;:32,
         &quot;maxMemoryPerNode&quot;:&quot;64GB&quot;,
         &quot;maxProcessorsPerNode&quot;:12,
         &quot;maxRequestedTime&quot;:&quot;48:00:00&quot;,
         &quot;customDirectives&quot;:null,
         &quot;default&quot;:true
      },
      {  
         &quot;name&quot;:&quot;largemem&quot;,
         &quot;maxJobs&quot;:25,
         &quot;maxUserJobs&quot;:5,
         &quot;maxNodes&quot;:16,
         &quot;maxMemoryPerNode&quot;:&quot;2TB&quot;,
         &quot;maxProcessorsPerNode&quot;:4,
         &quot;maxRequestedTime&quot;:&quot;96:00:00&quot;,
         &quot;customDirectives&quot;:null,
         &quot;default&quot;:false
      }
   ],
   &quot;login&quot;:{  
      &quot;host&quot;:&quot;texas.rangers.mlb.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SSH&quot;,
      &quot;proxy&quot;:null,
      &quot;auth&quot;:{  
         &quot;type&quot;:&quot;PASSWORD&quot;
      }
   },
   &quot;storage&quot;:{  
      &quot;host&quot;:&quot;texas.rangers.mlb.com&quot;,
      &quot;port&quot;:22,
      &quot;protocol&quot;:&quot;SFTP&quot;,
      &quot;rootDir&quot;:&quot;/home/nryan&quot;,
      &quot;homeDir&quot;:&quot;&quot;,
      &quot;proxy&quot;:null,
      &quot;auth&quot;:{  
         &quot;type&quot;:&quot;PASSWORD&quot;
      }
   }
}
[/code]

<h2>System roles</h2>

Systems you register are private to you and you alone. You can, however, allow other Agave clients to utilize the system you define by granting them a role on the system using the systems roles services. The available roles are given in the table below.

[table id=51 /]

[notice]Please see the Systems Roles tutorial for a deep discussion of system roles and how they are used.[/notice]

<h2>Cloning systems</h2>

Sharing systems through the use of roles allows other people to run jobs and access data on that system. When that happens, the users to whom you granted roles are accessing the system under your account. While they do <em>NOT</em> have access to your credentials, they do have access to the system using whatever account you use to authenticate. In most situations, this is not a problem. It is not uncommon to use a shared (or community account) within an application. However sometimes it is preferable for users to use their own account rather than yours. One way to do this is to simply re-send the same system description with a different ID. Another is to use the cloning feature of the Systems service.

Cloning an existing system will create a new system, with a new id, and all attributes copied over with the exception of the original system's authentication information and roles. You will be assigned owner of the system clone, but will still need to add your own credentials in order to do anything useful.

To clone a system, you make a PUT request on the system's url and pass it a new system id.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=clone&amp;id=systest.demo.clone&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-clone -v -I systest.demo.clone $SYSTEM_ID
```
[/tab][/tabgroup]

<h2>System scope</h2>

Throughout these tutorials and <a href="http://agaveapi.co/documentation/beginners-guides/" title="Beginner’s Guides">Beginner's Guides</a>, we have referred to both public and private systems. In addition to roles, systems have a concept of scope associated with them. Not to be confused with OAuth scope mentioned in the <a href="http://agaveapi.co/documentation/authorization/" title="Authorization Guide">Authentication Guide</a>, system scope refers to the availability of a system to the general user community. The following table lists the available scopes and their meanings.

[table id=53 /]

<h3>Private systems</h3>

All systems are private by default. This means that no one can use a system you register without you or another user with "admin" permissions granting them a role on that system. Most of the time, unless you are configuring a tenant for your organization, all the systems you register will stay private. Do not mistake the term private for isolated. Private simply means not public. Another way to think of private systems is as "invitation only." You are free to share your system as many or as few people as you want and it will still remain a private system.

<h3>Readonly systems</h3>

Readonly systems are systems who have granted a GUEST role to the <code>world</code> group. Once this grant is made, any user will be able to browse the system's entire file system regardless of individual permissions. Be careful when making a system readonly. Usually, the only reason you would do this is because you have configured the system <code>rootDir</code> to point to a dataset or volume that you want to publish for others to use. Carelessly making systems readonly can expose personal data stored on the system to every other API user. While your intentions may be pure, theirs may not be, so think through the implications of this action before you take it.

<h3>Public systems</h3>

Public systems are available for use by every API user within your tenant. Once public, systems inherit specific behavior unique to their <code>type</code>. We will cover each system type in turn.

<h4>Public Storage Systems</h4>

Public storage systems enforce a virtual user home directory with implied user permissions. The following table gives a brief summary of the permission implications. You can read more about data permissions in the <a href="http://agaveapi.co/documentation/tutorials/data-management-tutorial/data-permissions-tutorial/" title="Data Permissions Tutorial">Data Permissions</a> tutorial.

[table id=54 /]

Notice in the above example that on public systems, users will have implied ownership of a folder matching their username in the system's <code>homeDir</code>. In the table, this means that user "systest" will have ownership of the physical home directory <code>/home/systest</code> on the system after it's public. It is important that, before publishing a system, you make sure that the account used to access the system can actually write to these folders. Otherwise, users will not be able to access their data on the system you make public.

[notice]Before making a system public, make sure that you have a strategy for mapping API users to directories on the system you want to expose. If mapping to the `/home` folder on a Unix system, make sure the account used to access the system has write access to all user directories.[/notice]

<h4>Public Execution Systems</h4>

Public execution systems do not share the same behavior as public storage systems. Unless explicit permission has been given, public execution systems are not accessible for data access by non-privileged users. This is because public systems allow all users to run applications on them and granting public access to the file system would expose user job data to all users. If you do need to expose the data on a public execution system, either register it again as a storage system (using an appropriate <code>rootDir</code> outside of the system <code>scratchDir</code> and <code>workDir</code> paths), or grant specific users a role on the system.

<h4>Publishing a system</h4>

To publish a system and make it public, you make a PUT request on the system's url.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=publish&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-publish -v $SYSTEM_ID
```
[/tab][/tabgroup]

The response from the service will be the same system description we saw before, this time with the public attribute set to <em>true</em>.

To unpublish a system, make the same request with the <code>action</code> attribute set to <em>unpublish</em>.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=unpublish&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-unpublish -v $SYSTEM_ID
```
[/tab][/tabgroup]

<h2>Default systems</h2>

As you continue to use Agave over time, it will not be uncommon for you to accumulate additional storage and execution systems through both self-registration and other people sharing their systems with you. It may even be the case that you have multiple public systems available to you. In this situation, it is helpful for both you and your users to specify what the default systems should be.

Default systems are the systems that are used when the user does not specify a system to use when performing a remote action in Agave. For example, specifying an <code>archivePath</code> in a job request, but no <code>archiveSystem</code>, or specifying a <code>deploymentPath</code> in an app description, but no <code>deploymentSystem</code>. In these situations, Agave will use the user's default storage system.

Four types of default systems are possible. The following table describes them.

[table id=55 /]

[notice]As a best practice, it is recommended to always specify the system you intend to use when interacting with Agave. This will eliminate ambiguity in each request and make your actions more repeatable over time as the availability and configuration of the global and user default systems may change.[/notice]

<h3>Setting user default system</h3>

To set a system as the user's default, you make a PUT request on the system's url. Only systems the user has access to may be used as their default.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=setdefault&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-setdefault -v $SYSTEM_ID
```
[/tab][/tabgroup]

The response from the service will be the same system description we saw before, this time with the <code>default</code> attribute set to <em>true</em>.

<h3>Unsetting user default system</h3>

To remove a system as the user's default, make the same request with the <code>action</code> attribute set to <em>unsetDefault</em>. Keep in mind that you cannot remove the global default system from being the user's default. You can only set a different one to replace it.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=unsetDefault&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-unsetdefault -v $SYSTEM_ID
```
[/tab][/tabgroup]

<h3>Setting global default system</h3>

Tenant administrators may wish to set default storage and execution systems for an entire tenant. These are called global default systems. There may be at most one system of each type set as a global default. To set a global default system, first make sure that the system is public. Only public systems may be set as a global default. Next, make sure you have administrator permissions for your tenant. Only tenant admins may publish systems and manage the global defaults. Lastly, make a PUT request on the system's url with an <code>action</code> attribute in the body set to <em>unsetGlobalDefault</em>.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=setglobaldefault&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-setdefault -v -G $SYSTEM_ID
```
[/tab][/tabgroup]

The response from the service will be the same system description we saw before, this time with both the <code>default</code> and <code>public</code> attributes set to <em>true</em>.

[notice]Setting global default systems does not preclude users from manually setting their own default systems. Any user-defined default systems will trump the global default system setting for that user.[/notice]

To remove a system from being the global default, make the same request with the <code>action</code> attribute set to <em>unsetGlobalDefault</em>.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X PUT -d &quot;action=unsetGlobalDefault&quot; https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-unsetdefault -v -G $SYSTEM_ID
```
[/tab][/tabgroup]

This time the response from the service will have <code>default</code> set to <em>false</em> and <code>public</code> set to <em>true</em>.

<h2>Deleting systems</h2>

In the event you wish to permanently delete a system, you can make a DELETE request on the system URL.

[tabgroup]
[tab title="Curl"]
```bash
curl -sk -H &quot;Authorization: Bearer $ACCESS_TOKEN&quot; -X DELETE https://$API_BASE_URL/systems/$API_VERSION/$SYSTEM_ID
```
[/tab]
[tab title="CLI"]
```bash
systems-delete $SYSTEM_ID
```
[/tab][/tabgroup]

The call will return an empty result.

Deleting a system will disable the system and all applications published on that system from use. Any running jobs will be killed, and any data archived on that system will no longer be available. There is no way to restore a system once it is deleted, and the system id cannot be reused in the future, so use this operation with care.

[notice]If you simply wish to remove a system from service, you can update the system `status` or `available` attributes depending on whether you want to disable user or visibility.[/notice]

<h2>Multi-user environments</h2>

If your application supports a multi-user environment and those users do not have API accounts, then you may run into a situation where you are juggling multiple user credentials for a single system. Agave has a solution for this problem in the for of its Internal User feature. You can map your application users into a private user store Agave provides you and assign those users credentials on your systems. This allows you to move seamlessly from community users to private users and back without having to alter your application code. For a deep discussion on the mechanics and implications of credential management with internal users, see the <a href="http://agaveapi.co/documentation/tutorials/system-management/internal-user-credential-management/" title="Internal User Credential Management">Internal User Credential Management</a> tutorial.