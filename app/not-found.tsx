import Link from "next/link";
import styles from "./not-found.module.css";
import { auth } from "@clerk/nextjs";

const NotFound = () => {
    const { orgId } = auth();
    return (
        <div className={styles.container}>
            <h1 className={styles.fourtext}>404</h1>
            <p className={styles.text}>Oops! Something is wrong.</p>
            <Link className={styles.button} href={`/organization/${orgId}`}>
                Go home
            </Link>
        </div>
    );
};

export default NotFound;
