import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { toastMes } from "@/src/lib/toastMes";
import { GroupService } from "@/src/api/services/group.service";
import { CadetService } from "@/src/api/services/cadet.service";

export function ModalCreateGroup({ modalShow, setModalShow, getGroups }) {
  const [cursants, setCursants] = useState([]);
  const [selected, setSelected] = useState([]);
  const [groupNumber, setGroupNumber] = useState(null);

  function getLooseCadets() {
    CadetService.getLooseCadets()
      .then(setCursants)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  function createGroup({ groupNumber, cadets }) {
    GroupService.createGroup({ groupNumber, cadets })
      .then(() => {
        toastMes("Группа  создана", "success");
        setModalShow(false);
        setGroupNumber(null);
        setSelected([]);
        setCursants([]);
        getGroups();
      })
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  useEffect(() => {
    getLooseCadets();
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
        <Button
          variant="primary"
          onClick={() => createGroup({ groupNumber, cadets: selected })}
        >
          Создать
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
