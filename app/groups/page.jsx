"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GroupCreate } from "@/app/groups/_components/GroupCreate";
import { Title } from "@/app/_components/titles/Title";
import styles from "./groups.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toastMes } from "@/src/lib/toastMes";
import Link from "next/link";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const router = useRouter();

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

  useEffect(() => {
    getGroups();
  }, []);

  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menuButtons}>
          <GroupCreate getGroups={getGroups} />
        </div>
        <Link href="/">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>
      <div className={styles.groups}>
        <div style={{ padding: "20px" }}>
          <Title margin={" 0 0 5px 0"} text="Группы:" />
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th className={styles.thStyle}>Номер группы</th>
                <th className={styles.thStyle}>Численность</th>
                <th className={styles.thStyle}>Дата создания</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => router.push(`/groups/${row.groupStud_id}`)}
                >
                  <td className={styles.tdStyle}>{row.groupStud_number}</td>
                  <td className={styles.tdStyle}>{row.student_count}</td>
                  <td className={styles.tdStyle}>{row.groupStud_dateCreate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
