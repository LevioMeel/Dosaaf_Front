"use client";
import { use } from "react";
import { Title } from "@/app/_components/titles/Title";
import styles from "./group.module.scss";
import stylesG from "@/app/global.module.scss";
import { useState, useEffect } from "react";
import { toastMes } from "@/src/lib/toastMes";
import { GroupService } from "@/src/api/services/group.service";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { format } from "date-fns";

export default function Group({ params }) {
  const [groupData, setGroupData] = useState({});
  const [groupStudents, setGroupStudents] = useState([]);
  const group = use(params);

  function getGroup(id) {
    GroupService.getGroup(id)
      .then((data) => setGroupData(data[0]))
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  function getGroupStudents(id) {
    GroupService.getGroupStudents(id)
      .then(setGroupStudents)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  useEffect(() => {
    getGroup(group.id);
    getGroupStudents(group.id);
  }, []);

  return (
    <div className={styles.container}>
      <div className={stylesG.menu}>
        <div></div>
        <Link href="/groups">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>

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
          <span className={styles.value}>
            {format(groupData.groupStud_dateCreate, "yyyy-MM-dd HH:mm")}
          </span>
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
