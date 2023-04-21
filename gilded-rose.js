export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export let items = [];

export class RegularItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }
  #ifConjured() {
    if (this.name.split(" ")[0] == "Conjured") {
      return true;
    } else {
      return false;
    }
  }
  qualityReduction() {
    let reduction = 1;
    if (this.#ifConjured()) {
      this.#conjured();
      return;
    }
    if (this.sellIn < 1) {
      reduction = 2
    }
    if (this.name == "Aged Brie") {
      if (this.quality == 50) {
        reduction = 0
      } else {
        reduction = -1;
      }
    }
    if (this.quality == 0 || this.name == "Sulfuras, Hand of Ragnaros") {
      reduction = 0;
    } 
    if (this.name == "Backstage passes to a TAFKAL80ETC concert") {
      this.#tickets();
      return;
    } else {
      this.quality = this.quality - reduction;
      this.sellIn--;
    }
  }
  #tickets() {
    if (this.sellIn < 1) {
      this.quality = 0;
    } else if (this.sellIn < 6) {
      this.quality +=3;
    } else if (this.sellIn < 11) {
      this.quality += 2;
    } else {
      this.quality--;
    }
    this.sellIn--;
  }
  #conjured() {
    this.quality = this.quality -2;
    this.sellIn--;
  }
}

items.push(new RegularItem("+5 Dexterity Vest", 10, 20));
items.push(new RegularItem("Aged Brie", 2, 0));
items.push(new RegularItem("Elixir of the Mongoose", 5, 7));
items.push(new RegularItem("Sulfuras, Hand of Ragnaros", 0, 80));
items.push(new RegularItem("Backstage passes to a TAFKAL80ETC concert", 15, 20));
items.push(new RegularItem("Conjured Mana Cake", 3, 6));


export const updateQuality = () => {
  for (let item of items) {
    item.qualityReduction()
  }
  //     if (
  //       item.name.indexOf("Conjured") > -1
  //     ) {
  //       item.quality = item.quality - 2
  //     }
  //   if (
  //     item.name != "Aged Brie" &&
  //     item.name != "Backstage passes to a TAFKAL80ETC concert"
  //   ) {
  //     if (item.quality > 0) {
  //       if (item.name != "Sulfuras, Hand of Ragnaros") {
  //         item.quality = item.quality - 1;
  //       }
  //     }
  //   } else {
  //     if (item.quality < 50) {
  //       item.quality = item.quality + 1;
  //       if (item.name == "Backstage passes to a TAFKAL80ETC concert") {
  //         if (item.sellIn < 11) {
  //           if (item.quality < 50) {
  //             item.quality = item.quality + 1;
  //           }
  //         }
  //         if (item.sellIn < 6) {
  //           if (item.quality < 50) {
  //             item.quality = item.quality + 1;
  //           }
  //         }
  //       }
  //     }
  //   }
  //   if (item.name != "Sulfuras, Hand of Ragnaros") {
  //     item.sellIn = item.sellIn - 1;
  //   }
  //   if (item.sellIn < 0) {
  //     if (item.name != "Aged Brie") {
  //       if (item.name != "Backstage passes to a TAFKAL80ETC concert") {
  //         if (item.quality > 0) {
  //           if (item.name != "Sulfuras, Hand of Ragnaros") {
  //             item.quality = item.quality - 1;
  //           }
  //         }
  //       } else {
  //         item.quality = item.quality - item.quality;
  //       }
  //     } else {
  //       if (item.quality < 50) {
  //         item.quality = item.quality + 1;
  //       }
  //     }
  //   }
  // }
};
updateQuality();