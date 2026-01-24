"use client";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { signOutAction } from "@/app/actions/action";
import styles from "./app.module.scss";
import { useSession } from "./providers/SessionProvider";

export default function Home() {
  const session = useSession();
  console.log("ГЛАВНАЯ СТРАНИЦА", session);

  if (session) {
    return (
      <div className={styles.homeButtons}>
        {/* <p>User ID: {session.user.id}</p> */}
        <form action={signOutAction}>
          <Button type="submit" variant="dark">
            Выйти
          </Button>
        </form>

        <Link href="/groups" className={styles.resetLinkStyles}>
          <Button variant="dark">Группы</Button>
        </Link>

        <Link href="/cadets" className={styles.resetLinkStyles}>
          <Button variant="dark">Курсанты</Button>
        </Link>

        <Link href="/generateDocuments" className={styles.resetLinkStyles}>
          <Button variant="dark">Сформировать документы</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.authButtons}>
      <Link href="/signup">
        <Button variant="dark">Зарегистрироваться</Button>
      </Link>
      <Link href="/signin">
        <Button variant="dark">Войти</Button>
      </Link>
    </div>
  );
}
