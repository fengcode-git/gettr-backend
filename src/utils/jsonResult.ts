export interface IJsonResult {
    content: any,
    isSuccess: boolean,
    message: string
}

export const createJsonResult = (isSuccess: boolean, message: string, content: any): IJsonResult => {
    return {
        isSuccess: isSuccess,
        message: message,
        content: content
    }
}