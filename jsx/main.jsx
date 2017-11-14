if (typeof($) === 'undefined')
    $ = {};

//Object for loading jsx files (including those in subfolders)
$._ext = {
    //Evaluate a file and catch the exception.
    evalFile: function (path) {
        try {
            $.evalFile(path);
        } catch (e) {
            alert("Exception:" + e);
        }
    },
    // Evaluate all the files in the given folder
    evalFiles: function (jsxFolderPath) {
        var folder = new Folder(jsxFolderPath);
        if (folder.exists) {
            var jsxFiles = folder.getFiles("*.jsx");
            for (var i = 0; i < jsxFiles.length; i++) {
                var jsxFile = jsxFiles[i];
                $._ext.evalFile(jsxFile);
            }
            var subFolder = folder.getFiles();
            for(var i = 0; i < subFolder.length;i++){
                $._ext.evalFiles(subFolder[i]);
            }
        }
    }
};