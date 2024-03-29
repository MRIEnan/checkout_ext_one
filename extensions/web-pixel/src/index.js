import {register} from "@shopify/web-pixels-extension";

// register(({ configuration, analytics, browser }) => {
    

//     analytics.subscribe('checkout_completed', (event) => {
//       // Example for accessing event data
//       const checkout = event.data.checkout;
  
//       const checkoutTotalPrice = checkout.totalPrice.amount;
  
//       const allDiscountCodes = checkout.discountApplications.map((discount) => {
//         if (discount.type === 'DISCOUNT_CODE') {
//           return discount.title;
//         }
//       });
  
//       const firstItem = checkout.lineItems[0];
  
//       const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;
  
//       const customItemPayload = {
//         quantity: firstItem.quantity,
//         title: firstItem.title,
//         discount: firstItemDiscountedValue,
//       };
  
//       const paymentTransactions = event.data.checkout.transactions.map((transaction) => {
//         return {
//             paymentGateway: transaction.gateway,
//             amount: transaction.amount,
//           };
//       });
  
//       const payload = {
//         event_name: event.name,
//         event_data: {
//           totalPrice: checkoutTotalPrice,
//           discountCodesUsed: allDiscountCodes,
//           firstItem: customItemPayload,
//           paymentTransactions: paymentTransactions,
//         },
//       };
//       console.log(payload)
//     });


// });
  
register(({analytics}) => {
  analytics.subscribe('checkout_completed', (event) => {
    // Example for accessing event data
    const checkout = event.data.checkout;

    const checkoutTotalPrice = checkout.totalPrice.amount;

    const allDiscountCodes = checkout.discountApplications.map((discount) => {
      if (discount.type === 'DISCOUNT_CODE') {
        return discount.title;
      }
    });

    const firstItem = checkout.lineItems[0];

    const firstItemDiscountedValue = firstItem.discountAllocations[0].amount;

    const customItemPayload = {
      quantity: firstItem.quantity,
      title: firstItem.title,
      discount: firstItemDiscountedValue,
    };

    const paymentTransactions = event.data.checkout.transactions.map((transaction) => {
      return {
          paymentGateway: transaction.gateway,
          amount: transaction.amount,
        };
    });

    const payload = {
      event_name: event.name,
      event_data: {
        totalPrice: checkoutTotalPrice,
        discountCodesUsed: allDiscountCodes,
        firstItem: customItemPayload,
        paymentTransactions: paymentTransactions,
      },
    };

    console.log(payload)

    // data storing mechanism to any database
    // fetch('https://example.com/pixel', {
    //   method: 'POST',
    //   body: JSON.stringify(payload),
    //   keepalive: true,
    // });
  });
});