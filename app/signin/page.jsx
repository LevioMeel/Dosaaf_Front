"use client";
import { Button } from "react-bootstrap";
import { signInAction } from "../actions/action";
import { useState, useEffect } from "react";

export default function SignInPage() {
  //   const signInAction = async () => {
  //     console.log("GO");

  //     try {
  //       const Result = await fetch(
  //         `${process.env.NEXT_PUBLIC_FETCH_URL}/api/auth/sign-in/email`,
  //         {
  //           method: "POST",
  //           body: JSON.stringify({
  //             email: "aaaaa@mail.ru",
  //             password: "aaaaa@mail.ru",
  //           }),
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           credentials: "include",
  //         }
  //       );
  //       console.log("GO2", {
  //         email: "aaaaa@mail.ru",
  //         password: "aaaaa@mail.ru",
  //       });

  //       const data = await Result.json();
  //       console.log("Ответ сервера: DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", data);
  //     } catch (err) {
  //       console.error("Ошибка при отправке:", err);
  //     }
  //   };

  //   useEffect(() => {
  //     signInAction();
  //   }, []);

  return (
    <div>
      <h1>Войти</h1>
      <form action={signInAction}>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Пароль" required />
        <Button type="submit" variant="dark">
          Отправить
        </Button>
      </form>
    </div>
  );
}
