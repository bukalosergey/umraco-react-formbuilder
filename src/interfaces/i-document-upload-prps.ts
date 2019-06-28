export interface IFile {
    content: string;
    fileName: string;
    contentType: string;
    documentType: string;
}

export interface IDocumentUploadState {
    uploadFileRef: React.RefObject<HTMLInputElement>,
    value: IFile[]
}