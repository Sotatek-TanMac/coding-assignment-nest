export interface IFileDownload {
	Bucket: string;
	Key: string;
}

export interface IFileUpload extends IFileDownload {
	ContentType?: string;
	Body: Buffer;
	Metadata?: {[key: string]: string;};
}

export interface IFileUploadRes {
	ETag: string;
	Location: string;
	Key: string;
	Bucket: string;
}