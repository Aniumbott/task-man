// Import Modules
import React, { useEffect } from "react";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { useState } from "react";
import { Timestamp } from "@firebase/firestore";

// Import Components
import base from "../components/firebase";
import Home from "./Home";
// Main function
function SetUser() {
  const { auth, db } = base;
  // User State
  const currentUser =
    auth.currentUser != null
      ? auth.currentUser
      : {
          email: "",
          uid: "",
          todoList: [],
        };
  const [user, setUser] = useState({
    gmail: currentUser.email,
    id: currentUser.uid,
    todoList: [
      {
        title: "New Todo",
        description: "remaining",
        due: Timestamp.fromDate(new Date()),
        timestamp: Timestamp.fromDate(new Date()),
        status: false,
      },
    ],
  });

  // Get from DB
  useEffect(() => {
    const getdoc = async () => {
      const usr = await getDoc(doc(db, "users", currentUser.uid));
      if (usr.exists()) {
        setUser({
          gmail: usr.data().gmail,
          id: usr.data().id,
          todoList: usr.data().todoList,
        });
        // console.log(user);
      } else {
        const addUser = async () => {
          const newUser = await setDoc(doc(db, "users", user.id), user);
        };
        addUser();
        // console.log("user added");
      }
    };
    getdoc();
  }, []);

  return (
    <div>
      <Home user={user} setUser={setUser} />
    </div>
  );
}

export default SetUser;
