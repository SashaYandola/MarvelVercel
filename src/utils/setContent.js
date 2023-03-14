
import ErrorMessage from "../components/errorMessages/ErrorMessage";
import Skeleton from "../components/skeleton/Skeleton";
import Spinner from "../components/spinner/Spinner";

const setContent = (procces, Component, data) => {
    switch (procces) {
        case 'waiting':
            return <Skeleton />;
        case 'loading':
            return <Spinner />;
        case 'confirmed':
            return <Component data={data} />;
        case 'error':
            return <ErrorMessage />;
        default:
            throw new Error('unexpected prcces state');
    }
}

export default setContent;