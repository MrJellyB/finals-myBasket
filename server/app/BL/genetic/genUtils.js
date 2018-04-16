import GenBasket from "./genBasket";

export default class GenUtils {
    baskets;
    bestBasket;

    // Start population 
    generateInitialBaskets(basketsAmounts = 100, productsAmount = 10) {
        //
        for (let i = 0; i < basketsAmounts; i++) {
            dbUtils.getRandomProducts(productsAmount, (err, data) => {
                this.baskets[i] = new GenBasket(data);
                this.baskets[i].calcGrade();

                if (this.bestBasket == null) {
                    this.bestBasket = this.baskets[i];
                }
                else if (this.baskets[i].grade > this.bestBasket.grade) {
                    this.bestBasket = this.baskets[i];
                }
            });
        }
    }

    nextGeneration() {

    }



}