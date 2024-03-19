 export const fetchData=async()=>{
 const data=await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
 return data.json();
}


var data = {
    name:'direndra',
    address:{
         city:'lucknow',
         home:{
            block:'barabanki',
            members:{
                numberOfMember:5
            }
         }
    }
}

// user object distructuring and access the block, numberOfMember, city

const {name,address}=data;
const {city,home}=address;
const {block,members}=home;
console.log(city,block,members);