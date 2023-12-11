export default function Person(props) {
    const { persons, deletePerson } = props

    return (
        <>
            <h2>Numbers</h2>
            {persons.map(person => <div
                key={person.id}>{person.name} {person.number}
                <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>)}
        </>
    )
}