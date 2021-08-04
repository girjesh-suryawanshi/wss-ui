import { Injectable } from '@angular/core';

@Injectable()
export class GlobalConstants {


    public static readonly FILE_FORMAT_PDF: string = "pdf";
    public static readonly FILE_FORMAT_XLSX: string = "xlsx";
    public static readonly FILE_FORMAT_XLS: string = "xls";
    public static readonly FILE_FORMAT_DOC: string = "doc";
    public static readonly FILE_FORMAT_DOCX: string = "docx";
    public static readonly FILE_FORMAT_JPEG: string = "jpg";
    public static readonly FILE_FORMAT_TEXT: string = "text";
    public static readonly FILE_FORMAT_HTML: string = "html";
    public static readonly FALSE : boolean = false;

    public static readonly LOGGED_IN_USER_ROLE_ADMIN_DE : string ="ADMIN_DE";

    public static readonly LOGGED_IN_USER_ROLE_ADMIN_SE : string ="ADMIN_SE";

    public static readonly LOGGED_IN_USER_ROLE_ADMIN_CE : string ="ADMIN_CE";

    public static readonly LOGGED_IN_USER_ROLE_ADMIN_MD : string ="ADMIN_MD";

    public static readonly INCIDENT_STATUS_APPROVED_DE : string ="APPROVED_DE";

    public static readonly INCIDENT_STATUS_APPROVED_SE : string ="APPROVED_SE";

    public static readonly INCIDENT_STATUS_APPROVED_CE : string ="APPROVED_CE";

    public static readonly INCIDENT_STATUS : string ="SUBMITTED";
    
}
