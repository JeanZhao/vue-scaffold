let fs = require('fs');
let path = require('path');
var html2jade = require('html2jade');

var publish_platform = process.argv.splice(2);

var root = process.cwd();
var dist_path = path.join(root, 'dist');
var public_path = path.join(root, '/deploy/public/dist/');
var public_root_path = path.join(root, '/deploy/public/');
var public_template_path = path.join(root, '/deploy/views/');

let deleteFolderRecursive = function(path) {
    if(!fs.existsSync(path)) {
        return;
    }
    var files = fs.readdirSync(path);
    for (var i in files) {
        var file = files[i];
        var curPath = path + "/" + file;
        if(fs.statSync(curPath).isDirectory()) { // recurse
            arguments.callee(curPath);
        } else { // delete file
            fs.unlinkSync(curPath);
        }
    };
    fs.rmdirSync(path);
};

let do_exec = function(cmd, opts) {
    var cp = require('child_process');

    var ex = cp.exec(cmd, opts, function(err, stdout, stderr) {
    });
    process.stdin.pipe(ex.stdin);
    ex.stdout.pipe(process.stdout);
    ex.stderr.pipe(process.stderr);

    return ex;
};

let mkdirsSync = function(dirpath, mode){
    if (!(dirpath && fs.existsSync(dirpath) && fs.statSync(dirpath).isDirectory())) {
        arguments.callee(path.dirname(dirpath), mode);
        fs.mkdirSync(dirpath, mode);
    }
};

deleteFolderRecursive(public_path);
mkdirsSync(public_path);

console.log('');
console.log('********************************************');
console.log('START MOVING FILES TO PUBLIC ' + public_path);
console.log('********************************************');
console.log('');

let cp_all_cmd = do_exec('cp -rf ' + dist_path + '/ ' + public_path);
cp_all_cmd.on('exit', function(code) {
    // do_exec('mv ' + public_path + '/service-worker.js ' + public_root_path);
    // do_exec('mv ' + public_path + '/manifest.* ' + public_root_path);
    // do_exec('mv ' + public_path + '/minitable-logo-* ' + public_root_path);
    do_exec('rm ' + public_path + '/service-worker.js');
    do_exec('rm ' + public_path + '/index.html');

    console.log('');
    console.log('********************************************');
    console.log('START CONVERTING TEMPLATE TO PUG');
    console.log('********************************************');
    console.log('');
    let index_tmpl = fs.readFileSync(public_path + '/index.html', 'utf-8');
    index_tmpl = index_tmpl.replace('dist/manifest', '/manifest');

    html2jade.convertHtml(index_tmpl, {}, function (err, _jade) {
        _jade = _jade.replace(/\s+\|/g, '');
        console.log(_jade);
        fs.writeFile(public_template_path + 'index.pug', _jade, function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log('');
            console.log('********************************************');
            console.log('ALL DONE');
            console.log('********************************************');
            console.log('');

            process.exit();
        });
    });
});