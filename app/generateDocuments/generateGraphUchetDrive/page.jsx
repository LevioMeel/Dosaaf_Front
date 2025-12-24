"use client";
import { useState, useEffect } from "react";
import { Title } from "@/app/_components/titles/Title";
import "bootstrap/dist/css/bootstrap.min.css";
import { toastMes } from "@/src/lib/toastMes";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import styles from "./generateGraphUchetDrive.module.scss";
import Link from "next/link";

export default function GenerateWaybill({ params }) {
  const [groups, setGroups] = useState([]);
  const [selectedGruup, setSelectedGruup] = useState(null);
  const [groupStudents, setGroupStudents] = useState(null);

  // Доп. данные для документа
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [driver, serDriver] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [driveCategory, setDriveCategory] = useState(null);

  const getGroups = async () => {
    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/getGroups`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await Result.json();
      setGroups(data);
      console.log("Ответ сервера:", data);
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

  const onSelect = (row, e) => {
    if (e.target.checked) {
      setSelectedGruup(row);
    } else {
      setSelectedGruup(null);
    }
  };

  const getGroupStudents = async (groupID) => {
    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/getGroupStudents/?id=${groupID}`,
        { credentials: "include" }
      );
      const data = await Result.json();
      setGroupStudents(data);
      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const generateDoc = async () => {
    try {
      const students = await getGroupStudents(selectedGruup.groupStud_id);
      console.log("students: ", students);

      const studentsForDoc = students.map((el, index) => {
        return {
          id: index,
          fioCursant: el.student_name,
          fioMaster: "Хайдаров Денис",
        };
      });

      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/generate/graphUchetDrive`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            meta: {
              day,
              month,
              year,
              group: selectedGruup.groupStud_number,
              driver,
              driveCategory,
              teacher,
            },
            students: studentsForDoc,
          }),
        }
      );
      const blob = await Result.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "graphUchetDriveGenerated.docx";
      a.click();
      toastMes("Документ сформирован", "success");
    } catch (err) {
      console.error("Ошибка при отправке:", err);
    }
  };

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
              <Form.Label>День</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDay(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Месяц</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setMonth(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Год</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setYear(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Водитель</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => serDriver(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Препод</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setTeacher(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="taskForm.ControlFIO">
              <Form.Label>Категория вождения</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setDriveCategory(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div className={styles.tableWrapper}>
        <h2 className="text-xl font-semibold mb-2">Группы:</h2>
        <table className="w-full border-collapse">
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
                    name="selectedGruup" // общая группа для всех radio
                    onChange={(e) => onSelect(row, e)}
                    checked={selectedGruup?.groupStud_id === row.groupStud_id}
                  />
                </td>
                <td className="p-2">{row.groupStud_number}</td>
                <td className="p-2">{row.student_count}</td>
                <td className="p-2">{row.groupStud_dateCreate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        variant="dark"
        onClick={generateDoc}
        disabled={selectedGruup ? false : true}
      >
        Сформировать путевые листы
      </Button>
    </div>
  );
}
