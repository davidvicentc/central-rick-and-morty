"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContexts";
import Image from "next/image";
import SliderComponent from "@/components/SliderComponent";

import { UserAuthForm } from "./user-auth-form";
import { useToast } from "@/components/ui/use-toast";

import "./login.css";

export default function AuthenticationPage() {
  const { toast } = useToast();
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuthContext();

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const tokens = {
      token: "TOKEN_SESSION",
    };
    toast({
      description: "Se ha iniciado sesión correctamente.",
    });
    setTimeout(() => {
      login(tokens);
      setIsLoading(false);
    }, 3000);
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };
  return (
    <>
      <div className="container relative flex h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex  backdrop-opacity-60">
          <div className="absolute inset-0">
            <SliderComponent></SliderComponent>
          </div>
          <div className="relative z-20 flex items-center text-lg font-medium">
            <img
              src="/assets/image/logo.png"
              className="mr-2 h-14 w-14"
              alt=""
            />
            Rick and morty
          </div>
        </div>
        <div className="lg:p-8 flex items-center h-full w-full justify-center">
          <div className="flex flex-col space-y-6 w-[380px]">
            <div className="mx-auto mb-5">
              <img
                src="/assets/image/logo.png"
                className="mr-2 lg:hidden w-[100px] h-[100px]"
                alt=""
              />
            </div>
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Inicia sesión
              </h1>
              <p className="text-sm text-muted-foreground">
                Ingresa tu correo electronico
              </p>
            </div>
            <UserAuthForm
              handleSubmit={handleSubmit}
              onChange={onChange}
              isLoading={isLoading}
              dataLogin={dataLogin}
            />
          </div>
        </div>
      </div>
    </>
  );
}
