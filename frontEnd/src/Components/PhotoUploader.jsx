import React, { Component } from 'react';
import request from 'superagent';
import AddPhotoAlternateOutlinedIcon from '@material-ui/icons/AddPhotoAlternateOutlined';

class PhotosUploader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { uploadedPhotos: [] };
        this.photoId = 1;
    }

    render() {
        return (
            <div>


                <form style={this.props.style}>

                    <div className="form_line">
                        <div className="form_controls">
                            <div className="upload_button_holder">
                                <label style={{ cursor: "pointer" }} for="fileupload"><AddPhotoAlternateOutlinedIcon /></label>
                                <input style={{ display: "none" }}
                                    type="file"
                                    id="fileupload"
                                    accept="image/*"
                                    multiple="multiple"
                                    ref={fileInputEl =>
                                        (this.fileInputEl = fileInputEl)
                                    }
                                    onChange={() =>

                                        this.onPhotoSelected(
                                            this.fileInputEl.files
                                        )
                                    }
                                />

                            </div>
                        </div>
                    </div>
                </form>


            </div>
        );
    }

    onPhotoSelected(files) {
        console.log("photoSelected")
        console.log(files)
        const url = `https://api.cloudinary.com/v1_1/prakhar-parashar/upload`;

        for (let file of files) {

            request.post(url)
                .field('upload_preset', 'otdrkocf')
                .field('file', file)
                .field('multiple', true)

                .end((error, response) => {
                    const publicId = JSON.parse(response.text).public_id
                    this.props.photoInfo(publicId)

                });
        }
    }
}




export default PhotosUploader