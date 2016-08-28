This is the second of three app examples demonstrating how a real world code can be registered and used in Agave. The app is a Python code that takes a csv file and creates a graph of the data. We detail how to create a JSON description of the code we want to run, how to create the wrapper template that Agave uses to run the code, and how to test and run the app with Agave.

[notice]You can download the full source code for this example app and client application in the <a href="https://bitbucket.org/taccaci/agave-samples" title="Agave Samples">Agave Samples</a> repository in the <span class="code">apps/pyplot-demo/intermediate/pyplot-demo-intermediate-0.1.0</span> directory. The webapp source code is provided in the <span class="code">apps/pyplot-demo/intermediate/webapp</span>directory. If you would like to run this app in a live environment, you can register your own compute and storage systems, or use one of our developer sandbox environments.[/notice]

<h2>Basic app overview</h2>

The application code we're going to use in the same Python plotting program from the previous tutorial. In this tutorial we will enhance the previous app by exposing several more parameters and adding validation rules so Agave will handle server-side validation for us. As a refresher, here is the usage text from the pyplot app.

[code lang=text]
python main.py -h
usage: pyplot-demo [-h] [--chart-type {bar,line}] [--x-label [XLABEL]]
                   [--show-x-label] [--y-label [YLABEL]] [--show-y-label]
                   [--show-legend] [--width WIDTH] [--height HEIGHT]
                   [--background-color BACKGROUND] [--output-location OUTDIR]
                   [--file-per-series] [--format {png,jpg,gif}] [-v]
                   infile

A program to plot the contents of a csv file.

positional arguments:
  infile                The dataset to plot.

optional arguments:
  -h, --help            show this help message and exit
  --chart-type {bar,line}
                        The type of chart to show.
  --x-label [XLABEL]    The x-axis label.
  --show-x-label        If specified, the x-axis label will be shown
  --y-label [YLABEL]    The y-axis label.
  --show-y-label        If specified, the y-axis label will be shown
  --show-legend         If specified, a legend will be generated for each
                        chart.
  --width WIDTH         The chart width.
  --height HEIGHT       The chart height.
  --background-color BACKGROUND
                        The css hex color of the chart background.
  --output-location OUTDIR
                        The output directory of the plotted dataset.
  --file-per-series     If specified, each chart will be saved in a separate
                        file.
  --format {png,jpg,gif}
                        The image format of the plotted dataset.
  -v, --verbose         Enable verbose output.
[/code]

From the basic example, we have a working app that takes an single input file representing the dataset that the pyplot code will process, and a single parameter that specifies the type of chart that will be generated. If we intend for other people to use this app, we probably want to add a couple things that will enhance the user experience. For example, the pyplot app only knows how to process files in comma separated value (csv) format. It would be good if the app verified the file was a CSV file when a job was submitted rather than let it fail silently. Also, the previous app we registered only allowed for png images to be created, so we will add some parameters to the app description that allow for better control of the look and feel of the generated charts.

The result of these changes will be an app that is more flexible and error-resistant than its predecessor. To illustrate, we will look at a simple web application that exposes both apps to the end user and highlight the impact the changes have on the user experience.

<h3>Runtime requirements</h3>

In order to run this app, the target execution system must have the following installed.

<ul>
<li>Python 2.7</li>
<li>Matplotlib</li>
</ul>

If you are following along on your local system, you will need to have these installed in order to run the wrapper script and invoke the pyplot Python code.

<h3>Creating the app JSON description</h3>

The JSON for our intermediate app is below.

[code lang=javascript]
{
  &quot;name&quot;: &quot;demo-pyplot-demo-intermediate&quot;,
  &quot;parallelism&quot;: &quot;SERIAL&quot;,
  &quot;version&quot;: &quot;0.1.0&quot;,
  &quot;label&quot;: &quot;PyPlot Demo Basic&quot;,
  &quot;shortDescription&quot;: &quot;Basic demo plotting app&quot;,
  &quot;longDescription&quot;: &quot;Basic demo app to create a graph using Python&quot;,
  &quot;deploymentPath&quot;: &quot;apps/pyplot-demo-intermediate-0.1.0&quot;,
  &quot;deploymentSystem&quot;: &quot;demo.storage.example.com&quot;,
  &quot;executionSystem&quot;: &quot;demo.execute.example.com&quot;,
  &quot;executionType&quot;: &quot;CLI&quot;,
  &quot;templatePath&quot;: &quot;wrapper.sh&quot;,
  &quot;testPath&quot;: &quot;test/test.sh&quot;,
  &quot;tags&quot;: [
    &quot;demo&quot;,
    &quot;python&quot;,
    &quot;tutorial&quot;,
    &quot;plotting&quot;
  ],
  &quot;ontology&quot;: [],
  &quot;inputs&quot;: [{
    &quot;id&quot;: &quot;dataset&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;agave://demo.storage.example.com/inputs/pyplot/dataset.csv&quot;,
      &quot;required&quot;: true,
      &quot;validator&quot;: &quot;([^s]+(.(?i)(csv))$)&quot;
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Dataset&quot;,
      &quot;description&quot;: &quot;The dataset to plot. Datasets must be in CSV format.&quot;
    }
  }],
  &quot;parameters&quot;: [{
    &quot;id&quot;: &quot;chartType&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;bar&quot;,
      &quot;type&quot;: &quot;enumeration&quot;,
      &quot;enum_values&quot;: [
        { &quot;bar&quot;: &quot;Bar Chart&quot; },
        { &quot;line&quot;: &quot;Line Chart&quot; }
      ],
      &quot;required&quot;: true
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Chart types&quot;,
      &quot;description&quot;: &quot;Select the chart type to generate for the dataset&quot;
    }
  }, {
    &quot;id&quot;: &quot;xlabel&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;Time&quot;,
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;X-axis label&quot;,
      &quot;description&quot;: &quot;Label to display below the x-axis&quot;
    }
  }, {
    &quot;id&quot;: &quot;showXLabel&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: true,
      &quot;type&quot;: &quot;boolean&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Show x-axis label?&quot;,
      &quot;description&quot;: &quot;Select whether a label will be shown on the x axis&quot;
    }
  }, {
    &quot;id&quot;: &quot;ylabel&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;Magnitude&quot;,
      &quot;type&quot;: &quot;string&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Y-axis label&quot;,
      &quot;description&quot;: &quot;Label to display below the y-axis&quot;
    }
  }, {
    &quot;id&quot;: &quot;showYLabel&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: true,
      &quot;type&quot;: &quot;boolean&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Show y-axis label?&quot;,
      &quot;description&quot;: &quot;Select whether a label will be shown on the y axis&quot;
    }
  }, {
    &quot;id&quot;: &quot;showLegend&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: false,
      &quot;type&quot;: &quot;boolean&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Extract the first k bytes&quot;,
      &quot;description&quot;: &quot;Select whether to include a legend in each chart&quot;
    }
  }, {
    &quot;id&quot;: &quot;separateCharts&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: false,
      &quot;type&quot;: &quot;boolean&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Extract the first k bytes&quot;,
      &quot;description&quot;: &quot;Select whether to include a legend in each chart&quot;
    }
  }, {
    &quot;id&quot;: &quot;format&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;png&quot;,
      &quot;type&quot;: &quot;enumeration&quot;,
      &quot;enum_values&quot;: [
        &quot;png&quot;,
        &quot;jpg&quot;,
        &quot;gif&quot;
      ],
      &quot;required&quot;: true
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Image format&quot;,
      &quot;description&quot;: &quot;Select the image format of the output files&quot;
    }
  }, {
    &quot;id&quot;: &quot;height&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: 512,
      &quot;type&quot;: &quot;number&quot;,
      &quot;validator&quot;: &quot;d+&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Chart height&quot;,
      &quot;description&quot;: &quot;The height in pixels of each chart&quot;
    }
  }, {
    &quot;id&quot;: &quot;width&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: 1024,
      &quot;type&quot;: &quot;number&quot;,
      &quot;validator&quot;: &quot;d+&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Chart width&quot;,
      &quot;description&quot;: &quot;The width in pixels of each chart&quot;
    }
  }, {
    &quot;id&quot;: &quot;background&quot;,
    &quot;value&quot;: {
      &quot;default&quot;: &quot;#FFFFFF&quot;,
      &quot;type&quot;: &quot;string&quot;,
      &quot;validator&quot;: &quot;^#(?:[0-9a-fA-F]{6}){1}$&quot;,
      &quot;required&quot;: false
    },
    &quot;details&quot;: {
      &quot;label&quot;: &quot;Background color&quot;,
      &quot;description&quot;: &quot;The hexadecimal background color of the charts. White by default&quot;
    }
  }]
}
[/code]

As with the previous app description, the JSON is still broken up in 3 general section. The first section is identical to before, save we have given this app a new name to reflect it represents our intermediate app tutorial. The inputs section still contains a single input object called <code>dataset</code>. This time we added an extra attribute to the definition called, <code>validator</code>. The validator field takes a regular expression value and uses this to validate user supplied values in job requests for the app. The regular expression we specified will ensure that only files ending with <strong>.csv</strong> will be accepted.

The parameters section is significantly larger than last time. Whereas the basic app had a single enumerated string parameter, this app has parameters for all the options the underlying pyplot supports. The parameters represent string, boolean, and numeric values. Notice that we do not explicitly define integer or decimal values. Rather, Agave supports a generic <em>number</em> type which you can refine to an integer or decimal value through the use of the <code>validator</code> field.

Another change from the basic app is that our new parameters are optional. As you will see when we create our wrapper template, this means we will need to check for the existence of these values at run time.

<pre><code>There are many, many other attributes and options that we could include in our app description. We will get to some of them in the intermediate and advanced examples. For a full description of all the app description attributes and options, see the &lt;a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/app-inputs-and-parameters-tutorial/" title="App Inputs and Parameters Tutorial"&gt;App Inputs and Parameters Tutorial&lt;/a&gt;.
</code></pre>

<h3>Creating a wrapper script</h3>

Now that we have our app definition, we will create a wrapper template that Agave can use to run our pyplot code. A wrapper template is a shell script that Agave calls to invoke your app. A simple wrapper template for our app is shown below.

[code lang=text]
#set -x
WRAPPERDIR=$( cd &quot;$( dirname &quot;$0&quot; )&quot; &amp;&amp; pwd )

# The input file will be staged in for you as part of the job request.
# Here we just sanity check that it exists.
inputfile=${dataset}
if [[ ! -e &quot;$inputfile&quot; ]]; then
    echo &quot;Input file was not found in the job directory&quot; &gt;&amp;2
    exit 1
fi

# Set the dimensions of the chart if specified. Because Agave validates the type
# and value, we know the width and height values are either positive integers or empty
if [[ -n &quot;${height}&quot; ]]; then
    HEIGHT=&quot;--height=${height}&quot;
fi

if [[ -n &quot;${width}&quot; ]]; then
    WIDTH=&quot;--width=${width}&quot;
fi

# Set the chart properties. Boolean values are passed in as 1 for true or 0 for
# false or empty.
if [[ &quot;${background}&quot; == &quot;1&quot; ]]; then
    BACKGROUND=&quot;--background=${showLegend}&quot;
fi

if [[ &quot;${showLegend}&quot; == &quot;1&quot; ]]; then
    SHOW_LEGEND=&quot;--show-legend&quot;
fi

if [[ &quot;${separateCharts}&quot; == &quot;1&quot; ]]; then
    SEPARATE_CHARTS=&quot;--separate-charts&quot;
fi

# Set the x and y labels. Since we need to quote the values, we check for existence first
# rather than prefixing with an argument defined and passed in from the app description.
if [[ &quot;${showYLabel}&quot; == &quot;1&quot; ]]; then
    if [[ -n &quot;${ylabel}&quot; ]]; then
        X_LABEL=&quot;--show-y-label --y-label=${ylabel}&quot;
    fi
fi

if [[ &quot;${showXLabel}&quot; == &quot;1&quot; ]]; then
    if [[ -n &quot;${xlabel}&quot; ]]; then
        X_LABEL=&quot;--show-x-label --x-label=${xlabel}&quot;
    fi
fi

# We will drop the output graphs into a standard place
outdir=&quot;$WRAPPERDIR/output&quot;
mkdir -p &quot;$outdir&quot;

# Run the script with the runtime values passed in from the job request
python $WRAPPERDIR/lib/main.py ${showYLabel} &quot;${Y_LABEL}&quot; &quot;${X_LABEL}&quot; ${SHOW_LEGEND} ${HEIGHT} ${WIDTH} ${BACKGROUND} ${format} ${SEPARATE_CHARTS} -v --output-location=$outdir --chart-type=${CHART_TYPE} ${inputFile}
[/code]

As you probably guessed, the wrapper template, like the app description, is a little bit more complex. However, a closer look will reveal that the majority of the new content is predictable scaffolding to check for the existence of a parameter before adding it to the call to pyplot. No value or type checks are needed because Agave already handled the validation when it processed the job request. By the time the wrapper template is processed, boolean parameters will be resolved to 1 or 0, string parameters will be empty   or match the validator, enumeration parameters will be one of the predefined values, and numeric parameters will be integer values. Thus, with only value or missing values to deal with in the wrapper template, the initialization code becomes very predictable.

<pre><code>For even more help registering your apps, check out the App Generator. This form-based wizard will walk you through the creation of your app step by step, show you the resulting JSON along the way, and give you the option to generate a wrapper template skeleton. It is a big help in making app definition painless.
</code></pre>

When a user runs this example app, they will specify a <code>dataset</code> and <code>chartType</code> in their job request. During job submission, Agave will stage the <code>dataset</code> to the execution system, demo.execute.example.com, and place it in the job's work directory. It will then copy the contents of the app's <code>deploymentPath</code>, apps/pyplot-demo-intermediate-0.1.0, from the <code>deploymentSystem</code>, demo.storage.example.com, to the job work directory on demo.execute.example.com and process the contents of the wrapper template, wrapper.sh, into an executable file.

During processing, Agave will replace all occurrences of <code>${dataset}</code>, <code>${chartType}</code>, <code>${xlabel}</code>, etc. with the name of the corresponding input or parameter value provided in the job description. Depending on whether the execution system registered with Agave uses a batch scheduler, specifies a custom environment, or requires other custom environment variables set, Agave will prepend these values to the top of the file, resolve any other <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/" title="App Management Tutorial">predefined template variables</a> in the wrapper, save the file in the job work directory, and run it.

<h3>Things you don't worry about</h3>

<h4>Data staging</h4>

Data will already be there before the app is run. If the data isn't available or the user didn't provide any, the job will fail before the wrapper template is processed.

<h4>Logging</h4>

Logging is handled for you by Agave. Both stderr and stdout will be captured for CLI apps. On batch systems, the job log files are saved in the job work directory. All will be present in the job work directory or archive directory when the job completes.

<h4>App installation</h4>

This is a bit of a moot point since pyplot is Python, but Agave handles the app staging for you by copying the <code>deploymentPath</code> from the <code>deploymentSystem</code> given in your app description to the job work folder on the <code>executionSystem</code>. As long as you can package up your app's assets into the <code>deploymentPath</code>, or ensure that they are already present on the system, you can run your app without dealing with pulling in dependencies, etc.

Of course, you still have the option of including a build or compilation in your wrapper script. For throughput reasons, however, that may not be the best approach. For another option with much better portability and performance, see the <a href="http://agaveapi.co/documentation/tutorials/app-management-tutorial/docker-app-containers-tutorial/" title="Docker App Containers Tutorial">Docker App Containers Tutorial</a>.

<h3>Testing the wrapper template</h3>

To test our wrapper template, we will create a new script in our test folder. The script will define the template variables Agave would replace in the wrapper template at runtime. One perk of the wrapper templates being shell scripts is we can simply define our inputs and parameters as environment variables and bash will do the replacement for us.

[code lang=text]
#!/bin/bash

DIR=$( cd &quot;$( dirname &quot;$0&quot; )&quot; &amp;&amp; pwd )

# set test variables
export dataset=&quot;$DIR/lib/testdata.csv&quot;
export chartType=&quot;line&quot;
export xlabel=&quot;Trade_Date&quot;
export ylabel=&quot;Stock_Value&quot;
export showXLabel=1
export showYLabel=1
export showLegend=1
export separateCharts=0
export height=512
export width=1024
export format=&quot;png&quot;
export background=&quot;#999999&quot;

# call wrapper template as if the values had been injected by the API
sh -c ../wrapper.sh
[/code]

That's it. We can run the script and verify that the correct bar chart appears in the output directory.

<h3>Registering your app</h3>

Now that we have our wrapper script and app description, and we have tested it works, we will register it to Agave. Let's copy our wrapper script and test directory up to the <code>deploymentSystem</code> we specified in the app description and then send our app description to Agave.

[code lang=bash]
files-mkdir -N apps/pyplot-demo-intermediate-0.1.0 -S demo.storage.example.com 
files-upload -F wrapper.sh -S demo.storage.example.com apps/pyplot-demo-intermediate-0.1.0
files-upload -F test -S demo.storage.example.com apps/pyplot-demo-intermediate-0.1.0

apps-addupdate -F app.json
[/code]

That's it. Now we have our app ready to run with Agave.

<h3>Running your app</h3>

To run your app, we will post a JSON job request object to the jobs service. We can get an sample job description from the Agave CLI's <code>jobs-template</code> script.

[code lang=bash]
jobs-template -A demo-pyplot-intermediate-basic-0.1.0 &gt; submit.json
[/code]

That will produce JSON similar to the following in the <code>submit.json</code> file.

[code lang=javascript]
{
  &quot;name&quot;: &quot;demo-pyplot-demo-basic test-1415742730&quot;,
  &quot;appId&quot;: &quot;demo-pyplot-demo-basic-0.1.0&quot;,
  &quot;archive&quot;: false,
  &quot;inputs&quot;: {
    &quot;dataset&quot;: &quot;agave://demo.storage.example.com/apps/pyplot-demo-advanced-0.1.0/test/testdata.csv&quot;
  },
  &quot;parameters&quot;: {
    &quot;chartType&quot;: &quot;bar&quot;,
    &quot;width&quot;: 1024,
    &quot;height&quot;: 512,
    &quot;background&quot;: &quot;#d96727&quot;,
    &quot;showYLabel&quot;: true,
    &quot;ylabel&quot;: &quot;The_Y_Axis_Label&quot;,
    &quot;showXLabel&quot;: true,
    &quot;xlabel&quot;: &quot;The_X_Axis_Label&quot;,
    &quot;showLegend&quot;: true,
    &quot;format&quot;: &quot;png&quot;,
    &quot;separateCharts&quot;: false
  }
}
[/code]

We can now submit this JSON to the jobs service to run our pyplot on the execution system and access the output in the exact same way as before.

<h2>Improving the user experience</h2>

From an end-user perspective, the two applications provide a significantly different experience. The webapp in the intermediate folder illustrates this differences. Notice how the intermediate app is able to provide better field validation and catch errors to the input file prior to job submission where the basic app allows invalid input files to be submitted and the error is not caught until after the job fails.