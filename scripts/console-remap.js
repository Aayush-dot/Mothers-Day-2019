// console override function
// important for debugging in iOS if you don't have a mac

// idea courtesy liviu blidar
// https://stackoverflow.com/a/46529254

// suppress popups (for production versions)
const SUPPRESS_POPUPS = true;

if (!SUPPRESS_POPUPS) {

    var console = (function(c) {
        return {
            log: function(text)   { alert('LOG: ' + text);   c.log(text);  },
            info: function(text)  { alert('INFO: ' + text);  c.info(text); },
            warn: function(text)  { alert('WARN: ' + text);  c.warn(text); },
            error: function(text) { alert('ERROR: ' + text); c.error(text);}
        }
    })(window.console);

    window.console = console;
    
}