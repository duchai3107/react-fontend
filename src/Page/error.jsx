import { useRouteError } from "react-router-dom";
import { Button, Result } from 'antd';
import { Link } from "react-router-dom";
export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
    return (
        <Result
            status="404"
            title="Opp!"
            subTitle={error.statusText || error.message}
            extra={<Button type="primary" Link to="/">
                <Link to="/" >
                    <span>Go Home</span>
                </Link>

            </Button>}
        />

    );
}
