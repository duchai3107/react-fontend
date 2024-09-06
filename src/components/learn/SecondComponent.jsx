import './style.css';
const SecondComponent = () => {
    const test = "hai oi hoc dy";
    const teest1 = {
        name: 'hai',
        age: 34
    }
    return (
        <>
            <div>{JSON.stringify(teest1)}</div>
            <div>{test} Anh Hai Dep Trai Qua</div>
            <div className="NewStyle" style={{ borderRadius: "20px" }}>HAi promax-mimimi</div>
        </>
    );
}
export { SecondComponent };