const Try = ({v, i}) => {
    return (
        <>
        <li>
            {+(i + 1) + '차 시도'}
            <div>{v.try}</div>
            <div>{v.result}</div>
        </li>
        </>
    );
}

export default Try;