name1 = localStorage.getItem("User-Name");
document.getElementById("userName").innerHTML = "Welcome " + name1;

// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyDF0_Hy93Bu5iAWiAayWlVGGHox85983g4",
      authDomain: "vitter-173a6.firebaseapp.com",
      databaseURL: "https://vitter-173a6-default-rtdb.firebaseio.com",
      projectId: "vitter-173a6",
      storageBucket: "vitter-173a6.appspot.com",
      messagingSenderId: "12339365426",
      appId: "1:12339365426:web:c49fc40b812f1f21f3de2b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);


function Add_Room() {
      room_name = document.getElementById("roomName").value;

      firebase.database().ref("/").child(room_name).update({
            purpose: "adding_Room_Name"
      });
      localStorage.setItem("Room_Name", room_name)
      console.log(room_name);
      window.location = "Vitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("Output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room_Name " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirect_To_Room_Name(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("Output").innerHTML += row;
                  console.log(row);
            });
      });
}
getData();

function redirect_To_Room_Name(name) {
      localStorage.setItem("Room_Name", name)
      window.location = "Vitter_page.html";
}

function Logout() {
      localStorage.removeItem("Room_Name")
      localStorage.removeItem("User-Name")
      window.location = "index.html";
}