export const fetchData=async()=>{
 const data=await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
 return data.json();
}
