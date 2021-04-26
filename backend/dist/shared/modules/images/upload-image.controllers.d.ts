import { Observable } from 'rxjs';
export declare class UploadImageController {
    uploadedFile(file: any): {
        url: string;
    };
    findProfileImage(imagename: any, res: any): Observable<any>;
}
