"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import { GroupCreate } from "@/app/groups/_components/GroupCreate";
import { CadetCreate } from "@/app/cadets/_components/CadetCreate";
import stylesG from "@/app/global.module.scss";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toastMes } from "@/src/lib/toastMes";
import Link from "next/link";
import { Button } from "react-bootstrap";
import { GroupService } from "@/src/api/services/group.service";
import { format } from "date-fns";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Фикс гидратации
  const router = useRouter();

  function getGroups() {
    GroupService.getGroups()
      .then(setGroups)
      .catch((err) => {
        toastMes(err.message, "error");
      });
  }

  useEffect(() => {
    setIsMounted(true);
    getGroups();
  }, []);

  const columns = [
    {
      title: "Номер группы",
      field: "groupStud_number",
      headerFilter: "input",
      cellClick: (e, cell) => {
        const data = cell.getRow().getData();
        router.push(`/groups/${data.groupStud_id}`);
      },
    },

    {
      title: "Численность",
      field: "student_count",
      headerFilter: "input",
    },
    {
      title: "Дата создания",
      field: "groupStud_dateCreate",
      headerFilter: "input",
      formatter: (cell) => {
        const value = cell.getValue();

        return value ? format(value, "yyyy-MM-dd HH:mm") : "";
      },
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
            `Вы уверены, что хотите удалить группу: ${data.groupStud_number}?`,
          )
        ) {
          GroupService.deleteGroup(data)
            .then(() => {
              toastMes(`Группа: ${data.groupStud_number} - удалена`, "success");
              getGroups();
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
          <GroupCreate getGroups={getGroups} />
          <CadetCreate />
        </div>
        <Link href="/">
          <Button variant="dark">Назад</Button>
        </Link>
      </div>
      <div className={stylesG.tabulatormargin}>
        <ReactTabulator
          columns={columns}
          data={groups}
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
