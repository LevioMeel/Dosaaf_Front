"use client";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { Title } from "@/app/_components/titles/Title";
import { toastMes } from "@/src/lib/toastMes";

export function ModalCreateCursant({ modalShow, setModalShow }) {
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

  const handleSubmit = () => {
    console.log("students", students);

    if (!students || students.length <= 0) {
      toastMes("Курсанты не указаны", "error");
      return;
    }
    const hasEmpty = students.some((st) => !st.name || !st.phone);
    if (hasEmpty) {
      toastMes("Не указаны данные всех курсантов", "error");
      return;
    }

    fetch(`${process.env.NEXT_PUBLIC_FETCH_URL}/api/createStudent`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(students),
    });
    toastMes("Курсанты созданы", "success");
    setModalShow(false);
    setStudents([]);
  };

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
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={thStyle}>ФИО</th>
                <th style={thStyle}>Телефон</th>
                <th style={thStyle}></th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student, idx) => (
                  <tr key={idx}>
                    <td style={tdStyle}>
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
                    <td style={tdStyle}>
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
                    <td style={tdStyle}>
                      <button onClick={() => removeStudent(idx)}>
                        Удалить
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div style={{ marginTop: "10px" }}>
            <button onClick={addStudent}>Добавить студента</button>
            <button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
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

const thStyle = {
  border: "1px solid #333",
  padding: "8px",
  textAlign: "left",
  background: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #333",
  padding: "8px",
  textAlign: "left",
};
