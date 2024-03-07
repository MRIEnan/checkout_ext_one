import {
  useApi,
  reactExtension,
  InlineStack,
  Image,
  Text,
  Button,
  BlockStack,
  useShop,
  useCartLines,

} from '@shopify/ui-extensions-react/checkout';
import { useEffect, useState} from 'react';

export default reactExtension(
  'purchase.checkout.cart-line-list.render-after',
  () => <Extension />,
);

const variantId = "gid://shopify/Product/9070052311319";

function Extension() {
  const {query} = useApi()
  const  shop  = useShop()
  const cart = useCartLines()

  

  const [variantData,setVariantData] =useState(null)
  const [myTotalCost,setMyTotalCost] =useState(0)

  // useEffect(()=>{
  //   async function getVariantData(){
  //     const queryResult = await query(`{
  //       product(id: "${variantId}"){
  //           title
  //           media(first:1){
  //             edges{
  //               node{
  //                 mediaContentType
  //                 alt
  //                 ...mediaFieldsByType
  //               }
  //             }
  //           }
  //           variants(first:1){
  //             nodes{
  //               price{
  //                 amount
  //               }
  //             }
  //           }
  //       }
  //     }
      
  //     fragment mediaFieldsByType on Media {
  //       ...on ExternalVideo {
  //         id
  //         embeddedUrl
  //       }
  //       ...on MediaImage {
  //         image {
  //           url
  //         }
  //       }
  //       ...on Model3d {
  //         sources {
  //           url
  //           mimeType
  //           format
  //           filesize
  //         }
  //       }
  //       ...on Video {
  //         sources {
  //           url
  //           mimeType
  //           format
  //           height
  //           width
  //         }
  //       }
  //     }
  //     `);
  //     // console.log(`queryResult`);
  //     // console.log(queryResult);
  //   }
  //   getVariantData()
  // },[])
  
  useEffect(()=>{
    // console.log(cart)
    let tempCost = 0;
    if(cart.length> 0){
      cart.forEach(elem => {
        const mCost = elem['cost']['totalAmount']['amount']
        tempCost += mCost;
      })
    }
    // console.log(tempCost)
    setMyTotalCost(tempCost)
  },[])

  

  if(myTotalCost < 1000){
    return (
        <BlockStack>
          <Text size='small'>You have to buy  product equivalent of 1000 atleast</Text>
        </BlockStack>
    );
  }
  else{
    // return (
    //   <InlineStack>
    //     <BlockStack>
    //       <Text size="large">Thanks</Text>
    //       <Text size="small">Please proceed to checkout</Text>
    //     </BlockStack>
    //     <Button onPress={() =>{
    //       console.log('button was pressed')
    //     }}>Button</Button>
    //   </InlineStack>
    // );
    return null;
  }
}