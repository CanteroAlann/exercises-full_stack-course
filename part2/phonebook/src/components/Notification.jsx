
export default function Notification({ message, color }) {
    if (message === null) {
        return null
    }
    console.log(color)
    const messageStyle = {
        color: color,
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={messageStyle}>
            {message}
        </div>
    )
}