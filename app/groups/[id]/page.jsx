"use client";
import { Title } from "@/app/_components/titles/Title";
import styles from "./group.module.scss";
import stylesG from "@/app/global.module.scss";
import { useState, useEffect } from "react";
import { toastMes } from "@/src/lib/toastMes";
import { GroupService } from "@/src/api/services/group.service";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { format } from "date-fns";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import { useRef } from "react";
import { CadetAddFix } from "@/app/cadets/_components/CadetAddFix";
import { useParams } from "next/navigation";

export default function Group() {
  const group = useParams();
  const [groupData, setGroupData] = useState(null);
  const [groupStudents, setGroupStudents] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Фикс гидратации

  const tableRef = useRef(null);

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
    setIsMounted(true);
    getGroup(group.id);
    getGroupStudents(group.id);
  }, []);

  const columns = [
    {
      title: "ФИО",
      field: "student_name",
      headerFilter: "input",
    },
    {
      title: "Телефон",
      field: "student_phone",
      headerFilter: "input",
    },
    {
      title: "Открепить",
      field: "",
      width: 100,
      headerSort: false,
      formatter: (cell) => {
        return `<button class="btn btn-danger btn-sm" style="width: 100%;">Открепить</button>`;
      },
      cellClick: (e, cell) => {
        const data = cell.getRow().getData();
        if (
          confirm(
            `Вы уверены, что хотите открепить курсанта от этой группы: ${
              data.student_name || data.groupStud_number
            }?`,
          )
        ) {
          console.log("Cadet: ", data);
          console.log("group: ", groupData);

          GroupService.unFixCadet({ cadet: data, group: groupData })
            .then(() => {
              toastMes(
                `Курсант: ${data.student_name} - откреплен от текущей группы`,
                "success",
              );
              getGroupStudents(group.id);
            })
            .catch((err) => {
              toastMes(err.message, "error");
            });
        }
      },
    },
  ];

  if (!groupData || !isMounted) {
    return <div className={stylesG.tabulatormargin}>Загрузка данных...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={stylesG.menu}>
        <CadetAddFix
          groupData={groupData}
          getGroupStudents={getGroupStudents}
        />
        <Link href="/groups">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>

      <Title
        margin="10px 0 10px 0"
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
            {groupData.groupStud_dateCreate &&
              format(groupData.groupStud_dateCreate, "yyyy-MM-dd HH:mm")}
          </span>
        </div>
      </div>

      <Title margin="20px 0 10px 0" text="Курсанты:" />

      <div className={stylesG.tabulatormargin}>
        <ReactTabulator
          onRef={(ref) => (tableRef.current = ref.current)}
          columns={columns}
          data={groupStudents}
          options={{
            layout: "fitColumns",
            resizableRows: false, // Отключаем изменение высоты строк
            pagination: "local", // Включить локальную пагинацию
            paginationSize: 10, // Количество записей на одной странице
            paginationSizeSelector: [10, 20, 50, 100], // Выбор количества записей пользователем
            paginationCounter: "rows", // Показать счетчик строк
            locale: "ru-ru", // Устанавливаем активный язык
            langs: {
              "ru-ru": {
                columns: {
                  name: "Имя", // Перевод заголовков, если нужно через конфиг
                },

                data: {
                  loading: "Загрузка...",
                  error: "Ошибка при загрузке",
                },
                pagination: {
                  page_size: "",
                  page_title: "Открыть страницу",
                  first: "В начало",
                  first_title: "Первая страница",
                  last: "В конец",
                  last_title: "Последняя страница",
                  prev: "Назад",
                  prev_title: "Предыдущая страница",
                  next: "Вперед",
                  next_title: "Следующая страница",
                  all: "Все",
                  counter: {
                    showing: "Показано",
                    of: ":",
                    rows: "строк",
                    pages: "страниц",
                  },
                },
                headerFilters: {
                  default: "Фильтр...", // Текст в инпутах фильтров
                },
              },
            },
          }}
          placeholder={
            "<div style='text-align:center; padding:10px; font-weight: 600'>🔍 Нет закрепленных курсантов</div>"
          } // Появится, если массив данных пуст
        />
      </div>
    </div>
  );
}
