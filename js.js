// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5aW8p5vV4imruCUxQBc-ogFD1n4oohSs",
  authDomain: "skelbimai-2682e.firebaseapp.com",
  databaseURL: "https://skelbimai-2682e-default-rtdb.firebaseio.com",
  projectId: "skelbimai-2682e",
  storageBucket: "skelbimai-2682e.appspot.com",
  messagingSenderId: "796526814863",
  appId: "1:796526814863:web:557bb1b59574c20c0632fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  get,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const db = getDatabase();

let enterID = document.getElementById("enterID");
let enterName = document.getElementById("enterName");
let enterQuantity = document.getElementById("enterQuantity");
let enterPrice = document.getElementById("enterPrice");
let enterDesc = document.getElementById("enterDesc");
let insertImg = document.getElementById("insertImg");

let findID = document.getElementById("findID");
let findData = document.getElementById("findData");

let insertBtn = document.getElementById("insert");
let updateBtn = document.getElementById("update");
let removeBtn = document.getElementById("remove");
let findBtn = document.getElementById("find");

const insert = (e) => {
  e.preventDefault();
  console.log(enterID.value, enterName.value, enterQuantity.value);
  if (enterID.value.length < 3) {
    alert("Product Code laukelyje turi buti bent 3 symboliai!");
    return;
  } else if (enterName.value.length < 3) {
    alert("Product Name laukelyje turi buti bent 3 symboliai");
    return;
  } else if (enterQuantity.value.length < 1) {
    alert("Product Quantity laukelis negali buti tuscias");
    return;
  }
  else if (enterPrice.value.length < 1) {
    alert("Product Price laukelis negali buti tuscias");
    return;
  }
  set(ref(db, "Products/" + enterID.value), {
    ID: enterID.value,
    Name: enterName.value,
    Quantity: enterQuantity.value,
    Price: enterPrice.value,
    Description: enterDesc.value,
    Image: insertImg.value
  })
    .then(() => {
      alert("Data added successfully");
    })
    .catch((error) => {
      alert(error);
    });
  document.querySelector(".px-3").reset();
};

insertBtn.addEventListener("click", insert);

const find = (e) => {
  e.preventDefault();
  console.log(`select function ${enterID.value}`);
  const dbref = ref(db);
  if (findID.value.length < 3) {
    alert("Product Code laukelyje turi buti bent 3 symboliai!");
    return;
  }

  get(child(dbref, "Products/" + findID.value))
    .then((snapshot) => {
      if (snapshot.exists()) {
        let table = document.createElement("table");
        let tableRow = document.createElement("tr");
        let tableData = document.createElement("td");
        tableData.classList.add("list-group-item", "list-group-item-secondary");
        tableData.textContent = `Product Name:  ${snapshot.val().Name} , 
        Quantity:  ${snapshot.val().Quantity} , Price: ${snapshot.val().Price} , 
        Description: ${snapshot.val().Description},
        Image: ${snapshot.val().Image}`;
        tableRow.appendChild(tableData);
        table.appendChild(tableRow);
        findData.appendChild(table);
      } else {
        alert("No data found");
      }
    })
    .catch((error) => {
      alert(error);
    });
  document.getElementById("forma").reset();
};

findBtn.addEventListener("click", find);

const updateData = (e) => {
  e.preventDefault();
  if (enterID.value.length < 3) {
    alert("Product Code laukelyje turi buti bent 3 symboliai!");
    return;
  }
  console.log(`update function ${enterID.value}
    ${enterName.value} ${enterQuantity.value}`);
  update(ref(db, "Products/" + enterID.value), {
    Name: enterName.value,
    Quantity: enterQuantity.value,
    Price: enterPrice.value,
    Description: enterDesc.value,
    Image: insertImg.value
  })
    .then(() => {
      alert("Data updated successfully");
    })
    .catch((error) => {
      alert(error);
    });
  document.querySelector(".px-3").reset();
};

updateBtn.addEventListener("click", updateData);

const removeData = (e) => {
    e.preventDefault();
    const dbref = ref(db);
    if (enterID.value.length < 3) {
      alert("Product Code laukelyje turi buti bent 3 symboliai!");
      return;
    }
    get(child(dbref, "Products/" + enterID.value))
      .then((snapshot) => {
        if (snapshot.val() && parseInt(enterID.value) == snapshot.val().ID) {
          remove(ref(db, "Products/" + enterID.value))
            .then(() => {
              alert("Data deleted successfully");
              document.querySelector(".px-3").reset();
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          alert("Data not found");
          document.querySelector(".px-3").reset();
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  removeBtn.addEventListener("click", removeData);

// const removeData = (e) => {
//   e.preventDefault();
//   const dbref = ref(db);
//   get(child(dbref, `Products/${enterID.value}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         remove(ref(db, "Products/" + enterID.value))
//           .then(() => {
//             alert("Data deleted successfully");
//           })
//           .catch((error) => {
//             alert(error);
//           });
//       } else {
//         console.log("No data available");
//         alert('Data not found');
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// removeBtn.addEventListener('click', removeData);
