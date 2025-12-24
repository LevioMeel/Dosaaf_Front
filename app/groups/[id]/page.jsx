"use client";
import { use } from "react";
import { Title } from "@/app/_components/titles/Title";
import styles from "./group.module.scss";
import { useState, useEffect } from "react";

export default function Group({ params }) {
  const [groupData, setGroupData] = useState({});
  const [groupStudents, setGroupStudents] = useState([]);
  const group = use(params);

  const getGroups = async (group) => {
    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/getGroup/?id=${group.id}`,
        { credentials: "include" }
      );
      const data = await Result.json();
      setGroupData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getGroupStudents = async (group) => {
    try {
      const Result = await fetch(
        `${process.env.NEXT_PUBLIC_FETCH_URL}/api/getGroupStudents/?id=${group.id}`,
        { credentials: "include" }
      );
      const data = await Result.json();
      setGroupStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getGroups(group);
    getGroupStudents(group);
  }, []);

  return (
    <div className={styles.container}>
      <Title
        margin="0 0 10px 0"
        text={`Группа № ${groupData.groupStud_number}`}
      />

      <div className={styles.info}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Численность:</span>
          <span className={styles.value}>{groupStudents.length}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Дата создания:</span>
          <span className={styles.value}>{groupData.groupStud_dateCreate}</span>
        </div>
      </div>

      <Title margin="20px 0 10px 0" text="Курсанты:" />

      <div className={styles.studentsList}>
        {groupStudents.map((student) => (
          <div key={student.student_id} className={styles.studentCard}>
            <div>
              <span className={styles.label}>ФИО:</span>
              <span className={styles.value}>{student.student_name}</span>
            </div>
            <div>
              <span className={styles.label}>Телефон:</span>
              <span className={styles.value}>{student.student_phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
