"use client";
import { useState, useEffect } from "react";
import { Title } from "@/app/_components/titles/Title";
import "bootstrap/dist/css/bootstrap.min.css";
import { toastMes } from "@/src/lib/toastMes";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Link from "next/link";
import styles from "./generateDocuments.module.scss";

export default function generateDocuments({ params }) {
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
        {
          credentials: "include",
        }
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
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/generate/doc`,
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
      const data = await Result.json();
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
        <Title margin="0 0 10px 0" text="Выбрать документ:" />
        <Link href="/">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>

      <div className={styles.documentsList}>
        <Link href="/generateDocuments/generateWaybill">
          <Button variant="dark">Путевые листы</Button>
        </Link>
        <Link href="/generateDocuments/generateGraphUchetDrive">
          <Button variant="dark">Карточка курсанта</Button>
        </Link>
      </div>
    </div>
  );
}
