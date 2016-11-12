module.exports = function(Project) {

    let PythonShell = require('python-shell');
    let programName = './server/py-app/app.py';
    const DATASETS_PATH ='./uploads/dataset';
    const RESULTS_PATH ='./server/py-app/results';

    Project.startAnalyze = function (id,cb) {

        Project.findById(id)
                .then(function (project) {
                    //todo start MOSES feeding parameters of this project
                    let dataSetFileName = project.dataSetFileName;
                    let w1= project.w1;
                    let targetFeature =project.targetFeature;

                    // let options = {
                    //     mode: 'text',
                    //     pythonPath: 'path/to/python',
                    //     pythonOptions: ['-u'],
                    //     scriptPath: 'path/to/my/scripts',
                    //     args: ['value1', 'value2', 'value3']
                    // };

                    console.log(dataSetFileName,w1,targetFeature);
                    PythonShell.run(programName,function (err,results) {
                        if (err) throw err;
                        console.log('results: %j', results);

                        /**
                         * @TODO
                         * 1 - when the moses process finish update the result for this project
                         * 2 - push the result for the user (realtime)
                         * 3 - publish/push analysis progress to the user
                         * 4 - kill process clean memory
                         * */
                    });

                    return cb(null,'process started!');

                })
                .catch(function (err) {
                  return cb(err);
                })

    };

    Project.remoteMethod('startAnalyze', {
        description: 'start analysis fo this data set',
        accepts: [
            {
                arg: 'id',
                type: 'string',
                required: true
            }
        ],
        http: {
            path: '/:id/startAnalyze',
            verb: 'get'

        },
        returns: {
            arg: 'response',
            type: 'string'
        }
    });


};
