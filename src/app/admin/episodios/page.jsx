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

export default function EpisodiosPage() {
  const [episodios, setEpisodios] = useState({
    info: {},
    results: [],
  });

  const getEpisodios = async () => {
    try {
      const response = await fetch("https://rickandmortyapi.com/api/episode");
      const data = await response.json();
      setEpisodios(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getEpisodios();
  }, []);
  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Episodios rick and morty!
            </h2>
            <p className="text-muted-foreground">
              Lista de todos los episodios de rick y morty
            </p>
          </div>
        </div>

        {/* {Datatable} */}
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Episodio</TableHead>
              <TableHead>Nombre de episodio</TableHead>
              <TableHead>Fecha de lanzamiento</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodios.results.map((item) => (
              <TableRow>
                <TableCell className="font-medium">{item.episode}</TableCell>
                <TableCell>{ item.name }</TableCell>
                <TableCell>{ item.air_date }</TableCell>
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
