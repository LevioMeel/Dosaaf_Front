import { Button } from "react-bootstrap";
import { signUpAction } from "../actions/action";

export default function SignUpPage() {
    return (
        <div>
            <h1>Регистрация</h1>
            <form action={signUpAction}>
                <input type="text" name="name" placeholder="Имя" required />
                <input type="email" name="email" placeholder="Email" required />
                <input type="password" name="password" placeholder="Пароль" required />

                <Button type="submit" variant="dark">Отправить</Button>
            </form>
        </div>
    )
}