var version = "pageForm";
var params={};window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(str,key,value){params[key] = value;});

function el(s) {
    return document.getElementById(s)
};

function formCompetion(){
    fields = pageFormFields;
    console.clear();
    var filledOut = 0;

    for (i=0; i<fields.length; i++){
        filledOut += fieldCheck(fields[i].id);
        //console.log(fields[i].id + ": " + el(fields[i].id).value + " ||| " + filledOut + "\n");
    }

    //console.log( filledOut == fields.length ? version : false );
    return (filledOut == fields.length ? version : false);
}

function inGlobalArray(arr, what) {
    var theIndex = 0;
    $.each( arr, function(key, value){
        if (what == value.value)
            theIndex = key;
    });
    return theIndex;
}

function clearform(){
    fields = pageFormFields;
    console.clear();
    el("output").innerHTML = "";

    //console.log (fields.length);
    for (i=0; i<fields.length; i++){
        el(fields[i].id).value = "";
        $( "input" ).removeClass( "defaultInput errorInput" );
    }
    
    try {
        //console.log ("trying to reset dropdowns");
        $("select").prop('selectedIndex', 0);
        modelSelector();
    } catch (err) {
        //console.log ("no dropdowns");
    }
    
}

function unHTMLEntities(s) {
    s = s.replace(/\[timecode\]/gi, "%%CACHEBUSTER%%" );
    var strArr = s.split("&");
    //console.log( strArr.join("&amp;") );            
    return strArr.join("&AMP;");
}

function inputFocus(){
    $("input, textarea, select").focus( function() {
        //console.log ( this.id + " clicked");
        var checkClass = $( this ).hasClass( "defaultInput errorInput" );
        if ( $( this ).hasClass( "defaultInput" ) || $( this ).hasClass( "errorInput" ) ) {
            $(this).removeClass("defaultInput errorInput"); 
            $(this).select();
        }
    });
}

function fieldCheck(s){
    var v = 0;
    // check for empty inputs
    var e = el(s).value.replace(/\s/g, "")
    if (e != "")
        v = 1;

    // check for prepopulated data
    var i = -1;
    i = inGlobalArray( defaultValues, el(s).value );
    //console.log( s + ": " + i );

    if (el(s).value == defaultValues[i].value){
        $( "#" + s ).addClass( "errorInput" );
        v = -1;
    }

    // exempt from field check
    for (i=0; i<excludes.length; i++){
        if (s == excludes[i])
            v = 1;
    }

    //console.log(s +":"+ v);

    return v;
}