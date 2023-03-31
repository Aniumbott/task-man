// Import Modules
import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@mantine/core";
import { Card } from "@mantine/core";
import { Text } from "@mantine/core";
import { BrandGoogle } from "tabler-icons-react";
// Import Components
import base from "../components/firebase";

// Main function
function SignIn() {
  const { auth } = base;

  // Sign-In function
  function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).catch(() => {});
  }

  return (
    <div className="sign-in">
      <div className="sign-in-box">
        <Card shadow="sm" withBorder>
          <Text
            align="justify"
            size="lg"
            color="dimmed"
            className="sign-in-text"
          >
            A quick way to manage your todo list synced thruogh your Google
            account so will be accessible through all your devices
          </Text>

          <Button
            leftIcon={<BrandGoogle />}
            variant="filled"
            onClick={signInWithGoogle}
            fullWidth
            size="lg"
            className="sign-in-button"
          >
            Sign In with Google
          </Button>
        </Card>
      </div>
      <style>
        {`
        .sign-in{
          height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .sign-in-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 25rem;
            transition: all 0.2s ease-in-out;
            overflow: hidden;
            border-radius: 0.5rem;
        }
        .sign-in-box:hover {
            box-shadow: 0px 0px 0px 10px #228be666;
          }
        
        .sign-in-button {
          margin-top: 1rem;
        }
        
        .sign-in-logo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 20rem;
          width: 20rem;
          padding: 1rem 2rem 0rem 2rem;
        }
        
        .sign-in-text{
          padding: 1rem 0rem;
        }

            `}
      </style>
    </div>
  );
}

export default SignIn;
