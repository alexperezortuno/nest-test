export class DefaultResponseDto {
    message: string;
    success: boolean;

    constructor(message: string, success: boolean = true) {
        this.message = message;
        this.success = success;
    }
}