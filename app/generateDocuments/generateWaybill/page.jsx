"use client";
import { useState, useEffect } from "react";
import { Title } from "@/app/_components/titles/Title";
import "bootstrap/dist/css/bootstrap.min.css";
import { toastMes } from "@/src/lib/toastMes";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./generateWaybill.module.scss";
import Link from "next/link";
import { Table } from "react-bootstrap";
import { GroupService } from "@/src/api/services/group.service";
import { GenerateService } from "@/src/api/services/generate.service";
import { downloadDocument } from "../lib/downloadDocument";

export default function GenerateWaybill({ params }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Доп. данные для документа
  const [numberDocument, setNumberDocument] = useState(null);

  const onSelect = (row, e) => {
    if (e.target.checked) {
      setSelectedGroup(row);
    } else {
      setSelectedGroup(null);
    }
  };

  async function getGroups() {
    GroupService.getGroups()
      .then(setGroups)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  async function getGroupStudents(id) {
    return GroupService.getGroupStudents(id)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  async function generateDocWaybill() {
    try {
      const cadets = await getGroupStudents(selectedGroup.groupStud_id);

      GenerateService.generateWaybill({
        cadets,
        meta: {
          numberDocument: numberDocument,
          group: selectedGroup.groupStud_number,
        },
      })
        .then((blob) => {
          downloadDocument(blob);
          toastMes("Документ сформирован", "success");
        })
        .catch((err) => {
          toastMes(err.message, "error");
        });
    } catch (err) {
      console.error("Ошибка при формировании документа:", err);
    }
  }

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <div>
      <div className={styles.menu}>
        <Title margin="0 0 10px 0" text="Выбрать группу:" />
        <Link href="/generateDocuments">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>
      <div>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Номер путевого листа</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNumberDocument(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className={styles.tableWrapper}>
        <h2 className="text-xl font-semibold mb-2">Группы:</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="p-2 text-left">Выбрать</th>
              <th className="p-2 text-left">Номер группы</th>
              <th className="p-2 text-left">Численность</th>
              <th className="p-2 text-left">Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((row) => (
              <tr
                key={row.groupStud_id}
                className="cursor-pointer hover:bg-gray-100"
              >
                <td className="p-2">
                  <input
                    type="radio"
                    name="selectedGroup" // общая группа для всех radio
                    onChange={(e) => onSelect(row, e)}
                    checked={selectedGroup?.groupStud_id === row.groupStud_id}
                  />
                </td>
                <td className="p-2">{row.groupStud_number}</td>
                <td className="p-2">{row.student_count}</td>
                <td className="p-2">{row.groupStud_dateCreate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Button
        variant="dark"
        onClick={generateDocWaybill}
        disabled={selectedGroup ? false : true}
      >
        Сформировать путевые листы
      </Button>
    </div>
  );
}
