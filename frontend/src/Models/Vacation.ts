import dayjs, { Dayjs } from 'dayjs';


class Vacation{
    public id:number;
    public description?:string;
    public destination?:string;
    public start_date?:string;
    public end_date?:string;
    public cost?:number;
    public image_name?:string;
    public image?:string;
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