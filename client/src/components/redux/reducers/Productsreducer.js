const products=[]
export const getProductsreducer=(state={products},action)=>{
    switch(action.type){
        case "SUCCESS_GET_PRODUCTS":
            return {products:action.payload}
        case "FAIL_GET_PRODUCTS":
            return {products:action.payload}
        default:return state
    }
}

// hum proxy ka use karenge jo frontend ko backend se communicate karne mai madath karengi
// here state indicates the current state
// ab deko kya hora ab jis bhi componet ko data chaiye uske liye hum call karenge getproducts vale function ko call krenge ,isme hume data milega aur hum success type kare agr mil ja