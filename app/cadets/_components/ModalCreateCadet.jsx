"use client";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { Title } from "@/app/_components/titles/Title";
import { toastMes } from "@/src/lib/toastMes";
import { Table } from "react-bootstrap";
import { CadetService } from "@/src/api/services/cadet.service";

export function ModalCreateCadet({ modalShow, setModalShow, getAllCadets }) {
  const [students, setStudents] = useState([]);

  const handleChange = (index, field, value) => {
    const updated = [...students];
    updated[index][field] = value;
    setStudents(updated);
  };

  const addStudent = () => {
    setStudents([...students, { name: "", phone: "" }]);
  };

  const removeStudent = (index) => {
    const updated = [...students];
    updated.splice(index, 1);
    setStudents(updated);
  };

  function createCadet(students) {
    CadetService.createCadet(students)
      .then(() => {
        toastMes("Курсанты созданы", "success");
        setModalShow(false);
        setStudents([]);
        if (getAllCadets) {
          getAllCadets();
        }
      })
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  return (
    <Modal
      size="lg"
      show={modalShow}
      onHide={() => setModalShow(false)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить курсанта</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ padding: "20px" }}>
          <Title margin={" 0 0 5px 0"} text="Курсанты:" />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Телефон</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student, idx) => (
                  <tr key={idx}>
                    <td>
                      <input
                        type="text"
                        value={student.name}
                        onChange={(e) =>
                          handleChange(idx, "name", e.target.value)
                        }
                        placeholder=""
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={student.phone}
                        onChange={(e) =>
                          handleChange(idx, "phone", e.target.value)
                        }
                        placeholder=""
                        style={{ width: "100%" }}
                      />
                    </td>
                    <td>
                      <button onClick={() => removeStudent(idx)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div style={{ marginTop: "10px" }}>
            <button onClick={addStudent}>Добавить студента</button>
            <button
              onClick={() => createCadet(students)}
              style={{ marginLeft: "10px" }}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
