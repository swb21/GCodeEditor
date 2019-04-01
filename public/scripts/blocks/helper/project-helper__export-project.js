const $ = require("jquery");
const THREE = require('three');
const editor = require('../../editor');
const Project = require('../../project');


$('.project__export-project')
    .on('click', function () {
        // Creates or gets the file input
        let fileInput = $('#export-project');
        if (!fileInput.get(0)) {
            fileInput = $('<input>').prop({type: 'file', id: 'export-project', hidden: true});
            $('.page-content').append(fileInput);

            $(fileInput)
                .on('change', function (event) {
                    const file = this.files[0];
                    let fileReader = new FileReader();

                    fileReader.readAsText(file);

                    fileReader.onload = function (e) {
                        let project = new Project(e.target.result);
                        editor.scene.add(project.threeModel.model);
                    };
                });
        }

        $(fileInput).trigger('click');
    });
