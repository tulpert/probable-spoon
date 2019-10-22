//
// Defaults
//
var default_value               = -999;             // Set value to -999 if not declared to indicate a problem.
var default_title               = '';               // Set title to empty if not declared. Will try to read the canvas ID tag
var default_units               = '';               // Set units to empty if not declared.
var default_bgcolor             = '#111111'         // Default background. Maybe read the document background color?
var default_ticknumcolor        = '#cccccc'         // Default color of tick numbers. 
var default_setinterval         = 1000;             // How long between update cycles in ms.
var default_animationduration   = 500;              // How long time changing of the arrow should take in ms.

counter = 0;

$( document ).ready(function() {
    updateScreen();         // The inital sync before starting Interval
    setInterval(function() { updateScreen(); }, default_setinterval);
});

function updateScreen() {
    filetext = readTextFile("services.json");
    myjson = JSON.parse(filetext);

    // First detect any gauges that have been added as part of HTML css code
    // console.log("["+counter+"] --- Start --- ");
    document.gauges.forEach(function(gauge) {
        // console.log(gauge);
        // console.log("ID: " + gauge.canvas.element.id);
        // console.log("IsJson: " + myjson.gauge[gauge.canvas.element.id]);
        // Update the values if exists
        my_value        = default_value;
        my_title        = gauge.canvas.element.id || default_title;
        my_units        = '';
        my_bgcolor      = default_bgcolor;
        my_ticknumcolor = default_ticknumcolor;
        if (myjson.gauge) {
            if ( typeof myjson.gauge[gauge.canvas.element.id] !== 'undefined') {
                // Special test to see if the value variable is set in the json file. If not, return the default error number (-999).
                my_units        = myjson.gauge[gauge.canvas.element.id].units           || default_units;
                if (typeof myjson.gauge[gauge.canvas.element.id].value !== 'undefined') {
                    my_value    = myjson.gauge[gauge.canvas.element.id].value;
                } else {
                    my_value    = default_value;
                    my_units    = 'Value n/a';
                }
                my_title        = myjson.gauge[gauge.canvas.element.id].title           || gauge.canvas.element.id;
                my_bgcolor      = myjson.gauge[gauge.canvas.element.id].bgcolor         || default_bgcolor;
                my_ticknumcolor = myjson.gauge[gauge.canvas.element.id].ticknumcolor    || default_ticknumcolor;
            }
        }
        gauge.update({
            title: my_title,
            units: my_units,
            colorNumbers: my_ticknumcolor,
            animationDuration: 500,
            animationRule: "linear",
            colorPlate: my_bgcolor
        });
        gauge.value = my_value;
        gauge.draw();
        // console.log("Setting [" +gauge.canvas.element.id+ "] to value ["+my_value+"]");
    });
    delete myjson;
    delete filetext;
    // console.log("["+counter+"] ----- stop -----");
    // console.log(" ");
    counter = counter+1;
}

function readTextFile(file) {
    rawFile = new XMLHttpRequest();
    allText = "";
    rawFile.open("GET", file, false);
//    console.log(rawFile);
    rawFile.onreadystatechange = function () {
      //  console.log("             =================");
      //  console.log("-----> " + rawFile.readyState );
      //  console.log("-----> " + rawFile.readyState );
      //  console.log("-----> " + rawFile.readyState );
        if(rawFile.readyState === 4) {
        // console.log("-----> " + rawFile.status );
        // console.log("-----> " + rawFile.status );
        // console.log("-----> " + rawFile.status );
        // console.log("             =================");
            if(rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    delete rawFile;
    return allText;
}

// vim: bg=dark ts=4 hidden hlsearch ic et
