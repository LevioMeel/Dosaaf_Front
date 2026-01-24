"use client";
import { Button } from "react-bootstrap";
import { ModalCadetAddFix } from "./ModalCadetAddFix";
import { useState } from "react";

export function CadetAddFix({ groupData, getGroupStudents }) {
  const [modalCursant, setModalCursant] = useState(false);

  return (
    <>
      <Button variant="dark" onClick={() => setModalCursant(true)}>
        Закрепить курсантов
      </Button>
      <ModalCadetAddFix
        modalShow={modalCursant}
        setModalShow={setModalCursant}
        groupData={groupData}
        getGroupStudents={getGroupStudents}
      />
    </>
  );
}
