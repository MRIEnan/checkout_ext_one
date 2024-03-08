import {
  useApi,
  reactExtension,
  InlineStack,
  Image,
  TextBlock,
  Button,
  BlockStack,
  useShop,
  useCartLines,
  useExtensionCapability,
  useBuyerJourneyIntercept,
  TextField

} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState} from 'react';



export const checkoutExtensionZero =  reactExtension(
  'purchase.checkout.contact.render-after',
  () => <CheckoutExtensionZero />,
);


function CheckoutExtensionZero(){
  const cart = useCartLines()
  const targetedAmount = 100;
  const targetedCur = "USD";
  const [validationError, setValidationError] = useState("");
  const [myTotalCost,setMyTotalCost] =useState(0)
  const [myCurrency,setMyCurrency] = useState(null)
  
  const canBlockProgress = useExtensionCapability("block_progress");
  
  useBuyerJourneyIntercept(({ canBlockProgress }) => {
    
    if (canBlockProgress && !myTotalCost ) {
      return {
        behavior: "block",
        reason: "No cart data is available",
        perform: (result) => {
          // If progress can be blocked, then set a validation error on the custom field
          if (result.behavior === "block") {
            setValidationError("Something went wrong.");
          }
        },
      };
    }
    
    if (canBlockProgress && myTotalCost < targetedAmount) {
        return {
          behavior: "block",
          reason: `Please buy product equivalent to ${targetedAmount} ${targetedCur}.`,
          errors: [
            {
              // Show a validation error on the page
              message:`Please buy product equivalent to ${targetedAmount} ${targetedCur}.`
            },
          ],
        };
      }
      
      return {
        behavior: "allow",
        perform: () => {
          // Ensure any errors are hidden
          clearValidationErrors();
        },
      }
    });
    
    useEffect(()=>{
      console.log(cart)
      let tempCost = 0;
      if(cart.length> 0){
        cart.forEach(elem => {
          if(!myCurrency){
            setMyCurrency(elem['cost']['totalAmount']['currencyCode'])
          }
          const mCost = elem['cost']['totalAmount']['amount']
          tempCost += mCost;
        })
      }
      // console.log(tempCost)
      setMyTotalCost(tempCost)
    },[])
    
    
    function clearValidationErrors() {
      setValidationError("");
    }
    return null;
  }
  
  // below portion is used for testing purposes
  
  // export const checkoutExtensionOne =  reactExtension(
  //   'purchase.checkout.block.render',
  //   () => <CheckoutExtensionOne />,
  // );
  
  // export const checkoutExtensionTwo =  reactExtension(
  //   'purchase.checkout.shipping-option-list.render-before',
  //   () => <CheckoutExtensionTwo />,
  // );
  
// function CheckoutExtensionOne() {
  //   const {query} = useApi()
  //   const  shop  = useShop()
  //   const cart = useCartLines()
  //   const {analytics} = useApi();
  
  //   const [myStoreId,setMyStoreId] = useState(null)
  
  
  
  
  //   const [variantData,setVariantData] =useState(null)
  //   const [myTotalCost,setMyTotalCost] =useState(0)
  
  //   // useEffect(()=>{
    //   //   async function getVariantData(){
      //   //     const queryResult = await query(`{
        //   //       product(id: "${variantId}"){
//   //           title
//   //           media(first:1){
//   //             edges{
//   //               node{
//   //                 mediaContentType
//   //                 alt
//   //                 ...mediaFieldsByType
//   //               }
//   //             }
//   //           }
//   //           variants(first:1){
//   //             nodes{
//   //               price{
//   //                 amount
//   //               }
//   //             }
//   //           }
//   //       }
//   //     }
      
//   //     fragment mediaFieldsByType on Media {
//   //       ...on ExternalVideo {
//   //         id
//   //         embeddedUrl
//   //       }
//   //       ...on MediaImage {
//   //         image {
//   //           url
//   //         }
//   //       }
//   //       ...on Model3d {
//   //         sources {
//   //           url
//   //           mimeType
//   //           format
//   //           filesize
//   //         }
//   //       }
//   //       ...on Video {
//   //         sources {
//   //           url
//   //           mimeType
//   //           format
//   //           height
//   //           width
//   //         }
//   //       }
//   //     }
//   //     `);
//   //     // console.log(`queryResult`);
//   //     // console.log(queryResult);
//   //   }
//   //   getVariantData()
//   // },[])

  
//   useEffect(()=>{
//     // console.log(cart)
//     let tempCost = 0;
//     if(cart.length> 0){
//       cart.forEach(elem => {
//         const mCost = elem['cost']['totalAmount']['amount']
//         tempCost += mCost;
//       })
//     }
//     // console.log(tempCost)
//     setMyTotalCost(tempCost)
//   },[])


//     // Usage:

//   if(myTotalCost < 1000){
//     return (
//         <BlockStack>
//           <TextBlock appearance='critical' size='small'>You have to buy  product equivalent of 1000 atleast</TextBlock>
//         </BlockStack>
//     );
//   }
//   else{
//     // return (
//     //   <InlineStack>
//     //     <BlockStack>
//     //       <Text size="large">Thanks</Text>
//     //       <Text size="small">Please proceed to checkout</Text>
//     //     </BlockStack>
//     //     <Button onPress={() =>{
//     //       console.log('button was pressed')
//     //     }}>Button</Button>
//     //   </InlineStack>
//     // );
//     return null;
//   }
// }
// function CheckoutExtensionTwo() {
//   const {query} = useApi()
//   const  shop  = useShop()
//   const cart = useCartLines()
//   const {analytics} = useApi();

//   const [myStoreId,setMyStoreId] = useState(null)


  

//   const [variantData,setVariantData] =useState(null)
//   const [myTotalCost,setMyTotalCost] =useState(0)

//   // useEffect(()=>{
//   //   async function getVariantData(){
//   //     const queryResult = await query(`{
//   //       product(id: "${variantId}"){
//   //           title
//   //           media(first:1){
//   //             edges{
//   //               node{
//   //                 mediaContentType
//   //                 alt
//   //                 ...mediaFieldsByType
//   //               }
//   //             }
//   //           }
//   //           variants(first:1){
//   //             nodes{
//   //               price{
//   //                 amount
//   //               }
//   //             }
//   //           }
//   //       }
//   //     }
      
//   //     fragment mediaFieldsByType on Media {
//   //       ...on ExternalVideo {
//   //         id
//   //         embeddedUrl
//   //       }
//   //       ...on MediaImage {
//   //         image {
//   //           url
//   //         }
//   //       }
//   //       ...on Model3d {
//   //         sources {
//   //           url
//   //           mimeType
//   //           format
//   //           filesize
//   //         }
//   //       }
//   //       ...on Video {
//   //         sources {
//   //           url
//   //           mimeType
//   //           format
//   //           height
//   //           width
//   //         }
//   //       }
//   //     }
//   //     `);
//   //     // console.log(`queryResult`);
//   //     // console.log(queryResult);
//   //   }
//   //   getVariantData()
//   // },[])

  
//   useEffect(()=>{
//     // console.log(cart)
//     let tempCost = 0;
//     if(cart.length> 0){
//       cart.forEach(elem => {
//         const mCost = elem['cost']['totalAmount']['amount']
//         tempCost += mCost;
//       })
//     }
//     // console.log(tempCost)
//     setMyTotalCost(tempCost)
//   },[])


//     // Usage:

//   if(myTotalCost < 1000){
//     return (
//         <BlockStack>
//           <TextBlock appearance='critical' size='small'>You have to buy  product equivalent of 10000 atleast from two</TextBlock>
//         </BlockStack>
//     );
//   }
//   else{
//     // return (
//     //   <InlineStack>
//     //     <BlockStack>
//     //       <Text size="large">Thanks</Text>
//     //       <Text size="small">Please proceed to checkout</Text>
//     //     </BlockStack>
//     //     <Button onPress={() =>{
//     //       console.log('button was pressed')
//     //     }}>Button</Button>
//     //   </InlineStack>
//     // );
//     return null;
//   }
// }