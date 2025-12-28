"use client";
import { Button } from "react-bootstrap";
import { signInAction } from "../actions/action";
import { useState, useEffect } from "react";

export default function SignInPage() {
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
