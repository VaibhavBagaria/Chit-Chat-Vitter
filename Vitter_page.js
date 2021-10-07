//YOUR FIREBASE LINKS


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



User_Name = localStorage.getItem("User-Name");
Room_Name = localStorage.getItem("Room_Name");

function Send() {
      msg = document.getElementById("Chatting_Input").value;
      firebase.database().ref(Room_Name).push({
            name: User_Name,
            message: msg,
            like: 0
      });
      document.getElementById("Chatting_Input").value = "";

}

function Logout() {
      localStorage.removeItem("Room_Name")
      localStorage.removeItem("User-Name")
      window.location = "Vitter_room.html";
}

function getData() {
      firebase.database().ref("/" + Room_Name).on('value', function (snapshot) {
            document.getElementById("Output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;

                        console.log(firebase_message_id);
                        console.log(message_data)
                        like = message_data['like']
                        message = message_data['message']
                        userName = message_data['name']
                        name_With_Tag = "<h4>" + userName + " <img class='user_tick' src='tick.png'></h4>";
                        message_With_Tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_Button = "<button class='btn btn-primary' id=" + firebase_message_id + " value=" + like + " onclick='Update_Like(this.id)'>"
                        span_With_Tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>"
                        row = name_With_Tag + message_With_Tag + like_Button + span_With_Tag;
                        console.log(row);
                        document.getElementById("Output").innerHTML += row
                  }
            });
      });
}
getData();

function Update_Like(message_id) {
      console.log(message_id);
      button_id = message_id
      likes = document.getElementById(button_id).value
      Update_Likes = Number(likes) + 1
      firebase.database().ref(Room_Name).child(message_id).update({
            like: Update_Likes
      });
}