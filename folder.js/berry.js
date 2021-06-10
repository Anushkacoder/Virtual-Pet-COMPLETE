class Berry {
    constructor(){
        this.foodStock = foodz;
        this.image = loadImage("berry.png");
    }
    getFoodStock(){
      foodref = database.ref('Food');
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
            Food : f
        })
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
                image(this.image,x,y,70,80);
                x = x + 80;
            }
        }
    }
}