export interface IFileS3 {
	Key: string;
}

export interface IFileDownload extends IFileS3 {
	
}

export interface IFileUpload {
	FileName: string;
	ContentType?: string;
	Body: Buffer;
	Metadata?: {[key: string]: string;};
}

export interface IFileUploadRes extends IFileS3 {
	Bucket: string;
	ETag: string;
	Location: string;
}