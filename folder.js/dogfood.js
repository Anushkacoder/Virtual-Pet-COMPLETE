class DogFood {
    constructor(){
        this.foodStock = foodz;
        this.lastFed = 0;
        this.image = loadImage("dogfood.png");
    }
    getFoodStock(){
      foodref = database.ref('Milk');
      foodref.on("value", function(data){
          foodz = data.val();
      })
      return foodz;
    }
    updateFoodStock(f){
         if(f<= 0){
            f = 0;
         }
         if(f>= 20){
             f = 20;
         }
        database.ref('/').update({
            Milk : f
        })
    }
    bedroom(){
        image(bedroomIMG,width/2,height/2,width,height);
    }
    washroom(){
       image(washroomIMG,width/2,height/2,width,height);
    }
    garden(){
       image(gardenIMG,width/2,height/2,width,height);
    }
    livingroom(){
        image(livingIMG,width/2,height/2,width,height);
    }
    display(){
        var x = 80;
        var y = 100;

        imageMode(CENTER);

        if(foodz != 0){
            for(var i = 0; i < foodz; i++){
                if(i%20 == 0){
                  x = 930;
                  y = 80;
                }
                if(x > 1300){
                    x = 930;
                    y = y + 120;
                }
                image(this.image,x,y,80,70);
                x = x + 80;
            }
        }
    }
}