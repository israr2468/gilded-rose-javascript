import { expect, describe, it } from "vitest";
import {RegularItem, items, updateQuality } from "./gilded-rose.js";

// items have sellIn & quality, each day lowers both by 1
describe("updateQuality", () => {
  it("reduces quality and sellIn of basic items by 1", () => {
    const testItem = new RegularItem("basic", 5, 3);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(2);
    expect(testItem.sellIn).toBe(4);
  });
  it("quality decreases by 2 when sellIn is less than 0", () => {
    const testItem = new RegularItem("basic", 0, 10);
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(8);
  });
  // quality is never negative
  // 0 < quality < 50
  it("quality is between 0 and 50", () => {
    const testItem = new RegularItem("basic", 10, 0);
    const testItem2 = new RegularItem("Aged Brie", 10, 50);
    items.push(testItem);
    items.push(testItem2);

    updateQuality();

    expect(testItem.quality).toBe(0);
    expect(testItem2.quality).toBe(50);
  });

// aged brie goes up in quality each day
  it("Aged Brie goes up each day", () => {
    const testItem = new RegularItem("Aged Brie", 10, 10)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(11);
  });


// "Sulfuras, Hand of Ragnaros," never decreases in quality.
  it("Sulfuras, Hand of Ragnaros never depreciates", () => {
    const testItem = new RegularItem("Sulfuras, Hand of Ragnaros", 10, 10)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(10);
  });

// conjured items quiality goes down by 2 each day
  it("Conjoured items qualiity goes down by 2 each day", () => {
    const testItem = new RegularItem( "Conjured", 10, 10)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(8);
  });


//Backstage passes to a TAFKAL80ETC concert:
// quality increases by 2 when there are 10 days or less left before the concert.
  it("quality increases by 2 when there are 10 days or less left before the concert", () => {
    const testItem = new RegularItem("Backstage passes to a TAFKAL80ETC concert", 10, 9)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(11);
  });

// quality increases by 3 when there are 5 days or less left before the concert.
  it("quality increases by 3 when there are 5 days or less left before the concert", () => {
    const testItem = new RegularItem ("Backstage passes to a TAFKAL80ETC concert", 5, 10)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(13);
  });

// // quality drops to 0 after the concert.
  it("quality drops to 0 after the concert", () => {
    const testItem = new RegularItem("Backstage passes to a TAFKAL80ETC concert", 0, 5)
    items.push(testItem);

    updateQuality();

    expect(testItem.quality).toBe(0);
  });
});