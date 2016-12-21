module.exports = function(Project) {

    let PythonShell = require('python-shell');
    let programName = './server/py-app/mos.py';
    const DATASETS_PATH ='./uploads/datasets/';
    const RESULTS_PATH ='./server/py-app/results/';

    Project.startAnalyze = function (id,cb) {

        Project.findById(id)
                .then(function (project) {
                    //todo start MOSES feeding parameters of this project
                    let dataSetFileName = project.dataSetFileName;
                    let w1= project.w1;
                    let targetFeature =project.targetFeature;

                    //todo refactor
                    let logFileName = RESULTS_PATH + project.id  + '.log';
                    let resultFileName = RESULTS_PATH + project.id  + '.scm';
                    let datasetName = DATASETS_PATH + dataSetFileName;

                    let params = '-i '+ datasetName +' -u '+ targetFeature +' --log-file '+ logFileName ;
                    if(w1){
                      params += ' -w1';
                    }

                    // console.log('parmas',params);

                    let options = {
                        args: [params,resultFileName]
                    };
                    //console.log('Arguments: %j',options);
                    PythonShell.run(programName,options,function (err,results) {
                        if (err) {
                            console.log(err);
                        }
                        
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
