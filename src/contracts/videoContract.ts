export interface VideoContract{
        VideoId:string,
        Url:string,
        Title:string,
        Description:string,
        Likes:number,
        Dislikes:number,
        Category:string,
        Tags:string[],
        Date:Date,
        ChannelId:string,
        ChannelName:string
}