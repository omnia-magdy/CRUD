const title=document.getElementById("title");
const price=document.getElementById("price");
const taxes=document.getElementById("taxes");
const ads=document.getElementById("ads");
const discount=document.getElementById("discount");
const total=document.getElementById("total");
const count=document.getElementById("count");
const category=document.getElementById("category");
const submit=document.getElementById("submit");
const search=document.getElementById("search");

let mood="create";
let moodSearch="title";
let temp;

let products;
if(localStorage.storageaParoducts!=null)
    {
        products=JSON.parse(localStorage.storageaParoducts);
    }
else{
        products=[];
    }



// 1- create data
function getTotal()
{
    if(price.value!="" ){
        let result=(+price.value +  +taxes.value +  +ads.value) -  +discount.value;
        total.innerText=result;
        total.style.backgroundColor="green";}
    else{
        total.innerText=" ";
        total.style.backgroundColor="brown";
    }
}

submit.onclick=()=>{
    if(title.value!="" && category.value!=""){
        let dataProduct={
            title:title.value.toLowerCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerText,
            count:count.value,
            category:category.value.toLowerCase(),
            
        }
        // count
        if(mood==="create")
        {
            
            if(dataProduct.count>1)
            {
                for(let i=0;i<dataProduct.count;i++)
                {
                    products.push(dataProduct);
                    console.log(products);
                }
            }
            else
            {
                products.push(dataProduct);
            } 
        }
        else
        {
            products[temp]=dataProduct;
            submit.innerHTML="create";
            count.style.display="block";
        }   
        localStorage.setItem("storageaParoducts",JSON.stringify(products));
        clearData();
        readData();
        getTotal();
    }
}
//clear data
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerText="";
    count.value="";
    category.value="";
    search.value="";
}

//2-Read data
function readData()
{
    let tableData=" ";
    for(let i=0 ; i< products.length ; i++){
        
            tableData += `
            <tr> 
                <td>${i}</td>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].taxes}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].count}</td>
                <td>${products[i].category}</td>
                <td><button onclick="updateElement(${i})">ubdate</button></td>
                <td><button onclick="deleteElement(${i})">delete</button></td>
            </tr>
        `;    
    }
    //create the btn delete all
    let btnDelete=document.getElementById("deleteAll");
    btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All  (${products.length})</button>`; 


    if(products.length>0)
    {
        btnDelete.innerHTML=`<button onclick="deleteAll()">Delete All  (${products.length})</button>`;  
    }
    else
    {
        document.getElementById("deleteAll").innerHTML=' '; 
    }
    document.getElementById("tbody").innerHTML=tableData;
}



//3-delete
function deleteElement(i)
{
    products.splice(i,1);
    localStorage.storageaParoducts=JSON.stringify(products);//تحديث ال local
    readData();
}
function deleteAll()
{
    localStorage.clear();
    products.splice(0);
    readData();
    
}

//4-update
function updateElement(i)
{
    title.value=products[i].title;
    price.value=products[i].price;
    taxes.value=products[i].taxes;
    ads.value=products[i].ads;
    discount.value=products[i].discount;
    category.value=products[i].category;
    getTotal();
    mood="update";
    temp=i;
    submit.innerHTML="update";
    count.style.display="none";
    scroll(top) ;
}


//5-search
function getSearchMood(id){
    readData();
    if(id==="titleSearch"){
        moodSearch="title";
    }else{
        moodSearch="category";
    }
    search.placeholder="search by "+ moodSearch;
    search.focus();
}

function searchData(){
    let table=" ";
    if(moodSearch==="title"){
        for(let i=0;i<products.length;i++){
        if(products[i].title.includes(search.value.toLowerCase()))
            {
                    table += `
                    <tr> 
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].count}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateElement(${i})">ubdate</button></td>
                        <td><button onclick="deleteElement(${i})">delete</button></td>
                    </tr>
                `;
        }
        else{
            document.getElementById("tbody").innerHTML="table";
        }
        }
}
else if(moodSearch==="category")
{
    for(let i=0;i<products.length;i++)
        {
            if(products[i].category.includes(search.value.toLowerCase()))
                {
                    table += `
                    <tr> 
                        <td>${i}</td>
                        <td>${products[i].title}</td>
                        <td>${products[i].price}</td>
                        <td>${products[i].taxes}</td>
                        <td>${products[i].ads}</td>
                        <td>${products[i].discount}</td>
                        <td>${products[i].total}</td>
                        <td>${products[i].count}</td>
                        <td>${products[i].category}</td>
                        <td><button onclick="updateElement(${i})">ubdate</button></td>
                        <td><button onclick="deleteElement(${i})">delete</button></td>
                    </tr>
                `;
                }
                else{
                    document.getElementById("tbody").innerHTML="table";
                }
        }
}
document.getElementById("tbody").innerHTML=table;
}









