import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { toastMes } from "@/src/lib/toastMes";

// Пример использования
const people = [
  { name: "Иван", phone: "123" },
  { name: "Мария", phone: "456" },
  { name: "Пётр", phone: "789" },
];

export function ModalCreateGroup({ modalShow, setModalShow, getGroups }) {
  const [cursants, setCursants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupNumber, setGroupNumber] = useState(null);

  const getStudents = async () => {
    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/getStudents`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await Result.json();
      setCursants(data);
      console.log("Ответ сервера:", data);
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  const createGroup = async () => {
    try {
      if (!groupNumber) {
        toastMes("Укажите номер группы", "error");
        return;
      }
      if (!selected || selected.length <= 0) {
        toastMes("Не выбраны курсанты", "error");
        return;
      }

      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/createGroup`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            groupNumber: groupNumber,
            students: selected,
          }),
        }
      );
      const data = await Result.json();
      toastMes("Группа  создана", "success");
      setModalShow(false);
      setGroupNumber(null);
      setSelected([]);
      setCursants([]);
      getGroups();
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  useEffect(() => {
    getStudents();
  }, [modalShow]);

  const handleToggle = (person) => {
    setSelected((prev) =>
      prev.includes(person)
        ? prev.filter((p) => p !== person)
        : [...prev, person]
    );
  };

  const closeModal = () => {
    setGroupNumber(null);
    setSelected([]);
    setCursants([]);
    setModalShow(false);
  };

  return (
    <Modal
      size="lg"
      show={modalShow}
      onHide={closeModal}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Создать группу курсантов</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Form.Group className="mb-3">
            <Form.Label>Номер группы</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setGroupNumber(e.target.value)}
            />
          </Form.Group>
        </Row>
        <div>
          <ListGroup>
            {cursants.map((person, idx) => (
              <ListGroup.Item key={idx}>
                <Form.Check
                  type="checkbox"
                  label={`${person.student_name} — ${person.student_phone}`}
                  checked={selected.includes(person)}
                  onChange={() => handleToggle(person)}
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={createGroup}>
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
