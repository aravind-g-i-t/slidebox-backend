export interface IEmailService{
    send(email:string,subject:string,text:string):Promise<void>
}