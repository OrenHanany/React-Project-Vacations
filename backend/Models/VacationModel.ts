import { UploadedFile } from "express-fileupload";


class Vacation{
    public id:number;
    public description:string;
    public destination:string;
    public start_date:Date;
    public end_date:Date;
    public cost:number;
    public image_name:string;
    public image:UploadedFile;
    public follow?:number;

    public constructor (vacation:Vacation){
        this.id=vacation.id;
        this.description=vacation.description;
        this.destination=vacation.destination;
        this.start_date=vacation.start_date;
        this.end_date=vacation.end_date;
        this.cost=vacation.cost;
        this.image_name=vacation.image_name;
        this.image=vacation.image;
        this.follow=vacation.follow;
    }
}

export default Vacation;