// "use client";
// import React, { FormEvent } from "react";
// import { useRouter } from "next/navigation";
// import { useAuthContext } from "@/contexts/authContexts";

// function Page() {
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const router = useRouter();
//   const { login } = useAuthContext();

//   const handleSubmit = async (event: FormEvent) => {
//     event.preventDefault();

    

//     const tokens = {
//         token: "TOKEN_SESSION"
//     };
//     login(tokens);

//     return router.push("/admin");
//   };
//   return (
//     <div className="wrapper">
//       <div className="form-wrapper">
//         <h1 className="mt-60 mb-30">Sign in</h1>
//         <form onSubmit={handleSubmit} className="form">
//           <label htmlFor="email">
//             <p>Email</p>
//             <input
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               type="email"
//               name="email"
//               id="email"
//               placeholder="example@mail.com"
//             />
//           </label>
//           <label htmlFor="password">
//             <p>Password</p>
//             <input
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               type="password"
//               name="password"
//               id="password"
//               placeholder="password"
//             />
//           </label>
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Page;
"use client";
import { useState} from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContexts";
import Image from "next/image"
import SliderComponent from '@/components/SliderComponent'

import { UserAuthForm } from "./user-auth-form"

import './login.css'


export default function AuthenticationPage() {
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter();
  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tokens = {
        token: "TOKEN_SESSION"
    };
    login(tokens);

  };
  const onChange = (e) => {
    const { name, value } = e.target
    setDataLogin({...dataLogin, [name]:value})
  }
  return (
    <>
      <div className="container relative flex h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 px-0">
        
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex  backdrop-opacity-60">
          <div className="absolute inset-0">
            <SliderComponent></SliderComponent>
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
                          
            <img src="/assets/image/logo.png" className="mr-2 h-14 w-14" alt="" />
            Rick and morty
          </div>
          
        </div>
        <div className="lg:p-8 flex items-center h-full w-full justify-center">
          <div className="flex flex-col space-y-6 w-[380px]">
            <div className="mx-auto mb-5">
              <img src="/assets/image/logo.png" className="mr-2 lg:hidden w-[100px] h-[100px]" alt="" />
            </div>
            <div className="flex flex-col space-y-2 text-center">

              <h1 className="text-2xl font-semibold tracking-tight">
                Inicia sesión
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresa tu correo electronico
              </p>
            </div>
            <UserAuthForm handleSubmit={handleSubmit} onChange={onChange} isLoading={isLoading} dataLogin={dataLogin} />
          </div>
        </div>
      </div>
    </>
  )
}
