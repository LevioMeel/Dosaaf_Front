"use client";
import { Button } from "react-bootstrap";
import { ModalCreateGroup } from "./ModalCreateGroup";
import { useState } from "react";

export function GroupCreate({ getGroups }) {
  const [modalGroup, setModalGroup] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalGroup(true)}>
        Создать группу
      </Button>
      <ModalCreateGroup
        modalShow={modalGroup}
        setModalShow={setModalGroup}
        getGroups={getGroups}
      />
    </>
  );
}
