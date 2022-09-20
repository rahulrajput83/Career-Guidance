export default interface ResponseModel {
    check: boolean;
    message?: string;
    data?: null | object | object[];
}
