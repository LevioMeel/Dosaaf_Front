"use client";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { signOutAction } from "@/app/actions/action";
import styles from "./app.module.scss";
import { useSession } from "./providers/SessionProvider";

export default function Home() {
  console.log("ГЛАВНАЯ СТРАНИЦА");
  const session = useSession();

  if (session) {
    return (
      <div className={styles.homeButtons}>
        {/* <p>User ID: {session.user.id}</p> */}
        <form action={signOutAction}>
          <Button type="submit" variant="dark">
            Выйти
          </Button>
        </form>
        <Button variant="dark">
          <Link href="/groups" className={styles.resetLinkStyles}>
            Группы
          </Link>
        </Button>
        <Button variant="dark">
          <Link href="/generateDocuments" className={styles.resetLinkStyles}>
            Сформировать документы
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button variant="dark">
        <Link href="/signup">Зарегистрироваться</Link>
      </Button>

      <Button variant="dark">
        <Link href="/signin">Войти</Link>
      </Button>
    </div>
  );
}
