import { Title } from "@/app/_components/titles/Title";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import Link from "next/link";
import styles from "./generateDocuments.module.scss";

export default function generateDocuments() {
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
