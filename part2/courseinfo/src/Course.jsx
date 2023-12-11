

const Header = (props) => {
    return (
        <h1>{props.course}</h1>
    )
}

const Part = (props) => {
    const { part, exercises } = props;
    return (
        <p>{part} {exercises}</p>
    )
}

const Content = (props) => {
    const { parts } = props;
    return (
        <>
            {parts.map(function (part) {
                return (<Part key={part.id} part={part.name} exercises={part.exercises} />)
            })
            }
        </>
    )
}





const Course = ({ course }) => {
    const { name, parts } = course;
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <>
            <Header course={name} />
            <Content parts={parts} />
            {<p><b>total of {total} exercises</b></p>}
        </>
    )
}

export default Course;
