import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { especies, generos } from "@/utils/constants";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ModalFormPersonaje({
  titulo,
  descripcion,
  item,
  handleSubmit,
  action = "edit",
}) {
  const [personaje, setPersonaje] = useState({
    ...item,
  });

  const onChangeSelect = (value, name) => {
    setPersonaje({ ...personaje, [name]: value });
  };
  const [showModal, setShowModal] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPersonaje({ ...personaje, [name]: value });
  };
  return (
    <Dialog open={showModal}>
      {action == "edit" ? (
        <DialogTrigger>
          <FaPencilAlt onClick={() => setShowModal(true)} />
        </DialogTrigger>
      ) : (
        <div className="flex ">
          <Button className="sm:w-auto w-full" onClick={() => setShowModal(true)}>Crear nuevo personaje</Button>
        </div>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{titulo} </DialogTitle>
          <DialogDescription>{descripcion}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-2">
          <Input
            name="name"
            value={personaje.name}
            placeholder="Nombre del personaje"
            type="text"
            onChange={onChange}
          />

          <Input
            name="type"
            value={personaje.type}
            placeholder="Tipo"
            type="text"
            onChange={onChange}
          />
        </div>

        <div className="flex gap-3">
          <Select
            onValueChange={(value) => onChangeSelect(value, "gender")}
            value={personaje.gender}
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
            value={personaje.species}
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
        <DialogFooter>
          <Button
            variant="warning"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={() => {
              handleSubmit(personaje);
              setShowModal(false);
            }}
          >
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
