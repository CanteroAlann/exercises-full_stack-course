

export default function Filter(props) {
    const { filterNames } = props
    return (
        <div>
            <h2>Phonebook</h2>
            <p>filter shown whit</p>
            <input onChange={filterNames} />
        </div>
    )
}