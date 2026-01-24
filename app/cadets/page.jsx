"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { Title } from "@/app/_components/titles/Title";
import styles from "./cadet.module.scss";
import stylesG from "@/app/global.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toastMes } from "@/src/lib/toastMes";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { CadetService } from "@/src/api/services/cadet.service";
import { CadetCreate } from "./_components/CadetCreate";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import { useRef } from "react";

export default function Cadets() {
  const [allCadets, setAllCadets] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Фикс гидратации

  const tableRef = useRef(null);

  function getAllCadets() {
    CadetService.getAllCadets()
      .then(setAllCadets)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  useEffect(() => {
    setIsMounted(true);
    getAllCadets();
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
      title: "Группа",
      field: "groupStud_number",
      headerFilter: "input",
    },
    {
      title: "Удалить",
      field: "",
      width: 100,
      headerSort: false,
      formatter: (cell) => {
        return `<button class="btn btn-danger btn-sm" style="width: 100%;">Удалить</button>`;
      },
      cellClick: (e, cell) => {
        const data = cell.getRow().getData();
        if (
          confirm(
            `Вы уверены, что хотите удалить: ${
              data.student_name || data.groupStud_number
            }?`
          )
        ) {
          CadetService.deleteCadet(data)
            .then(() => {
              toastMes(`Курсант: ${data.student_name} - удален`, "success");
              getAllCadets();
            })
            .catch((err) => {
              toastMes(err.message, "error");
            });
        }
      },
    },
  ];

  if (!isMounted) {
    return <div className={stylesG.tabulatormargin}>Загрузка данных...</div>;
  }

  return (
    <>
      <div className={stylesG.menu}>
        <div className={stylesG.menuButtons}>
          <CadetCreate getAllCadets={getAllCadets} />
        </div>
        <Link href="/">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>
      <div className={stylesG.tabulatormargin}>
        <ReactTabulator
          onRef={(ref) => (tableRef.current = ref.current)}
          columns={columns}
          data={allCadets}
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
        />
      </div>
    </>
  );
}
