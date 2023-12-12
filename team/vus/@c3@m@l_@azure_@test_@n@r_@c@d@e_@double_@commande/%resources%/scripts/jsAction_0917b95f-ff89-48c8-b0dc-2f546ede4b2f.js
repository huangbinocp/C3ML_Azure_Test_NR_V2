// Javascript skeleton.
// Edit and adapt to your needs.
// The documentation of the NeoLoad Javascript API
// is available in the appendix of the documentation.

// Get variable value from VariableManager
var myVar = context.variableManager.getValue("I_Start_Date");
if (myVar==null) {
        context.fail("Variable 'I_Start_Date' not found");
}

// Do some computation using the methods
// you defined in the JS Library

logger.debug("i_start_date="+myVar);

// Inject the computed value in a runtime variable
context.variableManager.setValue("i_start_date",myVar);