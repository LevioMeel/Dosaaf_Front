"use client";
import { Button } from "react-bootstrap";
import { ModalCreateCadet } from "./ModalCreateCadet";
import { useState } from "react";

export function CadetCreate({ getAllCadets }) {
  const [modalCursant, setModalCursant] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalCursant(true)}>
        Добавить курсанта
      </Button>
      <ModalCreateCadet
        modalShow={modalCursant}
        setModalShow={setModalCursant}
        getAllCadets={getAllCadets}
      />
    </>
  );
}
