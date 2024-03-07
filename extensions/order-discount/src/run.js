// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
  * @typedef {import("../generated/api").Target} Target
 * @typedef {import("../generated/api").ProductVariant} ProductVariant
 */

/**
 * @type {FunctionRunResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */

export function run(input) {

  const targets = input.cart.lines
  .filter((line) =>{
    if(line.merchandise.__typename === "ProductVariant"){
      const isCollection = line.merchandise.product.inAnyCollection;
      return isCollection === false;
    }
  }).map(line =>{
    if(line.merchandise.__typename === "ProductVariant"){
      return{
        productVariant: {
          id: (line.merchandise).id
        }
      }
    }
  })
  
  const DISCOUNTED_ITEMS = {
    discountApplicationStrategy: DiscountApplicationStrategy.First,
    discounts: [
      {
        targets: [],
        value: {
          percentage :{
            value: 10
          }
        },
        message: "10% off"
      }
    ]
  }

  return targets.length == 0 ? EMPTY_DISCOUNT : DISCOUNTED_ITEMS;
};