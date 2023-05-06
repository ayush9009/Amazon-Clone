export const getProducts=()=>async(dispatch)=>{
    try{
        const data=await fetch("http://localhost:8005/getproducts",{
            method:"GET",
            headers:{
                "Content-Type":"application/json"
            }
        });   //ye humne call karliya apni api ko,mention karna pade konse method ko hum use karenge,aur usme kaisa content /ya vo kaisa content hai

        const res=await data.json();  //yaha jo response milega vo json format mai hoga isliye ye likha
        console.log(res);
        dispatch({type:"SUCCESS_GET_PRODUCTS",payload:res})  //ye hum reducer fucntion ko send karenge type aur payload ko send kardege reducer function ko
    }catch(error){
        dispatch({type:"FAIL_GET_PRODUCTS",payload:error.response})
    }
}

//ya module export kar sake lakin vo na karna pade isliye export use kar rai 
// yaha hum apni api ko call karenge
// with a plain basic redux store ,you can only do simple asyncfhrous updates by dispatching an action,middleware extends the store abilities and lets you write asnyc logic that interacts with the store
// Thunks are recommmended middleware for basic redux side effects logic ,including complex synchronous logic that needs
// that needs access to store and simple async logic like AJAX requests

  // "proxy": "http://localhost:8005/",