import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { toastMes } from "@/src/lib/toastMes";
import { GroupService } from "@/src/api/services/group.service";
import { CadetService } from "@/src/api/services/cadet.service";

export function ModalCadetAddFix({
  modalShow,
  setModalShow,
  groupData,
  getGroupStudents,
}) {
  const [cursants, setCursants] = useState([]);
  const [selected, setSelected] = useState([]);

  function getLooseCadets() {
    CadetService.getLooseCadets()
      .then(setCursants)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  function fixCadetToGroup({ groupData, cadets }) {
    GroupService.fixCadetToGroup({ groupData, cadets })
      .then(() => {
        toastMes("Курсанты закреплены за группой", "success");
        getGroupStudents(groupData.groupStud_id);
        setModalShow(false);
        setSelected([]);
        setCursants([]);
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
        <Modal.Title>Закрепить курсантов за группой</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
        {cursants.length <= 0 ? "Нет свободных курсантов" : ""}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Закрыть
        </Button>
        <Button
          variant="primary"
          onClick={() => fixCadetToGroup({ groupData, cadets: selected })}
        >
          Закрепить выбранных курсантов за текущей группой
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
