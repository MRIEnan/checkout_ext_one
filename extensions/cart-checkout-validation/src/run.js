// @ts-check

/**
 * @typedef {import("../generated/api").RunInput} RunInput
 * @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
 */

/**
 * @param {RunInput} input
 * @returns {FunctionRunResult}
 */
export function run(input) {
  const error = {
    localizedMessage:
        "Order must be over 1000 bdt",
    target: "cart"
  };
  // Parse the decimal (serialized as a string) into a float.
  const orderTotal = parseFloat(input.cart.cost.totalAmount.amount);
  const errors = [];

  // Orders with subtotals greater than $1,000 are available only to established customers.
  if (orderTotal < 1000.0) {

    errors.push(error);
  }

  return {
    errors
  }
};