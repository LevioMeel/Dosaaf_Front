import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { createPool } from "mysql2/promise";

export const auth = betterAuth({
    database: createPool({
        host: process.env.DB_HOST,
        // port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [nextCookies()],
    // advanced: {
    //     crossSubDomainCookies: {
    //         enabled: true,
    //         domain: "drdgen.ru"
    //     }
    // },
    // trustedOrigins: [
    //     'https://api.drdgen.ru'
    // ]
})

