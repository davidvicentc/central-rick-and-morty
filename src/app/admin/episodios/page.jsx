"use client";

import { FaBars } from "react-icons/fa";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";

export default function EpisodiosPage() {
  const API_URL = "https://rickandmortyapi.com/api/episode/";

  const initialDataParams = {
    name: "",
    episode: "",
  };
  const [params, setParams] = useState(initialDataParams);

  const [episodios, setEpisodios] = useState({
    info: {},
    results: [],
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const getEpisodios = async (filtros = {}) => {
    const query =
      Object.keys(filtros).length > 0
        ? "?" + new URLSearchParams(filtros).toString()
        : "";

    try {
      const response = await fetch(`${API_URL}${query}`);
      const data = await response.json();
      setEpisodios(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getEpisodios(params);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [params]);

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
        <div className="flex items-center justify-between space-y-2">
          <div className="flex gap-3">
            <Input
              name="name"
              value={params.name}
              placeholder="Nombre del episodio"
              type="text"
              onChange={onChange}
            />
            <Input
              name="episode"
              value={params.episode}
              placeholder="Episodio"
              type="text"
              onChange={onChange}
            />
            <Button onClick={() => getEpisodios(params)}>Buscar</Button>
          </div>
        </div>

        {/* {Datatable} */}
        <Table>
          {!episodios.results && (
            <TableCaption>No hay datos disponibles para mostrar</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Episodio</TableHead>
              <TableHead>Nombre de episodio</TableHead>
              <TableHead>Fecha de lanzamiento</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodios.results?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.episode}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.air_date}</TableCell>
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

        <div className="flex gap-6 justify-end">
          {episodios.info?.prev && (
            <Button onClick={() => getEpisodios({}, episodios.info.prev)}>
              Prev
            </Button>
          )}

          {episodios.info?.next && (
            <Button onClick={() => getEpisodios({}, episodios.info.next)}>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
