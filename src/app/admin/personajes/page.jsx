"use client";

import { FaBars } from 'react-icons/fa';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { useEffect, useState } from "react";

export default function PersonajesPage() {
  const [personajes, setPersonajes] = useState({
    info: {},
    results: [],
  });

    

  const getpersonajes = async () => {

    try {
      const response = await fetch("https://rickandmortyapi.com/api/character");
      const data = await response.json();
      setPersonajes(data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getpersonajes();

  }, []);
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              personajes rick and morty!
            </h2>
            <p className="text-muted-foreground">
              Lista de todos los personajes de rick y morty
            </p>
          </div>
        </div>

        {/* {Datatable} */}
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Nombre</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead>Genero</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead>Foto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personajes.results.map((item, id) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{ item.species }</TableCell>
                <TableCell>{ item.gender }</TableCell>
                <TableCell className="text-center">{ item.type === "" ?  'N/A' : item.type  }</TableCell>
                <TableCell><img className="w-16 rounded-full	" src={ item.image } alt={item.name} /></TableCell>
                <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <FaBars />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                    <DropdownMenuSeparator />

                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
