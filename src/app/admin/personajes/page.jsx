"use client";

import { FaTimes } from "react-icons/fa";
import { getLocalStorage, saveLocalStorage } from "@/utils/storage";
import ModalFormPersonaje from "@/components/personajes/ModalFormPersonaje";
import { especies, generos } from "@/utils/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function PersonajesPage() {
  const API_URL = "https://rickandmortyapi.com/api/character";

  const initialDataParams = {
    name: "",
    species: "",
    gender: "",
    type: "",
  };
  const [params, setParams] = useState(initialDataParams);

  const [personajes, setPersonajes] = useState({
    info: {},
    results: [],
  });

  const onChangeSelect = (value, name) => {
    setParams({ ...params, [name]: value });
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setParams({ ...params, [name]: value });
  };

  const getItemsForTable = (data, filtros) => {
    const itemsLocales = getLocalStorage("personajes");
    const idsEditados = itemsLocales.map((item) => item.id);
    const newItemsLocalesFiltrados = itemsLocales.filter(
      ({ name, species, gender, type }) =>
        (!filtros.name || name === filtros.name) &&
        (!filtros.species || species === filtros.species) &&
        (!filtros.gender || gender === filtros.gender) &&
        (!filtros.type || type === filtros.type)
    );

    const newData =
      data?.results?.filter((item) => !idsEditados.includes(item.id)) ?? [];
    return {
      ...data,
      results: newData
        .concat(newItemsLocalesFiltrados)
        .sort((a, b) => a.id - b.id),
    };
  };

  const getPersonajes = async (filtros = {}, urlPage = null) => {
    try {
      const query =
        Object.keys(filtros).length > 0
          ? "?" + new URLSearchParams(filtros).toString()
          : "";

      const URL = urlPage ?? `${API_URL}${query}`;
      const page = urlPage?.split("=")?.[1];
      const response = await fetch(URL);
      const data = await response.json();

      setPersonajes(
        page == 1 || !urlPage ? getItemsForTable(data, filtros) : data
      );
      
    } catch (error) {
      setPersonajes(getItemsForTable([], filtros));
      console.error(error);
    }
  };

  const handleSubmit = (personaje) => {
    const itemsLocales = getLocalStorage("personajes");

    saveLocalStorage("personajes", [
      ...itemsLocales.filter((item) => item.id != personaje.id),
      personaje,
    ]);

    getPersonajes();
  };

  const clearParams = () => {
    setParams(initialDataParams);
    getPersonajes({});
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      getPersonajes(params);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [params]);

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              Personajes rick and morty!
            </h2>
            <p className="text-muted-foreground">
              Lista de todos los personajes de rick y morty
            </p>
          </div>
        </div>

        <ModalFormPersonaje
          titulo="Crear personaje"
          descripcion="Agrega tu propio personaje a esta historia"
          action='new'
          item={{
            id: crypto.randomUUID(),
            name: "",
            species: "",
            gender: "",
            type: "",
          }}
          handleSubmit={handleSubmit}
        />

        <div className="flex items-center justify-between space-y-2">
          <div className="flex gap-3 lg:flex-row flex-col w-full">
            <Input
              name="name"
              value={params.name}
              placeholder="Nombre del personaje"
              type="text"
              onChange={onChange}
            />
            <Input
              name="type"
              value={params.type}
              placeholder="Tipo"
              type="text"
              onChange={onChange}
            />
            <div className="flex gap-3">
              <Select
                onValueChange={(value) => onChangeSelect(value, "gender")}
                value={params.gender}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Genero" />
                </SelectTrigger>
                <SelectContent>
                  {generos.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => onChangeSelect(value, "species")}
                value={params.species}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Genero" />
                </SelectTrigger>
                <SelectContent>
                  {especies.map((item) => (
                    <SelectItem value={item.value} key={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {Object.values(params).filter((item) => item != "").length > 0 && (
              <Button onClick={() => clearParams()} variant="outline">
                <FaTimes />
              </Button>
            )}

            <Button onClick={() => getPersonajes(params)}>Buscar</Button>
          </div>
        </div>

        {/* {Datatable} */}
        <Table>
          {!personajes?.results && (
            <TableCaption>No hay datos disponibles para mostrar</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead>Foto</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-center">Tipo</TableHead>
              <TableHead>Genero</TableHead>
              <TableHead>Especie</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personajes?.results?.map((item, id) => (
              <TableRow key={item.id}>
                <TableCell className="p-0 py-2">
                  <img
                    className="w-16 rounded-full	"
                    src={
                      item.image ??
                      "https://rickandmortyapi.com/api/character/avatar/19.jpeg"
                    }
                    alt={item.name}
                  />
                </TableCell>

                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-center">
                  {item.type === "" ? "N/A" : item.type}
                </TableCell>
                <TableCell>{item.gender}</TableCell>
                <TableCell>{item.species}</TableCell>

                <TableCell className="text-right">
                  <ModalFormPersonaje
                    titulo="Editar personaje"
                    descripcion={item.name}
                    item={item}
                    handleSubmit={handleSubmit}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex gap-6 justify-end">
          {personajes?.info?.prev && (
            <Button onClick={() => getPersonajes({}, personajes?.info.prev)}>
              Prev
            </Button>
          )}

          {personajes?.info?.next && (
            <Button onClick={() => getPersonajes({}, personajes?.info.next)}>
              Next
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
