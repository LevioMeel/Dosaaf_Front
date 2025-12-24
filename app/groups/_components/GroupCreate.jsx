"use client";
import { Button } from "react-bootstrap";
import { ModalCreateGroup } from "./ModalCreateGroup";
import { ModalCreateCursant } from "./ModalCreateCursant";
import { useState } from "react";

export function GroupCreate({ getGroups }) {
  const [modalGroup, setModalGroup] = useState(false);
  const [modalCursant, setModalCursant] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalGroup(true)}>
        Создать группу
      </Button>
      <Button variant="dark" onClick={() => setModalCursant(true)}>
        Добавить курсанта
      </Button>
      <ModalCreateGroup
        modalShow={modalGroup}
        setModalShow={setModalGroup}
        getGroups={getGroups}
      />
      <ModalCreateCursant
        modalShow={modalCursant}
        setModalShow={setModalCursant}
      />
    </>
  );
}
