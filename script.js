
const paiUrl = "https://randomuser.me/api/"
let userList = []

const fetchUser = async (params= "?results=10") => {
   try {
    const response = await fetch(paiUrl + params)
    const data = await response.json()
    userList = data.results
    displayUser(data.results)
   } catch (error) {
    console.log(error)
   }
    // fetch(paiUrl)
    // .then((response)=>{
    //     return response.json()
    // })
    // .then((data)=>{

    // })
    // .catch((error)=> {
    //     //handle the error
    // })
}

fetchUser()
const displayElem = document.getElementById('list')
const countElem = document.getElementById('count')
const displayUser=(user)=>{

    let str = "";
    user.map((item, i) =>{
        str += `
    <div class="card" style="width: 18rem;">
    <img src="${item?.picture?.large}" class="card-img-top" alt="...">
    <div class="card-body" >
      <h5 class="card-title">${item?.name?.title} ${item?.name?.first} ${item?.name?.last}</h5>

      <div class="card-text">
      <div><i class="fa-solid fa-phone"></i> ${item?.cell}</div>
      <div><i class="fa-solid fa-envelope"></i> ${item?.email}</div>
      <div><i class="fa-solid fa-map-pin"></i>   ${item?.location?.street?.number} ${item?.location?.street?.name} ${item?.location?.city} ${item?.location?.state} ${item?.location?.country} ${item?.location?.postcode}</div>
      </div>
    </div>
  </div>`
    })

    displayElem.innerHTML = str;
    countElem.textContent = user.length
}

// chane gender dynamically 
document.getElementById('select').addEventListener("change", (e)=>{
    const {value} = e.target

   let path ="?results=10&gender="+ value
    fetchUser(path)
})

document.getElementById('search-input').addEventListener("keyup", (e)=>{
    const {value} = e.target;
    
    let filteredUsers = userList.filter((item) =>{
        const fullName = (item.name.first + " "+ item.name.last).toLowerCase();

        return fullName.includes(value.toLowerCase())
    })
    displayUser(filteredUsers)
})
