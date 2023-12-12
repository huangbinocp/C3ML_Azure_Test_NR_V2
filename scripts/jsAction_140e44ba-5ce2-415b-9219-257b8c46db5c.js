// Javascript skeleton.
// Edit and adapt to your needs.
// The documentation of the NeoLoad Javascript API
// is available in the appendix of the documentation.

// Get variable value from VariableManager
var popup_end_date = context.variableManager.getValue("I_Start_Date");
if (popup_end_date==null) {
        context.fail("Variable 'I_Start_Date' not found");
}


logger.debug("popup_end_date="+popup_end_date);

var popup_start_date = context.variableManager.getValue("popup_start_date");
if (popup_start_date==null) {
        context.fail("Variable 'popup_start_date' not found");
}

logger.debug("popup_end_date="+popup_end_date);

var start_time =context.variableManager.getValue("start_time");
logger.debug("start_time="+start_time);

var time = new Date()
var end_time = Math.round(time.getTime() / 1000)
logger.debug("end_time="+end_time);


// Do some computation using the methods
// you defined in the JS Library

var diftime =end_time - start_time;

logger.debug("Time for popup windows loading ="+ diftime );