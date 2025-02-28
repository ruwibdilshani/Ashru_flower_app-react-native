export class Flower {
    code! : string;
    flowerName! : string;
    price! : number;
    category! : string;
    flowerImage! :string | null;
    fav : boolean = false;

    constructor(
        code: string,
        flowerName: string,
        price: number,
        category: string,
        flowerImage: string
    ) {
        this.code = code;
        this.flowerName = flowerName;
        this.price = price;
        this.category = category;
        this.flowerImage = flowerImage;
    }   
    

}