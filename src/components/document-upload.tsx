import React from "react";
import { IFormControl } from "../interfaces/i-form-control";
import { IDocumentUploadState, IFile } from "../interfaces/i-document-upload-prps";

export class DocumentUpload extends React.Component<IFormControl, IDocumentUploadState> {

    state = {
        uploadFileRef: React.createRef<HTMLInputElement>(),
        value: [] as IFile[]
    }

    render() {

        const fileList = this.state.value.map((file, i) =>
            <span key={file.fileName}>
                {file.fileName}
                <span
                    className="constant glyphicon glyphicon-remove"
                    style={{ cursor: "pointer", float: "right" }}
                    onClick={this.deleteFile(i)} />
                <br />
            </span>
        );

        return (
            <>
                <div className="value">
                    <div className="period button">

                        <span 
                            id="DocumentUploadSpan"
                            className="rte-button-color-333333"
                            onClick={this.onClickHandler}
                            style={{ cursor: "pointer", backgroundColor: "#5b7f95" }}>
                            {this.props.buttonText}
                        </span>
                        <br />
                        
                        {fileList}

                        <input
                            ref={this.state.uploadFileRef}
                            id={this.props.controlName}
                            name={this.props.controlName}
                            onChange={this.onChangeHandler}
                            className="hidden"
                            type="file"
                            multiple={this.props.multiple}
                            accept={this.props.allowedFileTypes} />

                        {this.props.description}

                    </div>
                </div>
                <label htmlFor="DocumentUpload" id="anc_DocumentUpload" className="control-label">
                    {this.props.label}
                </label>
            </>
        )
    }

    private filesChanged = () => this.props.onControlValueChangeHandler(null, this.props.controlName, this.state.value);

    private deleteFile = (index: number) => () => this.setState(
        state => {
            state.value.splice(index);
            return { value: state.value };
        },
        this.filesChanged
    )

    private onClickHandler = () => this.state.uploadFileRef.current.click();

    private onChangeHandler = () => {

        const files: Promise<IFile>[] = (Array.prototype.slice.call(this.state.uploadFileRef.current.files) as File[])
            // ignore files with the same name
            .filter(file => !this.state.value.some(f => f.fileName === file.name))
            .map((file: File) => new Promise((resolve, reject) => {

                const reader = new FileReader();

                reader.onload = () => resolve({
                    content: btoa(reader.result as string),
                    fileName: file.name,
                    contentType: file.type,
                    documentType: this.props.documentType
                });

                reader.onerror = reject;
                reader.readAsDataURL(file);
            }));

        Promise.all(files)
            .then((files) => this.setState(
                state => ({ value: state.value.concat(files) }),
                this.filesChanged
            ))
            .catch(console.error);
    }
}